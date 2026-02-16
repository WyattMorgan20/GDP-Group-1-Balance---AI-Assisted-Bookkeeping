import { useState, useCallback } from 'react';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertState {
  isOpen: boolean;
  title?: string;
  message: string;
  type: AlertType;
  confirmText?: string;
}

export function useAlert() {
  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false,
    message: '',
    type: 'info'
  });

  const showAlert = useCallback((
    message: string,
    options?: {
      title?: string;
      type?: AlertType;
      confirmText?: string;
    }
  ) => {
    setAlertState({
      isOpen: true,
      message,
      title: options?.title,
      type: options?.type || 'info',
      confirmText: options?.confirmText
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlertState(prev => ({ ...prev, isOpen: false }));
  }, []);

  // Convenience methods
  const success = useCallback((message: string, title?: string) => {
    showAlert(message, { type: 'success', title });
  }, [showAlert]);

  const error = useCallback((message: string, title?: string) => {
    showAlert(message, { type: 'error', title });
  }, [showAlert]);

  const warning = useCallback((message: string, title?: string) => {
    showAlert(message, { type: 'warning', title });
  }, [showAlert]);

  const info = useCallback((message: string, title?: string) => {
    showAlert(message, { type: 'info', title });
  }, [showAlert]);

  return {
    alertState,
    showAlert,
    hideAlert,
    success,
    error,
    warning,
    info
  };
}
