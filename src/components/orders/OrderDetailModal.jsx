import React, { useState } from 'react';
import Modal from '../common/Modal';
import OrderStatusBadge from './OrderStatusBadge';
import Button from '../common/Button';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { useDelivery } from '../../context/DeliveryContext';
import {
  MapPin,
  Store,
  User,
  Phone,
  Clock,
  IndianRupee,
  CheckCircle,
  Truck,
  PackageCheck,
  AlertCircle,
  Navigation
} from 'lucide-react';

export const OrderDetailModal = ({ order, isOpen, onClose }) => {
  const {
    acceptOrder,
    pickupOrder,
    startDelivery,
    completeDelivery,
    cancelOrder,
    showToast
  } = useDelivery();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Customer unreachable');

  if (!order) return null;

  const handleAction = (actionFn, nextLabel) => {
    actionFn(order.id);
  };

  const handleCancel = () => {
    cancelOrder(order.id, cancelReason);
    setCancelModalOpen(false);
  };

  const handleSimulateCall = (name, phone) => {
    showToast(`Calling ${name} at ${phone}...`, 'info');
  };

  const handleSimulateMap = (destination) => {
    showToast(`Opening navigation to ${destination}...`, 'info');
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Order Details #${order.id}`}
        maxWidth="650px"
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              {['New', 'Accepted'].includes(order.orderStatus) && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setCancelModalOpen(true)}
                >
                  Cancel / Reject
                </Button>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>

              {order.orderStatus === 'New' && (
                <Button
                  variant="primary"
                  icon={CheckCircle}
                  onClick={() => handleAction(acceptOrder, 'Accepted')}
                >
                  Accept Order
                </Button>
              )}

              {order.orderStatus === 'Accepted' && (
                <Button
                  variant="primary"
                  icon={PackageCheck}
                  onClick={() => handleAction(pickupOrder, 'Picked Up')}
                >
                  Mark as Picked Up
                </Button>
              )}

              {order.orderStatus === 'Picked Up' && (
                <Button
                  variant="primary"
                  icon={Truck}
                  onClick={() => handleAction(startDelivery, 'Out for Delivery')}
                >
                  Start Delivery
                </Button>
              )}

              {order.orderStatus === 'Out for Delivery' && (
                <Button
                  variant="success"
                  icon={CheckCircle}
                  onClick={() => handleAction(completeDelivery, 'Delivered')}
                >
                  Mark as Delivered
                </Button>
              )}
            </div>
          </div>
        }
      >
        {/* Top Info Bar */}
        <div className="order-detail-header-info">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>#{order.id}</span>
              <OrderStatusBadge status={order.orderStatus} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Clock size={14} />
              <span>Placed: {formatDateTime(order.orderTime)}</span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Partner Earnings
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {formatCurrency(order.totalEarnings)}
            </div>
          </div>
        </div>

        {/* Route / Addresses Section */}
        <div className="order-detail-section">
          <div className="section-label">Pickup & Delivery Route ({order.distanceKm} km • ~{order.estimatedTimeMins} mins)</div>
          
          {/* Restaurant / Pickup */}
          <div className="address-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <Store size={18} style={{ color: '#d97706', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{order.restaurantName}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {order.restaurantAddress}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Phone}
                  onClick={() => handleSimulateCall(order.restaurantName, order.restaurantPhone)}
                  title="Call Restaurant"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Navigation}
                  onClick={() => handleSimulateMap(order.restaurantAddress)}
                  title="Navigate to Restaurant"
                />
              </div>
            </div>
          </div>

          {/* Customer / Dropoff */}
          <div className="address-box">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <MapPin size={18} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>
                    {order.customerName}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {order.deliveryAddress}
                  </div>
                  {order.deliveryNotes && (
                    <div style={{ fontSize: '0.78rem', color: '#b45309', backgroundColor: '#fef3c7', padding: '0.2rem 0.5rem', borderRadius: '4px', marginTop: '0.35rem', display: 'inline-block' }}>
                      <strong>Note:</strong> {order.deliveryNotes}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Phone}
                  onClick={() => handleSimulateCall(order.customerName, order.customerPhone)}
                  title="Call Customer"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Navigation}
                  onClick={() => handleSimulateMap(order.deliveryAddress)}
                  title="Navigate to Customer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="order-detail-section">
          <div className="section-label">Order Items ({order.items.length})</div>
          <div className="items-list-box">
            {order.items.map((item, idx) => (
              <div key={idx} className="item-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)', width: '24px' }}>
                    {item.quantity}x
                  </span>
                  <span>{item.name}</span>
                </div>
                <div style={{ fontWeight: 500 }}>
                  {item.price === 0 ? 'Complimentary' : formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="order-pricing-summary">
            <div className="pricing-line">
              <span>Customer Bill Total</span>
              <span style={{ fontWeight: 600 }}>{formatCurrency(order.orderTotal)}</span>
            </div>
            <div className="pricing-line">
              <span>Payment Mode</span>
              <span style={{ fontWeight: 600, color: order.paymentStatus === 'Cash on Delivery' ? '#b45309' : '#15803d' }}>
                {order.paymentStatus}
              </span>
            </div>
            <div className="pricing-line">
              <span>Delivery Partner Base Fare</span>
              <span>{formatCurrency(order.deliveryFee)}</span>
            </div>
            {order.tip > 0 && (
              <div className="pricing-line" style={{ color: '#15803d' }}>
                <span>Customer Tip</span>
                <span style={{ fontWeight: 600 }}>+{formatCurrency(order.tip)}</span>
              </div>
            )}
            <div className="pricing-line partner-earning">
              <span>Your Total Payout</span>
              <span>{formatCurrency(order.totalEarnings)}</span>
            </div>
          </div>
        </div>

        {/* Status History */}
        {order.statusHistory && order.statusHistory.length > 0 && (
          <div className="order-detail-section" style={{ marginBottom: 0 }}>
            <div className="section-label">Order Activity Log</div>
            <div className="status-timeline">
              {order.statusHistory.map((log, index) => (
                <div key={index} className="timeline-step">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                      {log.status}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {formatDateTime(log.time)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {log.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel Order Confirmation Modal */}
      <Modal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        title="Cancel Delivery Assignment"
        maxWidth="450px"
        footer={
          <>
            <Button variant="secondary" onClick={() => setCancelModalOpen(false)}>
              Keep Order
            </Button>
            <Button variant="danger" onClick={handleCancel}>
              Confirm Cancellation
            </Button>
          </>
        }
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <AlertCircle size={24} style={{ color: 'var(--danger)', flexShrink: 0 }} />
          <div>
            <div style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
              Are you sure you want to cancel Order #{order.id}?
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
              Cancelling active orders may affect your delivery partner acceptance rate.
            </p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Reason for cancellation</label>
          <select
            className="form-select"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          >
            <option value="Customer unreachable">Customer unreachable</option>
            <option value="Vehicle breakdown / flat tire">Vehicle breakdown / flat tire</option>
            <option value="Heavy traffic / blocked road">Heavy traffic / blocked road</option>
            <option value="Restaurant kitchen delay > 45 mins">Restaurant kitchen delay &gt; 45 mins</option>
            <option value="Emergency personal leave">Emergency personal leave</option>
          </select>
        </div>
      </Modal>
    </>
  );
};

export default OrderDetailModal;
