import type { PaymentMethodKind } from '../../types/checkout';
import { cx } from '../../utils/cx';

export type PaymentIconName = PaymentMethodKind | 'visa' | 'mastercard' | 'amex' | 'bank' | 'cash' | 'check';

export interface PaymentIconProps {
  name: PaymentIconName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const labels: Record<PaymentIconName, string> = {
  card: 'Card',
  paypal: 'PayPal',
  google_pay: 'G Pay',
  direct_debit: 'DD',
  offline: 'Offline',
  visa: 'VISA',
  mastercard: 'MC',
  amex: 'AMEX',
  bank: 'Bank',
  cash: 'Cash',
  check: 'Check',
};

export function PaymentIcon({ name, size = 'md', className }: PaymentIconProps) {
  return <span className={cx('cb-payment-icon', `cb-payment-icon--${size}`, className)}>{labels[name]}</span>;
}
