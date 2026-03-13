export type OrganizationType = 'Business' | 'AccountingFirm';
export type MembershipRole = 'Owner' | 'Employee';
export type PermissionLevel = 'Owner' | 'Manager' | 'Employee' | 'Auditor' | 'JuniorEmployee';
export type TransactionAccountType = 'Asset' | 'Liability' | 'Equity' | 'Income' | 'Expense';
export type DocumentType = 'BankStatement' | 'Invoice' | 'Receipt' | 'JournalEntry' | 'Other';
export type VarianceType = 'DuplicateEntry' | 'SuspiciousAmount' | 'OutOfCategory' | 'Unmatched' | 'Other';
export type ReconciliationStatus = 'pending' | 'approved' | 'rejected';

// Authentication Types
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  first_login: boolean;
  role_selected: boolean;
  account_activated: boolean;
  organization_type: OrganizationType | null;
  membership_role: MembershipRole | null;
  organization_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface SignUpRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RoleSelectionRequest {
  email: String;
  organization_type: OrganizationType;
  membership_role: MembershipRole;
}

export interface ActivationRequest {
  email: string;
  activation_code: string;
  organization_code: string | null;
}

export interface TwoFactorSetupRequest {
  email: string;
}

export interface TwoFactorSetupResponse {
  secret: string;
  qr_code_url: string;
}

export interface TwoFactorVerifyRequest {
  email: string;
  totp_code: string;
}

// Organization Structure Types
export interface Organization {
  id: string;
  name: string;
  owner_id: string;
  organization_type: OrganizationType;
  created_at: string;
  updated_at: string;
}

export interface Department {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Team {
  id: string;
  department_id: string;
  organization_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Role {
  id: string;
  organization_id: string;
  name: string;
  description: string | null;
  permission_level: PermissionLevel;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  organization_id: string;
  user_id: string | null;
  department_id: string | null;
  team_id: string | null;
  role_id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Permission {
  id: string;
  role_id: string;
  permission_name: string;
  resource_type: string;
  action: string;
  created_at: string;
}

// Financial Data Types
export interface Transaction {
  id: string;
  organization_id: string;
  account_name: string;
  account_type: TransactionAccountType;
  description: string | null;
  amount: number;
  transaction_date: string;
  posted_date: string;
  reconciled: boolean;
  variance_flagged: boolean;
  linked_document_ids: string[];
  created_at: string;
  updated_at: string;
  created_by: string;
  modified_by: string;
}

export interface Document {
  id: string;
  organization_id: string;
  document_type: DocumentType;
  file_path: string | null;
  extracted_data: Record<string, any> | null;
  uploaded_by: string;
  upload_date: string;
  created_at: string;
}

export interface Variance {
  id: string;
  organization_id: string;
  transaction_id: string;
  variance_type: VarianceType;
  description: string | null;
  flagged_at: string;
  resolved: boolean;
  resolved_at: string | null;
  resolved_by: string | null;
}

export interface Reconciliation {
  id: string;
  organization_id: string;
  document_id: string;
  reconciliation_date: string;
  matched_transactions: string[];
  unmatched_items: Record<string, any> | null;
  status: ReconciliationStatus;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
}

// Audit Trail Types
export interface AuditLog {
  id: string;
  organization_id: string;
  user_id: string | null;
  entity_type: string;
  entity_id: string;
  action: string;
  changes: Record<string, any> | null;
  timestamp: string;
  ip_address: string | null;
  user_agent: string | null;
}

// Request/Response Types
export interface CreateOrganizationRequest {
  name: string;
  organization_type: OrganizationType;
}

export interface CreateDepartmentRequest {
  organization_id: string;
  name: string;
  description?: string;
}

export interface CreateTeamRequest {
  department_id: string;
  organization_id: string;
  name: string;
  description?: string;
}

export interface CreateRoleRequest {
  organization_id: string;
  name: string;
  description?: string;
  permission_level: PermissionLevel;
}

export interface CreateEmployeeRequest {
  organization_id: string;
  role_id: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  department_id?: string;
  team_id?: string;
}

export interface CreateTransactionRequest {
  organization_id: string;
  account_name: string;
  account_type: TransactionAccountType;
  amount: number;
  transaction_date: string;
  description?: string;
}

export interface CreateDocumentRequest {
  organization_id: string;
  document_type: DocumentType;
  file_path?: string;
  extracted_data?: Record<string, any>;
}

