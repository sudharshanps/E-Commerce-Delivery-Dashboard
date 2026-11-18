import React, { useState, useMemo } from 'react';
import { useDelivery } from '../context/DeliveryContext';
import { formatCurrency, formatDate, formatTime } from '../utils/formatters';
import { weeklyEarningsChartData } from '../data/mockData';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import StatCard from '../components/dashboard/StatCard';
import Button from '../components/common/Button';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import {
  IndianRupee,
  Wallet,
  Calendar,
  Award,
  HeartHandshake,
  TrendingUp,
  Download,
  CheckCircle,
  Building2,
  Clock
} from 'lucide-react';

export const EarningsPage = () => {
  const { stats, orders, partnerProfile, showToast } = useDelivery();
  const [dateRange, setDateRange] = useState('7days'); // 'today', '7days', '30days', 'all'

  // Dynamic Chart Data with today's live earnings
  const chartData = useMemo(() => {
    return weeklyEarningsChartData.map((item, index) => {
      // If last item is today, sync with live today's earnings
      if (index === weeklyEarningsChartData.length - 1) {
        return {
          ...item,
          basePay: stats.todayBaseFare,
          tips: stats.todayTips,
          incentives: stats.todayIncentives,
          total: stats.todayEarnings,
          deliveries: stats.completedTodayCount
        };
      }
      return item;
    });
  }, [stats]);

  // Delivered orders list for earnings history table
  const deliveredOrders = useMemo(() => {
    const list = orders.filter(o => o.orderStatus === 'Delivered');
    if (dateRange === 'today') {
      return list.filter(o => o.orderTime && o.orderTime.startsWith('2026-11-18'));
    }
    return list;
  }, [orders, dateRange]);

  const handleExportStatement = () => {
    showToast('Exporting delivery partner earnings statement (PDF/CSV)...', 'info');
  };

  return (
    <div>
      {/* 7 KPI Cards */}
      <div className="stats-grid">
        <StatCard
          label="Today's Earnings"
          value={formatCurrency(stats.todayEarnings)}
          subtext={`${stats.completedTodayCount} deliveries today`}
          icon={IndianRupee}
          variant="red"
        />

        <StatCard
          label="Weekly Earnings"
          value={formatCurrency(stats.weeklyEarnings)}
          subtext="Past 7 days accumulated"
          icon={Wallet}
          variant="blue"
        />

        <StatCard
          label="Monthly Earnings"
          value={formatCurrency(stats.monthlyEarnings)}
          subtext="Current month estimate"
          icon={Calendar}
          variant="purple"
        />

        <StatCard
          label="Completed Deliveries"
          value={stats.totalCompletedDeliveries}
          subtext={`${stats.totalLifetimeDeliveries} lifetime orders`}
          icon={CheckCircle}
          variant="green"
        />

        <StatCard
          label="Avg Per Delivery"
          value={formatCurrency(stats.avgEarningsPerDelivery)}
          subtext="Base pay + tip avg"
          icon={TrendingUp}
          variant="teal"
        />

        <StatCard
          label="Delivery Incentives"
          value={formatCurrency(1150 + stats.todayIncentives)}
          subtext="Peak & milestone bonus"
          icon={Award}
          variant="amber"
        />

        <StatCard
          label="Tips Received"
          value={formatCurrency(1220 + stats.todayTips)}
          subtext="100% kept by partner"
          icon={HeartHandshake}
          variant="green"
        />
      </div>

      {/* Date Filter & Payout Notice Header */}
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
          marginBottom: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Building2 size={20} style={{ color: 'var(--color-primary)' }} />
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
              Linked Bank Account: {partnerProfile.bankAccount}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Next auto-settlement: <strong>Friday, 20 Nov 2026</strong> (Direct NEFT transfer)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.35rem' }}>
            <button
              type="button"
              className={`btn btn-sm ${dateRange === 'today' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDateRange('today')}
            >
              Today
            </button>
            <button
              type="button"
              className={`btn btn-sm ${dateRange === '7days' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDateRange('7days')}
            >
              Last 7 Days
            </button>
            <button
              type="button"
              className={`btn btn-sm ${dateRange === '30days' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDateRange('30days')}
            >
              Last 30 Days
            </button>
            <button
              type="button"
              className={`btn btn-sm ${dateRange === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setDateRange('all')}
            >
              All Time
            </button>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Download}
            onClick={handleExportStatement}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Interactive Recharts Chart Card */}
      <Card style={{ marginBottom: '1.5rem' }}>
        <CardHeader
          title="Daily Earnings Trend (INR ₹)"
          subtitle="Breakdown of Base Delivery Fees, Customer Tips, and Milestone Incentives"
        />
        <CardBody>
          <div className="earnings-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(val) => `₹${val}`}
                />
                <Tooltip
                  formatter={(value, name) => [
                    `₹${value.toLocaleString('en-IN')}`,
                    name === 'basePay' ? 'Base Fare' : name === 'tips' ? 'Customer Tips' : 'Incentives'
                  ]}
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.06)'
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '10px' }}
                  formatter={(val) => (val === 'basePay' ? 'Base Fare' : val === 'tips' ? 'Customer Tips' : 'Target Incentives')}
                />
                <Bar dataKey="basePay" fill="#e23744" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="tips" fill="#16a34a" stackId="a" radius={[0, 0, 0, 0]} />
                <Bar dataKey="incentives" fill="#d97706" stackId="a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* Clear Earnings Breakdown Section */}
      <div className="earnings-breakdown-grid">
        <div className="breakdown-item">
          <span className="breakdown-label">Base Delivery Fares</span>
          <span className="breakdown-value">
            {formatCurrency(stats.todayBaseFare)}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Calculated by order distance & order value
          </span>
        </div>

        <div className="breakdown-item">
          <span className="breakdown-label">Customer Tips</span>
          <span className="breakdown-value" style={{ color: '#16a34a' }}>
            +{formatCurrency(stats.todayTips)}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            100% credited without commission deduction
          </span>
        </div>

        <div className="breakdown-item">
          <span className="breakdown-label">Daily Target Incentives</span>
          <span className="breakdown-value" style={{ color: stats.todayIncentives > 0 ? 'var(--color-primary)' : 'var(--text-muted)' }}>
            +{formatCurrency(stats.todayIncentives)}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {stats.completedTodayCount >= (partnerProfile.dailyGoalDeliveries || 10)
              ? 'Bonus unlocked for reaching daily goal!'
              : `Goal: ${partnerProfile.dailyGoalDeliveries || 10} deliveries`}
          </span>
        </div>

        <div className="breakdown-item">
          <span className="breakdown-label">Net Payable Today</span>
          <span className="breakdown-value" style={{ color: 'var(--color-primary)' }}>
            {formatCurrency(stats.todayEarnings)}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            All taxes & charges accounted for
          </span>
        </div>
      </div>

      {/* Earnings History Table */}
      <Card>
        <CardHeader
          title="Delivery Earnings History"
          subtitle={`Showing ${deliveredOrders.length} completed payout records`}
        />
        <CardBody style={{ padding: 0 }}>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date & Time</th>
                  <th>Order ID</th>
                  <th>Restaurant</th>
                  <th>Distance</th>
                  <th>Base Pay</th>
                  <th>Tip</th>
                  <th>Total Payout</th>
                  <th>Payment Type</th>
                  <th>Settlement Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveredOrders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{formatDate(order.orderTime)}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {formatTime(order.orderTime)}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 700 }}>#{order.id}</span>
                    </td>
                    <td>
                      <span style={{ fontWeight: 500 }}>{order.restaurantName}</span>
                    </td>
                    <td>{order.distanceKm} km</td>
                    <td>{formatCurrency(order.deliveryFee)}</td>
                    <td style={{ color: order.tip > 0 ? '#16a34a' : 'var(--text-muted)', fontWeight: 600 }}>
                      {order.tip > 0 ? `+${formatCurrency(order.tip)}` : '₹0'}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      {formatCurrency(order.totalEarnings)}
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '4px',
                          backgroundColor: order.paymentStatus === 'Cash on Delivery' ? '#fef3c7' : '#dcfce7',
                          color: order.paymentStatus === 'Cash on Delivery' ? '#92400e' : '#15803d'
                        }}
                      >
                        {order.paymentStatus === 'Cash on Delivery' ? 'COD' : 'Paid Online'}
                      </span>
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#16a34a'
                        }}
                      >
                        <CheckCircle size={13} /> Credited
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EarningsPage;
