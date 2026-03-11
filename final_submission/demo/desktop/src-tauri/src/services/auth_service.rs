use crate::logic::auth::{
    ActivationRequest,
    LoginRequest,
    MembershipRole,
    OrganizationType,
    RoleSelectionRequest,
    SignUpRequest,
    UserAccount,
    TwoFactorSetupRequest,
    TwoFactorSetupResponse,
    TwoFactorVerifyRequest
};
use crate::services::totp_service;
use crate::logging::SumoLogger;
use sqlx::{PgPool, Row};
use uuid::Uuid;
use chrono::Utc;
use serde_json::json;

// Database-backed storage
// All data is persisted in PostgreSQL

pub fn generate_act_code() -> String {
    use rand::Rng;
    let mut rng = rand::thread_rng();
    let mut segment = || -> String {
        (0..4)
            .map(|_| rng.sample(rand::distributions::Alphanumeric) as char)
            .collect::<String>()
            .to_uppercase()
    };
    format!("ACT-{}-{}-{}", segment(), segment(), segment())
}

//Hash password (placeholder - use bcrypt in production)
pub fn hash_password(password: &str) -> String {
    // TODO: Replace with bcrypt::hash(password, bcrypt::DEFAULT_COST)
    format!("HASH_{}", password)
}

pub fn verify_password(password: &str, hash: &str) -> bool {
    // TODO: Replace with bcrypt::verify(password, hash)
    hash == format!("HASH_{}", password)
}

pub async fn sign_up(req: &SignUpRequest, db: &PgPool, logger: &SumoLogger) -> Result<String, String> {
    //Validation
    if req.first_name.trim().is_empty() {
        return Err("First name is required".into());
    }

    if req.last_name.trim().is_empty() {
        return Err("Last name is required".into());
    }

    if req.email.trim().is_empty() || req.password.trim().is_empty() {
        return Err("Email and password are required".into());
    }

    if !req.email.contains('@') {
        return Err("Invalid email format".into());
    }

    if req.password.len() < 8 {
        return Err("Password must be at least 8 characters".into());
    }

    let email_lower = req.email.to_lowercase();
    logger.log("info", &format!("Sign up attempt: {}", email_lower), json!({})).await;

    // Check if email already exists
    let existing = sqlx::query("SELECT id FROM users WHERE email = $1")
        .bind(&email_lower)
        .fetch_optional(db)
        .await
        .map_err(|e| format!("Database error: {}", e))?;

    if existing.is_some() {
        return Err("Email already registered".into());
    }

    // Insert new user into database
    let user_id = Uuid::new_v4();
    sqlx::query(
        r#"INSERT INTO users (id, email, password_hash, first_name, last_name, role_selected, account_activated, first_login, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"#
    )
    .bind(user_id)
    .bind(&email_lower)
    .bind(hash_password(&req.password))
    .bind(&req.first_name)
    .bind(&req.last_name)
    .bind(false)
    .bind(false)
    .bind(true)
    .bind(Utc::now())
    .bind(Utc::now())
    .execute(db)
    .await
    .map_err(|e| format!("Failed to create account: {}", e))?;

    logger.log("info", &format!("Account created: {}", email_lower), json!({ "user_id": user_id.to_string() })).await;
    let activation_code = generate_act_code();
    println!("[AUTH] Account created for email: {}", req.email);
    println!("[AUTH] Activation code: {}", activation_code);

    Ok("Account created. Check your email for activation code.".into())
}

pub async fn store_test_account(db: &PgPool) -> Result<(), String> {
    let test_email = "test@balancd.dev";
    
    // Check if test account already exists
    let existing = sqlx::query("SELECT id FROM users WHERE email = $1")
        .bind(test_email)
        .fetch_optional(db)
        .await
        .map_err(|e| format!("Database error: {}", e))?;
    
    if existing.is_none() {
        let user_id = Uuid::new_v4();
        
        sqlx::query(
            r#"INSERT INTO users (id, email, password_hash, first_name, last_name, role_selected, account_activated, first_login, created_at, updated_at)
               VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)"#
        )
        .bind(user_id)
        .bind(test_email)
        .bind(hash_password("password"))
        .bind("Test")
        .bind("User")
        .bind(false)
        .bind(false)
        .bind(true)
        .bind(Utc::now())
        .bind(Utc::now())
        .execute(db)
        .await
        .map_err(|e| format!("Failed to create test account: {}", e))?;
        
        println!("[AUTH] Test account initialized in database");
    }
    
    Ok(())
}

