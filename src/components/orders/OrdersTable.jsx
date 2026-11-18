import React from 'react';
import OrderStatusBadge from './OrderStatusBadge';
import Button from '../common/Button';
import { formatCurrency, formatTime } from '../../utils/formatters';
import { useDelivery } from '../../context/DeliveryContext';
import {
  CheckCircle,
  PackageCheck,
  Truck,
  Eye,
  Store,
  MapPin,
  Clock
} from 'lucide-react';

export const OrdersTable = ({ orders, onViewDetails }) => {
  const { acceptOrder, pickupOrder, startDelivery, completeDelivery } = useDelivery();

  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Restaurant / Store</th>
            <th>Customer & Delivery Loc</th>
            <th>Distance</th>
            <th>Earnings</th>
            <th>Payment</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>
                    #{order.id}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Clock size={12} />
                    {formatTime(order.orderTime)}
                  </div>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <Store size={14} style={{ color: '#d97706', flexShrink: 0 }} />
                    <span className="truncate" style={{ maxWidth: '160px' }}>
                      {order.restaurantName}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }} className="truncate">
                    {order.restaurantAddress.split(',')[0]}
                  </div>
                </td>

                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                    <MapPin size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                    <span className="truncate" style={{ maxWidth: '180px' }}>
                      {order.customerName}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }} className="truncate" style={{ maxWidth: '200px' }}>
                    {order.deliveryAddress}
                  </div>
                </td>

                <td>
                  <div style={{ fontWeight: 600 }}>{order.distanceKm} km</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    ~{order.estimatedTimeMins} mins
                  </div>
                </td>

                <td>
                  <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                    {formatCurrency(order.totalEarnings)}
                  </div>
                  {order.tip > 0 && (
                    <div style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 600 }}>
                      +{formatCurrency(order.tip)} tip
                    </div>
                  )}
                </td>

                <td>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: order.paymentStatus === 'Cash on Delivery' ? '#fef3c7' : '#dcfce7',
                      color: order.paymentStatus === 'Cash on Delivery' ? '#92400e' : '#15803d'
                    }}
                  >
                    {order.paymentStatus === 'Cash on Delivery' ? 'COD' : 'Paid Online'}
                  </span>
                </td>

                <td>
                  <OrderStatusBadge status={order.orderStatus} />
                </td>

                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Button
                      variant="secondary"
                      size="sm"
                      icon={Eye}
                      onClick={() => onViewDetails(order)}
                      title="View Details"
                    >
                      Details
                    </Button>

                    {order.orderStatus === 'New' && (
                      <Button
                        variant="primary"
                        size="sm"
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
                        icon={CheckCircle}
                        onClick={() => completeDelivery(order.id)}
                      >
                        Delivered
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
