import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './AccountActivation.css';

interface ActivationCodeProps {
  role: string;
  onActivationComplete: () => void;
  onBack: () => void;
}

export default function ActivationCode({ role, onActivationComplete, onBack }: ActivationCodeProps) {
  const [activationCode, setActivationCode] = useState('');
  const [businessCode, setBusinessCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const needsBusinessCode = role === 'business_employee' || role === 'firm_employee';
  const needsPayment = role === 'business_owner' || role === 'firm_owner';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (needsBusinessCode && !businessCode) {
        throw new Error('Business/Firm code is required');
      }

      await invoke('validate_activation_code', {
        activationCode,
        businessCode: needsBusinessCode ? businessCode : null,
        role,
      });

      onActivationComplete();
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    // TODO: Open Stripe checkout or payment page
    alert('Payment integration coming soon!');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content activation-modal">
        <div className="modal-header">
          <h2>Activate Your Account</h2>
          <p>Enter the activation code sent to your email</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Activation Code */}
            <div className="form-group">
              <label htmlFor="activationCode">
                Activation Code <span className="required">*</span>
              </label>
              <input
                id="activationCode"
                type="text"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                placeholder="XXXX-XXXX-XXXX"
                required
                disabled={isLoading}
                maxLength={14}
                className="code-input"
              />
              <span className="field-hint">
                Check your email for the activation code
              </span>
            </div>

            {/* Business/Firm Code (for employees) */}
            {needsBusinessCode && (
              <div className="form-group">
                <label htmlFor="businessCode">
                  {role === 'business_employee' ? 'Business Code' : 'Firm Code'} <span className="required">*</span>
                </label>
                <input
                  id="businessCode"
                  type="text"
                  value={businessCode}
                  onChange={(e) => setBusinessCode(e.target.value.toUpperCase())}
                  placeholder="ACME-XXXX"
                  required
                  disabled={isLoading}
                  className="code-input"
                />
                <span className="field-hint">
                  Ask your {role === 'business_employee' ? 'business owner' : 'firm owner'} for this code
                </span>
              </div>
            )}

            {/* Payment Notice (for owners) */}
            {needsPayment && (
              <div className="payment-notice">
                <div className="notice-icon">💳</div>
                <h3>Payment Required</h3>
                <p>As a {role === 'business_owner' ? 'business' : 'firm'} owner, you'll need to set up payment after activation.</p>
                <button
                  type="button"
                  className="payment-button"
                  onClick={handlePayment}
                  disabled={isLoading}
                >
                  Set Up Payment
                </button>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <div className="button-group">
              <button
                type="button"
                className="back-button"
                onClick={onBack}
                disabled={isLoading}
              >
                Back
              </button>
              <button
                type="submit"
                className="activate-button"
                disabled={isLoading}
              >
                {isLoading ? 'Activating...' : 'Activate Account'}
              </button>
            </div>
          </div>
        </form>

        <div className="help-section">
          <p className="help-text">
            Didn't receive an activation code? <a href="#resend">Resend email</a>
          </p>
        </div>
      </div>
    </div>
  );
}
