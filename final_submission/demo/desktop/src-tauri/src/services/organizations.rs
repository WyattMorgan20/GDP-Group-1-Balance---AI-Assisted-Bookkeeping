use sqlx::{PgPool, Row};
use uuid::Uuid;
use chrono::Utc;

#[derive(Debug, Clone)]
pub struct Organization {
    pub id: String,
    pub name: String,
    pub owner_id: String,
    pub organization_type: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone)]
pub struct Department {
    pub id: String,
    pub organization_id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone)]
pub struct Team {
    pub id: String,
    pub department_id: String,
    pub organization_id: String,
    pub name: String,
    pub description: Option<String>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone)]
pub struct Role {
    pub id: String,
    pub organization_id: String,
    pub name: String,
    pub description: Option<String>,
    pub permission_level: String,
    pub created_at: String,
    pub updated_at: String,
}

pub struct OrganizationService;

impl OrganizationService {
    pub async fn create_organization(
        pool: &PgPool,
        owner_id: &str,
        name: &str,
        org_type: &str,
    ) -> Result<Organization, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            INSERT INTO organizations (id, owner_id, name, organization_type, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, owner_id, name, organization_type, created_at, updated_at
            "#,
        )
        .bind(&id)
        .bind(owner_id)
        .bind(name)
        .bind(org_type)
        .bind(&now)
        .bind(&now)
        .fetch_one(pool)
        .await?;

        Ok(Organization {
            id: row.get("id"),
            owner_id: row.get("owner_id"),
            name: row.get("name"),
            organization_type: row.get("organization_type"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        })
    }

    pub async fn get_organization(
        pool: &PgPool,
        org_id: &str,
    ) -> Result<Organization, sqlx::Error> {
        let row = sqlx::query(
            "SELECT id, owner_id, name, organization_type, created_at, updated_at FROM organizations WHERE id = $1",
        )
        .bind(org_id)
        .fetch_one(pool)
        .await?;

        Ok(Organization {
            id: row.get("id"),
            owner_id: row.get("owner_id"),
            name: row.get("name"),
            organization_type: row.get("organization_type"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        })
    }

    pub async fn get_user_organizations(
        pool: &PgPool,
        user_id: &str,
    ) -> Result<Vec<Organization>, sqlx::Error> {
        let rows = sqlx::query(
            "SELECT id, owner_id, name, organization_type, created_at, updated_at FROM organizations WHERE owner_id = $1",
        )
        .bind(user_id)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| Organization {
                id: row.get("id"),
                owner_id: row.get("owner_id"),
                name: row.get("name"),
                organization_type: row.get("organization_type"),
                created_at: row.get("created_at"),
                updated_at: row.get("updated_at"),
            })
            .collect())
    }

    pub async fn create_department(
        pool: &PgPool,
        org_id: &str,
        name: &str,
        description: Option<&str>,
    ) -> Result<Department, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            INSERT INTO departments (id, organization_id, name, description, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, organization_id, name, description, created_at, updated_at
            "#,
        )
        .bind(&id)
        .bind(org_id)
        .bind(name)
        .bind(description)
        .bind(&now)
        .bind(&now)
        .fetch_one(pool)
        .await?;

        Ok(Department {
            id: row.get("id"),
            organization_id: row.get("organization_id"),
            name: row.get("name"),
            description: row.get("description"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        })
    }

    pub async fn get_departments(
        pool: &PgPool,
        org_id: &str,
    ) -> Result<Vec<Department>, sqlx::Error> {
        let rows = sqlx::query(
            "SELECT id, organization_id, name, description, created_at, updated_at FROM departments WHERE organization_id = $1",
        )
        .bind(org_id)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| Department {
                id: row.get("id"),
                organization_id: row.get("organization_id"),
                name: row.get("name"),
                description: row.get("description"),
                created_at: row.get("created_at"),
                updated_at: row.get("updated_at"),
            })
            .collect())
    }

    pub async fn create_team(
        pool: &PgPool,
        dept_id: &str,
        org_id: &str,
        name: &str,
        description: Option<&str>,
    ) -> Result<Team, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            INSERT INTO teams (id, department_id, organization_id, name, description, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, department_id, organization_id, name, description, created_at, updated_at
            "#,
        )
        .bind(&id)
        .bind(dept_id)
        .bind(org_id)
        .bind(name)
        .bind(description)
        .bind(&now)
        .bind(&now)
        .fetch_one(pool)
        .await?;

        Ok(Team {
            id: row.get("id"),
            department_id: row.get("department_id"),
            organization_id: row.get("organization_id"),
            name: row.get("name"),
            description: row.get("description"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        })
    }

    pub async fn get_teams(
        pool: &PgPool,
        dept_id: &str,
    ) -> Result<Vec<Team>, sqlx::Error> {
        let rows = sqlx::query(
            "SELECT id, department_id, organization_id, name, description, created_at, updated_at FROM teams WHERE department_id = $1",
        )
        .bind(dept_id)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| Team {
                id: row.get("id"),
                department_id: row.get("department_id"),
                organization_id: row.get("organization_id"),
                name: row.get("name"),
                description: row.get("description"),
                created_at: row.get("created_at"),
                updated_at: row.get("updated_at"),
            })
            .collect())
    }

    pub async fn create_role(
        pool: &PgPool,
        org_id: &str,
        name: &str,
        description: Option<&str>,
        permission_level: &str,
    ) -> Result<Role, sqlx::Error> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().to_rfc3339();

        let row = sqlx::query(
            r#"
            INSERT INTO roles (id, organization_id, name, description, permission_level, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, organization_id, name, description, permission_level, created_at, updated_at
            "#,
        )
        .bind(&id)
        .bind(org_id)
        .bind(name)
        .bind(description)
        .bind(permission_level)
        .bind(&now)
        .bind(&now)
        .fetch_one(pool)
        .await?;

        Ok(Role {
            id: row.get("id"),
            organization_id: row.get("organization_id"),
            name: row.get("name"),
            description: row.get("description"),
            permission_level: row.get("permission_level"),
            created_at: row.get("created_at"),
            updated_at: row.get("updated_at"),
        })
    }

    pub async fn get_roles(
        pool: &PgPool,
        org_id: &str,
    ) -> Result<Vec<Role>, sqlx::Error> {
        let rows = sqlx::query(
            "SELECT id, organization_id, name, description, permission_level, created_at, updated_at FROM roles WHERE organization_id = $1",
        )
        .bind(org_id)
        .fetch_all(pool)
        .await?;

        Ok(rows
            .iter()
            .map(|row| Role {
                id: row.get("id"),
                organization_id: row.get("organization_id"),
                name: row.get("name"),
                description: row.get("description"),
                permission_level: row.get("permission_level"),
                created_at: row.get("created_at"),
                updated_at: row.get("updated_at"),
            })
            .collect())
    }
}
