use sqlx::postgres::PgPool;
use sqlx::postgres::PgPoolOptions;

pub async fn init_db(database_url: &str) -> Result<PgPool, sqlx::Error> {
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await?;
    
    // Run migrations - Users and Authentication
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

    // Create Organizations table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS organizations (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            owner_id UUID NOT NULL,
            organization_type VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES users(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Departments table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS departments (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Teams table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS teams (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            department_id UUID NOT NULL,
            organization_id UUID NOT NULL,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id),
            FOREIGN KEY (organization_id) REFERENCES organizations(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Roles table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS roles (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            permission_level VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Employees table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS employees (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            user_id UUID,
            department_id UUID,
            team_id UUID,
            role_id UUID NOT NULL,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255),
            phone VARCHAR(20),
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id),
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (department_id) REFERENCES departments(id),
            FOREIGN KEY (team_id) REFERENCES teams(id),
            FOREIGN KEY (role_id) REFERENCES roles(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Audit Logs table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS audit_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            user_id UUID,
            entity_type VARCHAR(100) NOT NULL,
            entity_id UUID NOT NULL,
            action VARCHAR(50) NOT NULL,
            changes JSONB,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            ip_address VARCHAR(45),
            user_agent TEXT,
            FOREIGN KEY (organization_id) REFERENCES organizations(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Documents table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS documents (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            document_type VARCHAR(100) NOT NULL,
            file_path VARCHAR(1024),
            extracted_data JSONB,
            uploaded_by UUID,
            upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id),
            FOREIGN KEY (uploaded_by) REFERENCES users(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Transactions table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS transactions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            account_name VARCHAR(255) NOT NULL,
            account_type VARCHAR(50) NOT NULL,
            description VARCHAR(1024),
            amount NUMERIC(15, 2) NOT NULL,
            transaction_date DATE NOT NULL,
            posted_date TIMESTAMP NOT NULL,
            reconciled BOOLEAN DEFAULT false,
            variance_flagged BOOLEAN DEFAULT false,
            linked_document_ids UUID[] DEFAULT ARRAY[]::UUID[],
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            created_by UUID,
            modified_by UUID,
            FOREIGN KEY (organization_id) REFERENCES organizations(id),
            FOREIGN KEY (created_by) REFERENCES users(id),
            FOREIGN KEY (modified_by) REFERENCES users(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Variances table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS variances (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            transaction_id UUID NOT NULL,
            variance_type VARCHAR(100) NOT NULL,
            description TEXT,
            flagged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            resolved BOOLEAN DEFAULT false,
            resolved_at TIMESTAMP,
            resolved_by UUID,
            FOREIGN KEY (organization_id) REFERENCES organizations(id),
            FOREIGN KEY (transaction_id) REFERENCES transactions(id),
            FOREIGN KEY (resolved_by) REFERENCES users(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Reconciliations table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS reconciliations (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            organization_id UUID NOT NULL,
            document_id UUID NOT NULL,
            reconciliation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            matched_transactions UUID[] DEFAULT ARRAY[]::UUID[],
            unmatched_items JSONB,
            status VARCHAR(50) DEFAULT 'pending',
            approved_by UUID,
            approved_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (organization_id) REFERENCES organizations(id),
            FOREIGN KEY (document_id) REFERENCES documents(id),
            FOREIGN KEY (approved_by) REFERENCES users(id)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Permissions table
    sqlx::query(
        r#"
        CREATE TABLE IF NOT EXISTS permissions (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            role_id UUID NOT NULL,
            permission_name VARCHAR(100) NOT NULL,
            resource_type VARCHAR(100) NOT NULL,
            action VARCHAR(50) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (role_id) REFERENCES roles(id),
            UNIQUE(role_id, permission_name)
        );
        "#,
    )
    .execute(&pool)
    .await?;

    // Create Indexes for performance
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_audit_logs_organization ON audit_logs(organization_id);")
        .execute(&pool)
        .await?;
    
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);")
        .execute(&pool)
        .await?;
    
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_transactions_organization ON transactions(organization_id);")
        .execute(&pool)
        .await?;
    
    sqlx::query("CREATE INDEX IF NOT EXISTS idx_variances_transaction ON variances(transaction_id);")
        .execute(&pool)
        .await?;

    Ok(pool)
}