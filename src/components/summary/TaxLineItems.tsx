import { SummaryRow } from './SummaryRow';

export interface TaxLineItem {
  id: string;
  label: string;
  amount: string;
  detail?: string;
}

export interface TaxLineItemsProps {
  items: TaxLineItem[];
}

export function TaxLineItems({ items }: TaxLineItemsProps) {
  return (
    <div className="cb-tax-line-items">
      {items.map((item) => (
        <SummaryRow key={item.id} label={item.label} value={item.amount} detail={item.detail} />
      ))}
    </div>
  );
}
