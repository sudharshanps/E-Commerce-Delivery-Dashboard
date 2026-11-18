import React, { useState, useMemo } from 'react';
import { useDelivery } from '../context/DeliveryContext';
import OrdersTable from '../components/orders/OrdersTable';
import OrderCard from '../components/orders/OrderCard';
import OrderDetailModal from '../components/orders/OrderDetailModal';
import { Card, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import {
  Search,
  Filter,
  X,
  Inbox,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';

export const OrdersPage = () => {
  const { orders } = useDelivery();

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Tab definitions with count calculation
  const tabs = [
    { label: 'All', value: 'All', count: orders.length },
    { label: 'New', value: 'New', count: orders.filter(o => o.orderStatus === 'New').length },
    { label: 'Accepted', value: 'Accepted', count: orders.filter(o => o.orderStatus === 'Accepted').length },
    { label: 'Picked Up', value: 'Picked Up', count: orders.filter(o => o.orderStatus === 'Picked Up').length },
    { label: 'Out for Delivery', value: 'Out for Delivery', count: orders.filter(o => o.orderStatus === 'Out for Delivery').length },
    { label: 'Delivered', value: 'Delivered', count: orders.filter(o => o.orderStatus === 'Delivered').length },
    { label: 'Cancelled', value: 'Cancelled', count: orders.filter(o => o.orderStatus === 'Cancelled').length }
  ];

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      // Tab filter
      if (activeTab !== 'All' && order.orderStatus !== activeTab) {
        return false;
      }

      // Payment filter
      if (paymentFilter !== 'All' && order.paymentStatus !== paymentFilter) {
        return false;
      }

      // Search query filter (Order ID, Customer, Restaurant, Address)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesId = order.id.toLowerCase().includes(query);
        const matchesCustomer = order.customerName.toLowerCase().includes(query);
        const matchesRestaurant = order.restaurantName.toLowerCase().includes(query);
        const matchesAddress = order.deliveryAddress.toLowerCase().includes(query) ||
                               order.restaurantAddress.toLowerCase().includes(query);

        if (!matchesId && !matchesCustomer && !matchesRestaurant && !matchesAddress) {
          return false;
        }
      }

      return true;
    });
  }, [orders, activeTab, paymentFilter, searchQuery]);

  const resetFilters = () => {
    setActiveTab('All');
    setSearchQuery('');
    setPaymentFilter('All');
  };

  const hasActiveFilters = activeTab !== 'All' || paymentFilter !== 'All' || searchQuery !== '';

  return (
    <div>
      {/* Status Filter Tabs */}
      <div className="tab-pills-container">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            className={`tab-pill ${activeTab === tab.value ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.value)}
          >
            <span>{tab.label}</span>
            <span className="tab-pill-count">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search & Filter Controls */}
      <div className="orders-filter-bar">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by Order ID, customer, restaurant, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-muted)'
              }}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="filter-controls-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Payment:
            </span>
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
            >
              <option value="All">All Payment Modes</option>
              <option value="Paid Online">Paid Online</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="secondary"
              size="sm"
              icon={RotateCcw}
              onClick={resetFilters}
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Results Count Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', padding: '0 0.25rem' }}>
        <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Showing <strong>{filteredOrders.length}</strong> {filteredOrders.length === 1 ? 'order' : 'orders'}
          {hasActiveFilters && ' (filtered)'}
        </span>
      </div>

      {/* Orders Content */}
      <Card>
        <CardBody style={{ padding: 0 }}>
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <Inbox size={28} />
              </div>
              <div className="empty-state-title">No orders found</div>
              <p className="empty-state-text">
                {hasActiveFilters
                  ? 'No delivery orders match your current filter and search criteria.'
                  : 'There are no orders in this category at the moment.'}
              </p>
              {hasActiveFilters && (
                <Button variant="secondary" size="sm" onClick={resetFilters}>
                  Clear all filters
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Desktop & Tablet Table View */}
              <OrdersTable
                orders={filteredOrders}
                onViewDetails={(order) => setSelectedOrder(order)}
              />

              {/* Mobile Card View */}
              <div className="order-cards-grid" style={{ padding: '1rem' }}>
                {filteredOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onViewDetails={(ord) => setSelectedOrder(ord)}
                  />
                ))}
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={Boolean(selectedOrder)}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default OrdersPage;
