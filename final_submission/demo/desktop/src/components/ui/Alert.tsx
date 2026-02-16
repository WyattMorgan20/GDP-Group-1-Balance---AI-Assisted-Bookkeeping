import React from 'react';
import './Alert.css';

export type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: AlertType;
  confirmText?: string;
}

export default function Alert({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  confirmText = 'OK',
}: AlertProps) {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'error':
        return '✕';
      default:
        return 'ℹ';
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="alert-overlay" onClick={handleBackdropClick}>
      <div className="alert-modal" role="dialog" aria-modal="true">
        <div className={`alert-icon alert-icon-${type}`}>
          {getIcon()}
        </div>
        
        {title && <h2 className="alert-title">{title}</h2>}
        
        <p className="alert-message">{message}</p>
        
        <button
          className={`alert-button alert-button-${type}`}
          onClick={onClose}
          onKeyDown={handleKeyDown}
          autoFocus
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
}
