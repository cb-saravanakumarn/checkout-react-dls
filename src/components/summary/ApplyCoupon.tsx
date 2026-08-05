import type { ReactNode } from 'react';
import { CheckoutInput } from '../fields/CheckoutInput';

export interface AppliedCoupon {
  code: string;
  amount?: string;
}

export interface ApplyCouponProps {
  label?: string;
  placeholder?: string;
  value?: string;
  appliedCoupons?: AppliedCoupon[];
  errorMessage?: string;
  loading?: boolean;
  actionLabel?: string;
  footer?: ReactNode;
}

export function ApplyCoupon({
  label = 'Enter coupon code',
  placeholder,
  value,
  appliedCoupons = [],
  errorMessage,
  loading,
  actionLabel = 'Apply',
  footer,
}: ApplyCouponProps) {
  return (
    <div className="cb-apply-coupon">
      <div className="cb-apply-coupon__heading">{label}</div>
      <div className="cb-apply-coupon__main cb-coupon-input-group">
        <CheckoutInput
          className="cb-apply-coupon__input"
          placeholder={placeholder}
          defaultValue={value}
          invalid={Boolean(errorMessage)}
          errorMessage={errorMessage}
        />
        <div className={errorMessage ? 'cb-coupon-link cb-coupon-error-link' : 'cb-coupon-link cb-coupon-apply-link'}>
          <button type="button" className="cb-apply-coupon__action" disabled={loading}>
            {actionLabel}
          </button>
          {loading && <span className="cb-loader" aria-label="Applying coupon" />}
        </div>
      </div>
      {appliedCoupons.length > 0 && (
        <div className="cb-apply-coupon__applied">
          {appliedCoupons.map((coupon) => (
            <div className="cb-apply-coupon__coupon" key={coupon.code}>
              <span>{coupon.code}</span>
              {coupon.amount && <span>{coupon.amount}</span>}
            </div>
          ))}
        </div>
      )}
      {footer}
    </div>
  );
}
