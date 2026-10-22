import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function InputField({
  label,
  error,
  className = '',
  ...props
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-text-main">
        {label}
      </label>
      <input
        className={`w-full px-4 py-3 rounded-sm border ${
          error
            ? 'border-red-400 focus:ring-red-200'
            : 'border-surface-border focus:ring-primary/20'
        } bg-white text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:border-primary transition-colors ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
