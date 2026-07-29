import { SummaryRow } from './SummaryRow';

export interface DiscountRow {
  id: string;
  label: string;
  amount: string;
  detail?: string;
}

export interface DiscountRowsProps {
  discounts: DiscountRow[];
}

export function DiscountRows({ discounts }: DiscountRowsProps) {
  return (
    <div className="cb-discount-rows">
      {discounts.map((discount) => (
        <SummaryRow key={discount.id} label={discount.label} value={discount.amount} detail={discount.detail} tone="success" />
      ))}
    </div>
  );
}
