use crate::logic::auth::{
    ActivationRequest,
    LoginRequest,
    MembershipRole,
    OrganizationType,
    RoleSelectionRequest,
    SignUpRequest,
    UserAccount,
    Organization,
    TwoFactorSetupRequest,
    TwoFactorSetupResponse,
    TwoFactorVerifyRequest
};
use crate::services::totp_service;
use std::collections::HashMap;
use std::sync::Mutex;

// In-memory storage for user accounts and 2FA secrets (for development/testing)
// In production, this should be persisted in a database
lazy_static::lazy_static! {
    // email -> UserAccount
    static ref USERS: Mutex<HashMap<String, UserAccount>> = Mutex::new(HashMap::new());

    // email -> Organization
    static ref ORGANIZATIONS: Mutex<HashMap<String, Organization>> = Mutex::new(HashMap::new());
    
    // organization_code -> email (to link employees to organizations)
    static ref ORG_CODES: Mutex<HashMap<String, String>> = Mutex::new(HashMap::new());

    //email -> secret (tepmorary 2FA storage)
    static ref TWO_FA_SECRETS: Mutex<HashMap<String, String>> = Mutex::new(HashMap::new());

    //Global ID Counter
    static ref NEXT_USER_ID: Mutex<i32> = Mutex::new(1);
}

/*pub fn generate_act_code() -> String {
    use std::time::{SystemTime, UNIX_EPOCH};
    let timestamp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs();
    format!("ACT-{}", timestamp)
}*/

//Hash password (placeholder - use bcrypt in production)
pub fn hash_password(password: &str) -> String {
    // TODO: Replace with bcrypt::hash(password, bcrypt::DEFAULT_COST)
    format!("HASH_{}", password)
}

pub fn verify_password(password: &str, hash: &str) -> bool {
    // TODO: Replace with bcrypt::verify(password, hash)
    hash == format!("HASH_{}", password)
}

pub fn sign_up(req: &SignUpRequest) -> Result<String, String> {
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

    // Store the user in memory (case-insensitive email)
    let mut users = USERS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let email_lower = req.email.to_lowercase();
    
    if users.contains_key(&email_lower) {
        return Err("Email already registered".into());
    }

    // Get next user ID
    let mut next_id = NEXT_USER_ID.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let user_id = *next_id;
    *next_id += 1;
    drop(next_id);
    
    // For development: store plain password (in production, hash it)
    let user_account = UserAccount {
        id: user_id,
        first_name: req.first_name.clone(),
        last_name: req.last_name.clone(),
        email: req.email.clone(),
        password_hash: hash_password(&req.password),
        first_login: true,
        role_selected: false,
        account_activated: false,
        organization_type: None,
        membership_role: None,
        organization_id: None
    };
    
    users.insert(email_lower.clone(), user_account);
    println!("[AUTH] Account created for email: {}", req.email);

    // TODO: Persist User
    // TODO: Send activation email

    // For now, we assume success
    Ok("Account created. Check your email for activation code.".into())
}

pub fn store_test_account() {
    let mut users = USERS.lock().unwrap();
    let test_email = "test@balancd.dev".to_lowercase();
    
    if !users.contains_key(&test_email) {
        let mut next_id = NEXT_USER_ID.lock().unwrap();
        let user_id = *next_id;
        *next_id += 1;
        drop(next_id);
        
        let test_account = UserAccount {
            id: user_id,
            first_name: "Test".into(),
            last_name: "User".into(),
            email: "test@balancd.dev".into(),
            password_hash: hash_password("password"),
            first_login: true,
            role_selected: false,
            account_activated: false,
            organization_type: None,
            membership_role: None,
            organization_id: None
        };
        
        users.insert(test_email, test_account);
        println!("[AUTH] Test account initialized in storage");
    }
}

pub fn choose_role(req: &RoleSelectionRequest) -> Result<String, String> {
    // In a real implementation:
    // - Validate authenticated session

    let mut users = USERS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let email_lower = req.email.to_lowercase();

    // DEBUG: Print what we're looking for and what exists
    println!("[DEBUG] Looking for email: {}", email_lower);
    println!("[DEBUG] Stored emails: {:?}", users.keys().collect::<Vec<_>>());

    //Find the user
    let user_account = users.get_mut(&email_lower)
        .ok_or("User not found")?;

    //Validate state
    if user_account.role_selected {
        return Err("Role already selcted".into());
    }

    //Validate role combination
    match (&req.organization_type, &req.membership_role) {
        (OrganizationType::Business, MembershipRole::Owner | MembershipRole::Employee)
        | (OrganizationType::AccountingFirm, MembershipRole::Owner | MembershipRole::Employee) => {
            // Valid combinations
        }
    }

    //Update user's role information
    user_account.organization_type = Some(req.organization_type.clone());
    user_account.membership_role = Some(req.membership_role.clone());
    user_account.role_selected = true;

    println!("[AUTH] Role selected for {}: {:?} {:?}", 
        req.email, req.organization_type, req.membership_role);

    Ok("Role selected successfully".into())
}

