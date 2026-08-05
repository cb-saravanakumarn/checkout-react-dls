# Checkout React DLS

Static React component library for Lovable full-page checkout prototyping.

This package mirrors the current `cb-hp-ui` full-page checkout visual language, but it does not reuse Vue/Gelato components directly.

## Scope

Included:

- Static checkout layout.
- Form primitives.
- Product/cart UI.
- Order summary UI.
- Payment method rows.
- Default checkout styling.

Excluded:

- Real checkout functionality.
- Payment SDKs.
- API/store integration.
- Merchant customization controls.
- Vue compatibility.

## Usage

```tsx
import '@chargebee/checkout-react-dls/styles.css';
import { CheckoutPage, CheckoutHeader, OrderSummary, demoSummary } from '@chargebee/checkout-react-dls';
```

## Page Anatomy

Use the DLS as a checkout page composition system, not as a generic landing-page kit.

| Checkout area | Use these components | Notes |
| --- | --- | --- |
| Outer shell | `CheckoutPage` | Owns page background, desktop columns, aside placement, and mobile submit slot. |
| Page heading | `CheckoutHeader` | Use for the main checkout title/header only. |
| Customer details | `CheckoutSection`, `CheckoutFormGrid`, `CheckoutInput` | Email, full name, company, phone, or read-only customer fields. |
| Billing/shipping address | `CheckoutSection`, `CheckoutFormGrid`, `CheckoutInput`, `CheckoutSelect`, `CheckoutCheckbox` | Keep fields compact and grouped by checkout section. |
| Tax information | `CheckoutSection`, `CheckoutVatField` | Use for VAT/GST/tax ID visual states. |
| Cart/products | `CheckoutSection`, `ProductList`, `ProductCard`, `QuantityControl` | Use repeated product cards for plan/addon/charge rows. |
| Payment method | `CheckoutSection`, `PaymentMethodList`, `PaymentMethodRow`, `CardPaymentForm`, `OfflinePayment` | Use rows for card, PayPal, Google Pay, direct debit, and offline payment choices. |
| Right summary panel | `OrderSummary` | Desktop aside summary with line items, subtotal, coupon, total, future charges, and submit CTA. |
| Summary internals | `SummaryLineItems`, `SummaryRow`, `ApplyCoupon`, `TaxLineItems`, `DiscountRows`, `ConsentFields`, `Agreement`, `NextCharge`, `SubmitSection` | Prefer passing these through `OrderSummary` slots/data when composing full checkout screens. |
| Alerts and dialogs | `CheckoutNotification`, `CheckoutModal`, `PaymentConsentModal` | Static visual states only. Do not wire real API or payment behavior. |

## Canonical Composition

```tsx
import {
  CheckoutHeader,
  CheckoutInput,
  CheckoutPage,
  CheckoutSection,
  OrderSummary,
  ProductList,
  PaymentMethodList,
  demoProducts,
  demoPaymentMethods,
  demoSummary,
} from '@chargebee/checkout-react-dls';
import '@chargebee/checkout-react-dls/styles.css';

export function StaticCheckoutPreview() {
  return (
    <CheckoutPage
      header={<CheckoutHeader title="Checkout" />}
      main={
        <>
          <CheckoutSection title="Customer details">
            <CheckoutInput label="Email" value="alex@example.com" readOnly />
          </CheckoutSection>
          <CheckoutSection title="Your cart">
            <ProductList products={demoProducts} />
          </CheckoutSection>
          <CheckoutSection title="Payment method">
            <PaymentMethodList methods={demoPaymentMethods} />
          </CheckoutSection>
        </>
      }
      aside={<OrderSummary summary={demoSummary} />}
    />
  );
}
```

## Lovable Rules

The source-of-truth Lovable usage rules live in `.lovable/rules.md`.

When importing this repo into Lovable Design System, attach those rules and use these Storybook examples as the primary references:

- `Example Pages/Full Page Checkout/Configurable Production Preview`
- `Checkout DLS/Cart Page/Exact Production Checkout Page`
- `Checkout DLS/Cart Page/Production Cart Default`
- `Checkout DLS/Cart Page/Production Cart With Coupon Error`
- `Checkout DLS/Full Page Checkout/Desktop Default`
- `Checkout DLS/Full Page Checkout/Mobile Default`
- `Checkout DLS/Order Summary/Default`
- `Checkout DLS/Product Card/Plan Card`
- `Checkout DLS/Payment Methods/Card Selected`

Lovable-generated screens should use exported DLS components instead of raw cards, fields, buttons, payment rows, or summary rows.

For promptable checkout configuration, use `docs/lovable-feature-map.md` and the settings drawer in `Example Pages/Full Page Checkout/Configurable Production Preview`.

For a production checkout cart starter, prefer `Checkout DLS/Cart Page/Exact Production Checkout Page` as the first visual reference.

## Visual Parity

Run the parity check while both Storybooks are available:

```bash
npm run visual-parity
```

The report is written to `visual-parity/artifacts/report.md`.

Start Storybook:

```bash
npm run dev
```
