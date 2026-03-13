import React, { useState, useEffect } from 'react';
import { Organization, Department, Team, Role } from '../logic/types';
import api from '../services/api';
import '../styles/CompanyStructure.css';

interface CompanyStructureProps {
  organizationId: string;
  userId?: string;
}

export const CompanyStructure: React.FC<CompanyStructureProps> = ({ organizationId }) => {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [deptName, setDeptName] = useState('');
  const [deptDesc, setDeptDesc] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDesc, setTeamDesc] = useState('');
  const [roleName, setRoleName] = useState('');
  const [roleLevel, setRoleLevel] = useState('Employee');

  useEffect(() => {
    loadOrganizationData();
  }, [organizationId]);

  useEffect(() => {
    if (selectedDept) {
      loadTeams(selectedDept);
    }
  }, [selectedDept]);

  const loadOrganizationData = async () => {
    setLoading(true);
    try {
      const org = await api.organizations.get(organizationId);
      setOrganization(org);
      
      const depts = await api.organizations.getDepartments(organizationId);
      setDepartments(depts);
      
      const rolesList = await api.organizations.getRoles(organizationId);
      setRoles(rolesList);
      
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load organization data');
    } finally {
      setLoading(false);
    }
  };

  const loadTeams = async (deptId: string) => {
    try {
      const teamsList = await api.organizations.getTeams(deptId);
      setTeams(teamsList);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load teams');
    }
  };

  const handleCreateDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptName.trim()) return;

    try {
      await api.organizations.createDepartment(organizationId, deptName, deptDesc);
      setDeptName('');
      setDeptDesc('');
      await loadOrganizationData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create department');
    }
  };

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim() || !selectedDept) return;

    try {
      await api.organizations.createTeam(selectedDept, organizationId, teamName, teamDesc);
      setTeamName('');
      setTeamDesc('');
      await loadTeams(selectedDept);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create team');
    }
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    try {
      await api.organizations.createRole(organizationId, roleName, roleLevel);
      setRoleName('');
      await loadOrganizationData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create role');
    }
  };

  if (loading) {
    return <div className="company-structure-loading">Loading organization data...</div>;
  }

  return (
    <div className="company-structure-container">
      <h1>Company Structure</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="structure-grid">
        {/* Organization Overview */}
        <section className="structure-section">
          <h2>Organization</h2>
          {organization && (
            <div className="org-info">
              <p><strong>Name:</strong> {organization.name}</p>
              <p><strong>Type:</strong> {organization.organization_type}</p>
              <p><strong>Created:</strong> {new Date(organization.created_at).toLocaleDateString()}</p>
            </div>
          )}
        </section>

        {/* Departments */}
        <section className="structure-section">
          <h2>Departments ({departments.length})</h2>
          
          <form onSubmit={handleCreateDepartment} className="create-form">
            <input
              type="text"
              placeholder="Department name"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              required
            />
            <textarea
              placeholder="Description (optional)"
              value={deptDesc}
              onChange={(e) => setDeptDesc(e.target.value)}
              rows={2}
            />
            <button type="submit">Add Department</button>
          </form>

          <ul className="list">
            {departments.map(dept => (
              <li 
                key={dept.id} 
                className={`list-item ${selectedDept === dept.id ? 'active' : ''}`}
                onClick={() => setSelectedDept(dept.id)}
              >
                <strong>{dept.name}</strong>
                {dept.description && <p>{dept.description}</p>}
              </li>
            ))}
          </ul>
        </section>

        {/* Teams */}
        {selectedDept && (
          <section className="structure-section">
            <h2>Teams ({teams.length})</h2>
            
            <form onSubmit={handleCreateTeam} className="create-form">
              <input
                type="text"
                placeholder="Team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={teamDesc}
                onChange={(e) => setTeamDesc(e.target.value)}
                rows={2}
              />
              <button type="submit">Add Team</button>
            </form>

            <ul className="list">
              {teams.map(team => (
                <li key={team.id} className="list-item">
                  <strong>{team.name}</strong>
                  {team.description && <p>{team.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Roles */}
        <section className="structure-section">
          <h2>Roles ({roles.length})</h2>
          
          <form onSubmit={handleCreateRole} className="create-form">
            <input
              type="text"
              placeholder="Role name"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
            />
            <select value={roleLevel} onChange={(e) => setRoleLevel(e.target.value)}>
              <option value="Owner">Owner</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
              <option value="Auditor">Auditor</option>
              <option value="JuniorEmployee">Junior Employee</option>
            </select>
            <button type="submit">Add Role</button>
          </form>

          <ul className="list">
            {roles.map(role => (
              <li key={role.id} className="list-item">
                <strong>{role.name}</strong>
                <span className="badge">{role.permission_level}</span>
                {role.description && <p>{role.description}</p>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CompanyStructure;
