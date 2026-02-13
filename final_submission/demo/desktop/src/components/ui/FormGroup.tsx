import React from 'react';
import './FormGroup.css';

interface FormGroupProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function FormGroup({
  label,
  htmlFor,
  required = false,
  children,
  className = '',
}: FormGroupProps) {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={htmlFor}>
        {label}
        {required && <span className="form-required">*</span>}
      </label>
      {children}
    </div>
  );
}
