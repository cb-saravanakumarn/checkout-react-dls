import type { ReactNode } from 'react';
import { CheckoutButton } from '../primitives/CheckoutButton';

export interface SubmitSectionProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  secureNote?: ReactNode;
  paymentButton?: ReactNode;
}

export function SubmitSection({ label, loading, disabled, secureNote, paymentButton }: SubmitSectionProps) {
  return (
    <div className="cb-submit-section">
      {paymentButton ?? (
        <CheckoutButton variant="primary" fluid loading={loading} disabled={disabled}>
          {label}
        </CheckoutButton>
      )}
      {secureNote && <div className="cb-submit-section__note">{secureNote}</div>}
    </div>
  );
}
