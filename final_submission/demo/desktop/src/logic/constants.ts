// App routes/states
export const APP_STATES = {
  LOGIN: 'login',
  SIGNUP: 'sign-up',
  ROLE_SELECTION: 'role-selection',
  ACTIVATION: 'activation',
  DASHBOARD: 'dashboard'
} as const;

// Error messages
export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Please enter a valid email address',
  EMAIL_REQUIRED: 'Email is required',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters',
  EMAILS_DONT_MATCH: 'Email addresses do not match',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  ACTIVATION_CODE_REQUIRED: 'Activation code is required',
  ORGANIZATION_CODE_REQUIRED: 'Organization code is required',
  LOGIN_FAILED: 'Incorrect email or password'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  ACCOUNT_CREATED: 'Account created. Check your email for activation code.',
  ROLE_SELECTED: 'Role selected successfully',
  ACCOUNT_ACTIVATED: 'Account activated! Welcome to Balancd!',
  LOGIN_SUCCESS: 'Welcome back!'
} as const;

// Field hints
export const FIELD_HINTS = {
  ACTIVATION_CODE: 'Check your email for the activation code',
  ORGANIZATION_CODE: 'Ask your owner for this code'
} as const;

// Validation patterns
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 8,
  ACTIVATION_CODE_MAX_LENGTH: 19
} as const;

// Test accounts
export const TEST_ACCOUNTS = {
  DEV_EMAIL: 'test@balancd.dev'
} as const;
