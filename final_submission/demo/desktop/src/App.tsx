import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import TwoFactorSetup from './TwoFactorSetup';
import RoleSelection from './RoleSelection';
import ActivationCode from './AccountActivation';
import Dashboard from './Dashboard';
import { User, OrganizationType, MembershipRole } from './types';
import { Alert, useAlert } from './components/ui';

type AppState = 'login' | 'sign-up' | 'two-factor-setup' | 'role-selection' | 'activation' | 'dashboard';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [signupEmail, setSignupEmail] = useState<string>('');
  const { alertState, hideAlert, success } = useAlert();

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    
    if (user.first_login && !user.role_selected) {
      // First login - show role selection
      setAppState('role-selection');
    } else if (user.role_selected && !user.account_activated) {
      // Role selected but not activated
      setAppState('activation');
    } else {
      // Fully onboarded - go to dashboard
      success('Welcome back! Going to dashboard...');
      setTimeout(() => {
        setAppState('dashboard');
      }, 1500);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAppState('login');
  };

  const handleRoleSelected = (organizationType: OrganizationType, membershipRole: MembershipRole) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        organization_type: organizationType,
        membership_role: membershipRole,
        role_selected: true,
      });
    }
    setAppState('activation');
  };

  const handleActivationComplete = () => {
    setAppState('dashboard');
  };

  const handleBackToRoleSelection = () => {
    setAppState('role-selection');
  };

  const handleSwitchToSignup = () => {
    setAppState('sign-up');
  };

  const handleSwitchToLogin = () => {
    setAppState('login');
  };

  const handle2FASetup = (email: string) => {
    setSignupEmail(email);
    setAppState('two-factor-setup');
  };

  const handle2FASetupComplete = () => {
    setAppState('login');
    success('Two-factor authentication enabled! You can now log in.');
  };

  const handle2FASkip = () => {
    setAppState('login');
    success('Two-factor authentication skipped. You can set it up later in your account settings.');
  };

  return (
    <>
      {appState === 'login' && (
        <Login 
          onSwitchToSignup={handleSwitchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {appState === 'sign-up' && (
        <Signup onSwitchToLogin={handleSwitchToLogin} on2FASetup={handle2FASetup} />
      )}

      {appState === 'two-factor-setup' && (
        <TwoFactorSetup 
          email={signupEmail}
          onSetupComplete={handle2FASetupComplete}
          onSkip={handle2FASkip}
        />
      )}

      {appState === 'role-selection' && (
        <RoleSelection onRoleSelected={handleRoleSelected} />
      )}

      {appState === 'activation' && currentUser && (
        <ActivationCode
          organizationType={currentUser.organization_type || 'Business'}
          membershipRole={currentUser.membership_role || 'Owner'}
          onActivationComplete={handleActivationComplete}
          onBack={handleBackToRoleSelection}
        />
      )}

      {appState === 'dashboard' && currentUser && (
        <Dashboard
          user={currentUser}
          onLogout={handleLogout}
        />
      )}

      <Alert
        isOpen={alertState.isOpen}
        onClose={hideAlert}
        message={alertState.message}
        title={alertState.title}
        type={alertState.type}
        confirmText={alertState.confirmText}
      />
    </>
  );
}

export default App;
