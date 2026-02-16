//import React from 'react';
import { User } from './types';
import './Dashboard.css';
import './styles/variables.css';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const getRoleName = () => {
    if (!user.organization_type || !user.membership_role) return 'User';
    
    const orgType = user.organization_type === 'Business' ? 'Business' : 'Firm';
    const role = user.membership_role === 'Owner' ? 'Owner' : 'Employee';
    
    return `${orgType} ${role}`;
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="app-title">Balancd</h1>
            <span className="app-tagline">AI-Assisted Bookkeeping</span>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">
                {user.email.charAt(0).toUpperCase()}
              </div>
              <div className="user-details">
                <span className="user-email">{user.email}</span>
                <span className="user-role">{getRoleName()}</span>
              </div>
            </div>
            <button className='logout-button' onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          {/* Welcome Section */}
          <section className="welcome-section">
            <h2>{getGreeting()}!</h2>
            <p>Welcome to your Balancd dashboard. Let's get started with your bookkeeping.</p>
          </section>

          {/* Quick Actions Grid */}
          <section className="quick-actions">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-card">
                <h4>New Entry</h4>
                <p>Record a transaction</p>
              </button>

              <button className="action-card">
                <h4>Reports</h4>
                <p>View financial reports</p>
              </button>

              <button className="action-card">
                <h4>Reconcile</h4>
                <p>Match transactions</p>
              </button>

              <button className="action-card">
                <h4>Month-End Close</h4>
                <p>Close the books</p>
              </button>
            </div>
          </section>

          {/* Stats Cards */}
          <section className="stats-section">
            <h3>Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-label">Pending Entries</div>
                <div className="stat-value">0</div>
                <div className="stat-change">No pending items</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">This Month</div>
                <div className="stat-value">$0.00</div>
                <div className="stat-change">Transactions processed</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">Unreconciled</div>
                <div className="stat-value">0</div>
                <div className="stat-change">Items to review</div>
              </div>

              <div className="stat-card">
                <div className="stat-label">Last Close</div>
                <div className="stat-value">-</div>
                <div className="stat-change">Not yet closed</div>
              </div>
            </div>
          </section>

          {/* Recent Activity */}
          <section className="activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-empty">
                <p>No recent activity</p>
                <span>Your transactions will appear here</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
