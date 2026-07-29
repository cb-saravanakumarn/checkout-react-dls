import type { SummaryLineItem } from '../../types/checkout';
import { cx } from '../../utils/cx';

export interface SummaryLineItemsProps {
  items: SummaryLineItem[];
  loading?: boolean;
  className?: string;
}

export function SummaryLineItems({ items, loading, className }: SummaryLineItemsProps) {
  return (
    <div className={cx('cb-summary-line-items', className)}>
      {items.map((item) => (
        <div className="cb-summary-line-item" key={item.id}>
          <div className="cb-summary-line-item__left">
            <div className="cb-summary-line-item__label">{item.label}</div>
            {item.detail && <div className="cb-summary-line-item__detail">{item.detail}</div>}
            {item.dateRange && <div className="cb-summary-line-item__date">{item.dateRange}</div>}
          </div>
          <div className="cb-summary-line-item__amount">{loading ? <span className="cb-checkout-skeleton" /> : item.amount}</div>
        </div>
      ))}
    </div>
  );
}
