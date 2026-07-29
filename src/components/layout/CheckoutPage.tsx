import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface CheckoutPageProps {
  header?: ReactNode;
  main: ReactNode;
  aside?: ReactNode;
  mobileSubmit?: ReactNode;
  notification?: ReactNode;
  backLink?: ReactNode;
  className?: string;
}

export function CheckoutPage({ header, main, aside, mobileSubmit, notification, backLink, className }: CheckoutPageProps) {
  return (
    <div className={cx('cb-checkout-root cb-checkout-page', className)}>
      {notification}
      {backLink}
      {header}
      <div className="cb-checkout-page__content">
        <main className="cb-checkout-page__main">{main}</main>
        {aside && <div className="cb-checkout-page__gutter" aria-hidden="true" />}
        {aside && <aside className="cb-checkout-page__aside">{aside}</aside>}
      </div>
      {mobileSubmit && <div className="cb-checkout-page__mobile-submit">{mobileSubmit}</div>}
    </div>
  );
}