pub fn reset_choose_role(email: &str) -> Result<String, String>{
    let mut users = USERS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let email_lower = email.to_lowercase();
    
    let user_account = users.get_mut(&email_lower)
        .ok_or("User not found")?;
    
    // Reset role selection
    user_account.role_selected = false;
    user_account.organization_type = None;
    user_account.membership_role = None;
    
    println!("[AUTH] Role selection reset for: {}", email);
    
    Ok("Role selection reset successfully".into())
}

pub fn activate_account(req: &ActivationRequest) -> Result<String, String> {
    if req.activation_code.trim().is_empty() {
        return Err("Activation code is required".into());
    }

    let mut users = USERS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let email_lower = req.email.to_lowercase();

    //Find the user
    let user_account = users.get_mut(&email_lower)
        .ok_or("User not found")?;
    
    // Validate state
    if !user_account.role_selected {
        return Err("Role must be selected before activation".into());
    }

    if user_account.account_activated {
        return Err("Account is already activated".into());
    }

    // Mock activation code validation (replace with real code verification)
    // TODO: Validate activation code against stored codes with expiration
    if !req.activation_code.starts_with("ACT-") {
        return Err("Invalid activation code".into());
    }

    let organization_type = user_account.organization_type
        .as_ref()
        .ok_or("Organization type not set")?;

    let membership_role = user_account.membership_role
        .as_ref()
        .ok_or("Membership role not set")?;

    // Handle based on role
    match (organization_type, membership_role) {
        // Owner Path
        (OrganizationType::Business | OrganizationType::AccountingFirm, MembershipRole::Owner) => {
            // TODO: Validate subscription payment via Stripe
            // - For now, assume payment is successful

            println!("[AUTH] Owner activation for: {}", user_account.email);
            println!("[AUTH] Payment validated (mock)");
            println!("[AUTH] Organization will be created from dashboard");

            // Mark as paid/subscribed (we'll track this separately)
            // user_account.subscription_active = true; // Add this field to UserAccount
        }

        // Employee Path:
        // - Requires valid organization code
        // - User is linked to an existing organization
        (OrganizationType::Business | OrganizationType::AccountingFirm, MembershipRole::Employee) => {
            let org_code = req
                .organization_code
                .as_ref()
                .ok_or("Organization code is required")?;

            if org_code.trim().is_empty() {
                return Err("Organization code is required".into());
            }

            // Validate organization code exists
            let org_codes = ORG_CODES.lock()
                .map_err(|e| format!("Failed to acquire lock: {}", e))?;
            let owner_email = org_codes.get(org_code)
                .ok_or("Invalid organization code")?
                .clone();
            drop(org_codes);
            
            // Find the organization by owner email
            let orgs = ORGANIZATIONS.lock()
                .map_err(|e| format!("Failed to acquire lock: {}", e))?;
            let org = orgs.values()
                .find(|o| o.owner_email == owner_email)
                .ok_or("Organization not found")?;
            
            // Verify subscription is active
            if !org.subscription_active {
                return Err("Organization subscription is not active".into());
            }

            let org_id = org.id.clone();
            drop(orgs);

            // Link user to organization
            user_account.organization_id = Some(org_id);
            
            println!("[AUTH] Linked employee {} to organization {}", 
                user_account.email, org_code);
        }
    }

    user_account.account_activated = true;
    user_account.first_login = false;

    println!("[AUTH] Account activated for: {}", user_account.email);

    Ok("Account activated successfully".into())
}

