/**
 * Realistic Sample Data for E-Commerce Delivery Dashboard (Zomato Partner Hub)
 */

export const initialPartnerProfile = {
  id: 'DEL-PARTNER-8492',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@deliverypartner.in',
  phone: '+91 98765 43210',
  emergencyContact: '+91 98765 12345',
  vehicleType: 'Motorcycle',
  vehicleModel: 'Honda Activa 6G (Matte Grey)',
  vehicleNumber: 'KA-01-EQ-4429',
  licenseNumber: 'KA01 20210087431',
  joinedDate: '2024-04-12',
  rating: 4.88,
  totalLifetimeDeliveries: 1284,
  isOnline: true,
  preferredZone: 'Koramangala & Indiranagar, Bengaluru',
  bankAccount: 'HDFC Bank •••• 4821',
  verified: true,
  dailyGoalDeliveries: 10,
  dailyIncentiveBonus: 250
};

export const initialOrders = [
  {
    id: 'ORD-9821',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98112 34567',
    restaurantName: 'The Biryani Kitchen',
    restaurantAddress: '100 Feet Road, Indiranagar, Bengaluru',
    restaurantPhone: '+91 80 4123 8890',
    deliveryAddress: 'Flat 402, Green Glen Layout, HSR Layout Sector 2, Bengaluru',
    deliveryNotes: 'Leave with security if doorbell not answered',
    distanceKm: 4.2,
    estimatedTimeMins: 22,
    items: [
      { name: 'Dum Gosht Mutton Biryani (1/2 kg)', quantity: 1, price: 549 },
      { name: 'Special Salan & Mint Raita', quantity: 1, price: 0 },
      { name: 'Gulab Jamun (2 pcs)', quantity: 1, price: 120 }
    ],
    orderTotal: 669,
    deliveryFee: 85,
    tip: 30,
    totalEarnings: 115,
    paymentStatus: 'Paid Online',
    orderStatus: 'New',
    orderTime: '2026-11-18T09:45:00',
    pickupTime: null,
    deliveredTime: null,
    durationMins: null,
    statusHistory: [
      { status: 'New', time: '2026-11-18T09:45:00', note: 'New delivery request received' }
    ]
  },
  {
    id: 'ORD-9818',
    customerName: 'Amit Verma',
    customerPhone: '+91 97234 56789',
    restaurantName: 'Royal Sweets & Chaat',
    restaurantAddress: 'MG Road, Commercial Street, Bengaluru',
    restaurantPhone: '+91 80 2558 7761',
    deliveryAddress: 'House 14, 4th Cross, Koramangala 4th Block, Bengaluru',
    deliveryNotes: 'Ring bell twice, gate code is 4410',
    distanceKm: 3.5,
    estimatedTimeMins: 18,
    items: [
      { name: 'Royal Special Kachori', quantity: 2, price: 280 },
      { name: 'Chole Bhature Platter', quantity: 1, price: 220 },
      { name: 'Rasmalai (2 Pcs)', quantity: 1, price: 140 }
    ],
    orderTotal: 640,
    deliveryFee: 70,
    tip: 0,
    totalEarnings: 70,
    paymentStatus: 'Cash on Delivery',
    orderStatus: 'Accepted',
    orderTime: '2026-11-18T09:20:00',
    pickupTime: null,
    deliveredTime: null,
    durationMins: null,
    statusHistory: [
      { status: 'New', time: '2026-11-18T09:20:00', note: 'Order assigned' },
      { status: 'Accepted', time: '2026-11-18T09:23:00', note: 'Order accepted, heading to restaurant' }
    ]
  },
  {
    id: 'ORD-9815',
    customerName: 'Sneha Patel',
    customerPhone: '+91 98451 98765',
    restaurantName: 'Artisan Pizza Co.',
    restaurantAddress: 'Brigade Road, Ashok Nagar, Bengaluru',
    restaurantPhone: '+91 80 2532 1100',
    deliveryAddress: 'Tower B - 1104, Richmond Towers, Richmond Town, Bengaluru',
    deliveryNotes: 'Call upon arrival at the gate lobby',
    distanceKm: 2.8,
    estimatedTimeMins: 15,
    items: [
      { name: 'Four Cheese Margherita Large', quantity: 1, price: 580 },
      { name: 'Garlic Herb Breadsticks with Dip', quantity: 1, price: 149 },
      { name: 'Craft Beverage (500ml)', quantity: 2, price: 120 }
    ],
    orderTotal: 849,
    deliveryFee: 65,
    tip: 25,
    totalEarnings: 90,
    paymentStatus: 'Paid Online',
    orderStatus: 'Picked Up',
    orderTime: '2026-11-18T09:00:00',
    pickupTime: '2026-11-18T09:16:00',
    deliveredTime: null,
    durationMins: null,
    statusHistory: [
      { status: 'New', time: '2026-11-18T09:00:00', note: 'Order assigned' },
      { status: 'Accepted', time: '2026-11-18T09:02:00', note: 'Accepted' },
      { status: 'Picked Up', time: '2026-11-18T09:16:00', note: 'Food verified & picked up from kitchen' }
    ]
  },
  {
    id: 'ORD-9812',
    customerName: 'Vikram Rao',
    customerPhone: '+91 99001 23456',
    restaurantName: 'Golden Dragon Gourmet',
    restaurantAddress: 'Church Street, Shanthala Nagar, Bengaluru',
    restaurantPhone: '+91 80 2559 7722',
    deliveryAddress: 'Villa 7, Lavelle Mansions, Lavelle Road, Bengaluru',
    deliveryNotes: 'Deliver to main doorstep',
    distanceKm: 1.9,
    estimatedTimeMins: 12,
    items: [
      { name: 'Steamed Dim Sum Platter', quantity: 1, price: 425 },
      { name: 'Hakka Wok Tossed Noodles', quantity: 1, price: 345 },
      { name: 'Crispy Pepper Chicken', quantity: 1, price: 495 }
    ],
    orderTotal: 1265,
    deliveryFee: 60,
    tip: 40,
    totalEarnings: 100,
    paymentStatus: 'Paid Online',
    orderStatus: 'Out for Delivery',
    orderTime: '2026-11-18T08:35:00',
    pickupTime: '2026-11-18T08:52:00',
    deliveredTime: null,
    durationMins: null,
    statusHistory: [
      { status: 'New', time: '2026-11-18T08:35:00', note: 'Order assigned' },
      { status: 'Accepted', time: '2026-11-18T08:36:00', note: 'Accepted' },
      { status: 'Picked Up', time: '2026-11-18T08:52:00', note: 'Order picked up' },
      { status: 'Out for Delivery', time: '2026-11-18T08:55:00', note: 'Partner is en route to customer location' }
    ]
  },
  {
    id: 'ORD-9805',
    customerName: 'Deepa Nair',
    customerPhone: '+91 97412 88765',
    restaurantName: 'Fresh Chai & Snacks',
    restaurantAddress: '100ft Road, Indiranagar, Bengaluru',
    restaurantPhone: '+91 80 4115 6677',
    deliveryAddress: 'Apt 201, Maple Leaf Apartments, Domlur 2nd Stage, Bengaluru',
    deliveryNotes: 'Contactless delivery requested',
    distanceKm: 2.5,
    estimatedTimeMins: 14,
    items: [
      { name: 'Cardamom Tea Flask (500ml)', quantity: 1, price: 180 },
      { name: 'Toasted Bun with Butter', quantity: 2, price: 130 },
      { name: 'Crispy Samosa Duo', quantity: 1, price: 80 }
    ],
    orderTotal: 390,
    deliveryFee: 55,
    tip: 15,
    totalEarnings: 70,
    paymentStatus: 'Paid Online',
    orderStatus: 'Delivered',
    orderTime: '2026-11-18T07:45:00',
    pickupTime: '2026-11-18T07:58:00',
    deliveredTime: '2026-11-18T08:14:00',
    durationMins: 29,
    statusHistory: [
      { status: 'New', time: '2026-11-18T07:45:00', note: 'Order received' },
      { status: 'Accepted', time: '2026-11-18T07:46:00', note: 'Accepted' },
      { status: 'Picked Up', time: '2026-11-18T07:58:00', note: 'Picked up' },
      { status: 'Out for Delivery', time: '2026-11-18T08:00:00', note: 'Out for delivery' },
      { status: 'Delivered', time: '2026-11-18T08:14:00', note: 'Delivered safely to customer' }
    ]
  },
  {
    id: 'ORD-9801',
    customerName: 'Rahul Deshmukh',
    customerPhone: '+91 98860 34120',
    restaurantName: 'The Momo Station',
    restaurantAddress: 'Garuda Plaza, Magrath Road, Bengaluru',
    restaurantPhone: '+91 80 4099 2314',
    deliveryAddress: 'No. 45, Langford Road, Shanthi Nagar, Bengaluru',
    deliveryNotes: 'Customer paid ₹410 cash on delivery',
    distanceKm: 3.1,
    estimatedTimeMins: 17,
    items: [
      { name: 'Steamed Himalayan Dumplings (8 Pcs)', quantity: 1, price: 199 },
      { name: 'Pan-Seared Spicy Dumplings', quantity: 1, price: 211 }
    ],
    orderTotal: 410,
    deliveryFee: 72,
    tip: 25,
    totalEarnings: 97,
    paymentStatus: 'Cash on Delivery',
    orderStatus: 'Delivered',
    orderTime: '2026-11-18T07:05:00',
    pickupTime: '2026-11-18T07:22:00',
    deliveredTime: '2026-11-18T07:38:00',
    durationMins: 33,
    statusHistory: [
      { status: 'New', time: '2026-11-18T07:05:00', note: 'Order placed' },
      { status: 'Accepted', time: '2026-11-18T07:06:00', note: 'Accepted' },
      { status: 'Picked Up', time: '2026-11-18T07:22:00', note: 'Picked up' },
      { status: 'Out for Delivery', time: '2026-11-18T07:24:00', note: 'Out for delivery' },
      { status: 'Delivered', time: '2026-11-18T07:38:00', note: 'Delivered, cash collected ₹410' }
    ]
  },
  {
    id: 'ORD-9794',
    customerName: 'Ananya Sen',
    customerPhone: '+91 96111 44556',
    restaurantName: 'Spice Grill Bistro',
    restaurantAddress: 'Orion Plaza, Rajajinagar, Bengaluru',
    restaurantPhone: '+91 80 2268 2300',
    deliveryAddress: 'B-303, Golden Gate Apts, Malleshwaram, Bengaluru',
    deliveryNotes: 'Please do not ring bell, baby sleeping',
    distanceKm: 4.8,
    estimatedTimeMins: 25,
    items: [
      { name: 'Butter Chicken Special', quantity: 1, price: 595 },
      { name: 'Garlic Butter Naan (3 Pcs)', quantity: 1, price: 240 },
      { name: 'Slow-Cooked Black Lentils', quantity: 1, price: 425 }
    ],
    orderTotal: 1260,
    deliveryFee: 95,
    tip: 50,
    totalEarnings: 145,
    paymentStatus: 'Paid Online',
    orderStatus: 'Delivered',
    orderTime: '2026-11-18T06:15:00',
    pickupTime: '2026-11-18T06:36:00',
    deliveredTime: '2026-11-18T06:58:00',
    durationMins: 43,
    statusHistory: [
      { status: 'New', time: '2026-11-18T06:15:00', note: 'Order created' },
      { status: 'Accepted', time: '2026-11-18T06:16:00', note: 'Accepted' },
      { status: 'Picked Up', time: '2026-11-18T06:36:00', note: 'Picked up' },
      { status: 'Out for Delivery', time: '2026-11-18T06:38:00', note: 'Out for delivery' },
      { status: 'Delivered', time: '2026-11-18T06:58:00', note: 'Delivered successfully' }
    ]
  },
  {
    id: 'ORD-9788',
    customerName: 'Karthik Iyer',
    customerPhone: '+91 98223 99881',
    restaurantName: 'Urban Burger Cafe',
    restaurantAddress: 'Forum Arcade, Koramangala, Bengaluru',
    restaurantPhone: '+91 80 2206 7812',
    deliveryAddress: '32/1, 16th Main Road, BTM Layout 1st Stage, Bengaluru',
    deliveryNotes: 'Hand over to roommate if not reachable',
    distanceKm: 3.6,
    estimatedTimeMins: 19,
    items: [
      { name: 'Crispy Patty Gourmet Burger Combo', quantity: 1, price: 349 },
      { name: 'Cheesy Loaded Wedges', quantity: 1, price: 139 },
      { name: 'Chocolate Shake (400ml)', quantity: 1, price: 165 }
    ],
    orderTotal: 653,
    deliveryFee: 75,
    tip: 15,
    totalEarnings: 90,
    paymentStatus: 'Paid Online',
    orderStatus: 'Delivered',
    orderTime: '2026-11-18T05:30:00',
    pickupTime: '2026-11-18T05:46:00',
    deliveredTime: '2026-11-18T06:05:00',
    durationMins: 35,
    statusHistory: [
      { status: 'New', time: '2026-11-18T05:30:00', note: 'Assigned' },
      { status: 'Accepted', time: '2026-11-18T05:31:00', note: 'Accepted' },
      { status: 'Picked Up', time: '2026-11-18T05:46:00', note: 'Picked up' },
      { status: 'Out for Delivery', time: '2026-11-18T05:48:00', note: 'Out for delivery' },
      { status: 'Delivered', time: '2026-11-18T06:05:00', note: 'Delivered' }
    ]
  },
  {
    id: 'ORD-9782',
    customerName: 'Rohan Joshi',
    customerPhone: '+91 97312 77654',
    restaurantName: 'Grand Curry House',
    restaurantAddress: 'Wheeler Road, Pulikeshi Nagar, Bengaluru',
    restaurantPhone: '+91 80 4041 4041',
    deliveryAddress: '19, Wheeler Road, Cox Town, Bengaluru',
    deliveryNotes: 'Cancelled before pickup',
    distanceKm: 2.2,
    estimatedTimeMins: 14,
    items: [
      { name: 'Fragrant Spiced Rice', quantity: 1, price: 190 },
      { name: 'Grilled Kebab Platter', quantity: 1, price: 280 }
    ],
    orderTotal: 470,
    deliveryFee: 0,
    tip: 0,
    totalEarnings: 0,
    paymentStatus: 'Refunded',
    orderStatus: 'Cancelled',
    orderTime: '2026-11-18T05:00:00',
    pickupTime: null,
    deliveredTime: null,
    durationMins: null,
    statusHistory: [
      { status: 'New', time: '2026-11-18T05:00:00', note: 'Order created' },
      { status: 'Cancelled', time: '2026-11-18T05:07:00', note: 'Customer cancelled the order before food prep' }
    ]
  },
  {
    id: 'ORD-9775',
    customerName: 'Pooja Hegde',
    customerPhone: '+91 99160 55432',
    restaurantName: 'Fiesta Mexican Grill',
    restaurantAddress: 'Marketcity Boulevard, Whitefield, Bengaluru',
    restaurantPhone: '+91 80 6726 6000',
    deliveryAddress: 'Tower 4 - 802, Prestige Enclave, ITPL Main Rd, Whitefield, Bengaluru',
    deliveryNotes: 'Registered visitor gate entry verified',
    distanceKm: 5.4,
    estimatedTimeMins: 28,
    items: [
      { name: 'Seven Layer Bean & Cheese Burrito', quantity: 2, price: 460 },
      { name: 'Crispy Taco Duo', quantity: 1, price: 290 },
      { name: 'Loaded Queso Nachos', quantity: 1, price: 210 }
    ],
    orderTotal: 960,
    deliveryFee: 110,
    tip: 35,
    totalEarnings: 145,
    paymentStatus: 'Paid Online',
    orderStatus: 'Delivered',
    orderTime: '2026-11-17T20:15:00',
    pickupTime: '2026-11-17T20:34:00',
    deliveredTime: '2026-11-17T20:56:00',
    durationMins: 41,
    statusHistory: [
      { status: 'Delivered', time: '2026-11-17T20:56:00', note: 'Delivered to customer' }
    ]
  },
  {
    id: 'ORD-9768',
    customerName: 'Arun Kumar',
    customerPhone: '+91 98450 12345',
    restaurantName: 'The Daily Cafe',
    restaurantAddress: 'St. Marks Road, Ashok Nagar, Bengaluru',
    restaurantPhone: '+91 80 4146 6565',
    deliveryAddress: '7th Cross, Cambridge Layout, Ulsoor, Bengaluru',
    deliveryNotes: 'Near City Landmark',
    distanceKm: 3.2,
    estimatedTimeMins: 16,
    items: [
      { name: 'Classic Melt Sandwich Duo', quantity: 2, price: 440 },
      { name: 'Spiced Potato Wedges', quantity: 1, price: 160 },
      { name: 'Dark Truffle Slice', quantity: 1, price: 180 }
    ],
    orderTotal: 780,
    deliveryFee: 70,
    tip: 20,
    totalEarnings: 90,
    paymentStatus: 'Paid Online',
    orderStatus: 'Delivered',
    orderTime: '2026-11-17T18:30:00',
    pickupTime: '2026-11-17T18:47:00',
    deliveredTime: '2026-11-17T19:04:00',
    durationMins: 34,
    statusHistory: [
      { status: 'Delivered', time: '2026-11-17T19:04:00', note: 'Delivered to customer' }
    ]
  },
  {
    id: 'ORD-9760',
    customerName: 'Divya Menon',
    customerPhone: '+91 97422 99001',
    restaurantName: 'Mughal Feast',
    restaurantAddress: 'Junction Square, Koramangala, Bengaluru',
    restaurantPhone: '+91 80 3351 2200',
    deliveryAddress: '23, 2nd Main, Ashwini Layout, Ejipura, Bengaluru',
    deliveryNotes: 'Cash payment exact change ready',
    distanceKm: 2.1,
    estimatedTimeMins: 13,
    items: [
      { name: 'Paneer Tikka Spiced Rice', quantity: 1, price: 395 },
      { name: 'Roasted Appetizer Platter', quantity: 1, price: 310 }
    ],
    orderTotal: 705,
    deliveryFee: 60,
    tip: 10,
    totalEarnings: 70,
    paymentStatus: 'Cash on Delivery',
    orderStatus: 'Delivered',
    orderTime: '2026-11-17T13:10:00',
    pickupTime: '2026-11-17T13:25:00',
    deliveredTime: '2026-11-17T13:41:00',
    durationMins: 31,
    statusHistory: [
      { status: 'Delivered', time: '2026-11-17T13:41:00', note: 'Cash collected ₹705, delivered' }
    ]
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    title: 'New Delivery Assigned',
    message: 'New order #ORD-9821 from The Biryani Kitchen (Indiranagar). Payout: ₹115.',
    type: 'order',
    read: false,
    timestamp: '2026-11-18T09:45:00',
    orderId: 'ORD-9821'
  },
  {
    id: 'notif-2',
    title: 'Pickup Waiting',
    message: 'Order #ORD-9818 is ready at Royal Sweets & Chaat. Please proceed to pickup counter.',
    type: 'order',
    read: false,
    timestamp: '2026-11-18T09:25:00',
    orderId: 'ORD-9818'
  },
  {
    id: 'notif-3',
    title: 'Customer Tip Received! 🎉',
    message: 'You received a ₹50 tip from Ananya Sen for Order #ORD-9794.',
    type: 'earnings',
    read: false,
    timestamp: '2026-11-18T07:00:00',
    orderId: 'ORD-9794'
  },
  {
    id: 'notif-4',
    title: 'Daily Incentive Target Alert',
    message: 'Complete 3 more deliveries today before 11:00 PM to unlock ₹250 bonus!',
    type: 'system',
    read: true,
    timestamp: '2026-11-18T06:30:00'
  },
  {
    id: 'notif-5',
    title: 'Weekly Payout Transferred',
    message: '₹8,450 has been successfully credited to Bank A/C ending in 4821.',
    type: 'earnings',
    read: true,
    timestamp: '2026-11-15T11:00:00'
  }
];

