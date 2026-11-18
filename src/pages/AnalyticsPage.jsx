import React from 'react';
import { useDelivery } from '../context/DeliveryContext';
import { weeklyEarningsChartData, hourlyPerformanceData } from '../data/mockData';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import StatCard from '../components/dashboard/StatCard';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  CheckCircle,
  Timer,
  TrendingUp,
  ThumbsUp,
  Star,
  Award,
  Zap,
  ShieldCheck,
  Smile,
  BadgeCheck
} from 'lucide-react';

export const AnalyticsPage = () => {
  const { stats, partnerProfile } = useDelivery();

  const achievements = [
    {
      title: 'Top Rated Rider',
      desc: 'Maintained 4.8+ rating over 1,000+ orders',
      icon: Star,
      unlocked: true,
      color: '#d97706',
      bg: '#fef3c7'
    },
    {
      title: 'Lightning Fast',
      desc: 'Average delivery completed in under 26 mins',
      icon: Zap,
      unlocked: true,
      color: '#2563eb',
      bg: '#dbeafe'
    },
    {
      title: 'Zero Cancellations',
      desc: 'Completed 100 consecutive shifts without dropouts',
      icon: ShieldCheck,
      unlocked: true,
      color: '#16a34a',
      bg: '#dcfce7'
    },
    {
      title: 'Customer Favorite',
      desc: 'Received 150+ tips with 5-star compliments',
      icon: Smile,
      unlocked: true,
      color: '#e23744',
      bg: '#fee2e2'
    }
  ];

  return (
    <div>
      {/* 5 Core Performance KPI Cards */}
      <div className="stats-grid">
        <StatCard
          label="Total Deliveries Completed"
          value={stats.totalCompletedDeliveries}
          subtext={`${stats.totalLifetimeDeliveries} lifetime total`}
          icon={CheckCircle}
          variant="green"
        />

        <StatCard
          label="Average Delivery Duration"
          value={`${stats.avgDeliveryTime} mins`}
          subtext="Kitchen pickup to customer"
          icon={Timer}
          variant="blue"
        />

        <StatCard
          label="Delivery Success Rate"
          value={`${stats.completionPercentage}%`}
          subtext="Orders safely delivered"
          icon={TrendingUp}
          variant="green"
        />

        <StatCard
          label="Order Acceptance Rate"
          value={`${stats.acceptanceRate}%`}
          subtext="Assignments accepted"
          icon={ThumbsUp}
          variant="purple"
        />

        <StatCard
          label="Customer Rating"
          value={`${stats.customerRating} / 5.0`}
          subtext="Based on 492 customer reviews"
          icon={Star}
          variant="amber"
        />
      </div>

      {/* Charts Grid */}
      <div className="dashboard-columns">
        {/* Weekly Deliveries Bar Chart */}
        <Card>
          <CardHeader
            title="Weekly Completed Deliveries"
            subtitle="Number of successful deliveries completed each day"
          />
          <CardBody>
            <div style={{ height: 280, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyEarningsChartData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} allowDecimals={false} />
                  <Tooltip
                    formatter={(val) => [`${val} orders`, 'Deliveries']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Bar dataKey="deliveries" fill="#e23744" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>

        {/* Peak Hours & Delivery Speed Chart */}
        <Card>
          <CardHeader
            title="Peak Hours & Delivery Speed"
            subtitle="Deliveries per time slot and average turnaround"
          />
          <CardBody>
            <div style={{ height: 280, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyPerformanceData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip
                    formatter={(val, name) => [
                      name === 'deliveries' ? `${val} orders` : `${val} mins avg`,
                      name === 'deliveries' ? 'Volume' : 'Avg Delivery Time'
                    ]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '5px' }} />
                  <Line type="monotone" dataKey="deliveries" stroke="#2563eb" strokeWidth={2} name="Order Volume" />
                  <Line type="monotone" dataKey="avgTime" stroke="#e23744" strokeWidth={2} name="Avg Time (Mins)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Rating Breakdown & Partner Badges */}
      <div className="dashboard-columns">
        {/* Rating Breakdown */}
        <Card>
          <CardHeader
            title="Customer Feedback & Rating Breakdown"
            subtitle="Customer reviews over the past 90 days"
          />
          <CardBody>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>
                  {partnerProfile.rating}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#d97706', margin: '0.4rem 0' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#d97706" />
                  ))}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  492 customer ratings
                </div>
              </div>

              <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { star: '5 Star', pct: 92 },
                  { star: '4 Star', pct: 6 },
                  { star: '3 Star', pct: 1 },
                  { star: '2 Star', pct: 0.5 },
                  { star: '1 Star', pct: 0.5 }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem' }}>
                    <span style={{ width: '45px', color: 'var(--text-secondary)' }}>{item.star}</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${item.pct}%`,
                          height: '100%',
                          backgroundColor: idx === 0 ? '#16a34a' : idx === 1 ? '#2563eb' : '#d97706'
                        }}
                      />
                    </div>
                    <span style={{ width: '35px', textAlign: 'right', color: 'var(--text-muted)' }}>
                      {item.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ backgroundColor: '#f9fafb', padding: '0.85rem', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              💬 <em>"Fast delivery, food was piping hot and neatly packed. Rajesh was very polite!"</em> — Customer review
            </div>
          </CardBody>
        </Card>

        {/* Partner Badges */}
        <Card>
          <CardHeader
            title="Partner Badges & Achievements"
            subtitle="Milestones unlocked through exceptional service"
          />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {achievements.map((ach, idx) => {
                const Icon = ach.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      border: '1px solid var(--border-light)',
                      backgroundColor: '#fff'
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        backgroundColor: ach.bg,
                        color: ach.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Icon size={18} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{ach.title}</div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{ach.desc}</div>
                    </div>
                    <BadgeCheck size={20} style={{ color: '#16a34a' }} />
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
