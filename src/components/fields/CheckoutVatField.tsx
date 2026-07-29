import type { InputHTMLAttributes, ReactNode } from 'react';
import { CheckoutInput } from './CheckoutInput';

export interface CheckoutVatFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: ReactNode;
  countryPrefix?: string;
  errorMessage?: string;
  helpText?: ReactNode;
  invalid?: boolean;
}

export function CheckoutVatField({ countryPrefix = 'US', label = 'Tax ID', ...props }: CheckoutVatFieldProps) {
  return <CheckoutInput {...props} label={label} prefix={countryPrefix} />;
}
