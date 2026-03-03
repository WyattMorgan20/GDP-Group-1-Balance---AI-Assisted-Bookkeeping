import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface TransactionData {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

interface AccountData {
  name: string;
  value: number;
  type: string;
}

interface CloseProgressData {
  name: string;
  current: number;
  total: number;
  completed: number;
}

interface AIMetricsData {
  name: string;
  value: number;
  fill: string;
}

// Sample data for monthly transactions
const transactionTrendData = [
  { month: 'Jan', revenue: 45000, expenses: 32000, net: 13000 },
  { month: 'Feb', revenue: 52000, expenses: 35000, net: 17000 },
  { month: 'Mar', revenue: 48000, expenses: 31000, net: 17000 },
  { month: 'Apr', revenue: 61000, expenses: 38000, net: 23000 },
  { month: 'May', revenue: 55000, expenses: 33000, net: 22000 },
  { month: 'Jun', revenue: 67000, expenses: 41000, net: 26000 },
];

// Sample data for account categories
const accountBalanceData = [
  { name: 'Assets', value: 145000, type: 'asset' },
  { name: 'Liabilities', value: 78000, type: 'liability' },
  { name: 'Equity', value: 67000, type: 'equity' },
];

// Sample data for month-end close progress
const closeProgressData = [
  { name: 'Transactions Recorded', current: 487, total: 500, completed: 97 },
  { name: 'Reconciliations', current: 18, total: 20, completed: 90 },
  { name: 'Adjusting Entries', current: 14, total: 15, completed: 93 },
  { name: 'Account Reviews', current: 45, total: 60, completed: 75 },
];

// Sample data for AI assistance impact
const aiMetricsData = [
  { name: 'Auto-Classified', value: 340, fill: '#10b981' },
  { name: 'Human-Enhanced', value: 120, fill: '#f59e0b' },
  { name: 'Flagged for Review', value: 27, fill: '#ef4444' },
];

export function TransactionTrendChart() {
  const data: TransactionData[] = transactionTrendData;
  return (
    <div className="chart-container">
      <h3>Transaction Trends (6 Months)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
            formatter={(value: number | undefined) => `$${(value || 0).toLocaleString()}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
            activeDot={{ r: 6 }}
            name="Revenue"
          />
          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: '#ef4444', r: 4 }}
            activeDot={{ r: 6 }}
            name="Expenses"
          />
          <Line
            type="monotone"
            dataKey="net"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Net Income"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AccountBalanceChart() {
  const COLORS = ['#10b981', '#ef4444', '#8b5cf6'];
  const data: AccountData[] = accountBalanceData;

  const renderLabel = (props: any) => {
    const name = props.name || '';
    const value = props.value || 0;
    return `${name}: $${value.toLocaleString()}`;
  };

  return (
    <div className="chart-container">
      <h3>Account Balance Overview</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number | undefined) => `$${(value || 0).toLocaleString()}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MonthEndCloseProgress() {
  const data: CloseProgressData[] = closeProgressData;
  
  return (
    <div className="chart-container">
      <h3>Month-End Close Progress</h3>
      <div className="progress-list">
        {data.map((item) => (
          <div key={item.name} className="progress-item">
            <div className="progress-header">
              <span className="progress-label">{item.name}</span>
              <span className="progress-stats">
                {item.current} / {item.total}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${item.completed}%`,
                  backgroundColor:
                    item.completed >= 90
                      ? '#10b981'
                      : item.completed >= 75
                        ? '#f59e0b'
                        : '#ef4444',
                }}
              ></div>
            </div>
            <span className="progress-text">{item.completed}% Complete</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AIAssistanceMetrics() {
  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];
  const data: AIMetricsData[] = aiMetricsData;

  const renderLabel = (props: any) => {
    const name = props.name || '';
    const value = props.value || 0;
    return `${name}: ${value}`;
  };

  return (
    <div className="chart-container">
      <h3>AI Classification Results</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={renderLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="metrics-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Auto-Classified (68%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Human-Enhanced (24%)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Flagged for Review (5%)</span>
        </div>
      </div>
    </div>
  );
}

export function ProcessWorkflowTimeline() {
  return (
    <div className="chart-container timeline-container">
      <h3>AI-Assisted Month-End Close Workflow</h3>
      <div className="timeline">
        <div className="timeline-step completed">
          <div className="timeline-marker">✓</div>
          <div className="timeline-content">
            <h4>Transaction Collection</h4>
            <p>All transactions recorded and imported</p>
          </div>
        </div>

        <div className="timeline-step completed">
          <div className="timeline-marker">✓</div>
          <div className="timeline-content">
            <h4>AI Classification</h4>
            <p>Transactions auto-classified with 95% accuracy</p>
          </div>
        </div>

        <div className="timeline-step active">
          <div className="timeline-marker">→</div>
          <div className="timeline-content">
            <h4>Reconciliation & Validation</h4>
            <p>AI identifies discrepancies and flags for review</p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="timeline-marker">◯</div>
          <div className="timeline-content">
            <h4>Adjusting Entries</h4>
            <p>AI suggests accruals, deferrals, and adjustments</p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="timeline-marker">◯</div>
          <div className="timeline-content">
            <h4>Final Review & Approval</h4>
            <p>Users approve AI recommendations and post entries</p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="timeline-marker">◯</div>
          <div className="timeline-content">
            <h4>Financial Statements</h4>
            <p>Generate audit-ready financial statements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
