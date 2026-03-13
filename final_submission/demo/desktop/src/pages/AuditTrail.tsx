import React, { useState, useEffect } from 'react';
import { AuditLog } from '../logic/types';
import api from '../services/api';
import '../styles/AuditTrail.css';

interface AuditTrailProps {
  organizationId: string;
  entityType?: string;
  entityId?: string;
  userId?: string;
}

export const AuditTrail: React.FC<AuditTrailProps> = ({ 
  organizationId, 
  entityType, 
  entityId,
  userId 
}) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterAction, setFilterAction] = useState<string>('all');

  useEffect(() => {
    loadAuditLogs();
  }, [organizationId, entityType, entityId, userId]);

  const loadAuditLogs = async () => {
    setLoading(true);
    try {
      let auditLogs: AuditLog[] = [];
      
      if (entityType && entityId) {
        auditLogs = await api.audit.getEntityTrail(organizationId, entityType, entityId);
      } else if (userId) {
        auditLogs = await api.audit.getUserActions(organizationId, userId, 100);
      }
      
      setLogs(auditLogs);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audit logs');
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = filterAction === 'all' 
    ? logs 
    : logs.filter(log => log.action === filterAction);

  const uniqueActions = Array.from(new Set(logs.map(log => log.action)));

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const formatChanges = (changes: Record<string, any> | null) => {
    if (!changes) return null;
    try {
      return JSON.stringify(changes, null, 2);
    } catch {
      return String(changes);
    }
  };

  if (loading) {
    return <div className="audit-trail-loading">Loading audit logs...</div>;
  }

  return (
    <div className="audit-trail-container">
      <h1>Audit Trail</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="audit-controls">
        <div className="filter-group">
          <label htmlFor="action-filter">Filter by Action:</label>
          <select 
            id="action-filter"
            value={filterAction} 
            onChange={(e) => setFilterAction(e.target.value)}
          >
            <option value="all">All Actions</option>
            {uniqueActions.map(action => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
        </div>
        <span className="log-count">{filteredLogs.length} entries</span>
      </div>

      <div className="audit-logs">
        {filteredLogs.length === 0 ? (
          <div className="no-logs">No audit logs found</div>
        ) : (
          <div className="logs-timeline">
            {filteredLogs.map((log, index) => (
              <div key={log.id} className="log-entry">
                <div className="log-marker">
                  <div className="timeline-dot"></div>
                  {index < filteredLogs.length - 1 && <div className="timeline-line"></div>}
                </div>
                
                <div className="log-content">
                  <div className="log-header">
                    <span className="log-action badge">{log.action}</span>
                    <span className="log-entity">{log.entity_type}</span>
                    <span className="log-timestamp">{formatDate(log.timestamp)}</span>
                  </div>
                  
                  <div className="log-details">
                    <p><strong>Entity ID:</strong> {log.entity_id}</p>
                    {log.user_id && <p><strong>User ID:</strong> {log.user_id}</p>}
                    {log.ip_address && <p><strong>IP Address:</strong> {log.ip_address}</p>}
                  </div>

                  {log.changes && (
                    <details className="log-changes">
                      <summary>View Changes</summary>
                      <pre>{formatChanges(log.changes)}</pre>
                    </details>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditTrail;
