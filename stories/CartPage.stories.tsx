import type { Meta, StoryObj } from '@storybook/react';
import {
  ApplyCoupon,
  ChargebeeBranding,
  CheckoutHeader,
  CheckoutPage,
  FutureCharges,
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
  futureCharges: <CartFutureCharges />,
  submitLabel: 'Proceed To Checkout',
};

const futureChargeItems = [
  { id: 'pro-plan', label: 'Pro Plan', detail: '₹149.00 / month', amount: '₹149.00' },
  { id: 'analytics-pro', label: 'Analytics Pro', detail: '₹50.00 / month', amount: '₹50.00' },
  { id: 'priority-support', label: 'Priority Support', detail: '₹29.00 / month', amount: '₹29.00' },
];

function CartFutureCharges() {
  return (
    <FutureCharges
      nextChargeLabel="Next charge on May 13, 2026"
      nextChargeAmount="₹228.00"
      items={futureChargeItems}
      subtotal="₹228.00"
      total="₹228.00"
      totalDate="On May 13, 2026"
    />
  );
}

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
      className="cb-checkout-page--cart cb-checkout-page--production-exact cb-checkout-page--production-cart-layout"
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
      className="cb-checkout-page--cart cb-checkout-page--production-exact cb-checkout-page--production-cart-layout"
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
      className="cb-checkout-page--cart cb-checkout-page--production-exact cb-checkout-page--production-cart-layout"
      header={<CheckoutHeader title="Your cart" />}
      main={<CartProducts />}
      aside={
        <>
          <OrderSummary
            summary={{
              ...cartSummary,
              coupon: (
                <div className="cb-cart-page__coupon-form">
                  <ApplyCoupon value="dsada" errorMessage="Invalid coupon code" />
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
