import { useState } from 'react';
import './RoleSelection.css';

interface RoleSelectionProps {
  onRoleSelected: (role: string) => void;
}

export default function RoleSelection({ onRoleSelected }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    {
      id: 'business_owner',
      title: 'Business Owner',
      description: 'I own a business and want to manage my books',
      icon: '🏢',
    },
    {
      id: 'business_employee',
      title: 'Business Employee',
      description: 'I work for a business as an accountant or manager',
      icon: '👔',
    },
    {
      id: 'firm_owner',
      title: 'Accounting Firm Owner',
      description: 'I own an accounting firm and manage multiple clients',
      icon: '🏛️',
    },
    {
      id: 'firm_employee',
      title: 'Firm Employee',
      description: 'I work for an accounting firm',
      icon: '📊',
    },
  ];

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelected(selectedRole);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content role-selection-modal">
        <div className="modal-header">
          <h2>Select Your Role</h2>
          <p>Help us customize your Balance experience</p>
        </div>

        <div className="role-grid">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="role-icon">{role.icon}</div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
              {selectedRole === role.id && (
                <div className="selected-indicator">✓</div>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button
            className="continue-button"
            onClick={handleContinue}
            disabled={!selectedRole}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
