import type { CheckoutProduct, OrderSummaryData, PaymentMethodOption } from '../types/checkout';
import { CardPaymentForm } from '../components/payment/CardPaymentForm';
import { CheckoutFormGrid } from '../components/layout/CheckoutFormGrid';
import { CheckoutInput } from '../components/fields/CheckoutInput';

export const demoProducts: CheckoutProduct[] = [
  {
    id: 'scale-plan',
    kind: 'plan',
    name: 'Scale Plan',
    tag: 'Plan',
    trialTag: '14 day trial',
    description: 'For teams scaling recurring revenue operations with hosted checkout.',
    quantity: '1',
    price: '$129.00',
    billingFrequency: 'month',
  },
  {
    id: 'priority-support',
    kind: 'addon',
    name: 'Priority Support',
    tag: 'Addon',
    description: 'Dedicated response coverage for payment and checkout questions.',
    quantity: '1',
    price: '$20.00',
    billingFrequency: 'month',
  },
];

export const demoSummary: OrderSummaryData = {
  title: 'Order summary',
  items: [
    {
      id: 'scale-plan',
      label: 'Scale Plan',
      detail: '$129.00 / month',
      amount: '$129.00',
    },
    {
      id: 'priority-support',
      label: 'Priority Support',
      detail: '$20.00 / month',
      amount: '$20.00',
    },
  ],
  rows: [
    { id: 'subtotal', label: 'Subtotal', value: '$149.00', emphasis: 'semibold' },
    { id: 'tax', label: 'Tax', value: '$0.00' },
    { id: 'total', label: 'Total', value: '$149.00', emphasis: 'total' },
  ],
  amountDue: { id: 'amount-due', label: 'Amount due today', value: '$149.00', emphasis: 'total' },
  submitLabel: 'Subscribe',
  secureNote: 'You may be redirected for 3D secure verification.',
};

export const demoPaymentMethods: PaymentMethodOption[] = [
  {
    id: 'card',
    kind: 'card',
    label: 'Credit or debit card',
    description: 'Visa, Mastercard, American Express',
    selected: true,
    body: <CardPaymentForm />,
  },
  {
    id: 'paypal',
    kind: 'paypal',
    label: 'PayPal',
    description: 'Continue with PayPal after reviewing your order',
  },
  {
    id: 'direct-debit',
    kind: 'direct_debit',
    label: 'Direct debit',
    description: 'Authorize payment from your bank account',
  },
];

export const countryOptions = [
  { label: 'United States', value: 'US' },
  { label: 'India', value: 'IN' },
  { label: 'United Kingdom', value: 'GB' },
];

export const demoConsentFields = [
  {
    id: 'terms',
    label: (
      <>
        I agree to the <a href="#">terms of service</a>.
      </>
    ),
    required: true,
    checked: true,
  },
  {
    id: 'updates',
    label: 'Send renewal and invoice reminders to this email.',
    checked: true,
  },
];
