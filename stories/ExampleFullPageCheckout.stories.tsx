import { useEffect, useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Agreement,
  ApplyCoupon,
  CheckoutButton,
  CheckoutCheckbox,
  CheckoutFormGrid,
  CheckoutHeader,
  CheckoutInput,
  CheckoutNotification,
  CheckoutPage,
  CheckoutSection,
  CheckoutSelect,
  CheckoutTextarea,
  CheckoutVatField,
  ConsentFields,
  FutureCharges,
  LoginPanel,
  OfflinePayment,
  OrderSummary,
  PaymentMethodList,
  ProductCard,
  ProductList,
  QuantityControl,
  SubmitSection,
  countryOptions,
  demoConsentFields,
  type CheckoutProduct,
  type OrderSummaryData,
  type PaymentMethodOption,
} from '../src';

interface FullPageCheckoutExampleArgs {
  previewPlan: 'Pro Plan' | 'Scale Plan';
  previewCurrency: 'INR' | 'USD';
  previewFrequency: 'Monthly' | 'Yearly';
  includeAddon: boolean;
  includeCharge: boolean;
  showDescriptions: boolean;
  allowPlanQuantity: boolean;
  allowAddonQuantity: boolean;
  allowAddonRemove: boolean;
  showRecommendedAddons: boolean;
  allowCoupons: boolean;
  allowMultipleCoupons: boolean;
  keepCouponBoxOpen: boolean;
  couponState: 'collapsed' | 'expanded' | 'error' | 'applied';
  showLogin: boolean;
  allowGuestCheckout: boolean;
  collectShippingAddress: boolean;
  showTaxInformation: boolean;
  collectPoNumber: boolean;
  allowOfflinePaymentMethods: boolean;
  skipPaymentDetails: boolean;
  hideZeroValueLineItems: boolean;
  useBrowserLocale: boolean;
  allowLocaleChange: boolean;
  showLegalInformation: boolean;
  showFutureCharges: boolean;
  loadingSummary: boolean;
}

const meta = {
  title: 'Example Pages/Full Page Checkout',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    previewPlan: { control: 'select', options: ['Pro Plan', 'Scale Plan'] },
    previewCurrency: { control: 'select', options: ['INR', 'USD'] },
    previewFrequency: { control: 'select', options: ['Monthly', 'Yearly'] },
    couponState: { control: 'select', options: ['collapsed', 'expanded', 'error', 'applied'] },
  },
  args: {
    previewPlan: 'Pro Plan',
    previewCurrency: 'INR',
    previewFrequency: 'Monthly',
    includeAddon: true,
    includeCharge: true,
    showDescriptions: true,
    allowPlanQuantity: true,
    allowAddonQuantity: true,
    allowAddonRemove: true,
    showRecommendedAddons: true,
    allowCoupons: true,
    allowMultipleCoupons: true,
    keepCouponBoxOpen: false,
    couponState: 'collapsed',
    showLogin: true,
    allowGuestCheckout: true,
    collectShippingAddress: true,
    showTaxInformation: true,
    collectPoNumber: false,
    allowOfflinePaymentMethods: false,
    skipPaymentDetails: false,
    hideZeroValueLineItems: false,
    useBrowserLocale: false,
    allowLocaleChange: false,
    showLegalInformation: true,
    showFutureCharges: true,
    loadingSummary: false,
  },
} satisfies Meta<FullPageCheckoutExampleArgs>;

export default meta;
type Story = StoryObj<FullPageCheckoutExampleArgs>;

type BooleanConfigKey = {
  [Key in keyof FullPageCheckoutExampleArgs]: FullPageCheckoutExampleArgs[Key] extends boolean ? Key : never;
}[keyof FullPageCheckoutExampleArgs];

