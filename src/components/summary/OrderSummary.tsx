import type { ReactNode } from 'react';
import type { OrderSummaryData } from '../../types/checkout';
import { cx } from '../../utils/cx';
import { SummaryLineItems } from './SummaryLineItems';
import { SummaryRow } from './SummaryRow';
import { SubmitSection } from './SubmitSection';

export interface OrderSummaryProps {
  summary: OrderSummaryData;
  submit?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function OrderSummary({ summary, submit, footer, className }: OrderSummaryProps) {
  const couponAfterRowId = summary.couponAfterRowId ?? summary.rows[0]?.id;
  const rowsBeforeCoupon = summary.coupon ? summary.rows.filter((row) => row.id === couponAfterRowId) : summary.rows;
  const rowsAfterCoupon = summary.coupon ? summary.rows.filter((row) => row.id !== couponAfterRowId) : [];

  return (
    <section className={cx('cb-order-summary', className)}>
      <div className="cb-order-summary__content">
        <h2 className="cb-order-summary__heading">{summary.title}</h2>
        <SummaryLineItems items={summary.items} loading={summary.loading} />
        <div className="cb-order-summary__rows cb-order-summary__rows--primary">
          {rowsBeforeCoupon.map((row) => (
            <SummaryRow key={row.id} {...row} />
          ))}
        </div>
        <hr className="cb-order-summary__rule" />
        {summary.coupon && (
          <>
            <div className="cb-order-summary__coupon">{summary.coupon}</div>
            <hr className="cb-order-summary__rule" />
            {rowsAfterCoupon.length > 0 && (
              <div className="cb-order-summary__rows">
                {rowsAfterCoupon.map((row) => (
                  <SummaryRow key={row.id} {...row} />
                ))}
              </div>
            )}
          </>
        )}
        {summary.amountDue && (
          <>
            <hr className="cb-order-summary__rule" />
            <SummaryRow {...summary.amountDue} />
          </>
        )}
        {summary.futureCharges && (
          <>
            <hr className="cb-order-summary__rule" />
            <div className="cb-order-summary__future-charges">{summary.futureCharges}</div>
          </>
        )}
        <div className="cb-order-summary__submit">
          {submit ?? <SubmitSection label={summary.submitLabel ?? 'Subscribe'} secureNote={summary.secureNote} loading={summary.loading} />}
        </div>
        {footer && <div className="cb-order-summary__footer">{footer}</div>}
      </div>
    </section>
  );
}
