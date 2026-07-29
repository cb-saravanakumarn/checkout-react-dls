import { cx } from '../../utils/cx';

export interface ChargebeeBrandingProps {
  className?: string;
}

export function ChargebeeBranding({ className }: ChargebeeBrandingProps) {
  return (
    <p className={cx('cb-branding', className)}>
      <span>Secure Checkout</span>
      <span>by Chargebee</span>
    </p>
  );
}
