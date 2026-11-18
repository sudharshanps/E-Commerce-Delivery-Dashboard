# E-Commerce Delivery Dashboard

A professional, responsive **Delivery Partner Management System** for on-demand e-commerce and food delivery services. Built with **React 19**, **Vite**, **Pure CSS3**, **React Router**, and **Recharts**.

---

## 📌 Project Overview

The **E-Commerce Delivery Dashboard** is a comprehensive, production-ready web application engineered for delivery fleet partners. It provides an intuitive, distraction-free interface where drivers and riders can monitor incoming delivery orders, update delivery progress through a structured workflow, track real-time earnings in Indian Rupees (₹), analyze performance metrics, and manage driver profiles and duty availability.

### Key Highlights
- **Clean & Minimal UI:** Modern white and light-gray palette accented with delivery-inspired crimson red.
- **Usability First:** Clear typography, intuitive navigation, high-contrast badges, and zero unnecessary visual bloat.
- **Client-Side State with Persistence:** Powered by React Context and `localStorage` — changes to orders, duty status, earnings, and profile are saved instantly and persist across reloads.
- **Calculated Metrics:** All dashboard KPIs, wallet totals, and completion percentages are dynamically computed from underlying order records.
- **Mobile Responsive:** Adapts seamlessly across desktop, tablet, and mobile viewport sizes.

---

## 📸 Screenshots

- Desktop Dashboard: `screenshots/desktop-dashboard.png`
- Order Management: `screenshots/desktop-orders.png`
- Earnings & Payout Analytics: `screenshots/desktop-earnings.png`
- Performance Analytics: `screenshots/desktop-analytics.png`
- Mobile Views: `screenshots/mobile-dashboard.png` and `screenshots/mobile-orders.png`

---

## 🚀 Features

### 1. Dashboard Overview
- **Key Metrics:** Total orders today, pending orders, active deliveries, completed deliveries, today's earnings (₹), average delivery duration, customer rating, and delivery completion rate.
- **Quick Actions:** Toggle Online/Offline duty status, jump to active deliveries, view wallet balance, or trigger emergency assistance.
- **Recent Orders:** Interactive overview of current assignments with quick status actions (Accept, Pickup, Deliver, Details).
- **Daily Incentive Tracker:** Progress bar tracking daily delivery goals toward unlocking target bonuses.

### 2. Order Management
- **Status Tabs:** Filter orders by `All`, `New`, `Accepted`, `Picked Up`, `Out for Delivery`, `Delivered`, and `Cancelled`.
- **Search & Multi-Filter:** Real-time search by Order ID, customer name, store name, or address, alongside payment mode filtering (Paid Online vs. Cash on Delivery).
- **State Machine Validation:** Enforces valid lifecycle progressions (`New` -> `Accepted` -> `Picked Up` -> `Out for Delivery` -> `Delivered`).
- **Order Details Modal:** Displays customer contact, store details, itemized breakdown, route estimates, delivery notes, and activity history.

### 3. Earnings Management
- **Summary Cards:** Today's earnings, weekly earnings, monthly estimates, lifetime completed orders, average earnings per delivery, incentives, and tips.
- **Interactive Recharts Chart:** Stacked bar chart showing daily breakdowns across Base Fares, Tips, and Milestone Bonuses.
- **Earnings History:** Itemized records of completed deliveries with date, store, distance, base fare, tip, total payout, and settlement status.
- **Date Filtering:** Filter view by Today, Last 7 Days, Last 30 Days, or All Time.

### 4. Performance Analytics
- **Performance KPIs:** Delivery success rate, average kitchen-to-doorstep duration, acceptance rate, and customer rating breakdown.
- **Weekly Volume Chart:** Day-by-day delivery completion volume.
- **Speed & Peak Hours Analysis:** Average delivery turnaround times during peak demand hours.
- **Partner Achievements:** Milestone badges including Top Rated Rider, Lightning Fast, and Zero Cancellations.

### 5. Delivery Partner Profile
- **Partner Information:** Name, partner ID, email, verified phone number, emergency contact, license number, and vehicle registration.
- **Vehicle Details:** Support for Motorcycle, Scooter, Electric Bike (EV), or Bicycle.
- **Inline Editing:** Update contact details, vehicle info, and preferred delivery zone with instant validation.

### 6. Notification Center
- **Categorized Alerts:** Filter alerts across `All`, `Unread`, `Orders`, `Earnings`, and `System`.
- **Lifecycle Updates:** Automatic alerts when orders are assigned, accepted, picked up, or delivered.
- **Management:** Mark individual alerts as read, mark all as read, or remove notifications.

### 7. Settings & Demo Data Controls
- **Duty Availability:** Toggle duty status between Online and Offline.
- **Preferences:** Configure order sound alerts, push notifications, and SMS updates.
- **Navigation:** Select preferred map application (Google Maps, Apple Maps, etc.).
- **Reset Demonstration Data:** Built-in reset utility that clears customized `localStorage` state and restores initial sample data.

---

## 🛠️ Tech Stack

- **Frontend Library:** React 19
- **Build Tool:** Vite 8
- **Language:** JavaScript (ES6+)
- **Styling:** Pure CSS3 (Variables, Flexbox, Grid)
- **Routing:** React Router 7
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Persistence:** Web Storage API (`localStorage`)

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/sudharshanps/E-Commerce-Delivery-Dashboard.git
cd E-Commerce-Delivery-Dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
