import type { ReactNode } from 'react';
import type { CheckoutTone } from '../../types/checkout';
import { cx } from '../../utils/cx';

export interface CheckoutNotificationProps {
  tone?: Exclude<CheckoutTone, 'muted'>;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function CheckoutNotification({ tone = 'default', title, children, className }: CheckoutNotificationProps) {
  return (
    <div className={cx('cb-notification', `cb-notification--${tone}`, className)} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="cb-notification__icon" aria-hidden="true">
        {tone === 'success' ? '✓' : tone === 'warning' ? '!' : tone === 'error' ? '!' : 'i'}
      </span>
      <div className="cb-notification__content">
        {title && <div className="cb-notification__title">{title}</div>}
        {children && <div className="cb-notification__body">{children}</div>}
      </div>
    </div>
  );
}
