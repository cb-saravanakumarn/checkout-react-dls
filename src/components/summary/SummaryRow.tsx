import type { ReactNode } from 'react';
import type { CheckoutTone } from '../../types/checkout';
import { cx } from '../../utils/cx';

export interface SummaryRowProps {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  tone?: CheckoutTone;
  emphasis?: 'regular' | 'semibold' | 'total';
}

export function SummaryRow({ label, value, detail, tone = 'default', emphasis = 'regular' }: SummaryRowProps) {
  return (
    <div className={cx('cb-summary-row', `cb-summary-row--${tone}`, `cb-summary-row--${emphasis}`)}>
      <div className="cb-summary-row__left">
        <div className="cb-summary-row__label">{label}</div>
        {detail && <div className="cb-summary-row__detail">{detail}</div>}
      </div>
      <div className="cb-summary-row__value">{value}</div>
    </div>
  );
}