pub fn login(req: &LoginRequest) -> Result<UserAccount, String> {
    store_test_account();

    if req.email.trim().is_empty() || req.password.trim().is_empty() {
        return Err("Email and password are required".into());
    }

    // Look up the user
    let users = USERS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let email_lower = req.email.to_lowercase();
    
    let user_account = users.get(&email_lower)
        .ok_or("Incorrect email or password")?;
    
    // Verify password
    if !verify_password(&req.password, &user_account.password_hash) {
        println!("[AUTH] Login failed for email: {}", req.email);
        return Err("Incorrect email or password".into());
    }
    
    println!("[AUTH] Login successful for: {} {} ({})", 
        user_account.first_name, user_account.last_name, user_account.email);

    // Return User struct
    Ok(UserAccount {
        id: user_account.id,
        first_name: user_account.first_name.clone(),
        last_name: user_account.last_name.clone(),
        email: user_account.email.clone(),
        password_hash: user_account.password_hash.clone(),
        first_login: user_account.first_login,
        role_selected: user_account.role_selected,
        account_activated: user_account.account_activated,
        organization_type: user_account.organization_type.clone(),
        membership_role: user_account.membership_role.clone(),
        organization_id: user_account.organization_id.clone()
    })
}

pub fn setup_2fa(req: &TwoFactorSetupRequest) -> Result<TwoFactorSetupResponse, String> {
    // Generate a random secret for the user
    let secret = totp_service::generate_secret();
    println!("[2FA] setup_2fa called for email: {}", req.email);
    println!("[2FA] Generated secret: {}", secret);

    // Generate QR code URL
    let qr_code_url = totp_service::generate_qr_code_url(&req.email, &secret, "Balancd");

    // Store the secret temporarily in memory using lowercase email as key
    // In production, this should be stored in a database with an expiration time
    let mut secrets = TWO_FA_SECRETS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let email_lower = req.email.to_lowercase();
    secrets.insert(email_lower.clone(), secret.clone());
    println!("[2FA] Stored secret for email (lowercase): {}", email_lower);

    Ok(TwoFactorSetupResponse {
        secret: secret.clone(),
        qr_code_url,
    })
}

pub fn verify_2fa(req: &TwoFactorVerifyRequest) -> Result<String, String> {
    println!("[2FA] verify_2fa called for email: {}", req.email);
    println!("[2FA] Received TOTP code: {}", req.totp_code);
    
    // Retrieve the stored secret for this email using lowercase for case-insensitive lookup
    let secrets = TWO_FA_SECRETS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
    let email_lower = req.email.to_lowercase();
    println!("[2FA] Looking up secret for email (lowercase): {}", email_lower);
    println!("[2FA] Stored emails in HashMap: {:?}", secrets.keys().collect::<Vec<_>>());
    
    let stored_secret = secrets.get(&email_lower)
        .ok_or_else(|| {
            println!("[2FA] ERROR: No 2FA setup found for email: {}", email_lower);
            "No 2FA setup found for this email. Please set up 2FA first.".to_string()
        })?;
    
    println!("[2FA] Found stored secret: {}", stored_secret);

    // Verify the TOTP code matches the stored secret
    let is_valid = totp_service::verify_totp(stored_secret, &req.totp_code);
    println!("[2FA] TOTP verification result: {}", is_valid);
    
    if is_valid {
        // Remove the secret after successful verification
        drop(secrets); // Release the lock
        
        let mut secrets = TWO_FA_SECRETS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
        secrets.remove(&email_lower);
        println!("[2FA] SUCCESS: Removed secret for email: {}", email_lower);
        drop(secrets);
        
        // Auto-create account if it doesn't exist (2FA completion implies account creation)
        // Use default password "password123" for now (user can change it later)
        let default_password = "password123".to_string();
        let mut users = USERS.lock().map_err(|e| format!("Failed to acquire lock: {}", e))?;
        
        if !users.contains_key(&email_lower) {
            let mut next_id = NEXT_USER_ID.lock()
                .map_err(|e| format!("Failed to acquire lock: {}", e))?;
            let user_id = *next_id;
            *next_id += 1;
            drop(next_id);
            
            let user_account = UserAccount {
                id: user_id,
                first_name: "User".into(), // TODO: Get from signup form
                last_name: "Name".into(),   // TODO: Get from signup form
                email: req.email.clone(),
                password_hash: hash_password(&default_password),
                first_login: true,
                role_selected: false,
                account_activated: false,
                organization_type: None,
                membership_role: None,
                organization_id: None,
            };

            users.insert(email_lower.clone(), user_account);
            println!("[2FA] Auto-created account for email: {}", email_lower);
        }
        
        Ok("Two-factor authentication enabled successfully".into())
    } else {
        println!("[2FA] FAILED: Code does not match stored secret");
        Err("Invalid authentication code. Please try again.".into())
    }
}
