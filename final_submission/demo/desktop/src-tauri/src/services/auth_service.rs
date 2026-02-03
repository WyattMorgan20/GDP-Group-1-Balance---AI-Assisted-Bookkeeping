use crate::logic::auth::{ActivationRequest, LoginRequest, MembershipRole, OrganizationType, RoleSelectionRequest, SignUpRequest, User};

pub fn sign_up(req: &SignUpRequest) -> Result<String, String> {
    if req.email.trim().is_empty() || req.password.trim().is_empty() {
        return Err("Email and password are required".into());
    }

    if !req.email.contains('@') {
        return Err("Invalid email format".into());
    }

    if req.password.len() < 8 {
        return Err("Password must be at least 8 characters".into());
    }

    // In a real implementation:
    // - Check if email already exists
    // - Hash password
    // - Persist user
    // - Generate cryptographically secure activation code
    // - Send activation email

    // For now, we assume success
    Ok("Account created. Check your email for activation code.".into())
}

pub fn choose_role(req: &RoleSelectionRequest) -> Result<String, String> {
    // In a real implementation:
    // - Validate authenticated session
    // - Load user from persistence
    // - Ensure role_selected == false

    match (&req.organization_type, &req.membership_role) {
        (OrganizationType::Business, MembershipRole::Owner | MembershipRole::Employee)
        | (OrganizationType::AccountingFirm, MembershipRole::Owner | MembershipRole::Employee) => {
            // Valid combinations
        }
    }

    // Update user intent:
    // - organization_type
    // - membership_role
    // - role_selected = true

    Ok("Role selected successfully".into())
}

pub fn activate_account(req: &ActivationRequest) -> Result<String, String> {
    if req.activation_code.trim().is_empty() {
        return Err("Activation code is required".into());
    }

    // Mock: load current user
    let mut user = User {
        id: 1,
        email: "user@example.com".into(),
        first_login: false,
        role_selected: true,
        account_activated: false,
        organization_type: Some(OrganizationType::Business),
        membership_role: Some(MembershipRole::Owner)
    };

    // Ensure correct state
    if !user.role_selected {
        return Err("Role must be selected before activation".into());
    }

    if user.account_activated {
        return Err("Account is already activated".into());
    }

    // Mock activation code validation
    if !req.activation_code.starts_with("ACT-") {
        return Err("Invalid activation code".into());
    }

    let organization_type = user
        .organization_type
        .as_ref()
        .ok_or("Organization type not set")?;

    let membership_role = user
        .membership_role
        .as_ref()
        .ok_or("Membership role not set")?;

    // Role-based entitlement checks
    match (organization_type, membership_role) {
        // Owner access path:
        // - Requires successful subscription
        // - Organization will be created after activation
        (OrganizationType::Business | OrganizationType::AccountingFirm, MembershipRole::Owner) => {
            // TODO: Validate subscription payment
            // TODO: Create organization record
            // TODO: Generate organization access code
        }

        // Employee access path:
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

            // TODO: Validate organization code exists
            // TODO: Link user to organization
        }
    }

    user.account_activated = true;

    Ok("Account activated successfully".into())
}

pub fn login(req: &LoginRequest) -> Result<User, String> {
    if req.email.trim().is_empty() || req.password.trim().is_empty() {
        return Err("Email and password are required".into());
    }

    // In a real implementation:
    // - Query user by email
    // - Verify password hash
    // - Ensure account_activated == true

    // Test account for now
    if req.email == "test@balancd.dev" {
        return Ok(User {
            id: 1,
            email: req.email.clone(),
            first_login: true,
            role_selected: false,
            account_activated: false,
            organization_type: None,
            membership_role: None
        });
    }

    Err("Incorrect email or password".into())
}

/*pub fn needs_onboarding(user: &User) -> bool {
    !user.role_selected || !user.account_activated
}*/
