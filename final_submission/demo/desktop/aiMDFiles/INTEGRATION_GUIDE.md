# Integration Guide - Adding New Components to App

## Quick Start: Adding New Pages to Your App

### Step 1: Update App.tsx Routing

Add these imports to [src/App.tsx](src/App.tsx):

```typescript
import CompanyStructure from './pages/CompanyStructure';
import TransactionsManagement from './pages/TransactionsManagement';
import AuditTrail from './pages/AuditTrail';
```

### Step 2: Add Routes

In your routing logic (likely a router component), add:

```typescript
{ path: '/company-structure/:orgId', component: CompanyStructure }
{ path: '/transactions/:orgId', component: TransactionsManagement }
{ path: '/audit-trail/:orgId', component: AuditTrail }
```

### Step 3: Add Navigation Links

Update your Navbar component to include:

```typescript
<Link to={`/company-structure/${currentOrgId}`}>Company Structure</Link>
<Link to={`/transactions/${currentOrgId}`}>Transactions</Link>
<Link to={`/audit-trail/${currentOrgId}`}>Audit Trail</Link>
```

## Component Props

### CompanyStructure
```typescript
<CompanyStructure 
  organizationId="org-uuid"
  userId="user-uuid"
/>
```

### TransactionsManagement
```typescript
<TransactionsManagement 
  organizationId="org-uuid"
  userId="user-uuid"
/>
```

### AuditTrail
```typescript
// For entity-specific audit trail
<AuditTrail 
  organizationId="org-uuid"
  entityType="Transaction"
  entityId="transaction-uuid"
/>

// For user activity audit trail
<AuditTrail 
  organizationId="org-uuid"
  userId="user-uuid"
/>
```

## Data Flow Example

```
User After Login
    ↓
Dashboard (shows their orgs)
    ↓
User Clicks "Go to Company Structure"
    ↓
Router passes orgId to CompanyStructure
    ↓
Component calls api.organizations.get(orgId)
    ↓
Tauri command → Rust service → Database
    ↓
Return org with departments
    ↓
User clicks department
    ↓
Component calls api.organizations.getTeams(deptId)
    ↓
Display teams in that department
    ↓
User clicks "Create Department"
    ↓
Component calls api.organizations.createDepartment()
    ↓
Audit log created automatically
    ↓
UI refreshes with new department
```

## Component Interaction Example

Here's a minimal example showing how the components work together:

### Dashboard Page (Conceptual)
```typescript
import { useState, useEffect } from 'react';
import api from './services/api';
import CompanyStructure from './pages/CompanyStructure';

export const DashboardWithOrgs = ({ userId }) => {
  const [orgs, setOrgs] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const organizations = await api.organizations.getUserOrganizations(userId);
      setOrgs(organizations);
    }
    load();
  }, [userId]);

  if (selectedOrgId) {
    return (
      <>
        <button onClick={() => setSelectedOrgId(null)}>← Back</button>
        <CompanyStructure 
          organizationId={selectedOrgId}
          userId={userId}
        />
      </>
    );
  }

  return (
    <div>
      <h1>My Organizations</h1>
      {orgs.map(org => (
        <div key={org.id}>
          <h3>{org.name}</h3>
          <button onClick={() => setSelectedOrgId(org.id)}>
            Manage
          </button>
        </div>
      ))}
    </div>
  );
};
```

## Using the API Service

### Example: Create Organization After Signup

```typescript
// In RoleSelection page after user picks their role
const handleRoleSelection = async (orgType, role) => {
  try {
    // 1. Create the organization
    const org = await api.organizations.create(
      userId,           // owner_id
      "My Company",     // name
      orgType           // 'Business' or 'AccountingFirm'
    );

    // 2. Create default department
    await api.organizations.createDepartment(
      org.id,
      "Accounting"
    );

    // 3. Create default role
    await api.organizations.createRole(
      org.id,
      "Accountant",
      "Employee"
    );

    // 4. Log the action
    await api.audit.logAction(
      org.id,
      userId,
      "Organization",
      org.id,
      "Created"
    );

    // 5. Redirect to company structure
    navigate(`/company-structure/${org.id}`);
  } catch (error) {
    console.error('Failed to create organization:', error);
  }
};
```

