import type { Meta, StoryObj } from '@storybook/react';
import { FullPageCheckoutStarter, defaultFullPageCheckoutConfig, type FullPageCheckoutStarterConfig } from '../src';

const meta = {
  title: 'Example Pages/Full Page Checkout',
  component: FullPageCheckoutStarter,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    previewPlan: { control: 'select', options: ['Pro Plan', 'Scale Plan'] },
    previewCurrency: { control: 'select', options: ['INR', 'USD'] },
    previewFrequency: { control: 'select', options: ['Monthly', 'Yearly'] },
    couponState: { control: 'select', options: ['collapsed', 'expanded', 'error', 'applied'] },
  },
  args: defaultFullPageCheckoutConfig,
} satisfies Meta<FullPageCheckoutStarterConfig>;

export default meta;
type Story = StoryObj<FullPageCheckoutStarterConfig>;

export const ConfigurableProductionPreview: Story = {
  render: (args) => <FullPageCheckoutStarter config={args} />,
};

export const CouponErrorAndFutureCharges: Story = {
  args: {
    couponState: 'error',
    keepCouponBoxOpen: true,
    showFutureCharges: true,
  },
  render: (args) => <FullPageCheckoutStarter config={args} />,
};

export const TrialWithoutPaymentDetails: Story = {
  args: {
    skipPaymentDetails: true,
    previewPlan: 'Scale Plan',
    includeCharge: false,
    couponState: 'expanded',
  },
  render: (args) => <FullPageCheckoutStarter config={args} />,
};
