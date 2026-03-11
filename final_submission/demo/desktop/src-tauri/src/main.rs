#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
mod logging;

use db::init_db;
use logging::SumoLogger;
use std::env;

#[tokio::main]
async fn main() {
    // Initialize database
    let db_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://user:password@localhost:5432/balancd".to_string());
    
    let db_pool = init_db(&db_url).await
        .expect("Failed to initialize database");

    // Initialize Sumo Logic logger
    let sumo_endpoint = env::var("SUMO_LOGIC_HTTP_SOURCE")
        .unwrap_or_else(|_| "https://your-sumo-logic-url.sumologic.com/receiver/...".to_string());
    let sumo_logger = SumoLogger::new(&sumo_endpoint);

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(db_pool)
        .manage(sumo_logger)
        .invoke_handler(tauri::generate_handler![
            desktop_lib::commands::auth::sign_up,
            desktop_lib::commands::auth::choose_role,
            desktop_lib::commands::auth::reset_choose_role,
            desktop_lib::commands::auth::activate_account,
            desktop_lib::commands::auth::login,
            desktop_lib::commands::auth::setup_2fa,
            desktop_lib::commands::auth::verify_2fa
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, _event| {})
}