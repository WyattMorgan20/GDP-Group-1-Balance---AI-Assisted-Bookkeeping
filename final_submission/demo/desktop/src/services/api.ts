import { invoke } from '@tauri-apps/api/core';
import { 
  User, SignUpRequest, LoginRequest, RoleSelectionRequest, ActivationRequest, 
  TwoFactorSetupRequest, TwoFactorSetupResponse, TwoFactorVerifyRequest,
  Organization, Department, Team, Role, Employee, Transaction, Variance, AuditLog,
  CreateOrganizationRequest, CreateDepartmentRequest, CreateTeamRequest, CreateRoleRequest,
  CreateTransactionRequest
} from '../logic/types';
import { logger } from '../logic/config';

// API service wrapper for all Tauri commands
export const api = {
  auth: {
    //Create a new user account
    signUp: async (req: SignUpRequest): Promise<string> => {
      try {
        logger.log('API: sign_up', req.email);
        const result = await invoke<string>('sign_up', { req });
        logger.log('API: sign_up success');
        return result;
      } catch (error) {
        logger.error('API: sign_up failed', error);
        throw error;
      }
    },

    //Authenticate user
    login: async (req: LoginRequest): Promise<User> => {
      try {
        logger.log('API: login', req.email);
        const result = await invoke<User>('login', { req });
        logger.log('API: login success', result);
        return result;
      } catch (error) {
        logger.error('API: login failed', error);
        throw error;
      }
    },

    //Select user role
    chooseRole: async (req: RoleSelectionRequest): Promise<string> => {
      try {
        logger.log('API: choose_role', req);
        const result = await invoke<string>('choose_role', { req });
        logger.log('API: choose_role success');
        return result;
      } catch (error) {
        logger.error('API: choose_role failed', error);
        throw error;
      }
    },

    //Reset user role
    resetRoleSelection: async (email: String): Promise<string> => {
      try {
        logger.log('API: reset_role_selection', email);
        const result = await invoke<string>('reset_choose_role', { email });
        logger.log('API: reset_role_selection success');
        return result;
      } catch (error) {
        logger.error('API: reset_role_selection failed', error);
        throw error;
      }
    },

    //Activate account with code
    activateAccount: async (req: ActivationRequest): Promise<string> => {
      try {
        logger.log('API: activate_account');
        const result = await invoke<string>('activate_account', { req });
        logger.log('API: activate_account success');
        return result;
      } catch (error) {
        logger.error('API: activate_account failed', error);
        throw error;
      }
    },

    //Setup two-factor authentication
    setup2FA: async (req: TwoFactorSetupRequest): Promise<TwoFactorSetupResponse> => {
      try {
        logger.log('API: setup_2fa', req.email);
        const result = await invoke<TwoFactorSetupResponse>('setup_2fa', { req });
        logger.log('API: setup_2fa success');
        return result;
      } catch (error) {
        logger.error('API: setup_2fa failed', error);
        throw error;
      }
    },

    //Verify two-factor authentication
    verify2FA: async (req: TwoFactorVerifyRequest): Promise<string> => {
      try {
        logger.log('API: verify_2fa', req.email);
        const result = await invoke<string>('verify_2fa', { req });
        logger.log('API: verify_2fa success');
        return result;
      } catch (error) {
        logger.error('API: verify_2fa failed', error);
        throw error;
      }
    }
  },

  organizations: {
    // Organization CRUD
    create: async (ownerId: string, name: string, organizationType: string): Promise<Organization> => {
      try {
        logger.log('API: create_organization', name);
        const result = await invoke<Organization>('create_organization', { 
          owner_id: ownerId, 
          name, 
          organization_type: organizationType 
        });
        logger.log('API: create_organization success');
        return result;
      } catch (error) {
        logger.error('API: create_organization failed', error);
        throw error;
      }
    },

    get: async (orgId: string): Promise<Organization> => {
      try {
        logger.log('API: get_organization', orgId);
        const result = await invoke<Organization>('get_organization', { org_id: orgId });
        logger.log('API: get_organization success');
        return result;
      } catch (error) {
        logger.error('API: get_organization failed', error);
        throw error;
      }
    },

    getUserOrganizations: async (userId: string): Promise<Organization[]> => {
      try {
        logger.log('API: get_user_organizations', userId);
        const result = await invoke<Organization[]>('get_user_organizations', { user_id: userId });
        logger.log('API: get_user_organizations success');
        return result;
      } catch (error) {
        logger.error('API: get_user_organizations failed', error);
        throw error;
      }
    },

    // Department CRUD
    createDepartment: async (orgId: string, name: string, description?: string): Promise<Department> => {
      try {
        logger.log('API: create_department', name);
        const result = await invoke<Department>('create_department', { 
          org_id: orgId, 
          name, 
          description 
        });
        logger.log('API: create_department success');
        return result;
      } catch (error) {
        logger.error('API: create_department failed', error);
        throw error;
      }
    },

    getDepartments: async (orgId: string): Promise<Department[]> => {
      try {
        logger.log('API: get_departments', orgId);
        const result = await invoke<Department[]>('get_departments', { org_id: orgId });
        logger.log('API: get_departments success');
        return result;
      } catch (error) {
        logger.error('API: get_departments failed', error);
        throw error;
      }
    },

    // Team CRUD
    createTeam: async (deptId: string, orgId: string, name: string, description?: string): Promise<Team> => {
      try {
        logger.log('API: create_team', name);
        const result = await invoke<Team>('create_team', { 
          dept_id: deptId, 
          org_id: orgId, 
          name, 
          description 
        });
        logger.log('API: create_team success');
        return result;
      } catch (error) {
        logger.error('API: create_team failed', error);
        throw error;
      }
    },

    getTeams: async (deptId: string): Promise<Team[]> => {
      try {
        logger.log('API: get_teams', deptId);
        const result = await invoke<Team[]>('get_teams', { dept_id: deptId });
        logger.log('API: get_teams success');
        return result;
      } catch (error) {
        logger.error('API: get_teams failed', error);
        throw error;
      }
    },

    // Role CRUD
    createRole: async (orgId: string, name: string, permissionLevel: string, description?: string): Promise<Role> => {
      try {
        logger.log('API: create_role', name);
        const result = await invoke<Role>('create_role', { 
          org_id: orgId, 
          name, 
          description,
          permission_level: permissionLevel
        });
        logger.log('API: create_role success');
        return result;
      } catch (error) {
        logger.error('API: create_role failed', error);
        throw error;
      }
    },

    getRoles: async (orgId: string): Promise<Role[]> => {
      try {
        logger.log('API: get_roles', orgId);
        const result = await invoke<Role[]>('get_roles', { org_id: orgId });
        logger.log('API: get_roles success');
        return result;
      } catch (error) {
        logger.error('API: get_roles failed', error);
        throw error;
      }
    }
  },

  transactions: {
    create: async (req: CreateTransactionRequest): Promise<Transaction> => {
      try {
        logger.log('API: create_transaction', req.account_name);
        const result = await invoke<Transaction>('create_transaction', {
          organization_id: req.organization_id,
          account_name: req.account_name,
          account_type: req.account_type,
          amount: req.amount,
          transaction_date: req.transaction_date,
          description: req.description,
          created_by: 'system' // TODO: Get from current user
        });
        logger.log('API: create_transaction success');
        return result;
      } catch (error) {
        logger.error('API: create_transaction failed', error);
        throw error;
      }
    },

    getByOrganization: async (orgId: string): Promise<Transaction[]> => {
      try {
        logger.log('API: get_organization_transactions', orgId);
        const result = await invoke<Transaction[]>('get_organization_transactions', { 
          organization_id: orgId 
        });
        logger.log('API: get_organization_transactions success');
        return result;
      } catch (error) {
        logger.error('API: get_organization_transactions failed', error);
        throw error;
      }
    },

    flagVariance: async (orgId: string, txId: string, varianceType: string, description?: string): Promise<Variance> => {
      try {
        logger.log('API: flag_variance', txId);
        const result = await invoke<Variance>('flag_variance', {
          organization_id: orgId,
          transaction_id: txId,
          variance_type: varianceType,
          description
        });
        logger.log('API: flag_variance success');
        return result;
      } catch (error) {
        logger.error('API: flag_variance failed', error);
        throw error;
      }
    },

    getVariances: async (orgId: string): Promise<Variance[]> => {
      try {
        logger.log('API: get_organization_variances', orgId);
        const result = await invoke<Variance[]>('get_organization_variances', { 
          organization_id: orgId 
        });
        logger.log('API: get_organization_variances success');
        return result;
      } catch (error) {
        logger.error('API: get_organization_variances failed', error);
        throw error;
      }
    },

    resolveVariance: async (varianceId: string, resolvedBy: string): Promise<Variance> => {
      try {
        logger.log('API: resolve_variance', varianceId);
        const result = await invoke<Variance>('resolve_variance', {
          variance_id: varianceId,
          resolved_by: resolvedBy
        });
        logger.log('API: resolve_variance success');
        return result;
      } catch (error) {
        logger.error('API: resolve_variance failed', error);
        throw error;
      }
    }
  },

  audit: {
    logAction: async (orgId: string, userId: string, entityType: string, entityId: string, action: string): Promise<AuditLog> => {
      try {
        logger.log('API: log_action', `${entityType}:${entityId}`);
        const result = await invoke<AuditLog>('log_action', {
          organization_id: orgId,
          user_id: userId,
          entity_type: entityType,
          entity_id: entityId,
          action,
          changes: null,
          ip_address: null,
          user_agent: navigator.userAgent
        });
        logger.log('API: log_action success');
        return result;
      } catch (error) {
        logger.error('API: log_action failed', error);
        throw error;
      }
    },

    getEntityTrail: async (orgId: string, entityType: string, entityId: string): Promise<AuditLog[]> => {
      try {
        logger.log('API: get_entity_audit_trail', `${entityType}:${entityId}`);
        const result = await invoke<AuditLog[]>('get_entity_audit_trail', {
          organization_id: orgId,
          entity_type: entityType,
          entity_id: entityId
        });
        logger.log('API: get_entity_audit_trail success');
        return result;
      } catch (error) {
        logger.error('API: get_entity_audit_trail failed', error);
        throw error;
      }
    },

    getUserActions: async (orgId: string, userId: string, limit: number = 50): Promise<AuditLog[]> => {
      try {
        logger.log('API: get_user_actions', userId);
        const result = await invoke<AuditLog[]>('get_user_actions', {
          organization_id: orgId,
          user_id: userId,
          limit
        });
        logger.log('API: get_user_actions success');
        return result;
      } catch (error) {
        logger.error('API: get_user_actions failed', error);
        throw error;
      }
    }
  }
};

export default api;

