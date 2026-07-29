import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CheckoutRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  description?: ReactNode;
  invalid?: boolean;
}

export function CheckoutRadio({ label, description, invalid, disabled, className, ...props }: CheckoutRadioProps) {
  return (
    <label className={cx('cb-checkout-radio', invalid && 'cb-checkout-radio--invalid', disabled && 'cb-checkout-radio--disabled', className)}>
      <input {...props} type="radio" disabled={disabled} aria-invalid={invalid || undefined} className="cb-checkout-radio__input" />
      <span className="cb-checkout-radio__mark" aria-hidden="true" />
      <span className="cb-checkout-radio__content">
        {label && <span className="cb-checkout-radio__label">{label}</span>}
        {description && <span className="cb-checkout-radio__description">{description}</span>}
      </span>
    </label>
  );
}
