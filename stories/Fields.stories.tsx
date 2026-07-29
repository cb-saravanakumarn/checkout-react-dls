import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutCheckbox, CheckoutFormGrid, CheckoutInput, CheckoutRadio, CheckoutSelect, CheckoutTextarea, CheckoutVatField, countryOptions } from '../src';

const meta = {
  title: 'Checkout DLS/Fields',
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

export const TextInput: Story = {
  render: () => <CheckoutInput label="Full name" value="Alex Morgan" readOnly />,
};

export const EmailInput: Story = {
  render: () => <CheckoutInput label="Email" type="email" value="alex@example.com" readOnly />,
};

export const SelectCountry: Story = {
  render: () => <CheckoutSelect label="Country" defaultValue="US" options={countryOptions} disabled />,
};

export const CheckboxConsent: Story = {
  render: () => <CheckoutCheckbox label="I agree to the terms and privacy policy." defaultChecked />,
};

export const RadioPayment: Story = {
  render: () => <CheckoutRadio label="Credit or debit card" description="Visa, Mastercard, American Express" defaultChecked />,
};

export const InvalidInput: Story = {
  render: () => <CheckoutInput label="Email" value="alex" readOnly invalid errorMessage="Enter a valid email address" />,
};

export const DisabledInput: Story = {
  render: () => <CheckoutInput label="Coupon code" value="SUMMER20" disabled />,
};

export const InputWithPrefixSuffix: Story = {
  render: () => (
    <CheckoutFormGrid columns={2}>
      <CheckoutInput label="Amount" prefix="$" value="149.00" readOnly />
      <CheckoutInput label="Website" suffix=".com" value="chargebee" readOnly />
    </CheckoutFormGrid>
  ),
};

export const Textarea: Story = {
  render: () => <CheckoutTextarea label="Purchase note" value="Please include PO-1008 on the invoice." readOnly />,
};

export const VatField: Story = {
  render: () => <CheckoutVatField label="Tax ID" countryPrefix="US" value="US123456789" readOnly />,
};
