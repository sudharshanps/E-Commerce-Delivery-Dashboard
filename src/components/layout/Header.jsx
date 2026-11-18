import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDelivery } from '../../context/DeliveryContext';
import { formatCurrency } from '../../utils/formatters';
import { Menu, Bell, Wallet, ShieldCheck } from 'lucide-react';

export const Header = ({ onOpenSidebar }) => {
  const location = useLocation();
  const { stats, partnerProfile, toggleOnlineStatus } = useDelivery();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: 'Delivery Dashboard', subtitle: 'Overview of today’s orders & performance' };
      case '/orders':
        return { title: 'Order Management', subtitle: 'Manage, accept, and track assigned deliveries' };
      case '/earnings':
        return { title: 'Earnings & Payouts', subtitle: 'Daily breakdown, incentives, and payout history' };
      case '/analytics':
        return { title: 'Performance Analytics', subtitle: 'Delivery metrics, success rates, and ratings' };
      case '/profile':
        return { title: 'Delivery Partner Profile', subtitle: 'Personal info, vehicle details, and documents' };
      case '/notifications':
        return { title: 'Notifications', subtitle: 'Order alerts, payment updates, and notices' };
      case '/settings':
        return { title: 'Settings', subtitle: 'Account preferences and demonstration data controls' };
      default:
        return { title: 'Dashboard', subtitle: 'Delivery Partner Portal' };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onOpenSidebar}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        <div className="page-heading">
          <h1 className="page-title">{title}</h1>
          <span className="page-subtitle">{subtitle}</span>
        </div>
      </div>

      <div className="header-right">
        {/* Availability Toggle */}
        <button
          type="button"
          className={`header-status-toggle ${partnerProfile.isOnline ? 'online' : ''}`}
          onClick={toggleOnlineStatus}
          title="Click to toggle Duty Status"
        >
          <span className={`status-indicator-dot ${partnerProfile.isOnline ? 'online' : ''}`} />
          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>
            {partnerProfile.isOnline ? 'Online' : 'Offline'}
          </span>
        </button>

        {/* Quick Today's Earnings Pill */}
        <Link
          to="/earnings"
          className="btn btn-secondary btn-sm"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}
          title="View today's earnings"
        >
          <Wallet size={15} style={{ color: 'var(--color-primary)' }} />
          <span>{formatCurrency(stats.todayEarnings)}</span>
        </Link>

        {/* Notification Bell */}
        <div className="notif-button-wrapper">
          <Link
            to="/notifications"
            className="icon-btn"
            aria-label={`Notifications, ${stats.unreadNotificationsCount} unread`}
          >
            <Bell size={18} />
            {stats.unreadNotificationsCount > 0 && (
              <span className="icon-badge">
                {stats.unreadNotificationsCount > 9 ? '9+' : stats.unreadNotificationsCount}
              </span>
            )}
          </Link>
        </div>

        {/* Partner Profile Snippet */}
        <Link to="/profile" className="header-profile-link" title="View Partner Profile">
          <div className="avatar-circle">
            {partnerProfile.name.charAt(0)}
          </div>
          <div className="header-user-info">
            <span className="header-user-name">{partnerProfile.name}</span>
            <span className="header-user-role">
              {partnerProfile.id} • {partnerProfile.vehicleType}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
