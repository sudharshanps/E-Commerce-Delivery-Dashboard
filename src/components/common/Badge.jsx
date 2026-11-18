import React from 'react';

export const Badge = ({ children, variant = 'neutral', dot = false, className = '' }) => {
  return (
    <span className={`badge badge-${variant} ${className}`}>
      {dot && <span className="badge-dot" />}
      {children}
    </span>
  );
};

export default Badge;
