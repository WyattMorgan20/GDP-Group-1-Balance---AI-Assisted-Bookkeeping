use serde::{Deserialize, Serialize};

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
pub struct User {
    pub id: i32,
    pub email: String,
    pub role_selected: bool,
    pub account_activated: bool,
    pub organization_type: Option<OrganizationType>,
    pub membership_role: Option<MembershipRole>
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignUpRequest {
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
    pub organization_type: OrganizationType,
    pub membership_role: MembershipRole
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActivationRequest {
    pub activation_code: String,
    pub organization_code: Option<String>
}
