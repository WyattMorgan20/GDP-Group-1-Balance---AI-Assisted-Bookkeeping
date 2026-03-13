use tauri::State;
use serde::{Serialize, Deserialize};
use crate::services::organizations::OrganizationService;
use crate::AppState;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct OrganizationResponse {
    pub id: String,
    pub name: String,
    pub owner_id: String,
    pub organization_type: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct DepartmentResponse {
    pub id: String,
    pub organization_id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct TeamResponse {
    pub id: String,
    pub department_id: String,
    pub organization_id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct RoleResponse {
    pub id: String,
    pub organization_id: String,
    pub name: String,
    pub description: Option<String>,
    pub permission_level: String,
    pub created_at: String,
    pub updated_at: String,
}

// Organization Commands
#[tauri::command]
pub async fn create_organization(
    state: State<'_, AppState>,
    owner_id: String,
    name: String,
    organization_type: String,
) -> Result<OrganizationResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let org = OrganizationService::create_organization(db_pool, &owner_id, &name, &organization_type)
        .await
        .map_err(|e| e.to_string())?;

    Ok(OrganizationResponse {
        id: org.id,
        name: org.name,
        owner_id: org.owner_id,
        organization_type: org.organization_type,
        created_at: org.created_at,
        updated_at: org.updated_at,
    })
}

#[tauri::command]
pub async fn get_organization(
    state: State<'_, AppState>,
    org_id: String,
) -> Result<OrganizationResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let org = OrganizationService::get_organization(db_pool, &org_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(OrganizationResponse {
        id: org.id,
        name: org.name,
        owner_id: org.owner_id,
        organization_type: org.organization_type,
        created_at: org.created_at,
        updated_at: org.updated_at,
    })
}

#[tauri::command]
pub async fn get_user_organizations(
    state: State<'_, AppState>,
    user_id: String,
) -> Result<Vec<OrganizationResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let orgs = OrganizationService::get_user_organizations(db_pool, &user_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(orgs
        .into_iter()
        .map(|org| OrganizationResponse {
            id: org.id,
            name: org.name,
            owner_id: org.owner_id,
            organization_type: org.organization_type,
            created_at: org.created_at,
            updated_at: org.updated_at,
        })
        .collect())
}

// Department Commands
#[tauri::command]
pub async fn create_department(
    state: State<'_, AppState>,
    org_id: String,
    name: String,
    description: Option<String>,
) -> Result<DepartmentResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let dept = OrganizationService::create_department(
        db_pool,
        &org_id,
        &name,
        description.as_deref(),
    )
    .await
    .map_err(|e| e.to_string())?;

    Ok(DepartmentResponse {
        id: dept.id,
        organization_id: dept.organization_id,
        name: dept.name,
        description: dept.description,
        created_at: dept.created_at,
        updated_at: dept.updated_at,
    })
}

#[tauri::command]
pub async fn get_departments(
    state: State<'_, AppState>,
    org_id: String,
) -> Result<Vec<DepartmentResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let depts = OrganizationService::get_departments(db_pool, &org_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(depts
        .into_iter()
        .map(|dept| DepartmentResponse {
            id: dept.id,
            organization_id: dept.organization_id,
            name: dept.name,
            description: dept.description,
            created_at: dept.created_at,
            updated_at: dept.updated_at,
        })
        .collect())
}

// Team Commands
#[tauri::command]
pub async fn create_team(
    state: State<'_, AppState>,
    dept_id: String,
    org_id: String,
    name: String,
    description: Option<String>,
) -> Result<TeamResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let team = OrganizationService::create_team(
        db_pool,
        &dept_id,
        &org_id,
        &name,
        description.as_deref(),
    )
    .await
    .map_err(|e| e.to_string())?;

    Ok(TeamResponse {
        id: team.id,
        department_id: team.department_id,
        organization_id: team.organization_id,
        name: team.name,
        description: team.description,
        created_at: team.created_at,
        updated_at: team.updated_at,
    })
}

#[tauri::command]
pub async fn get_teams(
    state: State<'_, AppState>,
    dept_id: String,
) -> Result<Vec<TeamResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let teams = OrganizationService::get_teams(db_pool, &dept_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(teams
        .into_iter()
        .map(|team| TeamResponse {
            id: team.id,
            department_id: team.department_id,
            organization_id: team.organization_id,
            name: team.name,
            description: team.description,
            created_at: team.created_at,
            updated_at: team.updated_at,
        })
        .collect())
}

// Role Commands
#[tauri::command]
pub async fn create_role(
    state: State<'_, AppState>,
    org_id: String,
    name: String,
    description: Option<String>,
    permission_level: String,
) -> Result<RoleResponse, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let role = OrganizationService::create_role(
        db_pool,
        &org_id,
        &name,
        description.as_deref(),
        &permission_level,
    )
    .await
    .map_err(|e| e.to_string())?;

    Ok(RoleResponse {
        id: role.id,
        organization_id: role.organization_id,
        name: role.name,
        description: role.description,
        permission_level: role.permission_level,
        created_at: role.created_at,
        updated_at: role.updated_at,
    })
}

#[tauri::command]
pub async fn get_roles(
    state: State<'_, AppState>,
    org_id: String,
) -> Result<Vec<RoleResponse>, String> {
    let db_pool = state.db_pool.as_ref()
        .ok_or_else(|| "Database is not available. Please ensure PostgreSQL is running.".to_string())?;
    let roles = OrganizationService::get_roles(db_pool, &org_id)
        .await
        .map_err(|e| e.to_string())?;

    Ok(roles
        .into_iter()
        .map(|role| RoleResponse {
            id: role.id,
            organization_id: role.organization_id,
            name: role.name,
            description: role.description,
            permission_level: role.permission_level,
            created_at: role.created_at,
            updated_at: role.updated_at,
        })
        .collect())
}
