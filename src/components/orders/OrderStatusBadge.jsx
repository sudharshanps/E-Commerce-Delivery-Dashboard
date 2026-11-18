import React from 'react';
import Badge from '../common/Badge';

export const OrderStatusBadge = ({ status }) => {
  const getVariant = (st) => {
    switch (st) {
      case 'New':
        return 'new';
      case 'Accepted':
        return 'accepted';
      case 'Picked Up':
        return 'picked-up';
      case 'Out for Delivery':
        return 'out-for-delivery';
      case 'Delivered':
        return 'delivered';
      case 'Cancelled':
        return 'cancelled';
      default:
        return 'neutral';
    }
  };

  return (
    <Badge variant={getVariant(status)} dot>
      {status}
    </Badge>
  );
};

export default OrderStatusBadge;
