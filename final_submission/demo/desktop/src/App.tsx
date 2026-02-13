import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import RoleSelection from './RoleSelection';
import ActivationCode from './AccountActivation';
import { User, OrganizationType, MembershipRole } from './types';

type AppState = 'login' | 'sign-up' | 'role-selection' | 'activation';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

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
      alert('Welcome back! Going to dashboard...');
      // TODO: Navigate to dashboard
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
    </>
  );
}

export default App;
