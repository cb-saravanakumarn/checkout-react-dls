import { cx } from '../../utils/cx';

export interface QuantityControlProps {
  value?: string | number;
  disabled?: boolean;
  readonly?: boolean;
  invalid?: boolean;
  errorMessage?: string;
  className?: string;
}

export function QuantityControl({ value = 1, disabled, readonly, invalid, errorMessage, className }: QuantityControlProps) {
  return (
    <div className={cx('cb-quantity', invalid && 'cb-quantity--invalid', disabled && 'cb-quantity--disabled', className)}>
      <div className="cb-quantity__control">
        <button type="button" disabled={disabled || readonly} aria-label="Decrease quantity">
          -
        </button>
        <input value={value} readOnly disabled={disabled} aria-invalid={invalid || undefined} />
        <button type="button" disabled={disabled || readonly} aria-label="Increase quantity">
          +
        </button>
      </div>
      {invalid && errorMessage && <div className="cb-quantity__error">{errorMessage}</div>}
    </div>
  );
}
