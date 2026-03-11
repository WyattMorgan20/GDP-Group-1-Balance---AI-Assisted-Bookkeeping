import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import '../styles/CloseProgressWheel.css';

interface CloseProgressWheelProps {
  percentComplete: string;
}

const mockProgress = {
  notStarted: 12,
  inProgress: 11,
  readyForReview: 5,
  complete: 3,
};

const progressData = [
  { name: "Not Started", value: mockProgress.notStarted, fill: "#e2e8f0" },
  { name: "In Progress", value: mockProgress.inProgress, fill: "#7483e3" },
  { name: "Ready For Review", value: mockProgress.readyForReview, fill: "#061ed5" },
  { name: "Complete", value: mockProgress.complete, fill: "#0b328c" }
];

const sections = [
  { key: 'notStarted', value: mockProgress.notStarted, color: '#e2e8f0', label: 'Not Started' },
  { key: 'inProgress', value: mockProgress.inProgress, color: '#7483e3', label: 'In Progress' },
  { key: 'readyForReview', value: mockProgress.readyForReview, color: '#061ed5', label: 'Ready For Review' },
  { key: 'complete', value: mockProgress.complete, color: '#0b328c', label: 'Complete' }
];

export function CloseProgressWheel({ percentComplete }: CloseProgressWheelProps) {
  const total = Object.values(mockProgress).reduce((a, b) => a + b, 0);
  return (
    <div className="progress-wheel-wrapper">

      {/* PIE CHART */}
      <div style={{ width: "50%", height: 260 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={progressData}
              dataKey="value"
              nameKey="name"
              cx="35%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              startAngle={90}
              endAngle={-270}
            />

            {/* Center Text */}
            <text
              x="35%"
              y="48%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: "26px", fontWeight: 600 }}
            >
              {percentComplete}%
            </text>

            <text
              x="35%"
              y="60%"
              textAnchor="middle"
              style={{ fontSize: "12px", fill: "#666" }}
            >
              Complete
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGEND */}
      <div className="progress-wheel-legend">
        {sections.map((section) => {
          const percentage = ((section.value / total) * 100).toFixed(0);
          return (
            <div key={section.key} className="progress-wheel-legend-item">
              <span className="progress-wheel-legend-color" style={{ backgroundColor: section.color }}/>
              <span>{section.label}</span>
              <span className="progress-wheel-legend-value">
                {section.value}
                <span className="progress-wheel-legend-percentage">
                  ({percentage}%)
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
