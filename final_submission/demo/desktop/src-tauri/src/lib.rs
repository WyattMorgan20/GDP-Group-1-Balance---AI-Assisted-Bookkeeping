mod commands;
mod logic;
mod services;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::greet::greet,
            commands::auth::sign_up,
            commands::auth::choose_role,
            commands::auth::activate_account,
            commands::auth::login,
            commands::dev::dev_login
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
