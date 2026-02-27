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

#[tauri::command]
pub fn sign_up(req: SignUpRequest) -> Result<String, String> {
    auth_service::sign_up(&req)
}

#[tauri::command]
pub fn choose_role(req: RoleSelectionRequest) -> Result<String, String> {
    auth_service::choose_role(&req)
}

#[tauri::command]
pub fn reset_choose_role(email: String) -> Result<String, String> {
    auth_service::reset_choose_role(&email)
}

#[tauri::command]
pub fn activate_account(req: ActivationRequest) -> Result<String, String> {
    auth_service::activate_account(&req)
}

#[tauri::command]
pub fn login(req: LoginRequest) -> Result<UserAccount, String> {
    auth_service::login(&req)
}

#[tauri::command]
pub fn setup_2fa(req: TwoFactorSetupRequest) -> Result<TwoFactorSetupResponse, String> {
    auth_service::setup_2fa(&req)
}

#[tauri::command]
pub fn verify_2fa(req: TwoFactorVerifyRequest) -> Result<String, String> {
    auth_service::verify_2fa(&req)
}
