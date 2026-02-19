import { useState } from 'react';
import { User } from './types';
import { Button } from './components/ui';
import Navbar from './components/Navbar';
import './Dashboard.css';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export default function Dashboard({ user, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('home');

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

  const isOwner = user.membership_role === 'Owner';

  return (
    <div className="dashboard">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        userEmail={user.email}
        userRole={getRoleName()}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          
          {/* HOME/DASHBOARD TAB */}
          {activeTab === 'home' && (
            <>
              {/* Greeting Banner */}
              <section className="greeting-banner">
                <div className="greeting-content">
                  <h2>{getGreeting()}!</h2>
                  <p>Welcome to your Balancd dashboard. Let's get started with your bookkeeping.</p>
                </div>
              </section>

              {/* Quick Actions */}
              <section className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <Button
                    variant="secondary"
                    className="action-card-button"
                    onClick={() => setActiveTab('records')}
                  >
                    <div className="action-card-content">
                      <h4>Add Records</h4>
                      <p>Create new accounting records</p>
                    </div>
                  </Button>

                  <Button
                    variant="secondary"
                    className="action-card-button"
                    onClick={() => setActiveTab('reconciliation')}
                  >
                    <div className="action-card-content">
                      <h4>Prepare Reconciliation</h4>
                      <p>Reconcile accounts</p>
                    </div>
                  </Button>

                  <Button
                    variant="secondary"
                    className="action-card-button"
                    onClick={() => setActiveTab('reports')}
                  >
                    <div className="action-card-content">
                      <h4>View Reports</h4>
                      <p>Generate financial reports</p>
                    </div>
                  </Button>

                  <Button
                    variant="secondary"
                    className="action-card-button"
                    onClick={() => setActiveTab('alerts')}
                  >
                    <div className="action-card-content">
                      <h4>Check Alerts</h4>
                      <p>Review notifications</p>
                    </div>
                  </Button>
                </div>
              </section>

              {/* Stats Overview */}
              <section className="stats-section">
                <h3>Overview</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Pending Records</div>
                    <div className="stat-value">0</div>
                    <div className="stat-change">No pending items</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-label">Unreconciled</div>
                    <div className="stat-value">0</div>
                    <div className="stat-change">Items to review</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-label">Active Alerts</div>
                    <div className="stat-value">0</div>
                    <div className="stat-change">No active alerts</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-label">This Period</div>
                    <div className="stat-value">$0.00</div>
                    <div className="stat-change">Transactions processed</div>
                  </div>
                </div>
              </section>

              {/* Recent Activity */}
              <section className="activity-section">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-empty">
                    <p>No recent activity</p>
                    <span>Your recent actions will appear here</span>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* BOOKS TAB */}
          {activeTab === 'books' && (
            <section className="tab-content">
              <div className="tab-header">
                <h2>Manage Books</h2>
                {isOwner && <Button variant="primary">Create Book</Button>}
              </div>
              
              <div className="feature-grid">
                {isOwner && (
                  <>
                    <div className="feature-card">
                      <h4>Create Book</h4>
                      <p>Set up a new ledger or accounting book</p>
                    </div>
                    <div className="feature-card">
                      <h4>Modify Book</h4>
                      <p>Update book settings and properties</p>
                    </div>
                    <div className="feature-card">
                      <h4>Delete Book</h4>
                      <p>Remove books from the system</p>
                    </div>
                  </>
                )}
                <div className="feature-card">
                  <h4>Link Documents</h4>
                  <p>Attach supporting documents to books</p>
                </div>
                <div className="feature-card">
                  <h4>Generate PBC Workflows</h4>
                  <p>Create Prepared By Client workflows</p>
                </div>
                <div className="feature-card">
                  <h4>Import/Export Excel</h4>
                  <p>Exchange data with Excel spreadsheets</p>
                </div>
              </div>

              <div className="empty-state">
                <h3>No books available</h3>
                <p>Create your first accounting book to get started</p>
              </div>
            </section>
          )}

          {/* RECORDS TAB */}
          {activeTab === 'records' && (
            <section className="tab-content">
              <div className="tab-header">
                <h2>Accounting Records</h2>
                <Button variant="primary">Add Record</Button>
              </div>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>Add Records</h4>
                  <p>Create new journal entries and transactions</p>
                </div>
                <div className="feature-card">
                  <h4>Update Records</h4>
                  <p>Modify existing accounting entries</p>
                </div>
                <div className="feature-card">
                  <h4>Add Documents</h4>
                  <p>Attach supporting documentation</p>
                </div>
                <div className="feature-card">
                  <h4>View Task Checklist</h4>
                  <p>Track required accounting tasks</p>
                </div>
                <div className="feature-card">
                  <h4>Prior-period Records</h4>
                  <p>Access read-only historical records</p>
                </div>
              </div>

              <div className="empty-state">
                <h3>No records yet</h3>
                <p>Start by adding your first accounting record</p>
              </div>
            </section>
          )}

          {/* RECONCILIATION TAB */}
          {activeTab === 'reconciliation' && (
            <section className="tab-content">
              <div className="tab-header">
                <h2>Account Reconciliation</h2>
                <Button variant="primary">Prepare Reconciliation</Button>
              </div>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>Prepare Reconciliation</h4>
                  <p>Start the reconciliation process</p>
                </div>
                <div className="feature-card">
                  <h4>View Variances</h4>
                  <p>Review discrepancies in accounts</p>
                </div>
                <div className="feature-card">
                  <h4>View Anomalies</h4>
                  <p>Identify unusual transactions</p>
                </div>
                {isOwner && (
                  <div className="feature-card">
                    <h4>Approve/Reject</h4>
                    <p>Review and approve reconciliations</p>
                  </div>
                )}
              </div>

              <div className="empty-state">
                <h3>No reconciliations in progress</h3>
                <p>Start a new reconciliation when ready</p>
              </div>
            </section>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
            <section className="tab-content">
              <div className="tab-header">
                <h2>Financial Reports</h2>
                <Button variant="primary">Generate Report</Button>
              </div>
              
              <div className="feature-grid">
                {isOwner && (
                  <div className="feature-card">
                    <h4>Weekly Report</h4>
                    <p>Generate weekly financial summaries</p>
                  </div>
                )}
                <div className="feature-card">
                  <h4>Custom Reports</h4>
                  <p>Create tailored financial reports</p>
                </div>
                <div className="feature-card">
                  <h4>Variance Analysis</h4>
                  <p>Compare actual vs. expected results</p>
                </div>
                <div className="feature-card">
                  <h4>Anomaly Detection</h4>
                  <p>Identify irregular transactions</p>
                </div>
              </div>

              <div className="empty-state">
                <h3>No reports available</h3>
                <p>Generate your first financial report</p>
              </div>
            </section>
          )}

          {/* ALERTS TAB */}
          {activeTab === 'alerts' && (
            <section className="tab-content">
              <div className="tab-header">
                <h2>Notifications & Alerts</h2>
              </div>
              
              <div className="feature-grid">
                <div className="feature-card">
                  <h4>Active Alerts</h4>
                  <p>Current notifications requiring attention</p>
                </div>
                {isOwner && (
                  <>
                    <div className="feature-card">
                      <h4>Approval Requests</h4>
                      <p>Reconciliations awaiting approval</p>
                    </div>
                    <div className="feature-card">
                      <h4>Final Close Requests</h4>
                      <p>Period close pending approval</p>
                    </div>
                    <div className="feature-card">
                      <h4>Deletion Requests</h4>
                      <p>Record deletion requests for review</p>
                    </div>
                  </>
                )}
                <div className="feature-card">
                  <h4>Accountant Updates</h4>
                  <p>Important notices from accountants</p>
                </div>
              </div>

              <div className="empty-state">
                <h3>No active alerts</h3>
                <p>You're all caught up!</p>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
