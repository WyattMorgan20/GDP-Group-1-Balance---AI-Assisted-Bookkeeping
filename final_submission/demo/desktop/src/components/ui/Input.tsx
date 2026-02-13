import React from 'react';
import './Input.css';

export type InputType = 'text' | 'email' | 'password' | 'code';
export type InputState = 'default' | 'valid' | 'invalid';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputType?: InputType;
  state?: InputState;
  hint?: string;
  error?: string;
  success?: string;
}

export default function Input({
  inputType = 'text',
  state = 'default',
  hint,
  error,
  success,
  className = '',
  ...props
}: InputProps) {
  const classNames = [
    'input',
    `input-${inputType}`,
    state !== 'default' ? `input-${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="input-wrapper">
      <input className={classNames} {...props} />
      {hint && !error && !success && (
        <span className="input-hint">{hint}</span>
      )}
      {error && <span className="input-error">{error}</span>}
      {success && <span className="input-success">{success}</span>}
    </div>
  );
}
