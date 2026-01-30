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
pub struct DevUser {
    pub id: i32,
    pub email: String,
    pub password: String,
    pub role_selected: bool,
    pub account_activated: bool,
    pub organization_type: Option<OrganizationType>,
    pub membership_role: Option<MembershipRole>
}
