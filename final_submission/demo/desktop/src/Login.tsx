import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import './Login.css';

interface User {
  id: number;
  email: string;
  role: string | null;
  activated: boolean;
  first_login: boolean;
}

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function Login({ onSwitchToSignup, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await invoke<User>('authenticate_user', {
        email,
        password,
      });

      onLoginSuccess(user);
    } catch {
      setError('Incorrect email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <h1>Balancd</h1>
          <p>AI-Assisted Bookkeeping</p>
        </div>

        <form onSubmit={handleLogin} noValidate>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="login-footer">
            <a href="#forgot">Forgot password?</a>
          </div>
        </form>

        <div className="signup-prompt">
          <p>Don't have an account?</p>
          <button 
            className="signup-link-button" 
            onClick={onSwitchToSignup}
            disabled={isLoading}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
