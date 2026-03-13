use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum OrganizationType {
    Business,
    AccountingFirm
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum MembershipRole {
    Owner,
    Employee
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserAccount {
    pub id: Uuid,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password_hash: String,
    pub first_login: bool,
    pub role_selected: bool,
    pub account_activated: bool,
    pub organization_type: Option<OrganizationType>,
    pub membership_role: Option<MembershipRole>,
    pub organization_id: Option<Uuid>
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Organization {
    pub id: Uuid,
    pub name: String,
    pub organization_type: OrganizationType,
    pub owner_email: String,
    pub access_code: String,
    pub subscription_active: bool,
    pub created_at: String
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignUpRequest {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub password: String
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RoleSelectionRequest {
    pub email: String,
    pub organization_type: OrganizationType,
    pub membership_role: MembershipRole
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActivationRequest {
    pub email: String,
    pub activation_code: String,
    pub organization_code: Option<String>
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TwoFactorSetupRequest {
    pub email: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TwoFactorSetupResponse {
    pub secret: String,
    pub qr_code_url: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TwoFactorVerifyRequest {
    pub email: String,
    pub totp_code: String,
}
