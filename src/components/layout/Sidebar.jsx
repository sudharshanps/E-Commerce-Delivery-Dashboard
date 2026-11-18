import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDelivery } from '../../context/DeliveryContext';
import {
  LayoutDashboard,
  ShoppingBag,
  IndianRupee,
  BarChart3,
  User,
  Bell,
  Settings,
  X,
  Bike,
  Power
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose }) => {
  const { stats, partnerProfile, toggleOnlineStatus } = useDelivery();

  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      to: '/orders',
      label: 'Order Management',
      icon: ShoppingBag,
      badge: stats.pendingOrdersCount > 0 ? stats.pendingOrdersCount : null
    },
    {
      to: '/earnings',
      label: 'Earnings',
      icon: IndianRupee,
      badge: null
    },
    {
      to: '/analytics',
      label: 'Performance',
      icon: BarChart3,
      badge: null
    },
    {
      to: '/profile',
      label: 'Partner Profile',
      icon: User,
      badge: null
    },
    {
      to: '/notifications',
      label: 'Notifications',
      icon: Bell,
      badge: stats.unreadNotificationsCount > 0 ? stats.unreadNotificationsCount : null
    },
    {
      to: '/settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <NavLink to="/" className="brand-logo" onClick={onClose}>
            <div className="brand-icon-box">
              <Bike size={20} />
            </div>
            <div className="brand-text">
              <span className="brand-title">FastDrop</span>
              <span className="brand-subtitle">Delivery Partner</span>
            </div>
          </NavLink>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-section-title">Menu</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
              >
                <div className="nav-item-content">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== null && (
                  <span className="nav-badge">{item.badge}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="partner-status-box">
            <div className="partner-status-info">
              <span
                className={`status-indicator-dot ${partnerProfile.isOnline ? 'online' : ''}`}
              />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                  {partnerProfile.isOnline ? 'Online (Active)' : 'Offline'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {partnerProfile.name.split(' ')[0]} • {partnerProfile.id}
                </div>
              </div>
            </div>
            <button
              type="button"
              className={`btn btn-sm ${partnerProfile.isOnline ? 'btn-outline' : 'btn-primary'}`}
              onClick={toggleOnlineStatus}
              title={partnerProfile.isOnline ? 'Go Offline' : 'Go Online'}
              style={{ padding: '0.35rem 0.6rem' }}
            >
              <Power size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
