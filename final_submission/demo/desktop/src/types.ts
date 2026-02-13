export type OrganizationType = 'Business' | 'AccountingFirm';
export type MembershipRole = 'Owner' | 'Employee';

export interface User {
  id: number;
  email: string;
  first_login: boolean;
  role_selected: boolean;
  account_activated: boolean;
  organization_type: OrganizationType | null;
  membership_role: MembershipRole | null;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RoleSelectionRequest {
  organization_type: OrganizationType;
  membership_role: MembershipRole;
}

export interface ActivationRequest {
  activation_code: string;
  organization_code: string | null;
}
