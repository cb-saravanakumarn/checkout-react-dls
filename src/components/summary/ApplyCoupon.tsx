import type { ReactNode } from 'react';
import { CheckoutInput } from '../fields/CheckoutInput';
import { CheckoutButton } from '../primitives/CheckoutButton';

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
  label = 'Coupon code',
  placeholder = 'Enter coupon code',
  value,
  appliedCoupons = [],
  errorMessage,
  loading,
  actionLabel = 'Apply',
  footer,
}: ApplyCouponProps) {
  return (
    <div className="cb-apply-coupon">
      <div className="cb-apply-coupon__field">
        <CheckoutInput label={label} placeholder={placeholder} defaultValue={value} invalid={Boolean(errorMessage)} errorMessage={errorMessage} />
        <CheckoutButton variant="link" loading={loading} widthMax>
          {actionLabel}
        </CheckoutButton>
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
