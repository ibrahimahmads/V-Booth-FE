import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'tertiary';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = "flex items-center justify-center gap-2 font-semibold rounded-xl transition-all active:scale-95 text-sm md:text-base";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-hover shadow-md shadow-primary/20 transition-colors",
    secondary: "bg-white text-text-main border border-canvas-border hover:bg-canvas-placeholder transition-colors",
    tertiary: "bg-tertiary text-white hover:bg-primary",
    ghost: "text-text-muted hover:bg-black/5"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}