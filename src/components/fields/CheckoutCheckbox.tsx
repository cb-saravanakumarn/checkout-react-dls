import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CheckoutCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  errorMessage?: string;
  helpText?: ReactNode;
  invalid?: boolean;
}

export function CheckoutCheckbox({ label, errorMessage, helpText, invalid, disabled, className, ...props }: CheckoutCheckboxProps) {
  return (
    <label className={cx('cb-checkout-check', invalid && 'cb-checkout-check--invalid', disabled && 'cb-checkout-check--disabled', className)}>
      <input {...props} type="checkbox" disabled={disabled} aria-invalid={invalid || undefined} className="cb-checkout-check__input" />
      <span className="cb-checkout-check__box" aria-hidden="true" />
      <span className="cb-checkout-check__content">
        {label && <span className="cb-checkout-check__label">{label}</span>}
        {invalid && errorMessage && <span className="cb-checkout-check__error">{errorMessage}</span>}
        {helpText && <span className="cb-checkout-check__help">{helpText}</span>}
      </span>
    </label>
  );
}
