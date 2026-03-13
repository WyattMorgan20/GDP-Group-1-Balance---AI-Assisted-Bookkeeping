use sqlx::{PgPool, Row};
use uuid::Uuid;
use chrono::Utc;

#[derive(Debug, Clone)]
pub struct Transaction {
    pub id: String,
    pub organization_id: String,
    pub account_name: String,
    pub account_type: String,
    pub description: Option<String>,
    pub amount: f64,
    pub transaction_date: String,
    pub posted_date: String,
    pub reconciled: bool,
    pub variance_flagged: bool,
    pub linked_document_ids: Vec<String>,
    pub created_at: String,
    pub updated_at: String,
    pub created_by: String,
    pub modified_by: String,
}

#[derive(Debug, Clone)]
pub struct Variance {
    pub id: String,
    pub organization_id: String,
    pub transaction_id: String,
    pub variance_type: String,
    pub description: Option<String>,
    pub flagged_at: String,
    pub resolved: bool,
    pub resolved_at: Option<String>,
    pub resolved_by: Option<String>,
}

pub struct TransactionService;

impl TransactionService {
    pub async fn create_transaction(
        pool: &PgPool,
        organization_id: &str,
        account_name: &str,
        account_type: &str,
        amount: f64,
        transaction_date: &str,
        description: Option<&str>,
        created_by: &str,
    ) -> Result<Transaction, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            INSERT INTO transactions 
            (id, organization_id, account_name, account_type, amount, transaction_date, posted_date, description, created_by, modified_by, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id, organization_id, account_name, account_type, amount, transaction_date, posted_date, 
                      description, created_by, modified_by, created_at, updated_at, reconciled, variance_flagged, linked_document_ids
            "#,
        )
        .bind(&id)
        .bind(organization_id)
        .bind(account_name)
        .bind(account_type)
        .bind(amount)
        .bind(transaction_date)
        .bind(&now)
        .bind(description)
        .bind(created_by)
        .bind(created_by)
        .bind(&now)
        .bind(&now)
        .fetch_one(pool)
        .await?;

        Ok(Transaction {
            id: row.get("id"),
            organization_id: row.get("organization_id"),
            account_name: row.get("account_name"),
            account_type: row.get("account_type"),
            amount: row.get("amount"),
            transaction_date: row.get("transaction_date"),
            posted_date: row.get("posted_date"),
            description: row.get("description"),
            created_by: row.get("created_by"),
            modified_by: row.get("modified_by"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
            reconciled: row.get("reconciled"),
            variance_flagged: row.get("variance_flagged"),
            linked_document_ids: row.get::<Vec<String>, _>("linked_document_ids"),
        })
    }

    pub async fn get_organization_transactions(
        pool: &PgPool,
        organization_id: &str,
    ) -> Result<Vec<Transaction>, sqlx::Error> {
        let rows = sqlx::query(
            r#"
            SELECT id, organization_id, account_name, account_type, amount, transaction_date, posted_date, 
                   description, created_by, modified_by, created_at, updated_at, reconciled, variance_flagged, linked_document_ids
            FROM transactions
            WHERE organization_id = $1
            ORDER BY transaction_date DESC
            "#,
        )
        .bind(organization_id)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| Transaction {
                id: row.get("id"),
                organization_id: row.get("organization_id"),
                account_name: row.get("account_name"),
                account_type: row.get("account_type"),
                amount: row.get("amount"),
                transaction_date: row.get("transaction_date"),
                posted_date: row.get("posted_date"),
                description: row.get("description"),
                created_by: row.get("created_by"),
                modified_by: row.get("modified_by"),
                created_at: row.get("created_at"),
                updated_at: row.get("updated_at"),
                reconciled: row.get("reconciled"),
                variance_flagged: row.get("variance_flagged"),
                linked_document_ids: row.get::<Vec<String>, _>("linked_document_ids"),
            })
            .collect())
    }

    pub async fn flag_variance(
        pool: &PgPool,
        organization_id: &str,
        transaction_id: &str,
        variance_type: &str,
        description: Option<&str>,
    ) -> Result<Variance, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            INSERT INTO variances (id, organization_id, transaction_id, variance_type, description, flagged_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, organization_id, transaction_id, variance_type, description, flagged_at, resolved, resolved_at, resolved_by
            "#,
        )
        .bind(&id)
        .bind(organization_id)
        .bind(transaction_id)
        .bind(variance_type)
        .bind(description)
        .bind(&now)
        .fetch_one(pool)
        .await?;

        // Mark transaction as having variance
        sqlx::query("UPDATE transactions SET variance_flagged = true WHERE id = $1")
            .bind(transaction_id)
            .execute(pool)
            .await?;

        Ok(Variance {
            id: row.get("id"),
            organization_id: row.get("organization_id"),
            transaction_id: row.get("transaction_id"),
            variance_type: row.get("variance_type"),
            description: row.get("description"),
            flagged_at: row.get("flagged_at"),
            resolved: row.get("resolved"),
            resolved_at: row.get("resolved_at"),
            resolved_by: row.get("resolved_by"),
        })
    }

    pub async fn get_organization_variances(
        pool: &PgPool,
        organization_id: &str,
    ) -> Result<Vec<Variance>, sqlx::Error> {
        let rows = sqlx::query(
            r#"
            SELECT id, organization_id, transaction_id, variance_type, description, flagged_at, resolved, resolved_at, resolved_by
            FROM variances
            WHERE organization_id = $1 AND resolved = false
            ORDER BY flagged_at DESC
            "#,
        )
        .bind(organization_id)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| Variance {
                id: row.get("id"),
                organization_id: row.get("organization_id"),
                transaction_id: row.get("transaction_id"),
                variance_type: row.get("variance_type"),
                description: row.get("description"),
                flagged_at: row.get("flagged_at"),
                resolved: row.get("resolved"),
                resolved_at: row.get("resolved_at"),
                resolved_by: row.get("resolved_by"),
            })
            .collect())
    }

    pub async fn resolve_variance(
        pool: &PgPool,
        variance_id: &str,
        resolved_by: &str,
    ) -> Result<Variance, sqlx::Error> {
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            UPDATE variances
            SET resolved = true, resolved_at = $2, resolved_by = $3
            WHERE id = $1
            RETURNING id, organization_id, transaction_id, variance_type, description, flagged_at, resolved, resolved_at, resolved_by
            "#,
        )
        .bind(variance_id)
        .bind(&now)
        .bind(resolved_by)
        .fetch_one(pool)
        .await?;

        Ok(Variance {
            id: row.get("id"),
            organization_id: row.get("organization_id"),
            transaction_id: row.get("transaction_id"),
            variance_type: row.get("variance_type"),
            description: row.get("description"),
            flagged_at: row.get("flagged_at"),
            resolved: row.get("resolved"),
            resolved_at: row.get("resolved_at"),
            resolved_by: row.get("resolved_by"),
        })
    }
}
