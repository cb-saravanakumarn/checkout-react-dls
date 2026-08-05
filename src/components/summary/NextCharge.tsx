import { useState } from 'react';
import { CheckoutModal } from '../feedback/CheckoutModal';
import { SummaryRow } from './SummaryRow';
import { SummaryLineItems } from './SummaryLineItems';
import type { SummaryLineItem } from '../../types/checkout';

export interface NextChargeProps {
  label?: string;
  amount: string;
  date?: string;
}

export interface FutureChargesProps {
  nextChargeLabel?: string;
  nextChargeAmount: string;
  triggerLabel?: string;
  modalTitle?: string;
  items: SummaryLineItem[];
  subtotal: string;
  tax?: string;
  total: string;
  totalLabel?: string;
  totalDate?: string;
}

export function NextCharge({ label = 'Next charge', amount, date }: NextChargeProps) {
  return (
    <div className="cb-next-charge">
      <SummaryRow label={label} value={amount} detail={date ? `On ${date}` : undefined} />
    </div>
  );
}

export function FutureCharges({
  nextChargeLabel = 'Next charge',
  nextChargeAmount,
  triggerLabel = 'Future charges',
  modalTitle = 'Future charges',
  items,
  subtotal,
  tax,
  total,
  totalLabel = 'Total',
  totalDate,
}: FutureChargesProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="cb-future-charges">
        <div className="cb-future-charges__copy">
          <span>{nextChargeLabel}</span>
          <button type="button" onClick={() => setOpen(true)}>
            {triggerLabel}
          </button>
        </div>
        <strong>{nextChargeAmount}</strong>
      </div>
      <CheckoutModal open={open} title={modalTitle} onClose={() => setOpen(false)} className="cb-future-charges-modal">
        <div className="cb-future-charges-modal__section">
          <SummaryLineItems items={items} />
        </div>
        <hr className="cb-order-summary__rule" />
        <div className="cb-future-charges-modal__section">
          <SummaryRow label={`Subtotal (${items.length} items)`} value={subtotal} emphasis="semibold" />
          {tax && <SummaryRow label="Tax" value={tax} />}
        </div>
        <hr className="cb-order-summary__rule" />
        <SummaryRow label={totalLabel} detail={totalDate} value={total} emphasis="total" />
      </CheckoutModal>
    </>
  );
}
