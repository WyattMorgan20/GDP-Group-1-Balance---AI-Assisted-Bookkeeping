import { useState } from 'react';
import { invoke } from '@tauri-apps/api/core';
import { OrganizationType, MembershipRole, RoleSelectionRequest } from './types';
import './RoleSelection.css';

interface RoleSelectionProps {
  onRoleSelected: (organizationType: OrganizationType, membershipRole: MembershipRole) => void;
}

interface RoleOption {
  organization_type: OrganizationType;
  membership_role: MembershipRole;
  title: string;
  description: string;
}

export default function RoleSelection({ onRoleSelected }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles: RoleOption[] = [
    {
      organization_type: 'Business',
      membership_role: 'Owner',
      title: 'Business Owner',
      description: 'I own a business and want to manage my books'
    },

    {
      organization_type: 'Business',
      membership_role: 'Employee',
      title: 'Business Employee',
      description: 'I work for a business as an accountant or manager'
    },

    {
      organization_type: 'AccountingFirm',
      membership_role: 'Owner',
      title: 'Accounting Firm Owner',
      description: 'I own an accounting firm and manage multiple clients'
    },

    {
      organization_type: 'AccountingFirm',
      membership_role: 'Employee',
      title: 'Firm Employee',
      description: 'I work for an accounting firm'
    }
  ];

  const handleContinue = async () => {
    if (!selectedRole) return;

    setError('');
    setIsLoading(true);

    try {
      const request: RoleSelectionRequest = {
        organization_type: selectedRole.organization_type,
        membership_role: selectedRole.membership_role,
      };

      await invoke<string>('choose_role', { req: request });
      onRoleSelected(selectedRole.organization_type, selectedRole.membership_role);
    } catch (err) {
      setError(String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-box">
        <div className="role-selection-header">
          <h1>Select Your Role</h1>
          <p>Help us customize your Balancd experience</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="role-grid">
          {roles.map((role) => {
            const isSelected = selectedRole?.organization_type === role.organization_type 
              && selectedRole?.membership_role === role.membership_role;
            
            return (
              <div
                key={`${role.organization_type}-${role.membership_role}`}
                className={`role-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedRole(role)}
              >
                <h3>{role.title}</h3>
                <p>{role.description}</p>
                {isSelected && (
                  <div className="selected-indicator">✓</div>
                )}
              </div>
            );
          })}
        </div>

        <button
          className="continue-button"
          onClick={handleContinue}
          disabled={!selectedRole || isLoading}
        >
          {isLoading ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
