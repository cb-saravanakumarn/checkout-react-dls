import type { ReactNode } from 'react';
import type { PaymentMethodOption } from '../../types/checkout';
import { cx } from '../../utils/cx';
import { CheckoutRadio } from '../fields/CheckoutRadio';
import { PaymentIcon } from './PaymentIcons';

export interface PaymentMethodRowProps {
  method: PaymentMethodOption;
  icon?: ReactNode;
  className?: string;
}

export function PaymentMethodRow({ method, icon, className }: PaymentMethodRowProps) {
  return (
    <div className={cx('cb-payment-method', method.selected && 'cb-payment-method--selected', method.disabled && 'cb-payment-method--disabled', className)}>
      <div className="cb-payment-method__header">
        <CheckoutRadio name="payment-method" checked={method.selected} disabled={method.disabled} readOnly />
        <div className="cb-payment-method__icon">{icon ?? <PaymentIcon name={method.kind} />}</div>
        <div className="cb-payment-method__copy">
          <div className="cb-payment-method__label">{method.label}</div>
          {method.description && <div className="cb-payment-method__description">{method.description}</div>}
        </div>
      </div>
      {method.selected && method.body && <div className="cb-payment-method__body">{method.body}</div>}
    </div>
  );
}
