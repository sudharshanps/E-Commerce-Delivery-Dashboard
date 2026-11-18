import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import { useDelivery } from '../../context/DeliveryContext';
import { IndianRupee, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const EarningsSummaryCard = () => {
  const { stats, partnerProfile } = useDelivery();

  const goal = partnerProfile.dailyGoalDeliveries || 10;
  const completed = stats.completedTodayCount;
  const progressPercent = Math.min(100, Math.round((completed / goal) * 100));
  const remaining = Math.max(0, goal - completed);
  const bonusUnlocked = completed >= goal;

  return (
    <Card>
      <CardHeader
        title="Today’s Earnings Summary"
        action={
          <Link
            to="/earnings"
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem'
            }}
          >
            Details <ArrowRight size={14} />
          </Link>
        }
      />
      <CardBody>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Total Earned Today
          </div>
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--color-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              lineHeight: 1.2
            }}
          >
            {formatCurrency(stats.todayEarnings)}
          </div>
        </div>

        {/* Milestone Incentive Box */}
        <div className="incentive-progress-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, fontSize: '0.85rem' }}>
              <Award size={16} style={{ color: 'var(--color-primary)' }} />
              <span>Daily Target Bonus</span>
            </div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              +{formatCurrency(partnerProfile.dailyIncentiveBonus)}
            </span>
          </div>

          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span>{completed} of {goal} deliveries completed</span>
            <span>{progressPercent}%</span>
          </div>

          <div style={{ marginTop: '0.4rem', fontSize: '0.76rem' }}>
            {bonusUnlocked ? (
              <span style={{ color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> ₹{partnerProfile.dailyIncentiveBonus} bonus unlocked & included!
              </span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>
                Complete {remaining} more order{remaining > 1 ? 's' : ''} to unlock ₹{partnerProfile.dailyIncentiveBonus}
              </span>
            )}
          </div>
        </div>

        {/* Earnings Breakdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Base Delivery Fees</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(stats.todayBaseFare)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Customer Tips</span>
            <span style={{ fontWeight: 600, color: '#16a34a' }}>+{formatCurrency(stats.todayTips)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Target Bonus</span>
            <span style={{ fontWeight: 600, color: bonusUnlocked ? 'var(--color-primary)' : 'var(--text-muted)' }}>
              {bonusUnlocked ? `+${formatCurrency(partnerProfile.dailyIncentiveBonus)}` : '₹0'}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              borderTop: '1px dashed var(--border-color)',
              paddingTop: '0.5rem',
              marginTop: '0.25rem'
            }}
          >
            <span>Weekly Payout Cycle</span>
            <span>Every Friday to Bank</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default EarningsSummaryCard;
