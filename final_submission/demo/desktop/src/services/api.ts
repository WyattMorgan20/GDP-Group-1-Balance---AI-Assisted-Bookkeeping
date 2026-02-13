import { invoke } from '@tauri-apps/api/core';
import { User, SignUpRequest, LoginRequest, RoleSelectionRequest, ActivationRequest } from '../types';
import { logger } from '../config';

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
    }
  },

  // Future modules can be added here:
  // dashboard: { ... },
  // transactions: { ... },
  // reports: { ... },
};

export default api;