const configGroups: Array<{ title: string; description: string; settings: Array<{ key: BooleanConfigKey; label: string }> }> = [
  {
    title: 'Cart',
    description: 'Controls the products, quantities, removals, and recommendation surfaces shown in full-page checkout.',
    settings: [
      { key: 'includeAddon', label: 'Include addon in preview' },
      { key: 'includeCharge', label: 'Include one-time charge in preview' },
      { key: 'showDescriptions', label: 'Show description for all items' },
      { key: 'allowPlanQuantity', label: 'Allow customers to edit quantity for plans' },
      { key: 'allowAddonQuantity', label: 'Allow customers to change addon quantity' },
      { key: 'allowAddonRemove', label: 'Allow customers to remove addons' },
      { key: 'showRecommendedAddons', label: 'Show recommended addons in Checkout' },
      { key: 'hideZeroValueLineItems', label: 'Hide zero-value line items' },
    ],
  },
  {
    title: 'Coupons',
    description: 'Matches the checkout coupon entry states, including open, invalid, and applied coupon flows.',
    settings: [
      { key: 'allowCoupons', label: 'Allow customers to add/remove coupons' },
      { key: 'allowMultipleCoupons', label: 'Allow customers to add multiple coupons' },
      { key: 'keepCouponBoxOpen', label: 'Keep coupon box open' },
    ],
  },
  {
    title: 'Customer',
    description: 'Covers account, address, tax, locale, PO, and legal collection options from configuration.',
    settings: [
      { key: 'showLogin', label: 'Show login/sign-in panel' },
      { key: 'allowGuestCheckout', label: 'Allow guest checkout' },
      { key: 'collectShippingAddress', label: 'Collect shipping address' },
      { key: 'showTaxInformation', label: 'Show tax information' },
      { key: 'collectPoNumber', label: 'Collect PO number' },
      { key: 'useBrowserLocale', label: 'Use browser locale' },
      { key: 'allowLocaleChange', label: 'Allow customer to change locale' },
      { key: 'showLegalInformation', label: 'Show legal information' },
    ],
  },
  {
    title: 'Payment',
    description: 'Switches between regular payment collection, offline payment, trial checkout, and loading states.',
    settings: [
      { key: 'allowOfflinePaymentMethods', label: 'Allow offline payment methods' },
      { key: 'skipPaymentDetails', label: 'Skip payment details collection' },
      { key: 'showFutureCharges', label: 'Show future charges' },
      { key: 'loadingSummary', label: 'Show loading summary state' },
    ],
  },
];

const catalog = {
  INR: {
    symbol: '₹',
    plans: {
      'Pro Plan': { amount: 149, id: 'Pro-Plan-INR-Monthly' },
      'Scale Plan': { amount: 599, id: 'Scale-Plan-INR-Monthly' },
    },
    addon: { amount: 50, id: 'Analytics-Pro-INR-Monthly' },
    charge: { amount: 99, id: 'Onboarding-Pkg-INR' },
  },
  USD: {
    symbol: '$',
    plans: {
      'Pro Plan': { amount: 29, id: 'Pro-Plan-USD-Monthly' },
      'Scale Plan': { amount: 129, id: 'Scale-Plan-USD-Monthly' },
    },
    addon: { amount: 20, id: 'Priority-Support-USD-Monthly' },
    charge: { amount: 49, id: 'Onboarding-Pkg-USD' },
  },
};

function money(symbol: string, amount: number) {
  return `${symbol}${amount.toFixed(2)}`;
}

