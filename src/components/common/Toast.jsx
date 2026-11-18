import React from 'react';
import { useDelivery } from '../../context/DeliveryContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = () => {
  const { toast, hideToast } = useDelivery();

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      case 'warning':
        return <AlertTriangle size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className={`toast toast-${toast.type}`}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          {getIcon()}
          <span>{toast.message}</span>
        </div>
        <button
          onClick={hideToast}
          style={{ color: 'inherit', padding: '2px', opacity: 0.8 }}
          aria-label="Close notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;
