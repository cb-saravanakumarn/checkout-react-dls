import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const mapPath = path.join(rootDir, 'visual-parity', 'story-map.json');
const outputDir = path.join(rootDir, 'visual-parity', 'artifacts');
const defaultThresholds = {
  maxMismatchRatio: 0.005,
  maxRootWidthDelta: 1,
  maxRootHeightDelta: 2,
  maxSelectorWidthDelta: 2,
  maxSelectorHeightDelta: 2,
};
const noisyStyleProps = new Set(['fontFamily', 'boxShadow', 'border']);

const pickStyles = [
  'display',
  'position',
  'boxSizing',
  'width',
  'height',
  'padding',
  'margin',
  'gap',
  'gridTemplateColumns',
  'border',
  'borderRadius',
  'boxShadow',
  'backgroundColor',
  'color',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'lineHeight',
  'textAlign',
];

async function loadOptional(name) {
  try {
    return await import(name);
  } catch {
    return null;
  }
}

async function collect(page, storySide, styleSelectors, sideIndex) {
  await page.goto(storySide.url, { waitUntil: 'networkidle' });
  const root = page.locator(storySide.rootSelector);
  await root.waitFor({ state: 'visible', timeout: 30000 });

  const rootBox = await root.boundingBox();
  const screenshot = await root.screenshot();
  const styles = await page.evaluate(
    ({ styleSelectors: selectors, sideIndex: index, pickStyles: props }) => {
      const read = (selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const computed = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          selector,
          text: element.textContent?.replace(/\s+/g, ' ').trim() ?? '',
          rect: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
          },
          styles: Object.fromEntries(props.map((prop) => [prop, computed[prop]])),
        };
      };

      return Object.fromEntries(
        Object.entries(selectors).map(([key, pair]) => {
          const selector = pair[index];
          return [key, read(selector)];
        }),
      );
    },
    { styleSelectors, sideIndex, pickStyles },
  );

  return { rootBox, screenshot, styles };
}

function styleDelta(original, candidate) {
  const output = {};
  for (const key of Object.keys(original.styles)) {
    const left = original.styles[key];
    const right = candidate.styles[key];
    if (!left || !right) {
      output[key] = { missing: !left ? 'original' : 'candidate' };
      continue;
    }

    const styleDiff = {};
    for (const prop of pickStyles) {
      if (left.styles[prop] !== right.styles[prop]) {
        styleDiff[prop] = [left.styles[prop], right.styles[prop]];
      }
    }
    const rectDiff = {};
    for (const prop of ['width', 'height']) {
      const delta = Number((left.rect[prop] - right.rect[prop]).toFixed(3));
      if (Math.abs(delta) > 0.5) rectDiff[prop] = delta;
    }
    const textDiff = left.text !== right.text ? { text: [left.text, right.text] } : {};
    if (Object.keys(styleDiff).length || Object.keys(rectDiff).length || Object.keys(textDiff).length) {
      output[key] = { ...textDiff, rect: rectDiff, styles: styleDiff };
    }
  }
  return output;
}

function paddedPng(source, width, height) {
  const target = new PNG({ width, height, fill: true });
  target.data.fill(255);
  for (let y = 0; y < source.height; y += 1) {
    for (let x = 0; x < source.width; x += 1) {
      const sourceIndex = (source.width * y + x) << 2;
      const targetIndex = (width * y + x) << 2;
      target.data[targetIndex] = source.data[sourceIndex];
      target.data[targetIndex + 1] = source.data[sourceIndex + 1];
      target.data[targetIndex + 2] = source.data[sourceIndex + 2];
      target.data[targetIndex + 3] = source.data[sourceIndex + 3];
    }
  }
  return target;
}

async function imageDelta(originalScreenshot, candidateScreenshot, diffPath) {
  const original = PNG.sync.read(originalScreenshot);
  const candidate = PNG.sync.read(candidateScreenshot);
  const width = Math.max(original.width, candidate.width);
  const height = Math.max(original.height, candidate.height);
  const originalPadded = paddedPng(original, width, height);
  const candidatePadded = paddedPng(candidate, width, height);
  const diff = new PNG({ width, height });
  const mismatchedPixels = pixelmatch(originalPadded.data, candidatePadded.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: true,
  });

  await fs.writeFile(diffPath, PNG.sync.write(diff));
  return {
    width,
    height,
    originalSize: { width: original.width, height: original.height },
    candidateSize: { width: candidate.width, height: candidate.height },
    mismatchedPixels,
    mismatchRatio: Number((mismatchedPixels / (width * height)).toFixed(6)),
  };
}

function evaluateResult(result, thresholds) {
  const selectorFailures = [];
  for (const [key, delta] of Object.entries(result.styleDelta)) {
    if (delta.missing) {
      selectorFailures.push({ selector: key, reason: `missing ${delta.missing}` });
      continue;
    }
    const widthDelta = Math.abs(delta.rect?.width ?? 0);
    const heightDelta = Math.abs(delta.rect?.height ?? 0);
    const importantStyles = Object.keys(delta.styles ?? {}).filter((prop) => !noisyStyleProps.has(prop));
    const textChanged = Boolean(delta.text);

    if (
      widthDelta > thresholds.maxSelectorWidthDelta ||
      heightDelta > thresholds.maxSelectorHeightDelta ||
      importantStyles.length ||
      textChanged
    ) {
      selectorFailures.push({
        selector: key,
        reason: [
          widthDelta > thresholds.maxSelectorWidthDelta ? `width delta ${widthDelta}px` : null,
          heightDelta > thresholds.maxSelectorHeightDelta ? `height delta ${heightDelta}px` : null,
          importantStyles.length ? `style drift: ${importantStyles.join(', ')}` : null,
          textChanged ? 'text drift' : null,
        ]
          .filter(Boolean)
          .join('; '),
      });
    }
  }

  const failures = [
    Math.abs(result.rootDelta.width) > thresholds.maxRootWidthDelta
      ? `root width delta ${Math.abs(result.rootDelta.width)}px`
      : null,
    Math.abs(result.rootDelta.height) > thresholds.maxRootHeightDelta
      ? `root height delta ${Math.abs(result.rootDelta.height)}px`
      : null,
    result.imageDelta.mismatchRatio > thresholds.maxMismatchRatio
      ? `image mismatch ${(result.imageDelta.mismatchRatio * 100).toFixed(2)}%`
      : null,
    ...selectorFailures.map(({ selector, reason }) => `${selector}: ${reason}`),
  ].filter(Boolean);

  return {
    passed: failures.length === 0,
    failures,
    selectorFailures,
  };
}

