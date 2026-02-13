import { z } from 'zod';
import { VALIDATION, ERROR_MESSAGES } from './constants';

// Signup form validation
export const signupSchema = z.object({
  email: z.email(ERROR_MESSAGES.INVALID_EMAIL),
  
  confirmEmail: z.string(),
  
  password: z
    .string()
    .min(VALIDATION.MIN_PASSWORD_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT),
  
  confirmPassword: z.string()
}).refine((data) => data.email === data.confirmEmail, {
  message: ERROR_MESSAGES.EMAILS_DONT_MATCH,
  path: ['confirmEmail']
}).refine((data) => data.password === data.confirmPassword, {
  message: ERROR_MESSAGES.PASSWORDS_DONT_MATCH,
  path: ['confirmPassword']
});

export type SignupFormData = z.infer<typeof signupSchema>;

// Login form validation
export const loginSchema = z.object({
  email: z.email(ERROR_MESSAGES.INVALID_EMAIL),
  
  password: z
    .string()
    .min(1, ERROR_MESSAGES.PASSWORD_REQUIRED)
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Activation form validation
export const activationSchema = z.object({
  activationCode: z
    .string()
    .min(1, ERROR_MESSAGES.ACTIVATION_CODE_REQUIRED),
  
  organizationCode: z.string().optional()
});

export type ActivationFormData = z.infer<typeof activationSchema>;

// Helper function for role-based validation
export function validateActivationWithRole(
  data: ActivationFormData,
  requiresOrganizationCode: boolean
): { success: boolean; error?: string } {
  if (requiresOrganizationCode && !data.organizationCode?.trim()) {
    return {
      success: false,
      error: ERROR_MESSAGES.ORGANIZATION_CODE_REQUIRED,
    };
  }
  return { success: true };
}
