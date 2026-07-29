import { CheckoutInput } from '../fields/CheckoutInput';
import { CheckoutButton } from '../primitives/CheckoutButton';
import { CheckoutNotification } from '../feedback/CheckoutNotification';

export interface LoginPanelProps {
  mode?: 'password' | 'otp';
  state?: 'default' | 'error' | 'success' | 'loading';
}

export function LoginPanel({ mode = 'password', state = 'default' }: LoginPanelProps) {
  return (
    <div className="cb-login-panel">
      <div className="cb-login-panel__title">Returning customer</div>
      {state === 'success' && <CheckoutNotification tone="success">Verification successful.</CheckoutNotification>}
      {state === 'error' && <CheckoutNotification tone="error">The code entered is invalid.</CheckoutNotification>}
      {mode === 'password' ? (
        <CheckoutInput label="Password" type="password" value="password" readOnly invalid={state === 'error'} errorMessage={state === 'error' ? 'Incorrect password.' : undefined} />
      ) : (
        <CheckoutInput label="One-time password" value="123456" readOnly invalid={state === 'error'} errorMessage={state === 'error' ? 'Enter a valid code.' : undefined} />
      )}
      <CheckoutButton variant="primary" fluid loading={state === 'loading'}>
        Continue
      </CheckoutButton>
      <CheckoutButton variant="link" widthMax>
        Continue as guest
      </CheckoutButton>
    </div>
  );
}