function formatStyleDelta(delta) {
  if (delta.missing) return `missing ${delta.missing}`;
  const chunks = [];
  if (delta.text) chunks.push('text');
  if (Object.keys(delta.rect ?? {}).length) {
    chunks.push(
      Object.entries(delta.rect)
        .map(([key, value]) => `${key} ${Math.abs(value)}px`)
        .join(', '),
    );
  }
  const styles = Object.keys(delta.styles ?? {}).filter((prop) => !noisyStyleProps.has(prop));
  if (styles.length) chunks.push(styles.join(', '));
  return chunks.join('; ') || 'minor style serialization';
}

function markdownReport(report) {
  const lines = ['# Visual Parity Report', ''];
  for (const result of report) {
    lines.push(`## ${result.passed ? 'PASS' : 'FAIL'} ${result.title}`);
    lines.push('');
    lines.push(`- Story id: \`${result.id}\``);
    lines.push(`- Image mismatch: \`${(result.imageDelta.mismatchRatio * 100).toFixed(2)}%\``);
    lines.push(`- Root delta: \`${result.rootDelta.width}px width\`, \`${result.rootDelta.height}px height\``);
    lines.push(`- Original: \`${path.basename(result.artifacts.original)}\``);
    lines.push(`- Candidate: \`${path.basename(result.artifacts.candidate)}\``);
    lines.push(`- Diff: \`${path.basename(result.artifacts.diff)}\``);
    lines.push('');

    if (result.evaluation.failures.length) {
      lines.push('### Fix Queue');
      for (const failure of result.evaluation.failures) {
        lines.push(`- ${failure}`);
      }
      lines.push('');
    }

    if (Object.keys(result.styleDelta).length) {
      lines.push('### Selector Deltas');
      for (const [selector, delta] of Object.entries(result.styleDelta)) {
        lines.push(`- \`${selector}\`: ${formatStyleDelta(delta)}`);
      }
      lines.push('');
    }
  }
  return `${lines.join('\n')}\n`;
}

async function run() {
  const playwright = await loadOptional('playwright');
  if (!playwright) {
    throw new Error('Missing dependency: install Playwright in this workspace to run visual parity checks.');
  }

  await fs.mkdir(outputDir, { recursive: true });
  const storyMap = JSON.parse(await fs.readFile(mapPath, 'utf8'));
  const chromeForTestingPath = path.join(
    process.env.HOME ?? '',
    'Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  );
  const launchOptions = (await fs
    .access(chromeForTestingPath)
    .then(() => true)
    .catch(() => false))
    ? { executablePath: chromeForTestingPath }
    : {};
  const browser = await playwright.chromium.launch(launchOptions);
  const report = [];

  try {
    for (const story of storyMap.stories) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
      const original = await collect(page, story.original, story.styleSelectors, 0);
      const candidate = await collect(page, story.candidate, story.styleSelectors, 1);
      const originalPath = path.join(outputDir, `${story.id}-original.png`);
      const candidatePath = path.join(outputDir, `${story.id}-candidate.png`);
      const diffPath = path.join(outputDir, `${story.id}-diff.png`);
      await fs.writeFile(originalPath, original.screenshot);
      await fs.writeFile(candidatePath, candidate.screenshot);
      const screenshotDelta = await imageDelta(original.screenshot, candidate.screenshot, diffPath);
      const thresholds = { ...defaultThresholds, ...(story.thresholds ?? {}) };

      const result = {
        id: story.id,
        title: story.title,
        artifacts: {
          original: path.relative(outputDir, originalPath),
          candidate: path.relative(outputDir, candidatePath),
          diff: path.relative(outputDir, diffPath),
        },
        thresholds,
        imageDelta: screenshotDelta,
        rootDelta: {
          width: Number((original.rootBox.width - candidate.rootBox.width).toFixed(3)),
          height: Number((original.rootBox.height - candidate.rootBox.height).toFixed(3)),
        },
        styleDelta: styleDelta(original, candidate),
      };
      result.evaluation = evaluateResult(result, thresholds);
      result.passed = result.evaluation.passed;
      report.push(result);
      await page.close();
    }
  } finally {
    await browser.close();
  }

  await fs.writeFile(path.join(outputDir, 'report.json'), `${JSON.stringify(report, null, 2)}\n`);
  await fs.writeFile(path.join(outputDir, 'report.md'), markdownReport(report));
  console.log(`Visual parity report written to ${path.relative(rootDir, path.join(outputDir, 'report.json'))}`);
  console.log(`Visual parity summary written to ${path.relative(rootDir, path.join(outputDir, 'report.md'))}`);
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
