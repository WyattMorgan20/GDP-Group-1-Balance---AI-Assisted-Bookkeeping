import '../styles/ProgressLists.css';

interface PhaseProgress {
  phase: string;
  progress: number;
}

const closePhaseData: PhaseProgress[] = [
  { phase: "Pre-Close", progress: 100 },
  { phase: "Journal Entries", progress: 65 },
  { phase: "Reconciliations", progress: 45 },
  { phase: "Review", progress: 20 },
  { phase: "Reporting", progress: 0 }
];

const reconciliationStatus = [
  { label: "Reconciled", value: 72 },
  { label: "Pending Review", value: 28 },
  { label: "Not Started", value: 15 },
  { label: "Blocked", value: 5 }
];

const journalEntryStatus = [
  { label: "Approved", value: 72 },
  { label: "Draft", value: 28 },
  { label: "Submitted", value: 15 },
  { label: "Rejected", value: 5 }
];

export function ClosePhaseProgressList() {
  return (
    <div className="progress-list">
      {closePhaseData.map((item) => (
        <div key={item.phase} className="progress-row">
          <div className="progress-label">{item.phase}</div>

          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${item.progress}%` }}
            />
          </div>

          <div className="progress-value">{item.progress}%</div>
        </div>
      ))}
    </div>
  );
}

export function ReconciliationStatusList() {
  const max = Math.max(...reconciliationStatus.map(i => i.value));

  return (
    <div className="progress-list">
      {reconciliationStatus.map((item) => (
        <div key={item.label} className="progress-row">
          <div className="progress-label">{item.label}</div>

          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>

          <div className="progress-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}

export function JournalEntryStatusList() {
  const max = Math.max(...journalEntryStatus.map(i => i.value));

  return (
    <div className="progress-list">
      {journalEntryStatus.map((item) => (
        <div key={item.label} className="progress-row">
          <div className="progress-label">{item.label}</div>

          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>

          <div className="progress-value">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
