import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import RoleSelection from './RoleSelection';
import ActivationCode from './AccountActivation';
import { User, OrganizationType, MembershipRole } from './types';
import { Alert, useAlert } from './components/ui';

type AppState = 'login' | 'sign-up' | 'role-selection' | 'activation';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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
        // TODO: Navigate to dashboard
        //setAppState('dashboard');
      }, 1500);
    }
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
    alert('Account activated! Welcome to Balancd!');
    // TODO: Navigate to dashboard
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

  return (
    <>
      {appState === 'login' && (
        <Login 
          onSwitchToSignup={handleSwitchToSignup}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {appState === 'sign-up' && (
        <Signup onSwitchToLogin={handleSwitchToLogin} />
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