export const weeklyEarningsChartData = [
  { day: 'Wed (12 Nov)', date: '12 Nov', basePay: 580, tips: 120, incentives: 150, total: 850, deliveries: 9 },
  { day: 'Thu (13 Nov)', date: '13 Nov', basePay: 640, tips: 140, incentives: 200, total: 980, deliveries: 10 },
  { day: 'Fri (14 Nov)', date: '14 Nov', basePay: 820, tips: 190, incentives: 250, total: 1260, deliveries: 13 },
  { day: 'Sat (15 Nov)', date: '15 Nov', basePay: 960, tips: 240, incentives: 300, total: 1500, deliveries: 15 },
  { day: 'Sun (16 Nov)', date: '16 Nov', basePay: 1050, tips: 280, incentives: 350, total: 1680, deliveries: 16 },
  { day: 'Mon (17 Nov)', date: '17 Nov', basePay: 620, tips: 130, incentives: 150, total: 900, deliveries: 9 },
  { day: 'Today (18 Nov)', date: '18 Nov', basePay: 402, tips: 120, incentives: 0, total: 522, deliveries: 6 }
];

export const hourlyPerformanceData = [
  { hour: '7 AM - 9 AM', deliveries: 2, avgTime: 22 },
  { hour: '9 AM - 11 AM', deliveries: 4, avgTime: 24 },
  { hour: '11 AM - 1 PM', deliveries: 6, avgTime: 28 },
  { hour: '1 PM - 3 PM', deliveries: 8, avgTime: 25 },
  { hour: '3 PM - 5 PM', deliveries: 3, avgTime: 20 },
  { hour: '5 PM - 7 PM', deliveries: 5, avgTime: 23 },
  { hour: '7 PM - 10 PM', deliveries: 9, avgTime: 29 }
];

export const initialSettings = {
  notificationSound: true,
  pushAlerts: true,
  smsUpdates: false,
  autoNavigateOnAccept: true,
  batterySaverMode: false,
  preferredMap: 'Google Maps'
};
