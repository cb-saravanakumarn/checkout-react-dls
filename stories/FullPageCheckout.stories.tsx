import type { Meta, StoryObj } from '@storybook/react';
import {
  CheckoutButton,
  CheckoutFormGrid,
  CheckoutHeader,
  CheckoutInput,
  CheckoutNotification,
  CheckoutPage,
  CheckoutSection,
  CheckoutSelect,
  CheckoutTextarea,
  CheckoutVatField,
  ConsentFields,
  OrderSummary,
  PaymentMethodList,
  ProductList,
  SubmitSection,
  countryOptions,
  demoConsentFields,
  demoPaymentMethods,
  demoProducts,
  demoSummary,
} from '../src';

const meta = {
  title: 'Checkout DLS/Full Page Checkout',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function CheckoutMain({ invalid = false }: { invalid?: boolean }) {
  return (
    <>
      <CheckoutSection title="Customer details">
        <CheckoutFormGrid columns={2}>
          <CheckoutInput label="Email" value="alex@example.com" readOnly invalid={invalid} errorMessage="Enter a valid email address" />
          <CheckoutInput label="Full name" value="Alex Morgan" readOnly />
        </CheckoutFormGrid>
      </CheckoutSection>

      <CheckoutSection title="Billing address">
        <CheckoutFormGrid columns={2}>
          <CheckoutInput label="Address line 1" value="340 S Lemon Ave" readOnly />
          <CheckoutInput label="City" value="Walnut" readOnly />
          <CheckoutSelect label="Country" defaultValue="US" options={countryOptions} disabled />
          <CheckoutInput label="ZIP code" value="91789" readOnly />
        </CheckoutFormGrid>
      </CheckoutSection>

      <CheckoutSection title="Tax information">
        <CheckoutVatField countryPrefix="US" value="US123456789" readOnly helpText="Tax ID is optional for this checkout." />
      </CheckoutSection>

      <CheckoutSection title="Your cart">
        <ProductList products={demoProducts} />
      </CheckoutSection>

      <CheckoutSection title="Payment method">
        <PaymentMethodList methods={demoPaymentMethods} />
      </CheckoutSection>

      <CheckoutSection title="Additional notes">
        <CheckoutTextarea label="Purchase note" value="Please send the receipt to the billing contact." readOnly />
      </CheckoutSection>
    </>
  );
}

export const DesktopDefault: Story = {
  render: () => (
    <CheckoutPage
      notification={<CheckoutNotification tone="primary">Static checkout preview generated from the React DLS.</CheckoutNotification>}
      header={<CheckoutHeader title="Checkout" />}
      main={<CheckoutMain />}
      aside={<OrderSummary summary={demoSummary} footer={<ConsentFields fields={demoConsentFields} />} />}
    />
  ),
};

export const DesktopWithInvalidField: Story = {
  render: () => (
    <CheckoutPage
      header={<CheckoutHeader title="Checkout" />}
      main={<CheckoutMain invalid />}
      aside={<OrderSummary summary={demoSummary} />}
    />
  ),
};

export const DesktopWithLoadingSummary: Story = {
  render: () => (
    <CheckoutPage
      header={<CheckoutHeader title="Checkout" />}
      main={<CheckoutMain />}
      aside={<OrderSummary summary={{ ...demoSummary, loading: true }} />}
    />
  ),
};

export const MobileDefault: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <CheckoutPage
      header={<CheckoutHeader title="Checkout" />}
      main={<CheckoutMain />}
      aside={<OrderSummary summary={demoSummary} />}
      mobileSubmit={<SubmitSection label="Subscribe" secureNote="You may be redirected for 3D secure verification." />}
    />
  ),
};

export const MobileWithFixedSubmit: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <CheckoutPage
      header={<CheckoutHeader title="Checkout" />}
      main={<CheckoutMain />}
      mobileSubmit={
        <CheckoutButton variant="primary" fluid>
          Subscribe
        </CheckoutButton>
      }
    />
  ),
};
