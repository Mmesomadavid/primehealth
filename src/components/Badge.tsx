import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  const variantStyles = {
    primary: 'bg-emerald-100 text-emerald-800',
    secondary: 'bg-gray-100 text-gray-800',
  };

  const badgeClasses = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return <span className={badgeClasses}>{children}</span>;
};
