import { useState } from 'react';
import api from '../services/api';
import { SignUpRequest } from '../logic/types';
import { Button, Input, FormGroup, ErrorMessage, PageContainer, Alert, useAlert } from '../components/ui';
import '../styles/variables.css';
import '../styles/Signup.css';

interface SignupProps {
  onSwitchToLogin: () => void;
  on2FASetup: (email: string) => void;
}

export default function Signup({ onSwitchToLogin, on2FASetup }: SignupProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { alertState, hideAlert, success } = useAlert();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    // Frontend validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !confirmEmail.trim() ||
        !password.trim() || !confirmPassword.trim()) {
      setError('Some fields are empty');
      return;
    }

    if (firstName.length < 2) {
      setError('First name must be at least 2 characters');
      return;
    }

    if (lastName.length < 2) {
      setError('Last name must be at least 2 characters');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (email !== confirmEmail) {
      setError('Email addresses do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const request: SignUpRequest = {
        email,
        password,
        first_name: firstName,
        last_name: lastName
      };
      const message = await api.auth.signUp(request);
      
      success(message, 'Account Created');
      setTimeout(() => {
        on2FASetup(email);
      }, 1500);
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const emailsMatch = email === confirmEmail && email !== '';
  const passwordsMatch = password === confirmPassword && password !== '';

  return (
    <PageContainer maxWidth="medium">
      <div className="signup-header">
        <h1>Create Account</h1>
        <p>Join Balancd - AI-Assisted Bookkeeping</p>
      </div>

      <form onSubmit={handleSignup} noValidate>
        <ErrorMessage message={error} onDismiss={() => setError('')} />

        <FormGroup label="First Name" htmlFor="firstName" required>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            disabled={isLoading}
          />
        </FormGroup>

        <FormGroup label="Last Name" htmlFor="lastName" required>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            placeholder="Enter last name"
            disabled={isLoading}
          />
        </FormGroup>
        
        <FormGroup label="Email Address" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="workemail@example.com"
            required
            disabled={isLoading}
            className={email && !isValidEmail(email) ? 'invalid' : ''}
          />
        </FormGroup>

        <FormGroup label="Confirm Email Address" htmlFor="confitmEmail" required>
          <Input
            id="confirmEmail"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="Confirm email"
            required
            disabled={isLoading}
            className={confirmEmail && !emailsMatch ? 'invalid' : emailsMatch ? 'valid' : ''}
          />
        </FormGroup>

        <FormGroup label="Password" htmlFor="password" required>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            disabled={isLoading}
            className={password && password.length < 8 ? 'invalid' : ''}
          />
        </FormGroup>

        <FormGroup label="Confirm Password" htmlFor="confirmPassword" required>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            required
            disabled={isLoading}
            className={confirmPassword && !passwordsMatch ? 'invalid' : passwordsMatch ? 'valid' : ''}
          />
        </FormGroup>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Create Account
        </Button>

        <div className="signup-footer">
          <p>Already have an account? <a href="#" onClick={(e) => {
              e.preventDefault();
              onSwitchToLogin();
            }}>Log in</a>
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
