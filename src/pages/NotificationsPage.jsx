import React, { useState } from 'react';
import { useDelivery } from '../context/DeliveryContext';
import { getRelativeTime, formatDateTime } from '../utils/formatters';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import {
  Bell,
  CheckCheck,
  Trash2,
  ShoppingBag,
  IndianRupee,
  Info,
  Check,
  Inbox
} from 'lucide-react';

export const NotificationsPage = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification
  } = useDelivery();

  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'unread', 'order', 'earnings', 'system'

  const filteredNotifications = notifications.filter((notif) => {
    if (activeFilter === 'unread') return !notif.read;
    if (activeFilter === 'order') return notif.type === 'order';
    if (activeFilter === 'earnings') return notif.type === 'earnings';
    if (activeFilter === 'system') return notif.type === 'system';
    return true;
  });

  const getNotifIcon = (type) => {
    switch (type) {
      case 'order':
        return {
          icon: ShoppingBag,
          color: '#2563eb',
          bg: '#dbeafe'
        };
      case 'earnings':
        return {
          icon: IndianRupee,
          color: '#16a34a',
          bg: '#dcfce7'
        };
      default:
        return {
          icon: Info,
          color: '#e23744',
          bg: '#fee2e2'
        };
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      {/* Header controls bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: '#fff',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1rem 1.25rem',
          marginBottom: '1.25rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`btn btn-sm ${activeFilter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveFilter('all')}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeFilter === 'unread' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeFilter === 'order' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveFilter('order')}
          >
            Orders
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeFilter === 'earnings' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveFilter('earnings')}
          >
            Earnings
          </button>
          <button
            type="button"
            className={`btn btn-sm ${activeFilter === 'system' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveFilter('system')}
          >
            System
          </button>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            icon={CheckCheck}
            onClick={markAllNotificationsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>

      <Card>
        <CardHeader
          title="Notification Center"
          subtitle={`Showing ${filteredNotifications.length} alerts & updates`}
        />
        <CardBody style={{ padding: 0 }}>
          {filteredNotifications.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Inbox size={26} />
              </div>
              <div className="empty-state-title">No notifications</div>
              <p className="empty-state-text">
                {activeFilter === 'unread'
                  ? 'All notifications have been read. You’re completely caught up!'
                  : 'No notification records match this filter.'}
              </p>
            </div>
          ) : (
            <div>
              {filteredNotifications.map((notif) => {
                const config = getNotifIcon(notif.type);
                const Icon = config.icon;

                return (
                  <div
                    key={notif.id}
                    className={`notification-item ${!notif.read ? 'unread' : ''}`}
                  >
                    <div className="notification-content">
                      <div
                        className="notif-icon-box"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        <Icon size={18} />
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontWeight: notif.read ? 600 : 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                            {notif.title}
                          </span>
                          {!notif.read && (
                            <span
                              style={{
                                width: '7px',
                                height: '7px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--color-primary)'
                              }}
                            />
                          )}
                        </div>

                        <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                          {notif.message}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.4rem', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          <span>{getRelativeTime(notif.timestamp)}</span>
                          <span>•</span>
                          <span>{formatDateTime(notif.timestamp)}</span>
                          {notif.orderId && (
                            <>
                              <span>•</span>
                              <strong style={{ color: 'var(--color-primary)' }}>
                                #{notif.orderId}
                              </strong>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                      {!notif.read && (
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Check}
                          onClick={() => markNotificationRead(notif.id)}
                          title="Mark as read"
                        />
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        icon={Trash2}
                        onClick={() => deleteNotification(notif.id)}
                        title="Delete notification"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default NotificationsPage;
