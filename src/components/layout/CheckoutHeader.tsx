import { cx } from '../../utils/cx';

export interface CheckoutHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function CheckoutHeader({ title, subtitle, className }: CheckoutHeaderProps) {
  return (
    <header className={cx('cb-checkout-header', className)}>
      <h1 className="cb-checkout-header__title">{title}</h1>
      {subtitle && <p className="cb-checkout-header__subtitle">{subtitle}</p>}
    </header>
  );
}
