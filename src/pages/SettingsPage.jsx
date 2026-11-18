import React, { useState } from 'react';
import { useDelivery } from '../context/DeliveryContext';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import {
  Settings,
  Bell,
  Volume2,
  Power,
  RotateCcw,
  Shield,
  Smartphone,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  User
} from 'lucide-react';

export const SettingsPage = () => {
  const {
    settings,
    updateSettings,
    partnerProfile,
    toggleOnlineStatus,
    resetToDemoData,
    showToast
  } = useDelivery();

  const [resetModalOpen, setResetModalOpen] = useState(false);

  const handleToggle = (key) => {
    updateSettings({ [key]: !settings[key] });
  };

  const handleConfirmReset = () => {
    resetToDemoData();
    setResetModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '850px' }}>
      {/* Availability Status Setting */}
      <Card>
        <CardHeader
          title="Delivery Partner Duty & Availability"
          subtitle="Control your online presence and dispatch eligibility"
        />
        <CardBody>
          <div className="switch-wrapper">
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                Online for New Delivery Assignments
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                When turned on, the system will allocate nearby customer orders to your queue.
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={partnerProfile.isOnline}
                onChange={toggleOnlineStatus}
              />
              <span className="slider" />
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader
          title="Notification & Sound Preferences"
          subtitle="Configure alerts for incoming orders, route changes, and wallet credits"
        />
        <CardBody>
          <div className="switch-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Volume2 size={18} style={{ color: 'var(--color-primary)' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                  Audible Order Alert Sound
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Plays high-volume alert ringtone whenever a new order is assigned.
                </div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.notificationSound}
                onChange={() => handleToggle('notificationSound')}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="switch-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Bell size={18} style={{ color: '#2563eb' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                  Push Notifications
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Receive device banner notifications for pickup preparation & updates.
                </div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.pushAlerts}
                onChange={() => handleToggle('pushAlerts')}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="switch-wrapper">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Smartphone size={18} style={{ color: '#16a34a' }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                  SMS Updates for Daily Earnings
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Send an end-of-day summary SMS with total earnings and incentives.
                </div>
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.smsUpdates}
                onChange={() => handleToggle('smsUpdates')}
              />
              <span className="slider" />
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Navigation Preferences */}
      <Card>
        <CardHeader
          title="App & Navigation Preferences"
          subtitle="Configure default map provider and navigation behavior"
        />
        <CardBody>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Preferred Navigation Map Application</label>
            <select
              className="form-select"
              value={settings.preferredMap}
              onChange={(e) => updateSettings({ preferredMap: e.target.value })}
            >
              <option value="Google Maps">Google Maps (Recommended)</option>
              <option value="Apple Maps">Apple Maps</option>
              <option value="Mappls (MapmyIndia)">Mappls (MapmyIndia)</option>
              <option value="Waze">Waze</option>
            </select>
          </div>

          <div className="switch-wrapper">
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                Auto-Launch Navigation on Accept
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Immediately launch route navigation to the restaurant when an order is accepted.
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.autoNavigateOnAccept}
                onChange={() => handleToggle('autoNavigateOnAccept')}
              />
              <span className="slider" />
            </label>
          </div>

          <div className="switch-wrapper">
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                Battery Saver GPS Mode
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Reduces GPS poll frequency slightly when stationary to conserve phone battery.
              </div>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={settings.batterySaverMode}
                onChange={() => handleToggle('batterySaverMode')}
              />
              <span className="slider" />
            </label>
          </div>
        </CardBody>
      </Card>

      {/* Demonstration Data Management */}
      <Card style={{ borderColor: '#fca5a5' }}>
        <CardHeader
          title="Demonstration Data Controls"
          subtitle="Reset dashboard statistics, sample orders, and mock wallet balance"
        />
        <CardBody>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                Reset All Demonstration Data
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '500px', marginTop: '0.2rem' }}>
                Restore all original sample orders, reset statuses to initial state, clear customized profile data, and reset notification history in localStorage.
              </p>
            </div>

            <Button
              variant="danger"
              icon={RotateCcw}
              onClick={() => setResetModalOpen(true)}
            >
              Reset Demonstration Data
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Confirmation Modal for Reset */}
      <Modal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        title="Confirm Demonstration Data Reset"
        maxWidth="450px"
        footer={
          <>
            <Button variant="secondary" onClick={() => setResetModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" icon={RotateCcw} onClick={handleConfirmReset}>
              Yes, Reset Everything
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <AlertTriangle size={24} style={{ color: 'var(--danger)', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.35rem' }}>
              Are you sure you want to reset all mock data?
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              This will overwrite your current order statuses, earnings changes, notifications, and profile modifications back to default demonstration values.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
