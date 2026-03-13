use crate::logic::auth::{
    ActivationRequest,
    LoginRequest,
    RoleSelectionRequest,
    SignUpRequest,
    UserAccount,
    TwoFactorSetupRequest,
    TwoFactorSetupResponse,
    TwoFactorVerifyRequest
};
use crate::services::auth_service;
use crate::AppState;
use tauri::State;
use serde_json::json;

#[tauri::command]
pub async fn sign_up(
    req: SignUpRequest,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running and DATABASE_URL is set.".to_string())?;
    state.logger.log("info", &format!("Sign up attempt: {}", req.email), json!({})).await;
    auth_service::sign_up(&req, pool, &state.logger).await
}

#[tauri::command]
pub async fn choose_role(
    req: RoleSelectionRequest,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running and DATABASE_URL is set.".to_string())?;
    state.logger.log("info", "Role selection", json!({ "email": &req.email })).await;
    auth_service::choose_role(&req, pool, &state.logger).await
}

#[tauri::command]
pub async fn reset_choose_role(
    email: String,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running and DATABASE_URL is set.".to_string())?;
    state.logger.log("info", "Reset role selection", json!({ "email": &email })).await;
    auth_service::reset_choose_role(&email, pool, &state.logger).await
}

#[tauri::command]
pub async fn activate_account(
    req: ActivationRequest,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running and DATABASE_URL is set.".to_string())?;
    state.logger.log("info", "Account activation", json!({ "email": &req.email })).await;
    auth_service::activate_account(&req, pool, &state.logger).await
}

#[tauri::command]
pub async fn login(
    req: LoginRequest,
    state: State<'_, AppState>,
) -> Result<UserAccount, String> {
    let pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running and DATABASE_URL is set.".to_string())?;
    state.logger.log("info", &format!("Login attempt: {}", req.email), json!({})).await;
    auth_service::login(&req, pool, &state.logger).await
}

#[tauri::command]
pub async fn setup_2fa(
    req: TwoFactorSetupRequest,
    state: State<'_, AppState>,
) -> Result<TwoFactorSetupResponse, String> {
    let pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running and DATABASE_URL is set.".to_string())?;
    state.logger.log("info", "2FA setup", json!({ "email": &req.email })).await;
    auth_service::setup_2fa(&req, pool, &state.logger).await
}

#[tauri::command]
pub async fn verify_2fa(
    req: TwoFactorVerifyRequest,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running and DATABASE_URL is set.".to_string())?;
    state.logger.log("info", "2FA verification", json!({ "email": &req.email })).await;
    auth_service::verify_2fa(&req, pool, &state.logger).await
}
