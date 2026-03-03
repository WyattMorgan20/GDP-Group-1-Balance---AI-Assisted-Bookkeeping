import { useState } from 'react';
import { User } from './types';
import { Button } from './components/ui';
import Navbar from './components/Navbar';
import {
  TransactionTrendChart,
  AccountBalanceChart,
  MonthEndCloseProgress,
  AIAssistanceMetrics,
  ProcessWorkflowTimeline,
} from './components/DashboardCharts';
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
        userName={`${user.first_name} ${user.last_name}`}
        userEmail={user.email}
        userRole={getRoleName()}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          
          {/* HOME/DASHBOARD TAB */}
          {activeTab === 'home' && (
            <section className="home-card">
              {/* Greeting Section */}
              <div className="home-section greeting-section">
                <div className="greeting-content">
                  <h1>{getGreeting()}, {user.first_name}!</h1>
                  <p className="greeting-subtitle">AI-Assisted Bookkeeping Dashboard</p>
                  <p className="greeting-description">Welcome to Balancd. Real-time insights with AI-powered accuracy.</p>
                </div>
                <div className="greeting-badge">
                  <span className="badge-label">Status</span>
                  <span className="badge-value">Active</span>
                </div>
              </div>

              {/* Key Metrics Cards */}
              <div className="home-section metrics-section">
                <h2>Key Metrics</h2>
                <div className="metrics-grid">
                  <div className="metric-card positive">
                    <div className="metric-icon">📈</div>
                    <div className="metric-content">
                      <span className="metric-label">YTD Revenue</span>
                      <span className="metric-value">$328,000</span>
                      <span className="metric-change positive-change">↑ 12.5% vs last year</span>
                    </div>
                  </div>

                  <div className="metric-card negative">
                    <div className="metric-icon">💳</div>
                    <div className="metric-content">
                      <span className="metric-label">Total Expenses</span>
                      <span className="metric-value">$187,000</span>
                      <span className="metric-change negative-change">↓ 8.3% vs last year</span>
                    </div>
                  </div>

                  <div className="metric-card positive">
                    <div className="metric-icon">💰</div>
                    <div className="metric-content">
                      <span className="metric-label">Net Income</span>
                      <span className="metric-value">$141,000</span>
                      <span className="metric-change positive-change">↑ 23.1% growth</span>
                    </div>
                  </div>

                  <div className="metric-card neutral">
                    <div className="metric-icon">🔄</div>
                    <div className="metric-content">
                      <span className="metric-label">Current Ratio</span>
                      <span className="metric-value">2.45x</span>
                      <span className="metric-change">Healthy liquidity</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="home-section charts-section">
                <div className="charts-grid">
                  <div className="chart-wrapper">
                    <TransactionTrendChart />
                  </div>
                  <div className="chart-wrapper">
                    <AccountBalanceChart />
                  </div>
                </div>
              </div>

              {/* AI Metrics Section */}
              <div className="home-section charts-section">
                <div className="charts-grid two-column">
                  <div className="chart-wrapper">
                    <AIAssistanceMetrics />
                  </div>
                  <div className="chart-wrapper">
                    <MonthEndCloseProgress />
                  </div>
                </div>
              </div>

              {/* Workflow Timeline */}
              <div className="home-section timeline-section">
                <ProcessWorkflowTimeline />
              </div>

              {/* Quick Actions */}
              <div className="home-section quick-actions-section">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                  <Button
                    variant="secondary"
                    className="action-card-button"
                    onClick={() => setActiveTab('records')}
                  >
                    <div className="action-card-content">
                      <span className="action-icon">➕</span>
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
                      <span className="action-icon">✓</span>
                      <h4>Reconciliation</h4>
                      <p>Reconcile accounts</p>
                    </div>
                  </Button>

                  <Button
                    variant="secondary"
                    className="action-card-button"
                    onClick={() => setActiveTab('reports')}
                  >
                    <div className="action-card-content">
                      <span className="action-icon">📊</span>
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
                      <span className="action-icon">🔔</span>
                      <h4>Check Alerts</h4>
                      <p>Review notifications</p>
                    </div>
                  </Button>
                </div>
              </div>

              {/* AI Benefits Section */}
              <div className="home-section benefits-section">
                <h2>AI-Assisted Bookkeeping Benefits</h2>
                <div className="benefits-grid">
                  <div className="benefit-card">
                    <div className="benefit-number">95%</div>
                    <div className="benefit-text">
                      <h4>Classification Accuracy</h4>
                      <p>Automated transaction categorization</p>
                    </div>
                  </div>

                  <div className="benefit-card">
                    <div className="benefit-number">50%</div>
                    <div className="benefit-text">
                      <h4>Faster Close</h4>
                      <p>Month-end closing acceleration</p>
                    </div>
                  </div>

                  <div className="benefit-card">
                    <div className="benefit-number">24/7</div>
                    <div className="benefit-text">
                      <h4>Continuous Monitoring</h4>
                      <p>Real-time anomaly detection</p>
                    </div>
                  </div>

                  <div className="benefit-card">
                    <div className="benefit-number">100%</div>
                    <div className="benefit-text">
                      <h4>Audit Ready</h4>
                      <p>Complete audit trail maintained</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
