import { CheckoutCheckbox } from '../fields/CheckoutCheckbox';

export interface ConsentField {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  checked?: boolean;
}

export interface ConsentFieldsProps {
  fields: ConsentField[];
}

export function ConsentFields({ fields }: ConsentFieldsProps) {
  return (
    <div className="cb-consent-fields">
      {fields.map((field) => (
        <CheckoutCheckbox
          key={field.id}
          defaultChecked={field.checked}
          label={
            <>
              {field.label}
              {field.required && <span className="cb-consent-fields__required"> *</span>}
            </>
          }
        />
      ))}
    </div>
  );
}
