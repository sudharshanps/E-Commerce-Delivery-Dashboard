import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDelivery } from '../../context/DeliveryContext';
import Button from '../common/Button';
import Modal from '../common/Modal';
import {
  Power,
  ShoppingBag,
  IndianRupee,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  HelpCircle
} from 'lucide-react';

export const QuickActions = () => {
  const navigate = useNavigate();
  const { stats, partnerProfile, toggleOnlineStatus, showToast } = useDelivery();
  const [sosModalOpen, setSosModalOpen] = useState(false);

  const handleSosCall = (number, department) => {
    showToast(`Connecting to ${department} (${number})...`, 'warning');
    setSosModalOpen(false);
  };

  return (
    <>
      <div className="quick-actions-bar">
        <span className="quick-actions-title">Quick Actions</span>

        <Button
          variant={partnerProfile.isOnline ? 'secondary' : 'primary'}
          icon={Power}
          onClick={toggleOnlineStatus}
        >
          {partnerProfile.isOnline ? 'Pause Duty (Go Offline)' : 'Start Duty (Go Online)'}
        </Button>

        <Button
          variant="secondary"
          icon={ShoppingBag}
          onClick={() => navigate('/orders')}
        >
          Active Deliveries ({stats.activeDeliveriesCount})
        </Button>

        <Button
          variant="secondary"
          icon={IndianRupee}
          onClick={() => navigate('/earnings')}
        >
          Earnings Summary
        </Button>

        <Button
          variant="danger"
          icon={ShieldAlert}
          onClick={() => setSosModalOpen(true)}
          style={{ marginLeft: 'auto' }}
        >
          SOS / Support
        </Button>
      </div>

      {/* SOS / Support Modal */}
      <Modal
        isOpen={sosModalOpen}
        onClose={() => setSosModalOpen(false)}
        title="Emergency & Partner Support"
        maxWidth="460px"
        footer={
          <Button variant="secondary" onClick={() => setSosModalOpen(false)}>
            Close
          </Button>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ backgroundColor: '#fee2e2', padding: '0.85rem', borderRadius: '8px', display: 'flex', gap: '0.65rem' }}>
            <AlertTriangle size={20} style={{ color: '#dc2626', flexShrink: 0 }} />
            <div style={{ fontSize: '0.84rem', color: '#991b1b' }}>
              <strong>Emergency Assistance</strong>: If you are in an accident or immediate danger, call 112 emergency services first.
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Button
              variant="danger"
              icon={PhoneCall}
              block
              onClick={() => handleSosCall('112', 'National Emergency Police / Ambulance')}
            >
              Call Police / Ambulance (112)
            </Button>

            <Button
              variant="secondary"
              icon={HelpCircle}
              block
              onClick={() => handleSosCall('1800-266-9999', '24x7 Partner Support Helpline')}
            >
              Partner Support 24x7 Helpline (1800-266-9999)
            </Button>

            <Button
              variant="secondary"
              icon={PhoneCall}
              block
              onClick={() => handleSosCall(partnerProfile.emergencyContact, 'Emergency Family Contact')}
            >
              Call Emergency Contact ({partnerProfile.emergencyContact})
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuickActions;
