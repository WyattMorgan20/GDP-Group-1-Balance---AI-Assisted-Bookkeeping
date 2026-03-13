# Database Schema & Company Structure Implementation

## Overview

This implementation adds comprehensive database schema, company structure management, audit trails, and transaction management to the Balancd platform. The system now supports multi-tenant organizations with hierarchical structures (departments, teams, roles) and full audit logging.

## What Was Implemented

### 1. Database Schema (PostgreSQL)

Complete database migration with 10 new tables:

#### Core Tables:
- **organizations** - Business/accounting firm entities
- **departments** - Organizational divisions
- **teams** - Subdivisions within departments
- **roles** - Job titles with permission levels
- **employees** - Team members

#### Financial Data Tables:
- **transactions** - All financial records (Amount, Account, Type, Date)
- **documents** - Bank statements, invoices, receipts
- **reconciliations** - Automated reconciliation records

#### Audit/Compliance Tables:
- **audit_logs** - Complete action history with changes
- **variances** - Flagged anomalies and suspicious transactions
- **permissions** - Role-based access control

**Key Features:**
- UUID primary keys for distributed systems
- Timestamp tracking (created_at, updated_at)
- Nullable fields for optional data
- Array fields for document linking
- JSONB for flexible change tracking
- Proper foreign keys for referential integrity
- Performance indexes on common queries

### 2. Rust Backend Services

Three new service modules with full CRUD operations:

#### `services/organizations.rs`
- Create/Read organizations
- Department management
- Team management
- Role creation and retrieval
- Methods return strongly-typed structs

#### `services/audit.rs`
- Log administrative actions
- Retrieve entity audit trails
- Get user action history
- Change record creation with before/after values
- Timestamp and user tracking

#### `services/transactions.rs`
- Create financial transactions
- Retrieve organization transactions
- Flag variances (anomalies)
- Resolve flagged variances
- Transaction metadata and status tracking

### 3. Tauri Command Handlers

Three new command modules expose backend to frontend:

#### `commands/organizations.rs` (9 commands)
- `create_organization` - Register new org
- `get_organization` - Retrieve org details
- `get_user_organizations` - List user's orgs
- `create_department` - Add department
- `get_departments` - List org departments
- `create_team` - Add team
- `get_teams` - List department teams
- `create_role` - Define role with permissions
- `get_roles` - List org roles

#### `commands/transactions.rs` (5 commands)
- `create_transaction` - Record financial transaction
- `get_organization_transactions` - List all org transactions
- `flag_variance` - Mark suspicious transaction
- `get_organization_variances` - List flagged variances
- `resolve_variance` - Mark variance as resolved

#### `commands/audit.rs` (3 commands)
- `log_action` - Record audit event
- `get_entity_audit_trail` - View change history
- `get_user_actions` - View user activity log

### 4. TypeScript API Service Layer

Enhanced [src/services/api.ts](src/services/api.ts) with organized modules:

```typescript
api.organizations.{
  create, get, getUserOrganizations,
  createDepartment, getDepartments,
  createTeam, getTeams,
  createRole, getRoles
}

api.transactions.{
  create, getByOrganization,
  flagVariance, getVariances, resolveVariance
}

api.audit.{
  logAction, getEntityTrail, getUserActions
}
```

All methods include error logging and type safety.

### 5. React Components & UI

#### `pages/CompanyStructure.tsx`
- View organization hierarchy
- Create departments with descriptions
- Form validation and error handling
- Select department to view/manage teams
- Create teams within departments
- Manage roles with permission levels
- Real-time data updates

**Features:**
- Grid layout (responsive 3 columns)
- Form for creating new departments/teams/roles
- Interactive list selection
- Role permission level display
- Loading and error states

#### `pages/AuditTrail.tsx`
- View comprehensive audit logs
- Filter by action type
- Timeline visualization
- Show who, what, when, where
- Expandable change details
- Entity-specific or user-specific views

**Features:**
- Timeline design with visual dots/lines
- Collapsible change details (JSON)
- Action filtering dropdown
- Entry count display
- Responsive design

#### `pages/TransactionsManagement.tsx`
- Add financial transactions
- View recent transactions with sorting
- Tab-based interface
- Flag and resolve variances
- Full variance management

**Features:**
- Form with account name, type, amount, date
- Account type color coding
- Variance cards with quick actions
- Two-tab interface (Transactions/Variances)
- Reconciliation status indicators

### 6. TypeScript Type Definitions

Comprehensive types in [src/logic/types.ts](src/logic/types.ts):

**Enums:**
- `OrganizationType` - Business | AccountingFirm
- `PermissionLevel` - Owner | Manager | Employee | Auditor | JuniorEmployee
- `TransactionAccountType` - Asset | Liability | Equity | Income | Expense
- `DocumentType` - BankStatement | Invoice | Receipt | JournalEntry | Other
- `VarianceType` - DuplicateEntry | SuspiciousAmount | OutOfCategory | Unmatched | Other
- `ReconciliationStatus` - pending | approved | rejected

**Models:** User, Organization, Department, Team, Role, Employee, Transaction, Document, Variance, Reconciliation, AuditLog, Permission

**Request/Response Types:** All Create* types for form input validation

## File Structure

