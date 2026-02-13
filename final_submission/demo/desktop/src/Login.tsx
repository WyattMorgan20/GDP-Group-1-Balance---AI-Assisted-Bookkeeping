import { useState } from 'react';
import api from './services/api';
import { User, LoginRequest } from './types';
import { Button, Input, FormGroup, ErrorMessage, PageContainer } from './components/ui';
import './styles/variables.css';
import './Login.css';

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: (user: User) => void;
}

export default function Login({ onSwitchToSignup, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const request: LoginRequest = { email, password };
      const user = await api.auth.login(request);
      onLoginSuccess(user);
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer maxWidth="medium">
      <div className="login-header">
        <h1>Balancd</h1>
        <p>AI-Assisted Bookkeeping</p>
      </div>

      <form onSubmit={handleLogin} noValidate>
        <ErrorMessage message={error} onDismiss={() => setError('')} />

        <FormGroup label="Email Address" htmlFor="email" required>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
            disabled={isLoading}
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
          />
        </FormGroup>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading}>
          Login
        </Button>

        <div className="login-footer">
          <a href="#forgot">Forgot password?</a>
        </div>
      </form>

      <div className="signup-prompt">
        <p>Don't have an account?</p>
        <Button variant="link" onClick={onSwitchToSignup} disabled={isLoading}>
          Create Account
        </Button>
      </div>
    </PageContainer>
  );
}
