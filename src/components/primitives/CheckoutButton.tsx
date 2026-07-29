import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { CheckoutButtonVariant } from '../../types/checkout';
import { cx } from '../../utils/cx';
import { Loader } from './Loader';

export interface CheckoutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CheckoutButtonVariant;
  fluid?: boolean;
  loading?: boolean;
  widthMax?: boolean;
  children: ReactNode;
}

export function CheckoutButton({
  variant = 'outlined',
  fluid = false,
  loading = false,
  widthMax = false,
  disabled,
  className,
  children,
  ...props
}: CheckoutButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cx(
        'cb-checkout-button',
        `cb-checkout-button--${variant}`,
        fluid && 'cb-checkout-button--fluid',
        loading && 'cb-checkout-button--loading',
        disabled && 'cb-checkout-button--disabled',
        widthMax && 'cb-checkout-button--width-max',
        className,
      )}
    >
      {loading && <Loader className="cb-checkout-button__loader" />}
      <span className="cb-checkout-button__label">{children}</span>
    </button>
  );
}
