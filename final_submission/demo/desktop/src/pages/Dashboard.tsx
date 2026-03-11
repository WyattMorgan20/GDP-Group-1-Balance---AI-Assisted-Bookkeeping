import { useState } from 'react';
import { User } from '../logic/types';
import { Button } from '../components/ui';
import Navbar from '../components/ui/Navbar';
import { CloseProgressWheel } from '../components/DashboardCharts';
import {
  ClosePhaseProgressList,
  ReconciliationStatusList,
  JournalEntryStatusList
} from '../components/ProgressLists';
import '../styles/Dashboard.css';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

// Mock data - replace with real data from backend
const mockProgress = {
  notStarted: 12,
  inProgress: 11,
  readyForReview: 5,
  complete: 3,
};

const mockTimeline = {
  currentDay: 12,
  totalDays: 20,
  targetDate: '2026-03-14',
};

const mockTasks = {
  open: 45,
  blocked: 8,
  atRisk: 12,
  overdue: 3,
};

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
    
    const orgType = user.organization_type? 'Business' : 'Firm';
    const role = user.membership_role? 'Owner' : 'Employee';
    
    return `${orgType} ${role}`;
  };

  const isOwner = user.membership_role === 'Owner';

  // Calculate progress percentage and status
  const calculateProgress = () => {
    const total = Object.values(mockProgress).reduce((a, b) => a + b, 0);
    const percentComplete = ((mockProgress.complete / total) * 100).toFixed(0);
    const progressRatio = mockTimeline.currentDay / mockTimeline.totalDays;
    const completionRatio = mockProgress.complete / total;
    
    let status = 'On Track';
    if (completionRatio > progressRatio + 0.1) status = 'Ahead';
    if (completionRatio < progressRatio - 0.1) status = 'Behind';
    
    return { percentComplete, status };
  };

  const { percentComplete, status } = calculateProgress();

  return (
    <div className="dashboard">
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
        userName={`${user.first_name} ${user.last_name}`}
        userRole={getRoleName()}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-container">
          
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <section className="home-card">

              {/* Greeting Section */}
              <div className="home-tab greeting-section">
                <div className="greeting-content">
                  <h2>{getGreeting()}!</h2>
                  <p>
                    Welcome to your Balancd dashboard. Let's get started with your bookkeeping.
                  </p>
                </div>
              </div>

              {/* Progress Dashboard Section */}
              <div className="home-tab progress-dashboard-section">
                <div className="progress-dashboard-grid">

                  {/* Progress Wheel */}
                  <div className="progress-wheel-container">
                    <h3>Close Progress</h3>
                    <CloseProgressWheel percentComplete={percentComplete}/>
                  </div>

                  {/* Timeline Status */}
                  <div className="timeline-status">
                    <h3>Timeline Status</h3>
                    <div className="timeline-boxes">
                      {/* Days to Target Box */}
                      <div className="timeline-box timeline-box-days">
                        <div className="timeline-box-label">DAYS TO TARGET CLOSE</div>
                        <div className="timeline-box-value">{mockTimeline.totalDays - mockTimeline.currentDay}</div>
                        <div className="timeline-box-sublabel">
                          Target: {new Date(mockTimeline.targetDate + 'T00:00:00').toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                        <div className={`timeline-status-badge status-${status.toLowerCase().replace(' ', '-')}`}>
                          {status}
                        </div>
                      </div>
                      
                      {/* Calendar Box */}
                      <div className="timeline-box timeline-box-calendar">
                        <div className="timeline-box-label">CLOSE CALENDAR</div>
                        <Button variant="primary" size="small" onClick={() => setActiveTab('calendar')}>
                          View Calendar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task Summary */}
                <div className="task-summary">
                  <h3>Task Summary</h3>
                  <div className="task-summary-grid">
                    <div className="task-metric task-open">
                      <div className="task-metric-value">{mockTasks.open}</div>
                      <div className="task-metric-label">Open</div>
                    </div>
                    <div className="task-metric task-blocked">
                      <div className="task-metric-value">{mockTasks.blocked}</div>
                      <div className="task-metric-label">Blocked</div>
                    </div>
                    <div className="task-metric task-at-risk">
                      <div className="task-metric-value">{mockTasks.atRisk}</div>
                      <div className="task-metric-label">At Risk</div>
                    </div>
                    <div className="task-metric task-overdue">
                      <div className="task-metric-value">{mockTasks.overdue}</div>
                      <div className="task-metric-label">Overdue</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Operational Work Section */}
              <div className="home-tab operational-work">
                <div className="operational-work-grid">

                  {/* Assigned To Me */}
                  <div className="assigned-to-me">
                    <h3>Assigned To Me</h3>
                    
                  </div>

                  {/* Task Risk Distribution */}
                  <div className="overdue-at-risk">
                    <h3>Overdue/At Risk</h3>
                    
                  </div>
                </div>

                {/* Close Phases Progress */}
                <div className="phase-progress">
                  <h3>Close Phase Progress</h3>
                  <ClosePhaseProgressList/>
                </div>
              </div>

              {/* Close Details Section */}
              <div className="home-tab close-details-section">
                <div className="close-details-grid">

                  {/* Reconciliation Status */}
                  <div className="reconciliation-status">
                    <h3>Reconciliation Status</h3>
                    <ReconciliationStatusList/>
                  </div>

                  {/* Journal Entry Status */}
                  <div className="journal-entry-status">
                    <h3>Journal Entry Status</h3>
                    <JournalEntryStatusList/>
                  </div>
                    
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="home-tab quick-actions-section">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                  <Button variant="secondary" className="action-card-button" onClick={() => setActiveTab('records')}>
                    <div className="action-card-content">
                      <h4>Add Records</h4>
                      <p>Create new accounting records</p>
                    </div>
                  </Button>

                  <Button variant="secondary" className="action-card-button" onClick={() => setActiveTab('reconciliation')}>
                    <div className="action-card-content">
                      <h4>Reconciliation</h4>
                      <p>Reconcile accounts</p>
                    </div>
                  </Button>

                  <Button variant="secondary" className="action-card-button" onClick={() => setActiveTab('reports')}>
                    <div className="action-card-content">
                      <h4>View Reports</h4>
                      <p>Generate financial reports</p>
                    </div>
                  </Button>

                  <Button variant="secondary" className="action-card-button" onClick={() => setActiveTab('alerts')}>
                    <div className="action-card-content">
                      <h4>Check Alerts</h4>
                      <p>Review notifications</p>
                    </div>
                  </Button>
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
