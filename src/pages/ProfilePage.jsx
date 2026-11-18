import React, { useState } from 'react';
import { useDelivery } from '../context/DeliveryContext';
import { formatDate } from '../utils/formatters';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import Button from '../components/common/Button';
import {
  User,
  Phone,
  Mail,
  Bike,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Save,
  RotateCcw,
  Power,
  FileText
} from 'lucide-react';

export const ProfilePage = () => {
  const { partnerProfile, updateProfile, toggleOnlineStatus, stats } = useDelivery();

  const [formData, setFormData] = useState({
    name: partnerProfile.name,
    email: partnerProfile.email,
    phone: partnerProfile.phone,
    emergencyContact: partnerProfile.emergencyContact,
    vehicleType: partnerProfile.vehicleType,
    vehicleModel: partnerProfile.vehicleModel,
    vehicleNumber: partnerProfile.vehicleNumber,
    preferredZone: partnerProfile.preferredZone,
    licenseNumber: partnerProfile.licenseNumber
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Enter a valid email address';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.vehicleNumber.trim()) errs.vehicleNumber = 'Vehicle registration number is required';
    if (!formData.vehicleModel.trim()) errs.vehicleModel = 'Vehicle model is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateProfile(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      name: partnerProfile.name,
      email: partnerProfile.email,
      phone: partnerProfile.phone,
      emergencyContact: partnerProfile.emergencyContact,
      vehicleType: partnerProfile.vehicleType,
      vehicleModel: partnerProfile.vehicleModel,
      vehicleNumber: partnerProfile.vehicleNumber,
      preferredZone: partnerProfile.preferredZone,
      licenseNumber: partnerProfile.licenseNumber
    });
    setErrors({});
  };

  return (
    <div className="profile-layout-grid">
      {/* Left Column: Partner Card */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <Card className="profile-card-left">
          <div className="profile-avatar-large">
            {partnerProfile.name.charAt(0)}
          </div>

          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {partnerProfile.name}
          </h2>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Partner ID: <strong>{partnerProfile.id}</strong>
          </div>

          <div className="verified-badge">
            <ShieldCheck size={14} /> Verified Delivery Partner
          </div>

          {/* Online status switch */}
          <div
            style={{
              marginTop: '1.25rem',
              width: '100%',
              padding: '0.85rem',
              backgroundColor: partnerProfile.isOnline ? '#f0fdf4' : '#f9fafb',
              border: `1px solid ${partnerProfile.isOnline ? '#bbf7d0' : '#e5e7eb'}`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`status-indicator-dot ${partnerProfile.isOnline ? 'online' : ''}`} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>
                  {partnerProfile.isOnline ? 'Status: ONLINE' : 'Status: OFFLINE'}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {partnerProfile.isOnline ? 'Eligible for order dispatch' : 'Shift currently paused'}
                </div>
              </div>
            </div>

            <Button
              variant={partnerProfile.isOnline ? 'outline' : 'primary'}
              size="sm"
              icon={Power}
              onClick={toggleOnlineStatus}
            >
              {partnerProfile.isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>

          <div className="profile-details-list">
            <div className="profile-detail-row">
              <span className="profile-detail-label">Vehicle Type</span>
              <span className="profile-detail-val">{partnerProfile.vehicleType}</span>
            </div>

            <div className="profile-detail-row">
              <span className="profile-detail-label">Vehicle Reg #</span>
              <span className="profile-detail-val">{partnerProfile.vehicleNumber}</span>
            </div>

            <div className="profile-detail-row">
              <span className="profile-detail-label">Driving License</span>
              <span className="profile-detail-val">{partnerProfile.licenseNumber}</span>
            </div>

            <div className="profile-detail-row">
              <span className="profile-detail-label">Joined Partner Hub</span>
              <span className="profile-detail-val">{formatDate(partnerProfile.joinedDate)}</span>
            </div>

            <div className="profile-detail-row">
              <span className="profile-detail-label">Lifetime Deliveries</span>
              <span className="profile-detail-val">{stats.totalLifetimeDeliveries} orders</span>
            </div>

            <div className="profile-detail-row">
              <span className="profile-detail-label">Overall Rating</span>
              <span className="profile-detail-val" style={{ color: '#d97706' }}>
                ★ {partnerProfile.rating} / 5.0
              </span>
            </div>
          </div>
        </Card>

        {/* Documents & Verification Card */}
        <Card>
          <CardHeader title="Verification Documents" />
          <CardBody>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {[
                { name: 'Driving License', status: 'Approved' },
                { name: 'Vehicle Registration (RC)', status: 'Approved' },
                { name: 'Commercial Vehicle Insurance', status: 'Approved' },
                { name: 'Aadhaar / ID Verification', status: 'Approved' },
                { name: 'Bank Account / Cancelled Cheque', status: 'Approved' }
              ].map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid var(--border-light)',
                    fontSize: '0.84rem'
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileText size={15} style={{ color: 'var(--text-muted)' }} />
                    {doc.name}
                  </span>
                  <span style={{ color: '#16a34a', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.78rem' }}>
                    <CheckCircle2 size={13} /> {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Right Column: Edit Profile Form */}
      <div>
        <Card>
          <CardHeader
            title="Edit Delivery Partner Information"
            subtitle="Keep your contact, vehicle, and operational details up to date"
          />
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                {/* Email Address */}
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                {/* Emergency Contact */}
                <div className="form-group">
                  <label className="form-label">Emergency Contact Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                  />
                </div>

                {/* Vehicle Type */}
                <div className="form-group">
                  <label className="form-label">Vehicle Type *</label>
                  <select
                    className="form-select"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  >
                    <option value="Motorcycle">Motorcycle</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Electric Bike (EV)">Electric Bike (EV)</option>
                    <option value="Bicycle">Bicycle</option>
                  </select>
                </div>

                {/* Vehicle Model */}
                <div className="form-group">
                  <label className="form-label">Vehicle Make & Model *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.vehicleModel}
                    onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                  />
                  {errors.vehicleModel && <span className="form-error">{errors.vehicleModel}</span>}
                </div>

                {/* Vehicle Registration Number */}
                <div className="form-group">
                  <label className="form-label">Vehicle Registration Number *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  />
                  {errors.vehicleNumber && <span className="form-error">{errors.vehicleNumber}</span>}
                </div>

                {/* Driving License */}
                <div className="form-group">
                  <label className="form-label">Driving License Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.licenseNumber}
                    onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                  />
                </div>
              </div>

              {/* Preferred Hub / Zone */}
              <div className="form-group">
                <label className="form-label">Preferred Operating Hub / Delivery Zone</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.preferredZone}
                  onChange={(e) => setFormData({ ...formData, preferredZone: e.target.value })}
                />
                <span className="form-hint">
                  Dispatch algorithms prioritize assigning nearby pickup orders within this zone.
                </span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
                <Button variant="secondary" icon={RotateCcw} onClick={handleReset}>
                  Discard Changes
                </Button>
                <Button variant="primary" type="submit" icon={Save}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
