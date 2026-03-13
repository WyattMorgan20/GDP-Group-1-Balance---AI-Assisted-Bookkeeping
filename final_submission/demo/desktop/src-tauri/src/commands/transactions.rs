use tauri::State;
use serde::{Serialize, Deserialize};
use crate::services::transactions::TransactionService;
use crate::AppState;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TransactionResponse {
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

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct VarianceResponse {
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

#[tauri::command]
pub async fn create_transaction(
    state: State<'_, AppState>,
    organization_id: String,
    account_name: String,
    account_type: String,
    amount: f64,
    transaction_date: String,
    description: Option<String>,
    created_by: String,
) -> Result<TransactionResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let tx = TransactionService::create_transaction(
        db_pool,
        &organization_id,
        &account_name,
        &account_type,
        amount,
        &transaction_date,
        description.as_deref(),
        &created_by,
    )
    .await
    .map_err(|e| e.to_string())?;

    Ok(TransactionResponse {
        id: tx.id,
        organization_id: tx.organization_id,
        account_name: tx.account_name,
        account_type: tx.account_type,
        description: tx.description,
        amount: tx.amount,
        transaction_date: tx.transaction_date,
        posted_date: tx.posted_date,
        reconciled: tx.reconciled,
        variance_flagged: tx.variance_flagged,
        linked_document_ids: tx.linked_document_ids,
        created_at: tx.created_at,
        updated_at: tx.updated_at,
        created_by: tx.created_by,
        modified_by: tx.modified_by,
    })
}

#[tauri::command]
pub async fn get_organization_transactions(
    state: State<'_, AppState>,
    organization_id: String,
) -> Result<Vec<TransactionResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let transactions = TransactionService::get_organization_transactions(db_pool, &organization_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(transactions
        .into_iter()
        .map(|tx| TransactionResponse {
            id: tx.id,
            organization_id: tx.organization_id,
            account_name: tx.account_name,
            account_type: tx.account_type,
            description: tx.description,
            amount: tx.amount,
            transaction_date: tx.transaction_date,
            posted_date: tx.posted_date,
            reconciled: tx.reconciled,
            variance_flagged: tx.variance_flagged,
            linked_document_ids: tx.linked_document_ids,
            created_at: tx.created_at,
            updated_at: tx.updated_at,
            created_by: tx.created_by,
            modified_by: tx.modified_by,
        })
        .collect())
}

#[tauri::command]
pub async fn flag_variance(
    state: State<'_, AppState>,
    organization_id: String,
    transaction_id: String,
    variance_type: String,
    description: Option<String>,
) -> Result<VarianceResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let variance = TransactionService::flag_variance(
        db_pool,
        &organization_id,
        &transaction_id,
        &variance_type,
        description.as_deref(),
    )
    .await
    .map_err(|e| e.to_string())?;

    Ok(VarianceResponse {
        id: variance.id,
        organization_id: variance.organization_id,
        transaction_id: variance.transaction_id,
        variance_type: variance.variance_type,
        description: variance.description,
        flagged_at: variance.flagged_at,
        resolved: variance.resolved,
        resolved_at: variance.resolved_at,
        resolved_by: variance.resolved_by,
    })
}

#[tauri::command]
pub async fn get_organization_variances(
    state: State<'_, AppState>,
    organization_id: String,
) -> Result<Vec<VarianceResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let variances = TransactionService::get_organization_variances(db_pool, &organization_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(variances
        .into_iter()
        .map(|v| VarianceResponse {
            id: v.id,
            organization_id: v.organization_id,
            transaction_id: v.transaction_id,
            variance_type: v.variance_type,
            description: v.description,
            flagged_at: v.flagged_at,
            resolved: v.resolved,
            resolved_at: v.resolved_at,
            resolved_by: v.resolved_by,
        })
        .collect())
}

#[tauri::command]
pub async fn resolve_variance(
    state: State<'_, AppState>,
    variance_id: String,
    resolved_by: String,
) -> Result<VarianceResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let variance = TransactionService::resolve_variance(db_pool, &variance_id, &resolved_by)
        .await
        .map_err(|e| e.to_string())?;

    Ok(VarianceResponse {
        id: variance.id,
        organization_id: variance.organization_id,
        transaction_id: variance.transaction_id,
        variance_type: variance.variance_type,
        description: variance.description,
        flagged_at: variance.flagged_at,
        resolved: variance.resolved,
        resolved_at: variance.resolved_at,
        resolved_by: variance.resolved_by,
    })
}
