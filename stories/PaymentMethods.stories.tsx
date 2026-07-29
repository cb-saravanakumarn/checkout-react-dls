import type { Meta, StoryObj } from '@storybook/react';
import { OfflinePayment, PaymentConsentModal, PaymentMethodList, demoPaymentMethods } from '../src';

const meta = {
  title: 'Checkout DLS/Payment Methods',
  decorators: [
    (Story) => (
      <div className="cb-checkout-root" style={{ maxWidth: 680, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const CardSelected: Story = {
  render: () => <PaymentMethodList methods={demoPaymentMethods} />,
};

export const Paypal: Story = {
  render: () => <PaymentMethodList methods={demoPaymentMethods.map((method) => ({ ...method, selected: method.kind === 'paypal' }))} />,
};

export const GooglePay: Story = {
  render: () => <PaymentMethodList methods={[{ id: 'google-pay', kind: 'google_pay', label: 'Google Pay', selected: true }, ...demoPaymentMethods]} />,
};

export const DirectDebit: Story = {
  render: () => <PaymentMethodList methods={demoPaymentMethods.map((method) => ({ ...method, selected: method.kind === 'direct_debit' }))} />,
};

export const Offline: Story = {
  render: () => <PaymentMethodList methods={[{ id: 'offline', kind: 'offline', label: 'Offline payment', description: 'Pay by bank transfer or check', selected: true, body: <OfflinePayment /> }]} />,
};

export const DisabledPaymentMethod: Story = {
  render: () => <PaymentMethodList methods={demoPaymentMethods.map((method) => (method.kind === 'paypal' ? { ...method, disabled: true } : method))} />,
};

export const ConsentModal: Story = {
  render: () => <PaymentConsentModal />,
};
