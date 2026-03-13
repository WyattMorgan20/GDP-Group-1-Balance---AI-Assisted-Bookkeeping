use tauri::State;
use serde::{Serialize, Deserialize};
use serde_json::Value;
use crate::services::audit::AuditService;
use crate::AppState;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct AuditLogResponse {
    pub id: String,
    pub organization_id: String,
    pub user_id: Option<String>,
    pub entity_type: String,
    pub entity_id: String,
    pub action: String,
    pub changes: Option<Value>,
    pub timestamp: String,
    pub ip_address: Option<String>,
    pub user_agent: Option<String>,
}

#[tauri::command]
pub async fn log_action(
    state: State<'_, AppState>,
    organization_id: String,
    user_id: Option<String>,
    entity_type: String,
    entity_id: String,
    action: String,
    changes: Option<Value>,
    ip_address: Option<String>,
    user_agent: Option<String>,
) -> Result<AuditLogResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let log = AuditService::log_action(
        db_pool,
        &organization_id,
        user_id.as_deref(),
        &entity_type,
        &entity_id,
        &action,
        changes,
        ip_address.as_deref(),
        user_agent.as_deref(),
    )
    .await
    .map_err(|e| e.to_string())?;

    Ok(AuditLogResponse {
        id: log.id,
        organization_id: log.organization_id,
        user_id: log.user_id,
        entity_type: log.entity_type,
        entity_id: log.entity_id,
        action: log.action,
        changes: log.changes,
        timestamp: log.timestamp,
        ip_address: log.ip_address,
        user_agent: log.user_agent,
    })
}

#[tauri::command]
pub async fn get_entity_audit_trail(
    state: State<'_, AppState>,
    organization_id: String,
    entity_type: String,
    entity_id: String,
) -> Result<Vec<AuditLogResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let logs = AuditService::get_entity_audit_trail(db_pool, &organization_id, &entity_type, &entity_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(logs
        .into_iter()
        .map(|log| AuditLogResponse {
            id: log.id,
            organization_id: log.organization_id,
            user_id: log.user_id,
            entity_type: log.entity_type,
            entity_id: log.entity_id,
            action: log.action,
            changes: log.changes,
            timestamp: log.timestamp,
            ip_address: log.ip_address,
            user_agent: log.user_agent,
        })
        .collect())
}

#[tauri::command]
pub async fn get_user_actions(
    state: State<'_, AppState>,
    organization_id: String,
    user_id: String,
    limit: i64,
) -> Result<Vec<AuditLogResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let logs = AuditService::get_user_actions(db_pool, &organization_id, &user_id, limit)
        .await
        .map_err(|e| e.to_string())?;

    Ok(logs
        .into_iter()
        .map(|log| AuditLogResponse {
            id: log.id,
            organization_id: log.organization_id,
            user_id: log.user_id,
            entity_type: log.entity_type,
            entity_id: log.entity_id,
            action: log.action,
            changes: log.changes,
            timestamp: log.timestamp,
            ip_address: log.ip_address,
            user_agent: log.user_agent,
        })
        .collect())
}