function buildProducts(args: FullPageCheckoutExampleArgs): CheckoutProduct[] {
  const selected = catalog[args.previewCurrency];
  const plan = selected.plans[args.previewPlan];
  const frequency = args.previewFrequency === 'Monthly' ? 'month' : 'year';
  const products: CheckoutProduct[] = [
    {
      id: 'preview-plan',
      kind: 'plan',
      tag: 'PLAN',
      name: args.previewPlan,
      description: args.showDescriptions ? 'Subscription item selected from the generated Chargebee preview link.' : undefined,
      quantity: args.allowPlanQuantity ? '1' : undefined,
      price: money(selected.symbol, plan.amount),
      billingFrequency: frequency,
    },
  ];

  if (args.includeAddon) {
    products.push({
      id: 'preview-addon',
      kind: 'addon',
      tag: 'ADDON',
      name: args.previewCurrency === 'INR' ? 'Analytics Pro' : 'Priority Support',
      description: args.showDescriptions ? 'Optional recurring addon configured in Checkout settings.' : undefined,
      quantity: args.allowAddonQuantity ? '1' : undefined,
      price: money(selected.symbol, selected.addon.amount),
      billingFrequency: frequency,
    });
  }

  if (args.includeCharge) {
    products.push({
      id: 'preview-charge',
      kind: 'charge',
      tag: 'ONE-TIME',
      name: 'Onboarding Pkg',
      description: args.showDescriptions ? 'One-time charge added from the preview link generator.' : undefined,
      price: money(selected.symbol, selected.charge.amount),
    });
  }

  products.push({
    id: 'preview-zero-charge',
    kind: 'charge',
    tag: 'ONE-TIME',
    name: 'Additional Containers',
    description: args.showDescriptions ? 'Zero-value line item used to preview hide/show behavior.' : undefined,
    price: money(selected.symbol, 0),
  });

  return args.hideZeroValueLineItems ? products.filter((product) => !product.price.endsWith('0.00')) : products;
}

function buildSummary(args: FullPageCheckoutExampleArgs, products: CheckoutProduct[]): OrderSummaryData {
  const symbol = catalog[args.previewCurrency].symbol;
  const subtotal = products.reduce((total, product) => total + Number(product.price.replace(/[^0-9.]/g, '')), 0);
  const discount = args.couponState === 'applied' ? Math.min(20, subtotal) : 0;
  const tax = args.showTaxInformation ? Math.round((subtotal - discount) * 0.18 * 100) / 100 : 0;
  const total = subtotal - discount + tax;
  const recurringTotal = products
    .filter((product) => product.billingFrequency)
    .reduce((sum, product) => sum + Number(product.price.replace(/[^0-9.]/g, '')), 0);
  const coupon =
    !args.allowCoupons ? undefined : args.couponState === 'collapsed' && !args.keepCouponBoxOpen ? (
      <button className="cb-cart-page__coupon-link">Apply coupon</button>
    ) : args.couponState === 'error' ? (
      <ApplyCoupon value="WELCOME50" errorMessage="Invalid coupon code" />
    ) : args.couponState === 'applied' ? (
      <ApplyCoupon appliedCoupons={[{ code: 'WELCOME20', amount: `-${money(symbol, discount)}` }]} />
    ) : (
      <ApplyCoupon />
    );

  return {
    title: 'Order summary',
    items: products.map((product) => ({
      id: product.id,
      label: product.name,
      detail: product.billingFrequency ? `${product.price} / ${product.billingFrequency}` : undefined,
      amount: product.price,
    })),
    rows: [
      { id: 'subtotal', label: `Subtotal (${products.length} items)`, value: money(symbol, subtotal), emphasis: 'semibold' },
      ...(discount ? [{ id: 'discount', label: args.allowMultipleCoupons ? 'Coupons applied' : 'Coupon applied', value: `-${money(symbol, discount)}`, tone: 'success' as const }] : []),
      ...(tax ? [{ id: 'tax', label: 'Tax (18%)', value: money(symbol, tax) }] : []),
      { id: 'total', label: 'Total', value: money(symbol, total), emphasis: 'total' },
    ],
    coupon,
    amountDue: args.skipPaymentDetails ? undefined : { id: 'amount-due', label: 'Amount due today', value: money(symbol, total), emphasis: 'total' },
    futureCharges: args.showFutureCharges ? (
      <FutureCharges
        nextChargeLabel="Next charge on May 13, 2026"
        nextChargeAmount={money(symbol, recurringTotal)}
        items={products.filter((product) => product.billingFrequency).map((product) => ({ id: product.id, label: product.name, detail: `${product.price} / ${product.billingFrequency}`, amount: product.price }))}
        subtotal={money(symbol, recurringTotal)}
        total={money(symbol, recurringTotal)}
        totalDate="On May 13, 2026"
      />
    ) : undefined,
    submitLabel: args.skipPaymentDetails ? 'Start Trial' : 'Subscribe',
    secureNote: args.skipPaymentDetails ? 'No payment method is required for this preview checkout.' : 'Secure Checkout by Chargebee',
    loading: args.loadingSummary,
  };
}

