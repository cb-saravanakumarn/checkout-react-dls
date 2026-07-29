import type { ReactNode, TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface CheckoutTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string;
  helpText?: ReactNode;
  invalid?: boolean;
}

export function CheckoutTextarea({ label, description, errorMessage, helpText, invalid, disabled, className, id, ...props }: CheckoutTextareaProps) {
  const textareaId = id || props.name;
  return (
    <label className={cx('cb-checkout-field', invalid && 'cb-checkout-field--invalid', disabled && 'cb-checkout-field--disabled', className)}>
      {label && <span className="cb-checkout-field__label">{label}</span>}
      {description && <span className="cb-checkout-field__description">{description}</span>}
      <span className="cb-checkout-field__control">
        <textarea {...props} id={textareaId} disabled={disabled} aria-invalid={invalid || undefined} className="cb-checkout-field__input cb-checkout-field__textarea" />
      </span>
      {invalid && errorMessage && <span className="cb-checkout-field__error">{errorMessage}</span>}
      {helpText && <span className="cb-checkout-field__help">{helpText}</span>}
    </label>
  );
}
