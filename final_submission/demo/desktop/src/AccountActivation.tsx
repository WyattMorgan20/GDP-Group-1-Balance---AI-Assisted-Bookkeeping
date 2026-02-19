import { useState } from 'react';
import api from './services/api';
import { ActivationRequest, MembershipRole, OrganizationType } from './types';
import { Button, Input, FormGroup, ErrorMessage, PageContainer } from './components/ui';
import './styles/variables.css';
import './AccountActivation.css';
import { Alert, useAlert } from './components/ui';
import { config } from './config';

interface AccountActivationProps {
  organizationType: OrganizationType;
  membershipRole: MembershipRole;
  onActivationComplete: () => void;
  onBack: () => void;
}

export default function AccountActivation({ 
  organizationType, 
  membershipRole, 
  onActivationComplete, 
  onBack 
}: AccountActivationProps) {
  const [activationCode, setActivationCode] = useState('');
  const [organizationCode, setOrganizationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { alertState, hideAlert, info, success } = useAlert();

  const needsOrganizationCode = membershipRole === 'Employee';
  const needsPayment = membershipRole === 'Owner';

  const handleDevBypass = () => {
    if (config.isDevelopment) {
      onActivationComplete();
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
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

      await api.auth.activateAccount(request);
      success('Account activated! Welcome to Balancd!', 'Welcome!');
      setTimeout(() => {
        onActivationComplete();
      }, 1500);
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    // TODO: Open Stripe checkout or payment page
    info('Payment integration coming soon!');
  };

  const orgTypeLabel = organizationType === 'Business' ? 'Business' : 'Firm';

  return (
    <PageContainer maxWidth='medium'>
      <div className="activation-header">
        <h1>Activate Your Account</h1>
        <p>Enter the activation code sent to your email</p>
      </div>

      {/* DEV BYPASS BANNER */}
      {config.isDevelopment && (
        <div className="dev-bypass-banner">
          <span className="dev-badge">DEV MODE</span>
          <p>Skip activation for testing</p>
          <Button type="button" className="dev-bypass-button" onClick={handleDevBypass}>
            Skip to Dashboard
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <ErrorMessage message={error} onDismiss={() => setError('')} />

        {/* Activation Code */}
        <FormGroup label='Activation Code' htmlFor='activationCode' required>
          <Input
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
        </FormGroup>

        {/* Organization Code (for employees) */}
        {needsOrganizationCode && (
          <FormGroup label='Organization Code' htmlFor='organizationCode' required>
            <Input
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
          </FormGroup>
        )}

        {/* Payment Notice (for owners) */}
        {needsPayment && (
          <div className="payment-notice">
            <h3>Payment Required</h3>
            <p>As a {orgTypeLabel.toLowerCase()} owner, you'll need to set up payment after activation.</p>
            <Button type="button" className="payment-button" onClick={handlePayment} disabled={isLoading}>
              Set Up Payment
            </Button>
          </div>
        )}

        <div className="button-group">
          <Button type="button" className="back-button" onClick={onBack} disabled={isLoading}>
            Back
          </Button>
          <Button type="submit" className="activate-button" disabled={isLoading}>
            Activate Account
          </Button>
        </div>

        <div className="help-section">
          <p className="help-text">
            Didn't receive an activation code? <a href="#resend">Resend email</a>
          </p>
        </div>
      </form>

      <Alert
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        message={alertState.message}
        title={alertState.title}
        type={alertState.type}
      />
    </PageContainer>
  );
}
