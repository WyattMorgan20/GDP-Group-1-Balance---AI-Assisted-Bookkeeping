import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import RoleSelection from './RoleSelection';
import ActivationCode from './AccountActivation';

interface User {
  id: number;
  email: string;
  role: string | null;
  activated: boolean;
  first_login: boolean;
}

type AppState = 'login' | 'signup' | 'role-selection' | 'activation';

function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const handleLoginSuccess = (user: User) => {
    if (!currentUser) {
      setCurrentUser(user);
    }
    
    if (user.first_login) {
      // First login - show role selection
      setAppState('role-selection');
    } else {
      // Regular login - go to dashboard
      alert(`Welcome back! Going to dashboard...`);
      // TODO: Navigate to dashboard
    }
  };

  const handleRoleSelected = (role: string) => {
    setSelectedRole(role);
    setAppState('activation');
  };

  const handleActivationComplete = () => {
    alert('Account activated! Welcome to Balance!');
    // TODO: Navigate to dashboard
  };

  const handleBackToRoleSelection = () => {
    setAppState('role-selection');
  };

  const handleSwitchToSignup = () => {
    setAppState('signup');
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

      {appState === 'signup' && (
        <Signup onSwitchToLogin={handleSwitchToLogin} />
      )}

      {appState === 'role-selection' && (
        <RoleSelection onRoleSelected={handleRoleSelected} />
      )}

      {appState === 'activation' && selectedRole && (
        <ActivationCode
          role={selectedRole}
          onActivationComplete={handleActivationComplete}
          onBack={handleBackToRoleSelection}
        />
      )}
    </>
  );
}

export default App;
