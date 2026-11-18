import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  onClick,
  icon: Icon,
  className = '',
  type = 'button',
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';
  const blockClass = block ? 'btn-block' : '';

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${sizeClass} ${blockClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      {children}
    </button>
  );
};

export default Button;
