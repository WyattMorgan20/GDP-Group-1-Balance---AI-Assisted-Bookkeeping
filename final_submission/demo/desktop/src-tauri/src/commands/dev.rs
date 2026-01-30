use crate::logic::dev::{OrganizationType, MembershipRole, DevUser};

#[cfg(debug_assertions)]
#[tauri::command]
pub fn dev_login(state: String) -> Result<DevUser, String> {
    let user = match state.as_str() {
        "signup" => DevUser {
            id: 1,
            email: "test@balancd.dev".into(),
            password: "password".into(),
            role_selected: false,
            account_activated: false,
            organization_type: None,
            membership_role: None,
        },

        "role_selected" => DevUser {
            id: 2,
            email: "owner@balancd.dev".into(),
            password: "password".into(),
            role_selected: true,
            account_activated: false,
            organization_type: Some(OrganizationType::Business),
            membership_role: Some(MembershipRole::Owner)
        },

        "activated" => DevUser {
            id: 3,
            email: "employee@balancd.dev".into(),
            password: "password".into(),
            role_selected: true,
            account_activated: true,
            organization_type: Some(OrganizationType::Business),
            membership_role: Some(MembershipRole::Employee)
        },

        _ => return Err("Unknown dev state".into()),
    };

    Ok(user)
}
