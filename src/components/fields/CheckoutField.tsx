import type { ReactNode } from 'react';
import type { CheckoutFieldType, CheckoutSelectOption } from '../../types/checkout';
import { CheckoutCheckbox } from './CheckoutCheckbox';
import { CheckoutInput } from './CheckoutInput';
import { CheckoutRadio } from './CheckoutRadio';
import { CheckoutSelect } from './CheckoutSelect';
import { CheckoutTextarea } from './CheckoutTextarea';
import { CheckoutVatField } from './CheckoutVatField';

export interface CheckoutFieldProps {
  type: CheckoutFieldType;
  label?: ReactNode;
  name?: string;
  value?: string;
  checked?: boolean;
  options?: CheckoutSelectOption[];
  placeholder?: string;
  description?: ReactNode;
  errorMessage?: string;
  helpText?: ReactNode;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
}

export function CheckoutField({ type, options = [], ...props }: CheckoutFieldProps) {
  if (type === 'select') {
    return <CheckoutSelect {...props} options={options} defaultValue={props.value} />;
  }
  if (type === 'checkbox') {
    return <CheckoutCheckbox {...props} defaultChecked={props.checked} />;
  }
  if (type === 'radio') {
    return <CheckoutRadio {...props} defaultChecked={props.checked} />;
  }
  if (type === 'textarea') {
    return <CheckoutTextarea {...props} defaultValue={props.value} />;
  }
  if (type === 'vat') {
    return <CheckoutVatField {...props} defaultValue={props.value} />;
  }
  return <CheckoutInput {...props} type={type} defaultValue={props.value} />;
}
