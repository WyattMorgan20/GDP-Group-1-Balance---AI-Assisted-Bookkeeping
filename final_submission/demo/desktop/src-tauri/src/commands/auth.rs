use crate::logic::auth::{ActivationRequest, LoginRequest, RoleSelectionRequest, SignUpRequest, User};
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