pub async fn choose_role(req: &RoleSelectionRequest, db: &PgPool, logger: &SumoLogger) -> Result<String, String> {
    let email_lower = req.email.to_lowercase();
    logger.log("info", "Role selection", json!({ "email": &email_lower })).await;

    // Fetch user from database
    let user_row = sqlx::query("SELECT role_selected FROM users WHERE email = $1")
        .bind(&email_lower)
        .fetch_optional(db)
        .await
        .map_err(|e| format!("Database error: {}", e))?
        .ok_or("User not found")?;

    let role_selected: bool = user_row.get("role_selected");
    if role_selected {
        return Err("Role already selected".into());
    }

    // Validate role combination
    match (&req.organization_type, &req.membership_role) {
        (OrganizationType::Business, MembershipRole::Owner | MembershipRole::Employee)
        | (OrganizationType::AccountingFirm, MembershipRole::Owner | MembershipRole::Employee) => {
            // Valid combinations
        }
    }

    // Update user's role in database
    let org_type_str = format!("{:?}", req.organization_type);
    let role_str = format!("{:?}", req.membership_role);
    
    sqlx::query(
        r#"UPDATE users SET role_selected = true, organization_type = $1, membership_role = $2, updated_at = $3 WHERE email = $4"#
    )
    .bind(&org_type_str)
    .bind(&role_str)
    .bind(Utc::now())
    .bind(&email_lower)
    .execute(db)
    .await
    .map_err(|e| format!("Failed to update role: {}", e))?;

    logger.log("info", "Role selected successfully", json!({ "email": &email_lower, "org_type": &org_type_str, "role": &role_str })).await;
    println!("[AUTH] Role selected for {}: {:?} {:?}", 
        req.email, req.organization_type, req.membership_role);

    Ok("Role selected successfully".into())
}

pub async fn reset_choose_role(email: &str, db: &PgPool, logger: &SumoLogger) -> Result<String, String> {
    let email_lower = email.to_lowercase();
    logger.log("info", "Reset role selection", json!({ "email": &email_lower })).await;
    
    // Verify user exists
    let _ = sqlx::query("SELECT id FROM users WHERE email = $1")
        .bind(&email_lower)
        .fetch_optional(db)
        .await
        .map_err(|e| format!("Database error: {}", e))?
        .ok_or("User not found")?;
    
    // Reset role selection in database
    sqlx::query(
        r#"UPDATE users SET role_selected = false, organization_type = NULL, membership_role = NULL, updated_at = $1 WHERE email = $2"#
    )
    .bind(Utc::now())
    .bind(&email_lower)
    .execute(db)
    .await
    .map_err(|e| format!("Failed to reset role: {}", e))?;
    
    println!("[AUTH] Role selection reset for: {}", email);
    
    Ok("Role selection reset successfully".into())
}

pub async fn activate_account(req: &ActivationRequest, db: &PgPool, logger: &SumoLogger) -> Result<String, String> {
    if req.activation_code.trim().is_empty() {
        return Err("Activation code is required".into());
    }

    let email_lower = req.email.to_lowercase();
    logger.log("info", "Account activation", json!({ "email": &email_lower })).await;

    // Fetch user from database
    let user_row = sqlx::query(
        r#"SELECT role_selected, account_activated, organization_type, membership_role FROM users WHERE email = $1"#
    )
    .bind(&email_lower)
    .fetch_optional(db)
    .await
    .map_err(|e| format!("Database error: {}", e))?
    .ok_or("User not found")?;
    
    let role_selected: bool = user_row.get("role_selected");
    let account_activated: bool = user_row.get("account_activated");
    
    // Validate state
    if !role_selected {
        return Err("Role must be selected before activation".into());
    }

    if account_activated {
        return Err("Account is already activated".into());
    }

    // TODO: Validate activation code against stored codes with expiration
    // For now, accept any non-empty code
    let organization_type: String = user_row.get("organization_type");
    let membership_role: String = user_row.get("membership_role");

    // Update account as activated
    sqlx::query(
        r#"UPDATE users SET account_activated = true, first_login = false, updated_at = $1 WHERE email = $2"#
    )
    .bind(Utc::now())
    .bind(&email_lower)
    .execute(db)
    .await
    .map_err(|e| format!("Failed to activate account: {}", e))?;

    logger.log("info", "Account activated successfully", json!({ "email": &email_lower, "org_type": &organization_type, "role": &membership_role })).await;
    println!("[AUTH] Account activated for: {}", email_lower);

    Ok("Account activated successfully".into())
}