```
Backend (Rust/Tauri):
src-tauri/src/
├── services/
│   ├── organizations.rs (NEW)
│   ├── transactions.rs (NEW)
│   ├── audit.rs (NEW)
│   └── mod.rs (UPDATED)
├── commands/
│   ├── organizations.rs (NEW)
│   ├── transactions.rs (NEW)
│   ├── audit.rs (NEW)
│   └── mod.rs (UPDATED)
├── db/
│   └── mod.rs (UPDATED - Complete schema)
├── lib.rs (UPDATED - New command handlers)
└── main.rs (UPDATED - New command handlers)

Frontend (React/TypeScript):
src/
├── pages/
│   ├── CompanyStructure.tsx (NEW)
│   ├── AuditTrail.tsx (NEW)
│   └── TransactionsManagement.tsx (NEW)
├── services/
│   └── api.ts (UPDATED - Organization/Transaction/Audit APIs)
├── logic/
│   └── types.ts (UPDATED - Complete type system)
└── styles/
    ├── CompanyStructure.css (NEW)
    ├── AuditTrail.css (NEW)
    └── TransactionsManagement.css (NEW)
```

## How to Use

### 1. Database Setup

Ensure PostgreSQL is running and accessible:
```bash
export DATABASE_URL=postgres://user:password@localhost:5432/balancd
```

Run the application - migrations execute automatically on startup.

### 2. Create Organization Flow

```typescript
// Create organization
const org = await api.organizations.create(userId, 'Acme Corp', 'Business');

// Add departments
const dept = await api.organizations.createDepartment(org.id, 'Accounting');

// Add teams
const team = await api.organizations.createTeam(dept.id, org.id, 'Month-End Team');

// Create roles
const role = await api.organizations.createRole(org.id, 'Accountant', 'Employee');
```

### 3. Transaction Management

```typescript
// Record transaction
const tx = await api.transactions.create({
  organization_id: orgId,
  account_name: 'Bank Account',
  account_type: 'Asset',
  amount: 5000.00,
  transaction_date: '2026-03-12',
  description: 'Deposit'
});

// Flag suspicious transaction
const variance = await api.transactions.flagVariance(
  orgId, txId, 'SuspiciousAmount', 'Amount exceeds normal range'
);

// Resolve variance
await api.transactions.resolveVariance(varianceId, userId);
```

### 4. Audit Trail Access

```typescript
// Get entity history
const trail = await api.audit.getEntityTrail(orgId, 'Transaction', txId);

// Get user activity
const actions = await api.audit.getUserActions(orgId, userId, 50);

// Log action
await api.audit.logAction(orgId, userId, 'Transaction', txId, 'Created');
```

## Key Design Decisions

### 1. **Multi-Tenancy**
All tables include `organization_id` for data isolation. Users can belong to multiple organizations.

### 2. **Audit-First Design**
- No hard deletes - soft delete via audit logs
- All changes tracked with timestamps and user IDs
- Complete change history preserved (before/after values in JSONB)

### 3. **Type Safety**
- Strongly typed Rust services
- Complete TypeScript interfaces
- Enums for all domain concepts

### 4. **Scalability**
- UUID primary keys (distributed-friendly)
- Array columns for flexible relationships
- JSONB for semi-structured data
- Performance indexes on common queries

### 5. **User Experience**
- Clean React components with loading states
- Error handling and user feedback
- Responsive CSS Grid layouts
- Timeline visualization for audit logs

## Next Steps for Implementation

### Priority 1: Permission/Access Control (March 18)
- Implement permission checking in commands
- Add employee records with user mapping
- Role-based access to data

### Priority 2: Data Import/Export (Pre-Demo)
- CSV file upload parsing
- Bank statement PDF extraction
- Excel export functionality

### Priority 3: Reconciliation Engine (Post-March 18)
- Auto-match transactions to documents
- Variance detection algorithms
- Reconciliation workflow UI

### Priority 4: AI Integration
- Connect to Ollama or Claude API
- Transaction classification
- Variance pattern detection
- Month-end checklist generation

## Database Diagram (Simplified)

```
organizations (1) ──┬── (N) departments
                    ├── (N) teams
                    ├── (N) roles
                    ├── (N) transactions
                    ├── (N) documents
                    └── (N) audit_logs

departments (1) ──── (N) teams
teams (1) ──────── (N) employees
roles (1) ──────── (N) employees & permissions
documents (1) ──── (N) reconciliations
transactions (N)── (M) documents (via linked_document_ids)
transactions (1)── (N) variances
```

## Testing the System

### Create Test Organization
```bash
POST /create_organization
{
  "owner_id": "uuid-of-owner",
  "name": "Test Bookkeeping",
  "organization_type": "AccountingFirm"
}
```

### Add Sample Transactions
- Use TransactionsManagement page
- Create multiple account types
- View reconciliation status

### View Audit Trail
- Navigate to AuditTrail component
- Filter by action type
- Expand change details

## Notes for Team

1. **Database Persistence**: Data survives app restarts once saved
2. **Offline Support**: Tauri can work offline, but currently contacts DB
3. **Performance**: Most queries indexed, consider pagination for large datasets
4. **Security**: Currently no permission checks - implement before MVP
5. **Testing**: Use dummy data endpoints (to be created) for testing

## Rollout Checklist for March 18 Demo

- [ ] Database running and accessible
- [ ] All Tauri commands building without errors
- [ ] Create sample organization via API
- [ ] Add departments/teams/roles via UI
- [ ] Record sample transactions
- [ ] View audit trail
- [ ] Flag and resolve variances
- [ ] Screenshot app working

This implementation provides the foundation for all remaining features. The architecture is extensible and ready for AI integration, reconciliation engines, and complex bookkeeping workflows.
