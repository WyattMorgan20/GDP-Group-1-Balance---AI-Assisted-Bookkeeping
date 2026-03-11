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
use crate::logging::SumoLogger;
use sqlx::PgPool;
use tauri::State;
use serde_json::json;

#[tauri::command]
pub async fn sign_up(
    req: SignUpRequest,
    db: State<'_, PgPool>,
    logger: State<'_, SumoLogger>,
) -> Result<String, String> {
    logger.log("info", &format!("Sign up attempt: {}", req.email), json!({})).await;
    auth_service::sign_up(&req, &db, &logger).await
}

#[tauri::command]
pub async fn choose_role(
    req: RoleSelectionRequest,
    db: State<'_, PgPool>,
    logger: State<'_, SumoLogger>,
) -> Result<String, String> {
    logger.log("info", "Role selection", json!({ "email": &req.email })).await;
    auth_service::choose_role(&req, &db, &logger).await
}

#[tauri::command]
pub async fn reset_choose_role(
    email: String,
    db: State<'_, PgPool>,
    logger: State<'_, SumoLogger>,
) -> Result<String, String> {
    logger.log("info", "Reset role selection", json!({ "email": &email })).await;
    auth_service::reset_choose_role(&email, &db, &logger).await
}

#[tauri::command]
pub async fn activate_account(
    req: ActivationRequest,
    db: State<'_, PgPool>,
    logger: State<'_, SumoLogger>,
) -> Result<String, String> {
    logger.log("info", "Account activation", json!({ "email": &req.email })).await;
    auth_service::activate_account(&req, &db, &logger).await
}

#[tauri::command]
pub async fn login(
    req: LoginRequest,
    db: State<'_, PgPool>,
    logger: State<'_, SumoLogger>,
) -> Result<UserAccount, String> {
    logger.log("info", &format!("Login attempt: {}", req.email), json!({})).await;
    auth_service::login(&req, &db, &logger).await
}

#[tauri::command]
pub async fn setup_2fa(
    req: TwoFactorSetupRequest,
    db: State<'_, PgPool>,
    logger: State<'_, SumoLogger>,
) -> Result<TwoFactorSetupResponse, String> {
    logger.log("info", "2FA setup", json!({ "email": &req.email })).await;
    auth_service::setup_2fa(&req, &db, &logger).await
}

#[tauri::command]
pub async fn verify_2fa(
    req: TwoFactorVerifyRequest,
    db: State<'_, PgPool>,
    logger: State<'_, SumoLogger>,
) -> Result<String, String> {
    logger.log("info", "2FA verification", json!({ "email": &req.email })).await;
    auth_service::verify_2fa(&req, &db, &logger).await
}
