use sqlx::postgres::PgPool;
use sqlx::postgres::PgPoolOptions;

pub async fn init_db(database_url: &str) -> Result<PgPool, sqlx::Error> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await?;
    
    // Run migrations
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS users (
            id UUID PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            role_selected BOOLEAN DEFAULT false,
            account_activated BOOLEAN DEFAULT false,
            first_login BOOLEAN DEFAULT true,
            organization_type VARCHAR(50),
            membership_role VARCHAR(50),
            organization_id UUID,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        "#,
    )
    .execute(&pool)
    .await?;

    sqlx::query(
    r#"
    CREATE TABLE IF NOT EXISTS two_fa_secrets (
        email VARCHAR(255) PRIMARY KEY,
        secret VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    "#,
    )
    .execute(&pool)
    .await?;

    Ok(pool)
}