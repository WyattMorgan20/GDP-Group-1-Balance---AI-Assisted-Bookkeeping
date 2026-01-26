use crate::services::auth_service;

#[tauri::command]
pub fn authenticate_user(username: String, password: String) -> Result<crate::logic::user::User, String> {
    auth_service::authenticate(username, password)
}
