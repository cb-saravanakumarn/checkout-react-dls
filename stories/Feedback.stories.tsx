import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutButton, CheckoutModal, CheckoutNotification } from '../src';

const meta = {
  title: 'Checkout DLS/Feedback',
  decorators: [
    (Story) => (
      <div className="cb-checkout-root" style={{ maxWidth: 720, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Notifications: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <CheckoutNotification tone="primary" title="Information">You may be redirected for 3D secure verification.</CheckoutNotification>
      <CheckoutNotification tone="success" title="Success">Payment method verified.</CheckoutNotification>
      <CheckoutNotification tone="warning" title="Warning">Your bank may take 3-5 days to confirm this payment.</CheckoutNotification>
      <CheckoutNotification tone="error" title="Error">We could not verify the payment method.</CheckoutNotification>
    </div>
  ),
};

export const Modal: Story = {
  render: () => (
    <CheckoutModal
      title="Future charges"
      description="Review upcoming subscription charges before continuing."
      primaryAction={<CheckoutButton variant="primary">Done</CheckoutButton>}
    >
      <p>Scale Plan renews on Aug 29, 2026 for $149.00.</p>
    </CheckoutModal>
  ),
};
