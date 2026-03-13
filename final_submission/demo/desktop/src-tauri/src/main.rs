#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;

use db::init_db;
use desktop_lib::logging::SumoLogger;
use std::env;
use sqlx::PgPool;
use desktop_lib::AppState;

#[tokio::main]
async fn main() {
    // Initialize database (optional for development)
    let db_url = env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://user:password@localhost:5432/balancd".to_string());
    
    // Try to connect to database, but don't fail if it's not available
    let db_pool: Option<PgPool> = match init_db(&db_url).await {
        Ok(pool) => {
            println!("✓ Database connected successfully");
            Some(pool)
        },
        Err(e) => {
            eprintln!("⚠ Warning: Could not initialize database: {}", e);
            eprintln!("→ Running in limited mode. Some features require PostgreSQL.");
            eprintln!("→ Install & start PostgreSQL and set DATABASE_URL to enable full features.\n");
            None
        }
    };

    // Initialize Sumo Logic logger
    let sumo_endpoint = env::var("SUMO_LOGIC_HTTP_SOURCE")
        .unwrap_or_else(|_| "https://your-sumo-logic-url.sumologic.com/receiver/...".to_string());
    let logger = SumoLogger::new(&sumo_endpoint);

    let app_state = AppState { db_pool, logger };

    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            // Auth commands
            desktop_lib::commands::auth::sign_up,
            desktop_lib::commands::auth::choose_role,
            desktop_lib::commands::auth::reset_choose_role,
            desktop_lib::commands::auth::activate_account,
            desktop_lib::commands::auth::login,
            desktop_lib::commands::auth::setup_2fa,
            desktop_lib::commands::auth::verify_2fa,
            // Organization commands
            desktop_lib::commands::organizations::create_organization,
            desktop_lib::commands::organizations::get_organization,
            desktop_lib::commands::organizations::get_user_organizations,
            desktop_lib::commands::organizations::create_department,
            desktop_lib::commands::organizations::get_departments,
            desktop_lib::commands::organizations::create_team,
            desktop_lib::commands::organizations::get_teams,
            desktop_lib::commands::organizations::create_role,
            desktop_lib::commands::organizations::get_roles,
            // Transaction commands
            desktop_lib::commands::transactions::create_transaction,
            desktop_lib::commands::transactions::get_organization_transactions,
            desktop_lib::commands::transactions::flag_variance,
            desktop_lib::commands::transactions::get_organization_variances,
            desktop_lib::commands::transactions::resolve_variance,
            // Audit commands
            desktop_lib::commands::audit::log_action,
            desktop_lib::commands::audit::get_entity_audit_trail,
            desktop_lib::commands::audit::get_user_actions,
        ])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|_app_handle, _event| {})
}