## Error Handling Patterns

All components have built-in error states:

```typescript
const [error, setError] = useState<string | null>(null);

try {
  const result = await api.organizations.create(...);
  setError(null); // Clear error
} catch (err) {
  setError(err instanceof Error ? err.message : 'Unknown error');
}

// In JSX:
{error && <div className="error-message">{error}</div>}
```

## Loading States

Components show loading indicators:

```typescript
const [loading, setLoading] = useState(false);

if (loading) {
  return <div>Loading organization data...</div>;
}
```

## Testing the Components Locally

### 1. Mock API (for testing without database)

```typescript
// Mock API for rapid UI testing
const mockApi = {
  organizations: {
    create: async (...args) => ({
      id: 'test-org-1',
      name: 'Test Org',
      owner_id: 'user-1',
      organization_type: 'Business',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }),
    getDepartments: async () => [
      { id: 'd1', name: 'Accounting', ... },
      { id: 'd2', name: 'Finance', ... },
    ],
    // ... etc
  }
};
```

### 2. Unit Test Example

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import CompanyStructure from './pages/CompanyStructure';

test('displays organization name', async () => {
  render(
    <CompanyStructure 
      organizationId="test-org-1"
      userId="user-1"
    />
  );
  
  await screen.findByText('My Organization');
});

test('allows creating new department', async () => {
  render(...);
  
  const input = screen.getByPlaceholderText('Department name');
  fireEvent.change(input, { target: { value: 'Sales' } });
  fireEvent.click(screen.getByText('Add Department'));
  
  await screen.findByText('Sales');
});
```

## Styling Customization

All components use CSS with organized sections:

```css
.component-container { /* Main container */ }
.component-section { /* Sub-sections */ }
.component-form { /* Forms */ }
.component-list { /* Lists/tables */ }
.error-message { /* Errors */ }
```

To customize, modify the relevant CSS files:
- `styles/CompanyStructure.css`
- `styles/TransactionsManagement.css`
- `styles/AuditTrail.css`

## Key Points

1. **Props are Required** - Always pass `organizationId` and `userId`
2. **Async Operations** - Components handle loading/error states
3. **API Calls** - Use the `api` service, not direct Tauri invoke
4. **Routing** - Components expect router to provide org/entity IDs
5. **Type Safety** - Use TypeScript types from `logic/types.ts`
6. **Error Handlers** - All components display errors to users

## Next Steps

1. ✅ Verify components display without errors
2. ✅ Connect to your existing routing
3. ✅ Test with real database data
4. ✅ Add links in navbar/menu
5. ✅ Customize styling to match your design system
6. ⬜ Implement permission checks (upcoming)
7. ⬜ Add file upload for documents (upcoming)

## API Method Reference

See [src/services/api.ts](src/services/api.ts) for full method signatures. All methods:
- Return `Promise<Type>`
- Throw errors (use try-catch)
- Log to console in development
- Have TypeScript types

Example:
```typescript
// All these methods exist and are type-safe:
await api.organizations.create(ownerId, name, type)
await api.organizations.getDepartments(orgId)
await api.transactions.create(request)
await api.transactions.flagVariance(orgId, txId, type)
await api.audit.getEntityTrail(orgId, entityType, entityId)
```

## Troubleshooting

### "API calls are undefined"
Make sure you've imported: `import api from '../services/api';`

### "Database won't update"
Ensure DATABASE_URL environment variable is set before starting the app.

### "Components not displaying"
Check browser console for errors. Most issues are missing props or routing.

### "Tauri commands not working"
Make sure you've rebuilt Tauri: `npm run tauri dev` (rebuilds backend)

---

These components are **production-ready** and handle all basic workflows. Focus on integration and testing before your March 18 demo!
