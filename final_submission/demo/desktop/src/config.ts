// Environment configuration
export const config = {
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // API settings
  apiTimeout: 30000, // 30 seconds
  
  // Feature flags
  features: {
    enablePayments: import.meta.env.VITE_ENABLE_PAYMENTS === 'true',
    enableEmailResend: import.meta.env.VITE_ENABLE_EMAIL_RESEND === 'true',
    enablePasswordReset: import.meta.env.VITE_ENABLE_PASSWORD_RESET === 'true'
  },
  
  // App info
  appName: 'Balancd',
  appTagline: 'AI-Assisted Bookkeeping',
  
  // Logging
  enableLogging: import.meta.env.DEV
} as const;

// Type-safe feature flag checker
export function isFeatureEnabled(feature: keyof typeof config.features): boolean {
  return config.features[feature];
}

// Logger utility
export const logger = {
  log: (...args: unknown[]) => {
    if (config.enableLogging) {
      console.log('[Balancd]', ...args);
    }
  },

  error: (...args: unknown[]) => {
    if (config.enableLogging) {
      console.error('[Balancd Error]', ...args);
    }
  },

  warn: (...args: unknown[]) => {
    if (config.enableLogging) {
      console.warn('[Balancd Warning]', ...args);
    }
  }
};
