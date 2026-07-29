# Visual Parity Workflow

This folder maps original `cb-hp-ui` Storybook stories to React DLS stories and gives us a repeatable way to compare them.

## Run

1. Start original checkout Storybook at `http://localhost:6006`.
2. Build and serve this package Storybook at `http://127.0.0.1:6016`.
3. Install Playwright in the workspace when running outside Codex browser automation.
4. Run:

```bash
npm run visual-parity
```

The script writes screenshots and computed-style deltas to `visual-parity/artifacts`.

## Fix Order

1. Match story data/state.
2. Match component structure.
3. Match root dimensions.
4. Match typography and spacing.
5. Match color, borders, shadows, and states.
