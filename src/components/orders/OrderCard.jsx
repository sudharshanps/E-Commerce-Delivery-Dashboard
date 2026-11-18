import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import Button from '../common/Button';
import { formatCurrency, formatTime } from '../../utils/formatters';
import { useDelivery } from '../../context/DeliveryContext';
import {
  Store,
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  PackageCheck,
  Truck
} from 'lucide-react';

export const OrderCard = ({ order, onViewDetails }) => {
  const { acceptOrder, pickupOrder, startDelivery, completeDelivery } = useDelivery();

  return (
    <div className="order-item-card">
      <div className="order-card-header">
        <div>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
            #{order.id}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
            {formatTime(order.orderTime)}
          </span>
        </div>
        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Pickup */}
        <div className="order-location-point">
          <span className="location-marker-dot dot-restaurant" />
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{order.restaurantName}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {order.restaurantAddress}
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="order-location-point">
          <span className="location-marker-dot dot-customer" />
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{order.customerName}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {order.deliveryAddress}
            </div>
          </div>
        </div>
      </div>

      <div className="order-card-meta">
        <div>
          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>
            {order.distanceKm} km
          </span>
          <span style={{ margin: '0 0.35rem' }}>•</span>
          <span>~{order.estimatedTimeMins} mins</span>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, color: 'var(--color-primary)', fontSize: '1.05rem' }}>
            {formatCurrency(order.totalEarnings)}
          </div>
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              color: order.paymentStatus === 'Cash on Delivery' ? '#92400e' : '#15803d'
            }}
          >
            {order.paymentStatus === 'Cash on Delivery' ? 'COD' : 'Paid Online'}
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
        <Button
          variant="secondary"
          size="sm"
          block
          icon={Eye}
          onClick={() => onViewDetails(order)}
        >
          View Details
        </Button>

        {order.orderStatus === 'New' && (
          <Button
            variant="primary"
            size="sm"
            block
            icon={CheckCircle}
            onClick={() => acceptOrder(order.id)}
          >
            Accept
          </Button>
        )}

        {order.orderStatus === 'Accepted' && (
          <Button
            variant="primary"
            size="sm"
            block
            icon={PackageCheck}
            onClick={() => pickupOrder(order.id)}
          >
            Pickup
          </Button>
        )}

        {order.orderStatus === 'Picked Up' && (
          <Button
            variant="primary"
            size="sm"
            block
            icon={Truck}
            onClick={() => startDelivery(order.id)}
          >
            Start Delivery
          </Button>
        )}

        {order.orderStatus === 'Out for Delivery' && (
          <Button
            variant="success"
            size="sm"
            block
            icon={CheckCircle}
            onClick={() => completeDelivery(order.id)}
          >
            Delivered
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
