import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CheckoutInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: ReactNode;
  description?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  errorMessage?: string;
  helpText?: ReactNode;
  invalid?: boolean;
}

export function CheckoutInput({
  label,
  description,
  prefix,
  suffix,
  errorMessage,
  helpText,
  invalid,
  disabled,
  className,
  id,
  ...props
}: CheckoutInputProps) {
  const inputId = id || props.name;
  return (
    <label className={cx('cb-checkout-field', invalid && 'cb-checkout-field--invalid', disabled && 'cb-checkout-field--disabled', className)}>
      {label && <span className="cb-checkout-field__label">{label}</span>}
      {description && <span className="cb-checkout-field__description">{description}</span>}
      <span className="cb-checkout-field__control">
        {prefix && <span className="cb-checkout-field__affix cb-checkout-field__affix--prefix">{prefix}</span>}
        <input {...props} id={inputId} disabled={disabled} aria-invalid={invalid || undefined} className="cb-checkout-field__input" />
        {suffix && <span className="cb-checkout-field__affix cb-checkout-field__affix--suffix">{suffix}</span>}
      </span>
      {invalid && errorMessage && <span className="cb-checkout-field__error">{errorMessage}</span>}
      {helpText && <span className="cb-checkout-field__help">{helpText}</span>}
    </label>
  );
}
