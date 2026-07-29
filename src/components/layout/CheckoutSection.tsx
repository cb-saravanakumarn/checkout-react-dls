import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CheckoutSectionProps {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
  className?: string;
}

export function CheckoutSection({ title, children, footer, disabled, className }: CheckoutSectionProps) {
  return (
    <section className={cx('cb-checkout-section', disabled && 'cb-checkout-section--disabled', className)}>
      {title && <h2 className="cb-checkout-section__title">{title}</h2>}
      <div className="cb-checkout-section__content">{children}</div>
      {footer && <div className="cb-checkout-section__footer">{footer}</div>}
    </section>
  );
}
