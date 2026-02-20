import { useState, useRef, useEffect } from 'react';
import { toDataURL } from 'qrcode';
import api from './services/api';
import { TwoFactorSetupRequest, TwoFactorVerifyRequest } from './types';
import { Button, Input, FormGroup, ErrorMessage, PageContainer } from './components/ui';
import { Alert, useAlert } from './components/ui';
import './styles/variables.css';
import './TwoFactorSetup.css';

interface TwoFactorSetupProps {
  email: string;
  onSetupComplete: () => void;
  onSkip: () => void;
}

type SetupStep = 'generate' | 'verify' | 'backup';

export default function TwoFactorSetup({ email, onSetupComplete, onSkip }: TwoFactorSetupProps) {
  const [step, setStep] = useState<SetupStep>('generate');
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { alertState, hideAlert, success, info } = useAlert();
  const qrCodeRef = useRef<HTMLDivElement>(null);

  // Render QR code when step changes to verify and qrCodeUrl is set
  useEffect(() => {
    if (step === 'verify' && qrCodeUrl && qrCodeRef.current) {
      toDataURL(qrCodeUrl, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 256,
        margin: 1,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }).then((url: string) => {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'QR Code for 2FA setup';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
        
        qrCodeRef.current!.innerHTML = '';
        qrCodeRef.current!.appendChild(img);
      }).catch((err: any) => {
        console.error('Error generating QR code:', err);
      });
    }
  }, [step, qrCodeUrl]);

  const handleGenerateSecret = async () => {
    setError('');
    setIsLoading(true);

    try {
      const request: TwoFactorSetupRequest = { email };
      const response = await api.auth.setup2FA(request);
      
      setSecret(response.secret);
      setQrCodeUrl(response.qr_code_url);
      setStep('verify');
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    setError('');
    
    if (!verificationCode.trim()) {
      setError('Please enter the verification code');
      return;
    }

    if (verificationCode.length !== 6 || isNaN(Number(verificationCode))) {
      setError('Verification code must be 6 digits');
      return;
    }

    setIsLoading(true);

    try {
      const request: TwoFactorVerifyRequest = {
        email,
        totp_code: verificationCode,
      };
      
      await api.auth.verify2FA(request);
      
      // Generate backup codes (mock - in production these would come from backend)
      const codes = generateBackupCodes();
      setBackupCodes(codes);
      setStep('backup');
      success('Two-Factor Authentication enabled!', 'Success');
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const generateBackupCodes = (): string[] => {
    return Array.from({ length: 10 }, () => 
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
  };

  const handleCopySecretKey = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    info('Secret key copied to clipboard', 'Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    navigator.clipboard.writeText(codesText);
    info('Backup codes copied to clipboard', 'Copied!');
  };

  const handleDownloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(codesText));
    element.setAttribute('download', 'balancd-backup-codes.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    info('Backup codes downloaded', 'Downloaded!');
  };

  return (
    <PageContainer maxWidth='medium'>
      <div className="two-factor-setup-header">
        <h1>Set Up Two-Factor Authentication</h1>
        <p>Secure your account with an authenticator app</p>
      </div>

      <Alert
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        message={alertState.message}
        title={alertState.title}
        type={alertState.type}
      />

      {step === 'generate' && (
        <form onSubmit={(e) => { e.preventDefault(); handleGenerateSecret(); }} noValidate>
          <div className="two-factor-content">
            <div className="setup-step-number">Step 1 of 3</div>
            
            <div className="setup-explanation">
              <h3>What is Two-Factor Authentication?</h3>
              <p>Two-factor authentication adds an extra layer of security to your account by requiring both your password and a code from an authenticator app to log in.</p>
              
              <h4>What you'll need:</h4>
              <ul>
                <li><strong>An authenticator app</strong> like Google Authenticator, Microsoft Authenticator, or Authy</li>
                <li><strong>Your smartphone</strong> to scan the QR code</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="setup-button"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Get Started'}
            </Button>

            <div className="skip-link">
              <button 
                type="button"
                onClick={onSkip}
                className="skip-button"
              >
                Skip for now
              </button>
            </div>
          </div>
        </form>
      )}

      {step === 'verify' && (
        <form onSubmit={(e) => { e.preventDefault(); handleVerifyCode(); }} noValidate>
          <div className="two-factor-content">
            <div className="setup-step-number">Step 2 of 3</div>

            <ErrorMessage message={error} onDismiss={() => setError('')} />

            <div className="qr-code-section">
              <h3>Scan this QR code</h3>
              <p>Use your authenticator app to scan this code:</p>
              
              {qrCodeUrl && (
                <div className="qr-code-container">
                  <div ref={qrCodeRef} className="qr-code-display"></div>
                </div>
              )}

              <details className="manual-entry">
                <summary>Can't scan? Enter this key manually</summary>
                <div className="manual-key-section">
                  <p className="manual-key-label">Secret Key:</p>
                  <div className="manual-key-display">
                    <code>{secret}</code>
                    <button
                      type="button"
                      onClick={handleCopySecretKey}
                      className="copy-button"
                      title="Copy to clipboard"
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>
              </details>
            </div>

            <FormGroup label="Verification Code" htmlFor="verificationCode" required>
              <Input
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                required
                disabled={isLoading}
                maxLength={6}
                className="code-input"
                inputMode="numeric"
              />
              <span className="field-hint">
                Enter the 6-digit code from your authenticator app
              </span>
            </FormGroup>

            <Button 
              type="submit"
              className="verify-button"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>
          </div>
        </form>
      )}

      {step === 'backup' && (
        <div className="two-factor-content">
          <div className="setup-step-number">Step 3 of 3</div>

          <div className="backup-codes-section">
            <h3>Save Your Backup Codes</h3>
            <p className="warning-text">
              ⚠️ Save these backup codes in a safe place. You can use them to access your account if you lose access to your authenticator app.
            </p>

            <div className="backup-codes-list">
              {backupCodes.map((code, index) => (
                <div key={index} className="backup-code">
                  <span className="code-number">{String(index + 1).padStart(2, '0')}</span>
                  <code>{code}</code>
                </div>
              ))}
            </div>

            <div className="backup-actions">
              <Button
                type="button"
                onClick={handleCopyBackupCodes}
                className="secondary-button"
              >
                Copy Codes
              </Button>
              <Button
                type="button"
                onClick={handleDownloadBackupCodes}
                className="secondary-button"
              >
                Download
              </Button>
            </div>

            <div className="confirmation-section">
              <label className="checkbox-label">
                <input 
                  type="checkbox"
                  required
                  className="confirmation-checkbox"
                />
                <span>I have saved my backup codes in a safe place</span>
              </label>
            </div>

            <Button
              type="button"
              onClick={onSetupComplete}
              className="complete-button"
            >
              Continue to Account Activation
            </Button>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
