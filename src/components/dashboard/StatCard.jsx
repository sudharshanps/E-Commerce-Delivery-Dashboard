import React from 'react';

export const StatCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  variant = 'red',
  className = ''
}) => {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-card-top">
        <div>
          <div className="stat-card-label">{label}</div>
          <div className="stat-card-value">{value}</div>
        </div>
        {Icon && (
          <div className={`stat-icon-wrapper stat-icon-${variant}`}>
            <Icon size={22} />
          </div>
        )}
      </div>
      {subtext && <div className="stat-card-subtext">{subtext}</div>}
    </div>
  );
};

export default StatCard;
