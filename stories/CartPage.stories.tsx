import type { Meta, StoryObj } from '@storybook/react';
import {
  ChargebeeBranding,
  CheckoutButton,
  CheckoutHeader,
  CheckoutInput,
  CheckoutPage,
  OrderSummary,
  ProductCard,
  ProductList,
  type CheckoutProduct,
  type OrderSummaryData,
} from '../src';

const meta = {
  title: 'Checkout DLS/Cart Page',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

const cartProducts: CheckoutProduct[] = [
  { id: 'pro-plan', kind: 'plan', tag: 'PLAN', name: 'Pro Plan', price: '₹149.00' },
  { id: 'analytics-pro', kind: 'addon', tag: 'ADDON', name: 'Analytics Pro', price: '₹50.00' },
  { id: 'priority-support', kind: 'addon', tag: 'ADDON', name: 'Priority Support', price: '₹29.00' },
  { id: 'onboarding-pkg', kind: 'charge', tag: 'ONE-TIME', name: 'Onboarding Pkg', price: '₹99.00' },
  { id: 'additional-containers', kind: 'charge', tag: 'ONE-TIME', name: 'Additional Containers', price: '₹0.00' },
];

const cartSummary: OrderSummaryData = {
  title: 'Order summary',
  items: [
    { id: 'pro-plan', label: 'Pro Plan', detail: '₹149.00 / month', amount: '₹149.00' },
    { id: 'analytics-pro', label: 'Analytics Pro', detail: '₹50.00 / month', amount: '₹50.00' },
    { id: 'priority-support', label: 'Priority Support', detail: '₹29.00 / month', amount: '₹29.00' },
    { id: 'onboarding-pkg', label: 'Onboarding Pkg', amount: '₹99.00' },
    { id: 'additional-containers', label: 'Additional Containers', amount: '₹0.00' },
  ],
  rows: [{ id: 'subtotal', label: 'Subtotal (5 items)', value: '₹327.00', emphasis: 'semibold' }],
  coupon: <button className="cb-cart-page__coupon-link">Apply coupon</button>,
  amountDue: { id: 'total', label: 'Total', value: '₹327.00', emphasis: 'total' },
  futureCharges: (
    <div className="cb-cart-page__next-charge">
      <span>Next charge on May 13, 2026</span>
      <button>Future charges</button>
      <strong>₹228.00</strong>
    </div>
  ),
  submitLabel: 'Proceed To Checkout',
};

function RemoveAction() {
  return <button className="cb-cart-page__remove">Remove</button>;
}

function CartProducts() {
  return (
    <ProductList
      products={cartProducts}
      renderProduct={(product) => (
        <ProductCard product={product} density="compact" action={product.kind === 'plan' ? undefined : <RemoveAction />} />
      )}
    />
  );
}

export const ProductionCartDefault: Story = {
  render: () => (
    <CheckoutPage
      className="cb-checkout-page--cart"
      header={<CheckoutHeader title="Your cart" />}
      main={<CartProducts />}
      aside={
        <>
          <OrderSummary summary={cartSummary} />
          <ChargebeeBranding />
        </>
      }
    />
  ),
};

export const ExactProductionCheckoutPage: Story = {
  render: () => (
    <CheckoutPage
      className="cb-checkout-page--cart cb-checkout-page--production-exact"
      header={<CheckoutHeader title="Your cart" />}
      main={<CartProducts />}
      aside={
        <>
          <OrderSummary summary={cartSummary} />
          <ChargebeeBranding />
        </>
      }
    />
  ),
};

export const ProductionCartWithCouponError: Story = {
  render: () => (
    <CheckoutPage
      className="cb-checkout-page--cart"
      header={<CheckoutHeader title="Your cart" />}
      main={<CartProducts />}
      aside={
        <>
          <OrderSummary
            summary={{
              ...cartSummary,
              coupon: (
                <div className="cb-cart-page__coupon-form">
                  <CheckoutInput label="Enter coupon code" value="dsada" readOnly invalid errorMessage="Invalid coupon code" />
                  <CheckoutButton variant="link">Apply</CheckoutButton>
                </div>
              ),
            }}
          />
          <ChargebeeBranding />
        </>
      }
    />
  ),
};
