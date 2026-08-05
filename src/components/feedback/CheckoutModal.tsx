import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CheckoutButton } from '../primitives/CheckoutButton';

export interface CheckoutModalProps {
  open?: boolean;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
  onClose?: () => void;
}

export function CheckoutModal({ open = true, title, description, children, primaryAction, secondaryAction, className, onClose }: CheckoutModalProps) {
  if (!open) return null;

  return (
    <div className="cb-modal-shell">
      <div className="cb-modal-shell__overlay" onClick={onClose} />
      <section className={cx('cb-modal', className)} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
        <div className="cb-modal__header">
          <h2 className="cb-modal__title">{title}</h2>
          <button className="cb-modal__close" type="button" aria-label="Close" onClick={onClose}>
            ×
          </button>
        </div>
        {description && <div className="cb-modal__description">{description}</div>}
        {children && <div className="cb-modal__content">{children}</div>}
        {(primaryAction || secondaryAction) && (
          <div className="cb-modal__footer">
            {secondaryAction ?? <CheckoutButton>Cancel</CheckoutButton>}
            {primaryAction ?? <CheckoutButton variant="primary">Continue</CheckoutButton>}
          </div>
        )}
      </section>
    </div>
  );
}
