import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface PasswordInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function PasswordInputField({
  label,
  error,
  onChange,
  className = '',
  ...props
}: PasswordInputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    // Call the onChange from register if it exists
    if (onChange) {
      onChange(e);
    }
  };

  const hasValue = inputValue.length > 0;

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-text-main">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-sm border ${
            error
              ? 'border-red-400 focus:ring-red-200'
              : 'border-surface-border focus:ring-primary/20'
          } bg-white text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:border-primary transition-colors pr-10 ${className}`}
          {...props}
        />
        {hasValue && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <FiEyeOff className="w-4 h-4" />
            ) : (
              <FiEye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
