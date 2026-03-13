use crate::logging::SumoLogger;
use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pub db_pool: Option<PgPool>,
    pub logger: SumoLogger,
}
