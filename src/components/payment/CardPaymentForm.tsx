import { CheckoutFormGrid } from '../layout/CheckoutFormGrid';
import { CheckoutInput } from '../fields/CheckoutInput';

export interface CardPaymentFormProps {
  name?: string;
  number?: string;
  expiry?: string;
  cvv?: string;
}

export function CardPaymentForm({
  name = 'Alex Morgan',
  number = '4242 4242 4242 4242',
  expiry = '12 / 28',
  cvv = '123',
}: CardPaymentFormProps) {
  return (
    <CheckoutFormGrid columns={2}>
      <CheckoutInput label="Card number" value={number} readOnly />
      <CheckoutInput label="Name on card" value={name} readOnly />
      <CheckoutInput label="Expiry" value={expiry} readOnly />
      <CheckoutInput label="CVV" value={cvv} readOnly />
    </CheckoutFormGrid>
  );
}
