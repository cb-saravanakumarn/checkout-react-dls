import type { Meta, StoryObj } from '@storybook/react';
import {
  Agreement,
  ApplyCoupon,
  CheckoutSection,
  ConsentFields,
  DiscountRows,
  LoginPanel,
  NextCharge,
  PaymentConsentModal,
  TaxLineItems,
  demoConsentFields,
} from '../src';

const meta = {
  title: 'Checkout DLS/Checkout States',
  decorators: [
    (Story) => (
      <div className="cb-checkout-root" style={{ maxWidth: 760, padding: 24, background: 'var(--cb-checkout-page-bg)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const CouponAndDiscounts: Story = {
  render: () => (
    <CheckoutSection title="Coupons and discounts">
      <ApplyCoupon appliedCoupons={[{ code: 'LAUNCH20', amount: '-$20.00' }]} />
      <DiscountRows discounts={[{ id: 'seller-discount', label: 'Seller discount', amount: '-$10.00', detail: 'Applied by account team' }]} />
    </CheckoutSection>
  ),
};

export const TaxAndNextCharge: Story = {
  render: () => (
    <CheckoutSection title="Tax and future charges">
      <TaxLineItems items={[{ id: 'state-tax', label: 'State tax', amount: '$9.20' }, { id: 'city-tax', label: 'City tax', amount: '$4.21' }]} />
      <NextCharge amount="$149.00" date="Aug 29, 2026" />
    </CheckoutSection>
  ),
};

export const ConsentAndAgreement: Story = {
  render: () => (
    <CheckoutSection title="Consent">
      <ConsentFields fields={demoConsentFields} />
      <Agreement>
        By subscribing, you agree that Chargebee may charge your payment method according to the subscription terms shown in this checkout.
      </Agreement>
    </CheckoutSection>
  ),
};

export const PaymentConsent: Story = {
  render: () => <PaymentConsentModal />,
};

export const LoginPassword: Story = {
  render: () => (
    <CheckoutSection title="Login">
      <LoginPanel />
    </CheckoutSection>
  ),
};

export const LoginOtpError: Story = {
  render: () => (
    <CheckoutSection title="Login">
      <LoginPanel mode="otp" state="error" />
    </CheckoutSection>
  ),
};
