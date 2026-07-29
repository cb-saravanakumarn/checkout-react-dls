import type { PaymentMethodOption } from '../../types/checkout';
import { cx } from '../../utils/cx';
import { PaymentMethodRow } from './PaymentMethodRow';

export interface PaymentMethodListProps {
  methods: PaymentMethodOption[];
  className?: string;
}

export function PaymentMethodList({ methods, className }: PaymentMethodListProps) {
  return (
    <div className={cx('cb-payment-method-list', className)}>
      {methods.map((method) => (
        <PaymentMethodRow key={method.id} method={method} />
      ))}
    </div>
  );
}
