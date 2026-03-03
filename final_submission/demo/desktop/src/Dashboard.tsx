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

// Mock data - replace with real data from backend
const mockProgress = {
  notStarted: 14,
  inProgress: 11,
  blocked: 2,
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
    
    const orgType = user.organization_type === 'Business' ? 'Business' : 'Firm';
    const role = user.membership_role === 'Owner' ? 'Owner' : 'Employee';
    
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

  const sections = [
    { key: 'notStarted', value: mockProgress.notStarted, color: '#e2e8f0', label: 'Not Started' },
    { key: 'inProgress', value: mockProgress.inProgress, color: '#93c5fd', label: 'In Progress' },
    { key: 'blocked', value: mockProgress.blocked, color: '#60a5fa', label: 'Blocked' },
    { key: 'readyForReview', value: mockProgress.readyForReview, color: '#3b82f6', label: 'Ready For Review' },
    { key: 'complete', value: mockProgress.complete, color: '#0b3bab', label: 'Complete' },
  ];

  // SVG Progress Wheel - Circular with sections
  const createProgressWheel = () => {
    const total = Object.values(mockProgress).reduce((a, b) => a + b, 0);
    const radius = 80;
    const center = 100;
    
    let currentAngle = -90; // Start at top center
    
    return sections.map((section) => {
      const percentage = section.value / total;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      // Convert angles to radians
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      // Calculate arc path
      const startX = center + radius * Math.cos(startRad);
      const startY = center + radius * Math.sin(startRad);
      const endX = center + radius * Math.cos(endRad);
      const endY = center + radius * Math.sin(endRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${center} ${center}`,
        `L ${startX} ${startY}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
        'Z'
      ].join(' ');
      
      currentAngle = endAngle;
      
      return (
        <path
          key={section.key}
          d={pathData}
          fill={section.color}
          stroke="white"
          strokeWidth="2"
        />
      );
    });
  };

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
          
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <section className="home-card">
              {/* Greeting Section */}
              <div className="home-section greeting-section">
                <div className="greeting-content">
                  <h2>{getGreeting()}!</h2>
                  <p>
                    Welcome to your Balancd dashboard. Let's get started with your bookkeeping.
                  </p>
                </div>
              </div>

              {/* Progress Dashboard */}
              <div className="home-section progress-dashboard">
                <div className="dashboard-grid">
                  {/* Progress Wheel */}
                  <div className="progress-wheel-container">
                    <h3>Close Progress</h3>
                    <div className="progress-wheel-wrapper">
                      <svg viewBox="0 0 200 200" className="progress-wheel">
                        {/* Outer circle sections */}
                        {createProgressWheel()}
                        
                        {/* White center circle */}
                        <circle cx="100" cy="100" r="50" fill="white"/>
                        
                        {/* Center text */}
                        <text x="100" y="100" textAnchor="middle" className="progress-percentage">
                          {percentComplete}%
                        </text>
                        <text x="100" y="115" textAnchor="middle" className="progress-label">
                          Complete
                        </text>
                      </svg>
                      
                      {/* Legend */}
                      <div className="progress-legend">
                        {sections.map((section) => {
                          const total = Object.values(mockProgress).reduce((a, b) => a + b, 0);
                          const percentage = ((section.value / total) * 100).toFixed(0);
                          return (
                            <div key={section.key} className="legend-item">
                              <span className="legend-color" style={{ backgroundColor: section.color }}></span>
                              <span>{section.label}</span>
                              <span className="legend-value">
                                {section.value} <span className="legend-percentage">({percentage}%)</span>
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Timeline Status */}
                  <div className="timeline-status">
                    <h3>Timeline Status</h3>
                    <div className="timeline-boxes">
                      {/* Days to Target Box */}
                      <div className="timeline-box">
                        <div className="timeline-box-label">DAYS TO TARGET CLOSE</div>
                        <div className="timeline-box-value">{mockTimeline.totalDays - mockTimeline.currentDay}</div>
                        <div className="timeline-box-sublabel">
                          Target: {new Date(mockTimeline.targetDate + 'T00:00:00').toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      {/* Status and Calendar Column */}
                      <div className="timeline-column">
                        {/* Status Box */}
                        <div className={`timeline-box timeline-box-status status-${status.toLowerCase().replace(' ', '-')}`}>
                          <div className="timeline-box-value-text">{status}</div>
                        </div>
                        
                        {/* View Calendar Box */}
                        <div className="timeline-box timeline-box-calendar">
                          <div className="timeline-box-label">CLOSE CALENDAR</div>
                          <Button variant="primary" size="small" onClick={() => setActiveTab('calendar')}>
                            View Calendar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task Summary */}
                <div className="task-summary">
                  <h3>Task Summary</h3>
                  <div className="task-summary-grid">
                    <div className="task-metric">
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

              {/* Key Metrics Cards */}
              <div className="home-section metrics-section">
                <h2>Key Metrics</h2>
                <div className="metrics-grid">
                  <div className="metric-card positive">
                    <div className="metric-content">
                      <span className="metric-label">YTD Revenue</span>
                      <span className="metric-value">$328,000</span>
                      <span className="metric-change positive-change">↑ 12.5% vs last year</span>
                    </div>
                  </div>

                  <div className="metric-card negative">
                    <div className="metric-content">
                      <span className="metric-label">Total Expenses</span>
                      <span className="metric-value">$187,000</span>
                      <span className="metric-change negative-change">↓ 8.3% vs last year</span>
                    </div>
                  </div>

                  <div className="metric-card positive">
                    <div className="metric-content">
                      <span className="metric-label">Net Income</span>
                      <span className="metric-value">$141,000</span>
                      <span className="metric-change positive-change">↑ 23.1% growth</span>
                    </div>
                  </div>

                  <div className="metric-card neutral">
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
