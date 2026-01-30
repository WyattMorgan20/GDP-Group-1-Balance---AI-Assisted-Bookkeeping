import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './Signup.css';

interface SignupProps {
  onSwitchToLogin: () => void;
}

export default function Signup({ onSwitchToLogin }: SignupProps) {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');

    // Frontend validation
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
      // Call Rust backend to create account
      await invoke('create_account', {
        email,
        password,
      });

      alert('Account created successfully! Please check your email for verification.');
      // TODO: Navigate to email verification or login page
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  };

  const emailsMatch = email === confirmEmail && email !== '';
  const passwordsMatch = password === confirmPassword && password !== '';

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="signup-header">
          <h1>Create Account</h1>
          <p>Join Balancd - AI-Assisted Bookkeeping</p>
        </div>

        <form onSubmit={handleSignup} noValidate>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email Address <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="workemail@example.com"
              required
              disabled={isLoading}
              className={email && !isValidEmail(email) ? 'invalid' : ''}
            />
            {email && !isValidEmail(email) && (
              <span className="field-error">Invalid email format</span>
            )}
          </div>

          {/* Confirm Email */}
          <div className="form-group">
            <label htmlFor="confirmEmail">
              Confirm Email Address <span className="required">*</span>
            </label>
            <input
              id="confirmEmail"
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder="Confirm email"
              required
              disabled={isLoading}
              className={confirmEmail && !emailsMatch ? 'invalid' : emailsMatch ? 'valid' : ''}
            />
            {confirmEmail && !emailsMatch && (
              <span className="field-error">Emails do not match</span>
            )}
            {emailsMatch && (
              <span className="field-success">Emails match</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password <span className="required">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={isLoading}
              className={password && password.length < 8 ? 'invalid' : ''}
            />
            {password && password.length < 8 && (
              <span className="field-error">Password must be at least 8 characters</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password <span className="required">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              disabled={isLoading}
              className={confirmPassword && !passwordsMatch ? 'invalid' : passwordsMatch ? 'valid' : ''}
            />
            {confirmPassword && !passwordsMatch && (
              <span className="field-error">Passwords do not match</span>
            )}
            {passwordsMatch && (
              <span className="field-success">Passwords match</span>
            )}
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="signup-footer">
            <p>Already have an account? <a href="#" onClick={(e) => {
                e.preventDefault();
                onSwitchToLogin();
              }}>Log in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
