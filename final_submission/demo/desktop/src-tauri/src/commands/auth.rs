use crate::logic::auth::{ActivationRequest, LoginRequest, RoleSelectionRequest, SignUpRequest, User, TwoFactorSetupRequest, TwoFactorSetupResponse, TwoFactorVerifyRequest};
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
pub fn activate_account(req: ActivationRequest) -> Result<String, String> {
    auth_service::activate_account(&req)
}

#[tauri::command]
pub fn login(req: LoginRequest) -> Result<User, String> {
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
