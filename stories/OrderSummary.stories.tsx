import type { Meta, StoryObj } from '@storybook/react';
import { OrderSummary, demoSummary } from '../src';
import type { OrderSummaryData } from '../src';

const meta = {
  title: 'Checkout DLS/Order Summary',
  decorators: [
    (Story) => (
      <div className="cb-checkout-root" style={{ maxWidth: 528, padding: 24, background: 'var(--cb-checkout-page-bg)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const defaultSummary: OrderSummaryData = {
  title: 'Order Summary',
  items: [
    {
      id: 'premium-plan',
      label: 'Monthly Premium Subscription',
      detail: (
        <span className="cb-summary-line-item__price-detail">
          <span>$29.99</span>
          <span>/</span>
          <span>Monthly</span>
        </span>
      ),
      amount: '$29.99',
    },
    {
      id: 'extra-storage',
      label: '100GB Additional Storage',
      detail: (
        <span className="cb-summary-line-item__price-detail">
          <span>$9.99</span>
          <span>/</span>
          <span>Monthly</span>
        </span>
      ),
      amount: '$9.99',
    },
  ],
  rows: [
    { id: 'subtotal', label: 'Subtotal (2 items)', value: '$39.98', emphasis: 'semibold' },
    { id: 'total', label: 'Total', value: '$39.98', emphasis: 'total' },
  ],
  coupon: (
    <a href="#" onClick={(event) => event.preventDefault()}>
      Apply Coupon
    </a>
  ),
  futureCharges: (
    <a href="#" onClick={(event) => event.preventDefault()}>
      See future charges
    </a>
  ),
  submitLabel: 'Subscribe Now',
};

export const Default: Story = {
  render: () => <OrderSummary summary={defaultSummary} />,
};

export const WithTax: Story = {
  render: () => <OrderSummary summary={{ ...demoSummary, rows: [...demoSummary.rows.slice(0, 1), { id: 'tax', label: 'Tax', value: '$13.41' }, demoSummary.rows[2]] }} />,
};

export const WithDiscount: Story = {
  render: () => (
    <OrderSummary
      summary={{
        ...demoSummary,
        rows: [
          demoSummary.rows[0],
          { id: 'discount', label: 'Launch discount', value: '-$20.00', tone: 'success' },
          demoSummary.rows[1],
          { id: 'total', label: 'Total', value: '$129.00', emphasis: 'total' },
        ],
      }}
    />
  ),
};

export const WithAmountDue: Story = {
  render: () => <OrderSummary summary={demoSummary} />,
};

export const Loading: Story = {
  render: () => <OrderSummary summary={{ ...demoSummary, loading: true }} />,
};
