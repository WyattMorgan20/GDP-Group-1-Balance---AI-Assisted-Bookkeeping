use sqlx::{PgPool, Row};
use uuid::Uuid;
use chrono::Utc;
use serde_json::{json, Value};

#[derive(Debug, Clone)]
pub struct AuditLog {
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

pub struct AuditService;

impl AuditService {
    pub async fn log_action(
        pool: &PgPool,
        organization_id: &str,
        user_id: Option<&str>,
        entity_type: &str,
        entity_id: &str,
        action: &str,
        changes: Option<Value>,
        ip_address: Option<&str>,
        user_agent: Option<&str>,
    ) -> Result<AuditLog, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            INSERT INTO audit_logs 
            (id, organization_id, user_id, entity_type, entity_id, action, changes, timestamp, ip_address, user_agent)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING id, organization_id, user_id, entity_type, entity_id, action, changes, timestamp, ip_address, user_agent
            "#,
        )
        .bind(&id)
        .bind(organization_id)
        .bind(user_id)
        .bind(entity_type)
        .bind(entity_id)
        .bind(action)
        .bind(&changes)
        .bind(&now)
        .bind(ip_address)
        .bind(user_agent)
        .fetch_one(pool)
        .await?;

        Ok(AuditLog {
            id: row.get("id"),
            organization_id: row.get("organization_id"),
            user_id: row.get("user_id"),
            entity_type: row.get("entity_type"),
            entity_id: row.get("entity_id"),
            action: row.get("action"),
            changes: row.get("changes"),
            timestamp: row.get("timestamp"),
            ip_address: row.get("ip_address"),
            user_agent: row.get("user_agent"),
        })
    }

    pub async fn get_entity_audit_trail(
        pool: &PgPool,
        organization_id: &str,
        entity_type: &str,
        entity_id: &str,
    ) -> Result<Vec<AuditLog>, sqlx::Error> {
        let rows = sqlx::query(
            r#"
            SELECT id, organization_id, user_id, entity_type, entity_id, action, changes, timestamp, ip_address, user_agent
            FROM audit_logs
            WHERE organization_id = $1 AND entity_type = $2 AND entity_id = $3
            ORDER BY timestamp DESC
            "#,
        )
        .bind(organization_id)
        .bind(entity_type)
        .bind(entity_id)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| AuditLog {
                id: row.get("id"),
                organization_id: row.get("organization_id"),
                user_id: row.get("user_id"),
                entity_type: row.get("entity_type"),
                entity_id: row.get("entity_id"),
                action: row.get("action"),
                changes: row.get("changes"),
                timestamp: row.get("timestamp"),
                ip_address: row.get("ip_address"),
                user_agent: row.get("user_agent"),
            })
            .collect())
    }

    pub async fn get_user_actions(
        pool: &PgPool,
        organization_id: &str,
        user_id: &str,
        limit: i64,
    ) -> Result<Vec<AuditLog>, sqlx::Error> {
        let rows = sqlx::query(
            r#"
            SELECT id, organization_id, user_id, entity_type, entity_id, action, changes, timestamp, ip_address, user_agent
            FROM audit_logs
            WHERE organization_id = $1 AND user_id = $2
            ORDER BY timestamp DESC
            LIMIT $3
            "#,
        )
        .bind(organization_id)
        .bind(user_id)
        .bind(limit)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| AuditLog {
                id: row.get("id"),
                organization_id: row.get("organization_id"),
                user_id: row.get("user_id"),
                entity_type: row.get("entity_type"),
                entity_id: row.get("entity_id"),
                action: row.get("action"),
                changes: row.get("changes"),
                timestamp: row.get("timestamp"),
                ip_address: row.get("ip_address"),
                user_agent: row.get("user_agent"),
            })
            .collect())
    }

    pub fn create_change_record(
        before: Option<Value>,
        after: Value,
    ) -> Value {
        json!({
            "before": before,
            "after": after
        })
    }
}
