import { PaymentIcon } from './PaymentIcons';

export interface OfflinePaymentProps {
  title?: string;
  description?: string;
  reference?: string;
}

export function OfflinePayment({ title = 'Bank transfer', description = 'Use the details below to complete payment.', reference = 'INV-1008' }: OfflinePaymentProps) {
  return (
    <div className="cb-offline-payment">
      <PaymentIcon name="bank" />
      <div>
        <div className="cb-offline-payment__title">{title}</div>
        <div className="cb-offline-payment__description">{description}</div>
        <div className="cb-offline-payment__reference">Reference: {reference}</div>
      </div>
    </div>
  );
}
