import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { ActivationRequest, MembershipRole, OrganizationType } from './types';
import './AccountActivation.css';

interface ActivationCodeProps {
  organizationType: OrganizationType;
  membershipRole: MembershipRole;
  onActivationComplete: () => void;
  onBack: () => void;
}

export default function ActivationCode({ 
  organizationType, 
  membershipRole, 
  onActivationComplete, 
  onBack 
}: ActivationCodeProps) {
  const [activationCode, setActivationCode] = useState('');
  const [organizationCode, setOrganizationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const needsOrganizationCode = membershipRole === 'Employee';
  const needsPayment = membershipRole === 'Owner';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (needsOrganizationCode && !organizationCode) {
        throw new Error('Organization code is required');
      }

      const request: ActivationRequest = {
        activation_code: activationCode,
        organization_code: needsOrganizationCode ? organizationCode : null,
      };

      await invoke<string>('activate_account', { req: request });
      onActivationComplete();
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    // TODO: Open Stripe checkout or payment page
    alert('Payment integration coming soon!');
  };

  const orgTypeLabel = organizationType === 'Business' ? 'Business' : 'Firm';

  return (
    <div className="activation-container">
      <div className="activation-box">
        <div className="activation-header">
          <h1>Activate Your Account</h1>
          <p>Enter the activation code sent to your email</p>
        </div>

        <form onSubmit={handleSubmit}>
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
              placeholder="ACT-XXXX-XXXX-XXXX"
              required
              disabled={isLoading}
              maxLength={19}
              className="code-input"
            />
            <span className="field-hint">
              Check your email for the activation code
            </span>
          </div>

          {/* Organization Code (for employees) */}
          {needsOrganizationCode && (
            <div className="form-group">
              <label htmlFor="organizationCode">
                {orgTypeLabel} Code <span className="required">*</span>
              </label>
              <input
                id="organizationCode"
                type="text"
                value={organizationCode}
                onChange={(e) => setOrganizationCode(e.target.value.toUpperCase())}
                placeholder="ORG-XXXX"
                required
                disabled={isLoading}
                className="code-input"
              />
              <span className="field-hint">
                Ask your {orgTypeLabel.toLowerCase()} owner for this code
              </span>
            </div>
          )}

          {/* Payment Notice (for owners) */}
          {needsPayment && (
            <div className="payment-notice">
              <div className="notice-icon">💳</div>
              <h3>Payment Required</h3>
              <p>As a {orgTypeLabel.toLowerCase()} owner, you'll need to set up payment after activation.</p>
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

          <div className="help-section">
            <p className="help-text">
              Didn't receive an activation code? <a href="#resend">Resend email</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