pub async fn login(req: &LoginRequest, db: &PgPool, logger: &SumoLogger) -> Result<UserAccount, String> {
    store_test_account(db).await?;

    if req.email.trim().is_empty() || req.password.trim().is_empty() {
        return Err("Email and password are required".into());
    }

    let email_lower = req.email.to_lowercase();
    logger.log("info", &format!("Login attempt: {}", email_lower), json!({})).await;

    // Look up the user in database
    let user_row = sqlx::query(
        r#"SELECT id, email, password_hash, first_name, last_name, first_login, role_selected, account_activated, organization_type, membership_role, organization_id FROM users WHERE email = $1"#
    )
    .bind(&email_lower)
    .fetch_optional(db)
    .await
    .map_err(|e| format!("Database error: {}", e))?
    .ok_or("Incorrect email or password")?;
    
    let password_hash: String = user_row.get("password_hash");
    
    // Verify password
    if !verify_password(&req.password, &password_hash) {
        logger.log("warn", "Login failed - incorrect password", json!({ "email": &email_lower })).await;
        println!("[AUTH] Login failed for email: {}", req.email);
        return Err("Incorrect email or password".into());
    }
    
    logger.log("info", "Login successful", json!({ "email": &email_lower })).await;
    println!("[AUTH] Login successful for: {}", email_lower);

    // Return User struct
    Ok(UserAccount {
        id: user_row.get("id"),
        first_name: user_row.get("first_name"),
        last_name: user_row.get("last_name"),
        email: user_row.get("email"),
        password_hash,
        first_login: user_row.get("first_login"),
        role_selected: user_row.get("role_selected"),
        account_activated: user_row.get("account_activated"),
        organization_type: None, // TODO: Deserialize from string in DB
        membership_role: None,    // TODO: Deserialize from string in DB
        organization_id: user_row.get("organization_id")
    })
}

pub async fn setup_2fa(req: &TwoFactorSetupRequest, db: &PgPool, logger: &SumoLogger) -> Result<TwoFactorSetupResponse, String> {
    let secret = totp_service::generate_secret();
    let email_lower = req.email.to_lowercase();
    
    println!("[2FA] setup_2fa called for email: {}", email_lower);
    println!("[2FA] Generated secret: {}", secret);
    logger.log("info", "2FA setup", json!({ "email": &email_lower })).await;

    // Generate QR code URL
    let qr_code_url = totp_service::generate_qr_code_url(&email_lower, &secret, "Balancd");

    // Store the secret temporarily in database (in production, with expiration time)
    sqlx::query(
        r#"INSERT INTO two_fa_secrets (email, secret, created_at) VALUES ($1, $2, $3)
           ON CONFLICT (email) DO UPDATE SET secret = $2, created_at = $3"#
    )
    .bind(&email_lower)
    .bind(&secret)
    .bind(Utc::now())
    .execute(db)
    .await
    .map_err(|e| format!("Database error: {}", e))?;
    
    logger.log("info", "2FA secret stored", json!({ "email": &email_lower })).await;
    println!("[2FA] Stored secret for email: {}", email_lower);

    Ok(TwoFactorSetupResponse {
        secret: secret.clone(),
        qr_code_url,
    })
}

pub async fn verify_2fa(req: &TwoFactorVerifyRequest, db: &PgPool, logger: &SumoLogger) -> Result<String, String> {
    let email_lower = req.email.to_lowercase();
    
    println!("[2FA] verify_2fa called for email: {}", email_lower);
    println!("[2FA] Received TOTP code: {}", req.totp_code);
    logger.log("info", "2FA verification", json!({ "email": &email_lower })).await;
    
    // Retrieve the stored secret from database
    let secret_row = sqlx::query("SELECT secret FROM two_fa_secrets WHERE email = $1")
        .bind(&email_lower)
        .fetch_optional(db)
        .await
        .map_err(|e| format!("Database error: {}", e))?
        .ok_or("No 2FA setup found for this email. Please set up 2FA first.")?;
    
    let stored_secret: String = secret_row.get("secret");
    println!("[2FA] Found stored secret");

    // Verify the TOTP code matches the stored secret
    let is_valid = totp_service::verify_totp(&stored_secret, &req.totp_code);
    println!("[2FA] TOTP verification result: {}", is_valid);
    
    if is_valid {
        // Remove the secret after successful verification
        sqlx::query("DELETE FROM two_fa_secrets WHERE email = $1")
            .bind(&email_lower)
            .execute(db)
            .await
            .map_err(|e| format!("Database error: {}", e))?;
        
        println!("[2FA] SUCCESS: Removed secret for email: {}", email_lower);
        logger.log("info", "2FA verification successful", json!({ "email": &email_lower })).await;
        
        Ok("Two-factor authentication enabled successfully".into())
    } else {
        println!("[2FA] FAILED: Code does not match stored secret");
        logger.log("warn", "2FA verification failed", json!({ "email": &email_lower })).await;
        Err("Invalid authentication code. Please try again.".into())
    }
}
