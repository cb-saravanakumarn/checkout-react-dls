import type { ReactNode } from 'react';

export type CheckoutStatus = 'default' | 'loading' | 'disabled' | 'invalid';
export type CheckoutTone = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'muted';
export type MoneyText = string;

export type CheckoutButtonVariant = 'primary' | 'outlined' | 'link' | 'error';
export type CheckoutFieldType = 'text' | 'email' | 'tel' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'vat';

export interface CheckoutSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export type ProductKind = 'plan' | 'addon' | 'charge';

export interface CheckoutProduct {
  id: string;
  kind: ProductKind;
  name: string;
  description?: ReactNode;
  tag?: string;
  trialTag?: string;
  imageUrl?: string;
  quantity?: string;
  unit?: string;
  price: MoneyText;
  billingFrequency?: string;
  metered?: boolean;
  errorMessage?: string;
}

export interface SummaryLineItem {
  id: string;
  label: ReactNode;
  detail?: ReactNode;
  dateRange?: string;
  amount: MoneyText;
}

export interface SummaryRowData {
  id: string;
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  tone?: CheckoutTone;
  emphasis?: 'regular' | 'semibold' | 'total';
}

export interface OrderSummaryData {
  title: string;
  items: SummaryLineItem[];
  rows: SummaryRowData[];
  amountDue?: SummaryRowData;
  submitLabel?: string;
  secureNote?: ReactNode;
  loading?: boolean;
  coupon?: ReactNode;
  futureCharges?: ReactNode;
  couponAfterRowId?: string;
}

export type PaymentMethodKind = 'card' | 'paypal' | 'google_pay' | 'direct_debit' | 'offline';

export interface PaymentMethodOption {
  id: string;
  kind: PaymentMethodKind;
  label: string;
  description?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  body?: ReactNode;
}
