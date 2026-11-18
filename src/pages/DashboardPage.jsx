import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDelivery } from '../context/DeliveryContext';
import { formatCurrency } from '../utils/formatters';
import StatCard from '../components/dashboard/StatCard';
import QuickActions from '../components/dashboard/QuickActions';
import EarningsSummaryCard from '../components/dashboard/EarningsSummaryCard';
import OrdersTable from '../components/orders/OrdersTable';
import OrderCard from '../components/orders/OrderCard';
import OrderDetailModal from '../components/orders/OrderDetailModal';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import {
  ShoppingBag,
  Clock,
  Truck,
  CheckCircle2,
  IndianRupee,
  Timer,
  Star,
  TrendingUp,
  ArrowRight,
  Inbox
} from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { orders, stats } = useDelivery();
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Take latest 6 orders for the recent orders list
  const recentOrders = orders.slice(0, 6);

  return (
    <div>
      {/* Quick Action Bar */}
      <QuickActions />

      {/* Row of 8 Key Delivery Metrics */}
      <div className="stats-grid">
        <StatCard
          label="Total Orders Today"
          value={stats.todayOrdersCount}
          subtext="Assigned today"
          icon={ShoppingBag}
          variant="blue"
        />

        <StatCard
          label="Pending Orders"
          value={stats.pendingOrdersCount}
          subtext="Awaiting your acceptance"
          icon={Clock}
          variant="amber"
        />

        <StatCard
          label="Active Deliveries"
          value={stats.activeDeliveriesCount}
          subtext="Accepted / En route"
          icon={Truck}
          variant="purple"
        />

        <StatCard
          label="Completed Today"
          value={stats.completedTodayCount}
          subtext={`${stats.totalCompletedDeliveries} total completed`}
          icon={CheckCircle2}
          variant="green"
        />

        <StatCard
          label="Today's Earnings"
          value={formatCurrency(stats.todayEarnings)}
          subtext={`Incl. ${formatCurrency(stats.todayTips)} tips`}
          icon={IndianRupee}
          variant="red"
        />

        <StatCard
          label="Avg Delivery Time"
          value={`${stats.avgDeliveryTime} mins`}
          subtext="Kitchen to doorstep"
          icon={Timer}
          variant="teal"
        />

        <StatCard
          label="Customer Rating"
          value={`${stats.customerRating} ★`}
          subtext="Top 5% rated partner"
          icon={Star}
          variant="amber"
        />

        <StatCard
          label="Completion Rate"
          value={`${stats.completionPercentage}%`}
          subtext="Success on assigned orders"
          icon={TrendingUp}
          variant="green"
        />
      </div>

      {/* Main Split Grid: Recent Orders & Today's Earnings */}
      <div className="dashboard-columns">
        {/* Left Column: Recent Orders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Card>
            <CardHeader
              title="Recent Deliveries & Orders"
              subtitle="View and manage current order progress"
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/orders')}
                >
                  All Orders <ArrowRight size={14} />
                </Button>
              }
            />
            <CardBody style={{ padding: 0 }}>
              {recentOrders.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">
                    <Inbox size={24} />
                  </div>
                  <div className="empty-state-title">No orders found</div>
                  <p className="empty-state-text">
                    You currently have no active or recent deliveries.
                  </p>
                </div>
              ) : (
                <>
                  {/* Table view on Desktop/Tablet */}
                  <OrdersTable
                    orders={recentOrders}
                    onViewDetails={(order) => setSelectedOrder(order)}
                  />

                  {/* Card view on Mobile */}
                  <div className="order-cards-grid" style={{ padding: '1rem' }}>
                    {recentOrders.map((order) => (
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
        </div>

        {/* Right Column: Earnings Summary & Incentives */}
        <div>
          <EarningsSummaryCard />
        </div>
      </div>

      {/* Order Details Modal */}
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

export default DashboardPage;
