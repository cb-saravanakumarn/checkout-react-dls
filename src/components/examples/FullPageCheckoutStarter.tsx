import { useEffect, useMemo, useState } from 'react';
import { CheckoutButton } from '../primitives/CheckoutButton';
import { CheckoutCheckbox } from '../fields/CheckoutCheckbox';
import { CheckoutFormGrid } from '../layout/CheckoutFormGrid';
import { CheckoutHeader } from '../layout/CheckoutHeader';
import { CheckoutInput } from '../fields/CheckoutInput';
import { CheckoutNotification } from '../feedback/CheckoutNotification';
import { CheckoutPage } from '../layout/CheckoutPage';
import { CheckoutSection } from '../layout/CheckoutSection';
import { CheckoutSelect } from '../fields/CheckoutSelect';
import { CheckoutTextarea } from '../fields/CheckoutTextarea';
import { CheckoutVatField } from '../fields/CheckoutVatField';
import { ConsentFields } from '../summary/ConsentFields';
import { Agreement } from '../summary/Agreement';
import { ApplyCoupon } from '../summary/ApplyCoupon';
import { FutureCharges } from '../summary/NextCharge';
import { LoginPanel } from '../auth/LoginPanel';
import { OfflinePayment } from '../payment/OfflinePayment';
import { OrderSummary } from '../summary/OrderSummary';
import { PaymentMethodList } from '../payment/PaymentMethodList';
import { ProductCard } from '../product/ProductCard';
import { ProductList } from '../product/ProductList';
import { QuantityControl } from '../product/QuantityControl';
import { SubmitSection } from '../summary/SubmitSection';
import { countryOptions, demoConsentFields } from '../../data/demoCheckout';
import type { CheckoutProduct, OrderSummaryData, PaymentMethodOption } from '../../types/checkout';

