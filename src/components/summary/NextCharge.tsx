import { SummaryRow } from './SummaryRow';

export interface NextChargeProps {
  label?: string;
  amount: string;
  date?: string;
}

export function NextCharge({ label = 'Next charge', amount, date }: NextChargeProps) {
  return (
    <div className="cb-next-charge">
      <SummaryRow label={label} value={amount} detail={date ? `On ${date}` : undefined} />
    </div>
  );
}
