import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CheckoutFormGridProps {
  children: ReactNode;
  columns?: 1 | 2;
  className?: string;
}

export function CheckoutFormGrid({ children, columns = 1, className }: CheckoutFormGridProps) {
  return <div className={cx('cb-checkout-form-grid', columns === 2 && 'cb-checkout-form-grid--two', className)}>{children}</div>;
}
