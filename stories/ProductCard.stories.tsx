import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutButton, ProductCard, QuantityControl, demoProducts } from '../src';
import type { CheckoutProduct } from '../src';

const meta = {
  title: 'Checkout DLS/Product Card',
  decorators: [
    (Story) => (
      <div className="cb-checkout-root" style={{ maxWidth: 680, padding: 24, background: 'var(--cb-checkout-page-bg)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

const blossomPlan: CheckoutProduct = {
  id: 'blossom',
  kind: 'plan',
  name: 'Blossom',
  price: '$5.00',
};

const sslAddon: CheckoutProduct = {
  id: 'ssl',
  kind: 'addon',
  name: 'SSL',
  price: '$5.00',
};

export const PlanCard: Story = {
  render: () => <ProductCard product={blossomPlan} />,
};

export const AddonCard: Story = {
  render: () => <ProductCard product={sslAddon} />,
};

export const CardWithDescription: Story = {
  render: () => (
    <ProductCard
      product={{
        ...blossomPlan,
        description: 'This is enterprise level plan comes with a 14-day trial period and has a setup cost.',
      }}
    />
  ),
};

export const CardWithQuantity: Story = {
  render: () => <ProductCard product={demoProducts[0]} quantityControl={<QuantityControl value={3} />} />,
};

export const InvalidQuantity: Story = {
  render: () => <ProductCard product={{ ...demoProducts[0], errorMessage: 'Quantity must be at least 1.' }} />,
};

export const LoadingPrice: Story = {
  render: () => <ProductCard product={demoProducts[0]} loading />,
};

export const CardWithAction: Story = {
  render: () => (
    <ProductCard
      product={demoProducts[1]}
      action={
        <CheckoutButton variant="link" widthMax>
          Remove
        </CheckoutButton>
      }
    />
  ),
};