function CheckoutConfigDrawer({
  open,
  config,
  onChange,
  onClose,
}: {
  open: boolean;
  config: FullPageCheckoutExampleArgs;
  onChange: <Key extends keyof FullPageCheckoutExampleArgs>(key: Key, value: FullPageCheckoutExampleArgs[Key]) => void;
  onClose: () => void;
}) {
  return (
    <div className={`cb-example-config-drawer-shell ${open ? 'cb-example-config-drawer-shell--open' : ''}`}>
      <button className="cb-example-config-drawer__overlay" type="button" aria-label="Close checkout configuration" onClick={onClose} />
      <aside className="cb-example-config-drawer" role="dialog" aria-modal="true" aria-label="Checkout configuration">
        <div className="cb-example-config-drawer__header">
          <div>
            <h2>Checkout settings</h2>
            <p>Toggle production checkout use cases without editing the story source.</p>
          </div>
          <button className="cb-example-config-drawer__close" type="button" aria-label="Close checkout configuration" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="cb-example-config-drawer__content">
          <section className="cb-example-config-drawer__group" aria-labelledby="preview-config-title">
            <h3 id="preview-config-title">Preview link</h3>
            <p>Mirrors the “Integrate with Chargebee” modal inputs used to generate a checkout preview.</p>
            <label className="cb-example-config-drawer__field">
              <span>Plan</span>
              <select value={config.previewPlan} onChange={(event) => onChange('previewPlan', event.target.value as FullPageCheckoutExampleArgs['previewPlan'])}>
                <option>Pro Plan</option>
                <option>Scale Plan</option>
              </select>
            </label>
            <label className="cb-example-config-drawer__field">
              <span>Currency</span>
              <select value={config.previewCurrency} onChange={(event) => onChange('previewCurrency', event.target.value as FullPageCheckoutExampleArgs['previewCurrency'])}>
                <option>INR</option>
                <option>USD</option>
              </select>
            </label>
            <label className="cb-example-config-drawer__field">
              <span>Frequency</span>
              <select value={config.previewFrequency} onChange={(event) => onChange('previewFrequency', event.target.value as FullPageCheckoutExampleArgs['previewFrequency'])}>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </label>
            <label className="cb-example-config-drawer__field">
              <span>Coupon state</span>
              <select value={config.couponState} onChange={(event) => onChange('couponState', event.target.value as FullPageCheckoutExampleArgs['couponState'])} disabled={!config.allowCoupons}>
                <option value="collapsed">Collapsed</option>
                <option value="expanded">Expanded</option>
                <option value="error">Invalid coupon</option>
                <option value="applied">Applied coupon</option>
              </select>
            </label>
          </section>

          {configGroups.map((group) => (
            <section className="cb-example-config-drawer__group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="cb-example-config-drawer__toggles">
                {group.settings.map((setting) => (
                  <label className="cb-example-config-drawer__toggle" key={setting.key}>
                    <input type="checkbox" checked={config[setting.key]} onChange={(event) => onChange(setting.key, event.target.checked)} />
                    <span>{setting.label}</span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
      </aside>
    </div>
  );
}

function CheckoutProducts({ args, products }: { args: FullPageCheckoutExampleArgs; products: CheckoutProduct[] }) {
  return (
    <ProductList
      products={products}
      renderProduct={(product) => {
        const canEditQuantity = product.kind === 'plan' ? args.allowPlanQuantity : product.kind === 'addon' ? args.allowAddonQuantity : false;
        const action =
          product.kind === 'addon' && args.allowAddonRemove ? (
            <button type="button" className="cb-cart-page__remove">
              Remove
            </button>
          ) : undefined;
        const quantityControl = canEditQuantity ? (
          <QuantityControl value={1} />
        ) : undefined;
        return <ProductCard product={{ ...product, quantity: undefined }} quantityControl={quantityControl} action={action} />;
      }}
    />
  );
}

function CheckoutMain({ args, products }: { args: FullPageCheckoutExampleArgs; products: CheckoutProduct[] }) {
  const paymentMethods: PaymentMethodOption[] = [
    {
      id: 'card',
      kind: 'card',
      label: 'Credit or debit card',
      description: 'Visa, Mastercard, American Express',
      selected: !args.skipPaymentDetails,
    },
    ...(args.allowOfflinePaymentMethods
      ? [
          {
            id: 'offline',
            kind: 'offline' as const,
            label: 'Offline payment',
            description: 'Bank transfer, cash, check, or other offline methods',
          },
        ]
      : []),
  ];

  return (
    <>
      {args.showLogin && (
        <CheckoutSection title="Sign in">
          <LoginPanel mode={args.useBrowserLocale ? 'otp' : 'password'} />
          {!args.allowGuestCheckout && <CheckoutNotification tone="warning">Guest checkout is disabled for this configuration.</CheckoutNotification>}
        </CheckoutSection>
      )}

      <CheckoutSection title="Customer details">
        <CheckoutFormGrid columns={2}>
          <CheckoutInput label="Email" defaultValue="alex@example.com" />
          <CheckoutInput label="Full name" defaultValue="Alex Morgan" />
          {args.allowLocaleChange && <CheckoutSelect label="Language" defaultValue="en" options={[{ label: 'English', value: 'en' }, { label: 'French', value: 'fr' }, { label: 'German', value: 'de' }]} />}
        </CheckoutFormGrid>
      </CheckoutSection>

      <CheckoutSection title="Billing address">
        <CheckoutFormGrid columns={2}>
          <CheckoutInput label="Address line 1" defaultValue="340 S Lemon Ave" />
          <CheckoutInput label="City" defaultValue="Walnut" />
          <CheckoutSelect label="Country" defaultValue={args.previewCurrency === 'INR' ? 'IN' : 'US'} options={countryOptions} />
          <CheckoutInput label="ZIP code" defaultValue={args.previewCurrency === 'INR' ? '600001' : '91789'} />
        </CheckoutFormGrid>
      </CheckoutSection>

      {args.collectShippingAddress && (
        <CheckoutSection title="Shipping address">
          <CheckoutCheckbox label="Ship to billing address" defaultChecked />
          <CheckoutFormGrid columns={2}>
            <CheckoutInput label="Recipient name" defaultValue="Alex Morgan" />
            <CheckoutInput label="Phone" defaultValue="+1 555 0100" />
          </CheckoutFormGrid>
        </CheckoutSection>
      )}

      {args.showTaxInformation && (
        <CheckoutSection title="Tax information">
          <CheckoutVatField countryPrefix={args.previewCurrency === 'INR' ? 'IN' : 'US'} helpText="Tax ID is optional for this checkout." />
        </CheckoutSection>
      )}

      {args.collectPoNumber && (
        <CheckoutSection title="Purchase order">
          <CheckoutInput label="PO number" placeholder="PO-1024" />
        </CheckoutSection>
      )}

      <CheckoutSection title="Your cart">
        <CheckoutProducts args={args} products={products} />
      </CheckoutSection>

      {args.showRecommendedAddons && (
        <CheckoutSection title="Recommended add-ons">
          <div className="cb-example-recommended">
            <ProductCard
              recommended
              product={{
                id: 'recommended-analytics',
                kind: 'addon',
                tag: 'ADDON',
                name: 'Advanced Analytics',
                description: args.showDescriptions ? 'Recommended by Checkout configuration.' : undefined,
                price: money(catalog[args.previewCurrency].symbol, args.previewCurrency === 'INR' ? 75 : 15),
              }}
              action={<CheckoutButton>Add</CheckoutButton>}
            />
            <ProductCard
              recommended
              product={{
                id: 'recommended-support',
                kind: 'addon',
                tag: 'ADDON',
                name: 'Priority Support',
                description: args.showDescriptions ? 'Recommended by Checkout configuration.' : undefined,
                price: money(catalog[args.previewCurrency].symbol, args.previewCurrency === 'INR' ? 100 : 25),
              }}
              action={<CheckoutButton>Add</CheckoutButton>}
            />
          </div>
        </CheckoutSection>
      )}

      {!args.skipPaymentDetails ? (
        <CheckoutSection title="Payment method">
          <PaymentMethodList methods={paymentMethods} />
          {args.allowOfflinePaymentMethods && <OfflinePayment title="Bank transfer" description="Instructions are shown after checkout confirmation." reference="Account ending 2042" />}
        </CheckoutSection>
      ) : (
        <CheckoutSection title="Payment method">
          <CheckoutNotification tone="success">Payment details collection is skipped for this no-immediate-charge checkout.</CheckoutNotification>
        </CheckoutSection>
      )}

      {args.showLegalInformation && (
        <CheckoutSection title="Legal information">
          <ConsentFields fields={demoConsentFields} />
          <Agreement>
            <p>This preview includes legal copy configured under Checkout & Self-Serve Portal fields.</p>
          </Agreement>
        </CheckoutSection>
      )}

      <CheckoutSection title="Additional notes">
        <CheckoutTextarea label="Purchase note" placeholder="Optional note for the merchant" />
      </CheckoutSection>
    </>
  );
}

function FullPageCheckoutExample(args: FullPageCheckoutExampleArgs) {
  const [config, setConfig] = useState(args);
  const [configOpen, setConfigOpen] = useState(false);

  useEffect(() => {
    setConfig(args);
  }, [args]);

  const products = useMemo(() => buildProducts(config), [config]);
  const summary = useMemo(() => buildSummary(config, products), [config, products]);
  const updateConfig = <Key extends keyof FullPageCheckoutExampleArgs>(key: Key, value: FullPageCheckoutExampleArgs[Key]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  return (
    <>
      <button className="cb-example-settings-button" type="button" aria-label="Open checkout configuration" title="Open checkout configuration" onClick={() => setConfigOpen(true)}>
        ⚙
      </button>
      <CheckoutConfigDrawer open={configOpen} config={config} onChange={updateConfig} onClose={() => setConfigOpen(false)} />
      <CheckoutPage
        className="cb-checkout-page--production-exact"
        header={<CheckoutHeader title="Checkout" subtitle={config.useBrowserLocale ? 'Locale follows browser preference when customer locale is not specified.' : undefined} />}
        main={<CheckoutMain args={config} products={products} />}
        aside={<OrderSummary summary={summary} footer={config.showLegalInformation ? <ConsentFields fields={demoConsentFields} /> : undefined} />}
        mobileSubmit={<SubmitSection label={summary.submitLabel ?? 'Subscribe'} secureNote={summary.secureNote} />}
      />
    </>
  );
}

export const ConfigurableProductionPreview: Story = {
  render: (args) => <FullPageCheckoutExample {...args} />,
};

export const CouponErrorAndFutureCharges: Story = {
  args: {
    couponState: 'error',
    keepCouponBoxOpen: true,
    showFutureCharges: true,
  },
  render: (args) => <FullPageCheckoutExample {...args} />,
};

export const TrialWithoutPaymentDetails: Story = {
  args: {
    skipPaymentDetails: true,
    previewPlan: 'Scale Plan',
    includeCharge: false,
    couponState: 'expanded',
  },
  render: (args) => <FullPageCheckoutExample {...args} />,
};
