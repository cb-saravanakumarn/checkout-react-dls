import type { ReactNode, SelectHTMLAttributes } from 'react';
import type { CheckoutSelectOption } from '../../types/checkout';
import { cx } from '../../utils/cx';

export interface CheckoutSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  description?: ReactNode;
  options: CheckoutSelectOption[];
  placeholder?: string;
  errorMessage?: string;
  helpText?: ReactNode;
  invalid?: boolean;
}

export function CheckoutSelect({
  label,
  description,
  options,
  placeholder,
  errorMessage,
  helpText,
  invalid,
  disabled,
  className,
  id,
  ...props
}: CheckoutSelectProps) {
  const selectId = id || props.name;
  return (
    <label className={cx('cb-checkout-field', invalid && 'cb-checkout-field--invalid', disabled && 'cb-checkout-field--disabled', className)}>
      {label && <span className="cb-checkout-field__label">{label}</span>}
      {description && <span className="cb-checkout-field__description">{description}</span>}
      <span className="cb-checkout-field__control">
        <select {...props} id={selectId} disabled={disabled} aria-invalid={invalid || undefined} className="cb-checkout-field__input">
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
      {invalid && errorMessage && <span className="cb-checkout-field__error">{errorMessage}</span>}
      {helpText && <span className="cb-checkout-field__help">{helpText}</span>}
    </label>
  );
}
