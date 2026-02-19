import { Button } from './ui';
import './Navbar.css';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
  userEmail: string;
  userRole: string;
}

export default function Navbar({ 
  activeTab, 
  onTabChange, 
  onLogout, 
  userEmail, 
  userRole 
}: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'books', label: 'Books' },
    { id: 'records', label: 'Records' },
    { id: 'reconciliation', label: 'Reconciliation' },
    { id: 'reports', label: 'Reports' },
    { id: 'alerts', label: 'Alerts' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left - Branding */}
        <div className="navbar-brand">
          <h1 className="brand-title">Balancd</h1>
          <span className="brand-tagline">AI-Assisted Bookkeeping</span>
        </div>

        {/* Center - Navigation */}
        <div className="navbar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right - User Menu */}
        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-email">{userEmail}</span>
              <span className="user-role">{userRole}</span>
            </div>
          </div>
          <Button 
            variant="secondary" 
            size="small"
            onClick={onLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
