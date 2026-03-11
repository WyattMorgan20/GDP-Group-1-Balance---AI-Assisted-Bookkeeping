export type OrganizationType = 'Business' | 'AccountingFirm';
export type MembershipRole = 'Owner' | 'Employee';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  first_login: boolean;
  role_selected: boolean;
  account_activated: boolean;
  organization_type: OrganizationType | null;
  membership_role: MembershipRole | null;
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
