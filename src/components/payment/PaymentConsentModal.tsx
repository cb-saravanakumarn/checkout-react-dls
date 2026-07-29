import { CheckoutModal } from '../feedback/CheckoutModal';

export interface PaymentConsentModalProps {
  open?: boolean;
}

export function PaymentConsentModal({ open = true }: PaymentConsentModalProps) {
  return (
    <CheckoutModal
      open={open}
      title="Payment authorization"
      description="Review and authorize future subscription charges."
    >
      <p className="cb-payment-consent__text">
        By continuing, you authorize recurring charges according to the subscription terms shown in this checkout.
      </p>
    </CheckoutModal>
  );
}