export interface FullPageCheckoutStarterConfig {
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

export interface FullPageCheckoutStarterProps {
  config?: Partial<FullPageCheckoutStarterConfig>;
  showSettingsDrawer?: boolean;
}

type BooleanConfigKey = {
  [Key in keyof FullPageCheckoutStarterConfig]: FullPageCheckoutStarterConfig[Key] extends boolean ? Key : never;
}[keyof FullPageCheckoutStarterConfig];

export const defaultFullPageCheckoutConfig: FullPageCheckoutStarterConfig = {
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
};

export const checkoutStarterFeatureGroups: Array<{ title: string; description: string; settings: Array<{ key: BooleanConfigKey; label: string }> }> = [
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

function buildProducts(config: FullPageCheckoutStarterConfig): CheckoutProduct[] {
  const selected = catalog[config.previewCurrency];
  const plan = selected.plans[config.previewPlan];
  const frequency = config.previewFrequency === 'Monthly' ? 'month' : 'year';
  const products: CheckoutProduct[] = [
    {
      id: 'preview-plan',
      kind: 'plan',
      tag: 'PLAN',
      name: config.previewPlan,
      description: config.showDescriptions ? 'Subscription item selected from the generated Chargebee preview link.' : undefined,
      quantity: config.allowPlanQuantity ? '1' : undefined,
      price: money(selected.symbol, plan.amount),
      billingFrequency: frequency,
    },
  ];

  if (config.includeAddon) {
    products.push({
      id: 'preview-addon',
      kind: 'addon',
      tag: 'ADDON',
      name: config.previewCurrency === 'INR' ? 'Analytics Pro' : 'Priority Support',
      description: config.showDescriptions ? 'Optional recurring addon configured in Checkout settings.' : undefined,
      quantity: config.allowAddonQuantity ? '1' : undefined,
      price: money(selected.symbol, selected.addon.amount),
      billingFrequency: frequency,
    });
  }

  if (config.includeCharge) {
    products.push({
      id: 'preview-charge',
      kind: 'charge',
      tag: 'ONE-TIME',
      name: 'Onboarding Pkg',
      description: config.showDescriptions ? 'One-time charge added from the preview link generator.' : undefined,
      price: money(selected.symbol, selected.charge.amount),
    });
  }

  products.push({
    id: 'preview-zero-charge',
    kind: 'charge',
    tag: 'ONE-TIME',
    name: 'Additional Containers',
    description: config.showDescriptions ? 'Zero-value line item used to preview hide/show behavior.' : undefined,
    price: money(selected.symbol, 0),
  });

  return config.hideZeroValueLineItems ? products.filter((product) => !product.price.endsWith('0.00')) : products;
}

function buildSummary(config: FullPageCheckoutStarterConfig, products: CheckoutProduct[]): OrderSummaryData {
  const symbol = catalog[config.previewCurrency].symbol;
  const subtotal = products.reduce((total, product) => total + Number(product.price.replace(/[^0-9.]/g, '')), 0);
  const discount = config.couponState === 'applied' ? Math.min(20, subtotal) : 0;
  const tax = config.showTaxInformation ? Math.round((subtotal - discount) * 0.18 * 100) / 100 : 0;
  const total = subtotal - discount + tax;
  const recurringTotal = products
    .filter((product) => product.billingFrequency)
    .reduce((sum, product) => sum + Number(product.price.replace(/[^0-9.]/g, '')), 0);
  const coupon =
    !config.allowCoupons ? undefined : config.couponState === 'collapsed' && !config.keepCouponBoxOpen ? (
      <button className="cb-cart-page__coupon-link">Apply coupon</button>
    ) : config.couponState === 'error' ? (
      <ApplyCoupon value="WELCOME50" errorMessage="Invalid coupon code" />
    ) : config.couponState === 'applied' ? (
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
      ...(discount ? [{ id: 'discount', label: config.allowMultipleCoupons ? 'Coupons applied' : 'Coupon applied', value: `-${money(symbol, discount)}`, tone: 'success' as const }] : []),
      ...(tax ? [{ id: 'tax', label: 'Tax (18%)', value: money(symbol, tax) }] : []),
      { id: 'total', label: 'Total', value: money(symbol, total), emphasis: 'total' },
    ],
    coupon,
    amountDue: config.skipPaymentDetails ? undefined : { id: 'amount-due', label: 'Amount due today', value: money(symbol, total), emphasis: 'total' },
    futureCharges: config.showFutureCharges ? (
      <FutureCharges
        nextChargeLabel="Next charge on May 13, 2026"
        nextChargeAmount={money(symbol, recurringTotal)}
        items={products.filter((product) => product.billingFrequency).map((product) => ({ id: product.id, label: product.name, detail: `${product.price} / ${product.billingFrequency}`, amount: product.price }))}
        subtotal={money(symbol, recurringTotal)}
        total={money(symbol, recurringTotal)}
        totalDate="On May 13, 2026"
      />
    ) : undefined,
    submitLabel: config.skipPaymentDetails ? 'Start Trial' : 'Subscribe',
    secureNote: config.skipPaymentDetails ? 'No payment method is required for this preview checkout.' : 'Secure Checkout by Chargebee',
    loading: config.loadingSummary,
  };
}

export function CheckoutSettingsDrawer({
  open,
  config,
  onChange,
  onClose,
}: {
  open: boolean;
  config: FullPageCheckoutStarterConfig;
  onChange: <Key extends keyof FullPageCheckoutStarterConfig>(key: Key, value: FullPageCheckoutStarterConfig[Key]) => void;
  onClose: () => void;
}) {
  return (
    <div className={`cb-example-config-drawer-shell ${open ? 'cb-example-config-drawer-shell--open' : ''}`}>
      <button className="cb-example-config-drawer__overlay" type="button" aria-label="Close checkout configuration" onClick={onClose} />
      <aside className="cb-example-config-drawer" role="dialog" aria-modal="true" aria-label="Checkout configuration">
        <div className="cb-example-config-drawer__header">
          <div>
            <h2>Checkout settings</h2>
            <p>Toggle production checkout use cases without editing source.</p>
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
              <select value={config.previewPlan} onChange={(event) => onChange('previewPlan', event.target.value as FullPageCheckoutStarterConfig['previewPlan'])}>
                <option>Pro Plan</option>
                <option>Scale Plan</option>
              </select>
            </label>
            <label className="cb-example-config-drawer__field">
              <span>Currency</span>
              <select value={config.previewCurrency} onChange={(event) => onChange('previewCurrency', event.target.value as FullPageCheckoutStarterConfig['previewCurrency'])}>
                <option>INR</option>
                <option>USD</option>
              </select>
            </label>
            <label className="cb-example-config-drawer__field">
              <span>Frequency</span>
              <select value={config.previewFrequency} onChange={(event) => onChange('previewFrequency', event.target.value as FullPageCheckoutStarterConfig['previewFrequency'])}>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
            </label>
            <label className="cb-example-config-drawer__field">
              <span>Coupon state</span>
              <select value={config.couponState} onChange={(event) => onChange('couponState', event.target.value as FullPageCheckoutStarterConfig['couponState'])} disabled={!config.allowCoupons}>
                <option value="collapsed">Collapsed</option>
                <option value="expanded">Expanded</option>
                <option value="error">Invalid coupon</option>
                <option value="applied">Applied coupon</option>
              </select>
            </label>
          </section>

          {checkoutStarterFeatureGroups.map((group) => (
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

function CheckoutProducts({ config, products }: { config: FullPageCheckoutStarterConfig; products: CheckoutProduct[] }) {
  return (
    <ProductList
      products={products}
      renderProduct={(product) => {
        const canEditQuantity = product.kind === 'plan' ? config.allowPlanQuantity : product.kind === 'addon' ? config.allowAddonQuantity : false;
        const action =
          product.kind === 'addon' && config.allowAddonRemove ? (
            <button type="button" className="cb-cart-page__remove">
              Remove
            </button>
          ) : undefined;
        const quantityControl = canEditQuantity ? <QuantityControl value={1} /> : undefined;
        return <ProductCard product={{ ...product, quantity: undefined }} quantityControl={quantityControl} action={action} />;
      }}
    />
  );
}

function CheckoutMain({ config, products }: { config: FullPageCheckoutStarterConfig; products: CheckoutProduct[] }) {
  const paymentMethods: PaymentMethodOption[] = [
    {
      id: 'card',
      kind: 'card',
      label: 'Credit or debit card',
      description: 'Visa, Mastercard, American Express',
      selected: !config.skipPaymentDetails,
    },
    ...(config.allowOfflinePaymentMethods
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
      {config.showLogin && (
        <CheckoutSection title="Sign in">
          <LoginPanel mode={config.useBrowserLocale ? 'otp' : 'password'} />
          {!config.allowGuestCheckout && <CheckoutNotification tone="warning">Guest checkout is disabled for this configuration.</CheckoutNotification>}
        </CheckoutSection>
      )}

      <CheckoutSection title="Customer details">
        <CheckoutFormGrid columns={2}>
          <CheckoutInput label="Email" defaultValue="alex@example.com" />
          <CheckoutInput label="Full name" defaultValue="Alex Morgan" />
          {config.allowLocaleChange && <CheckoutSelect label="Language" defaultValue="en" options={[{ label: 'English', value: 'en' }, { label: 'French', value: 'fr' }, { label: 'German', value: 'de' }]} />}
        </CheckoutFormGrid>
      </CheckoutSection>

      <CheckoutSection title="Billing address">
        <CheckoutFormGrid columns={2}>
          <CheckoutInput label="Address line 1" defaultValue="340 S Lemon Ave" />
          <CheckoutInput label="City" defaultValue="Walnut" />
          <CheckoutSelect label="Country" defaultValue={config.previewCurrency === 'INR' ? 'IN' : 'US'} options={countryOptions} />
          <CheckoutInput label="ZIP code" defaultValue={config.previewCurrency === 'INR' ? '600001' : '91789'} />
        </CheckoutFormGrid>
      </CheckoutSection>

      {config.collectShippingAddress && (
        <CheckoutSection title="Shipping address">
          <CheckoutCheckbox label="Ship to billing address" defaultChecked />
          <CheckoutFormGrid columns={2}>
            <CheckoutInput label="Recipient name" defaultValue="Alex Morgan" />
            <CheckoutInput label="Phone" defaultValue="+1 555 0100" />
          </CheckoutFormGrid>
        </CheckoutSection>
      )}

      {config.showTaxInformation && (
        <CheckoutSection title="Tax information">
          <CheckoutVatField countryPrefix={config.previewCurrency === 'INR' ? 'IN' : 'US'} helpText="Tax ID is optional for this checkout." />
        </CheckoutSection>
      )}

      {config.collectPoNumber && (
        <CheckoutSection title="Purchase order">
          <CheckoutInput label="PO number" placeholder="PO-1024" />
        </CheckoutSection>
      )}

      <CheckoutSection title="Your cart">
        <CheckoutProducts config={config} products={products} />
      </CheckoutSection>

      {config.showRecommendedAddons && (
        <CheckoutSection title="Recommended add-ons">
          <div className="cb-example-recommended">
            <ProductCard
              recommended
              product={{
                id: 'recommended-analytics',
                kind: 'addon',
                tag: 'ADDON',
                name: 'Advanced Analytics',
                description: config.showDescriptions ? 'Recommended by Checkout configuration.' : undefined,
                price: money(catalog[config.previewCurrency].symbol, config.previewCurrency === 'INR' ? 75 : 15),
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
                description: config.showDescriptions ? 'Recommended by Checkout configuration.' : undefined,
                price: money(catalog[config.previewCurrency].symbol, config.previewCurrency === 'INR' ? 100 : 25),
              }}
              action={<CheckoutButton>Add</CheckoutButton>}
            />
          </div>
        </CheckoutSection>
      )}

      {!config.skipPaymentDetails ? (
        <CheckoutSection title="Payment method">
          <PaymentMethodList methods={paymentMethods} />
          {config.allowOfflinePaymentMethods && <OfflinePayment title="Bank transfer" description="Instructions are shown after checkout confirmation." reference="Account ending 2042" />}
        </CheckoutSection>
      ) : (
        <CheckoutSection title="Payment method">
          <CheckoutNotification tone="success">Payment details collection is skipped for this no-immediate-charge checkout.</CheckoutNotification>
        </CheckoutSection>
      )}

      {config.showLegalInformation && (
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

export function FullPageCheckoutStarter({ config: configOverride, showSettingsDrawer = true }: FullPageCheckoutStarterProps) {
  const mergedConfig = useMemo(() => ({ ...defaultFullPageCheckoutConfig, ...configOverride }), [configOverride]);
  const [config, setConfig] = useState(mergedConfig);
  const [configOpen, setConfigOpen] = useState(false);

  useEffect(() => {
    setConfig(mergedConfig);
  }, [mergedConfig]);

  const products = useMemo(() => buildProducts(config), [config]);
  const summary = useMemo(() => buildSummary(config, products), [config, products]);
  const updateConfig = <Key extends keyof FullPageCheckoutStarterConfig>(key: Key, value: FullPageCheckoutStarterConfig[Key]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  };

  return (
    <>
      {showSettingsDrawer && (
        <>
          <button className="cb-example-settings-button" type="button" aria-label="Open checkout configuration" title="Open checkout configuration" onClick={() => setConfigOpen(true)}>
            ⚙
          </button>
          <CheckoutSettingsDrawer open={configOpen} config={config} onChange={updateConfig} onClose={() => setConfigOpen(false)} />
        </>
      )}
      <CheckoutPage
        className="cb-checkout-page--production-exact"
        header={<CheckoutHeader title="Checkout" subtitle={config.useBrowserLocale ? 'Locale follows browser preference when customer locale is not specified.' : undefined} />}
        main={<CheckoutMain config={config} products={products} />}
        aside={<OrderSummary summary={summary} footer={config.showLegalInformation ? <ConsentFields fields={demoConsentFields} /> : undefined} />}
        mobileSubmit={<SubmitSection label={summary.submitLabel ?? 'Subscribe'} secureNote={summary.secureNote} />}
      />
    </>
  );
}
