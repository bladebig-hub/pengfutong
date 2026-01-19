import { Product, User, Coupon, Order, MarketingStats, PaymentMethod, RedPacketFlow, FinanceRecord } from './types';

export const CATEGORIES = ['全部', '招牌推荐', '咖啡饮品', '烘焙甜点', '简餐主食', '季节限定'];

export const PRODUCTS: Product[] = [
  { id: '1', name: '招牌拿铁', price: 28.00, category: '咖啡饮品', stock: 100, sku: 'CF001', cost: 8.00, barcode: '6900000000001' },
  { id: '2', name: '生椰拿铁', price: 32.00, category: '咖啡饮品', stock: 85, sku: 'CF002', cost: 9.50, barcode: '6900000000002' },
  { id: '3', name: '美式咖啡', price: 22.00, category: '咖啡饮品', stock: 200, sku: 'CF003', cost: 5.00, barcode: '6900000000003' },
  { id: '4', name: '草莓蛋糕', price: 35.00, category: '烘焙甜点', stock: 12, sku: 'BK001', cost: 15.00, barcode: '6900000000004' },
  { id: '5', name: '提拉米苏', price: 38.00, category: '烘焙甜点', stock: 8, sku: 'BK002', cost: 16.00, barcode: '6900000000005' },
  { id: '6', name: '牛肉汉堡', price: 45.00, category: '简餐主食', stock: 50, sku: 'FD001', cost: 20.00, barcode: '6900000000006' },
  { id: '7', name: '薯条', price: 18.00, category: '简餐主食', stock: 150, sku: 'FD002', cost: 3.00, barcode: '6900000000007' },
  { id: '8', name: '季节鲜果茶', price: 26.00, category: '季节限定', stock: 40, sku: 'SS001', cost: 8.00, barcode: '6900000000008' },
];

export const MOCK_USER: User = {
  id: 'u123',
  name: '李小明',
  avatar: 'https://picsum.photos/50/50?random=1',
  balance: 15.50, // Current Red Packet Balance
  isLocked: true,
  phone: '138****8888',
  points: 240,
  totalSpent: 1250.00,
  lastVisit: '2024-05-20',
  tags: ['高频', 'VIP']
};

export const MOCK_USERS: User[] = [
    MOCK_USER,
    { id: 'u124', name: '王大力', avatar: 'https://picsum.photos/50/50?random=2', balance: 5.00, isLocked: false, phone: '139****1234', points: 50, totalSpent: 300.00, lastVisit: '2024-05-19', tags: ['新客'] },
    { id: 'u125', name: '陈思思', avatar: 'https://picsum.photos/50/50?random=3', balance: 42.00, isLocked: true, phone: '137****9999', points: 880, totalSpent: 3200.50, lastVisit: '2024-05-18', tags: ['大客户', '活跃'] },
    { id: 'u126', name: '张伟', avatar: 'https://picsum.photos/50/50?random=4', balance: 0.00, isLocked: false, phone: '150****6666', points: 0, totalSpent: 28.00, lastVisit: '2024-05-15', tags: [] },
];

export const MOCK_COUPONS: Coupon[] = [
  { id: 'c1', type: 'GROUP_BUY', title: '双人下午茶套餐', value: 98, cost: 68, originalPrice: 168, expiry: '2024-12-31', stock: 999, status: 'ACTIVE', createdAt: '2024-01-01' },
  { id: 'c2', type: 'CASH_VOUCHER', title: '5元代金券', value: 5, cost: 1, minSpend: 30, expiry: '2024-11-30', stock: 500, status: 'ACTIVE', createdAt: '2024-02-15' },
  { id: 'c3', type: 'GROUP_BUY', title: '豪华单人餐', value: 45, cost: 29.9, originalPrice: 58, expiry: '2024-10-01', stock: 50, status: 'ACTIVE', createdAt: '2024-03-10' },
  { id: 'c4', type: 'CASH_VOUCHER', title: '新人专享券', value: 10, cost: 0, minSpend: 50, expiry: '2024-12-31', stock: 1000, status: 'ACTIVE', createdAt: '2024-05-01' },
];

export const RECENT_ORDERS: Order[] = [
  {
    id: 'ORD-20240520-001',
    items: [{ ...PRODUCTS[0], quantity: 1 }, { ...PRODUCTS[3], quantity: 1 }],
    totalAmount: 63.00,
    discountAmount: 5.00,
    finalAmount: 58.00,
    paymentMethod: PaymentMethod.ALIPAY,
    timestamp: '2024-05-20 14:30',
    status: 'COMPLETED',
    customer: MOCK_USER
  },
  {
    id: 'ORD-20240520-002',
    items: [{ ...PRODUCTS[2], quantity: 1 }],
    totalAmount: 22.00,
    discountAmount: 0,
    finalAmount: 22.00,
    paymentMethod: PaymentMethod.WECHAT,
    timestamp: '2024-05-20 14:35',
    status: 'COMPLETED'
  },
  {
    id: 'ORD-20240520-003',
    items: [{ ...PRODUCTS[5], quantity: 2 }, { ...PRODUCTS[6], quantity: 2 }],
    totalAmount: 126.00,
    discountAmount: 12.00,
    finalAmount: 114.00,
    paymentMethod: PaymentMethod.ALIPAY,
    timestamp: '2024-05-20 15:10',
    status: 'COMPLETED',
    customer: MOCK_USERS[2]
  },
   {
    id: 'ORD-20240519-005',
    items: [{ ...PRODUCTS[1], quantity: 1 }],
    totalAmount: 32.00,
    discountAmount: 0,
    finalAmount: 32.00,
    paymentMethod: PaymentMethod.CASH,
    timestamp: '2024-05-19 18:20',
    status: 'COMPLETED'
  }
];

export const PENDING_ORDERS_MOCK: Order[] = [
    {
        id: 'PEND-001',
        tableNumber: 'A1',
        items: [{ ...PRODUCTS[2], quantity: 2 }],
        totalAmount: 44.00,
        discountAmount: 0,
        finalAmount: 44.00,
        paymentMethod: PaymentMethod.PENDING,
        timestamp: '11:30',
        status: 'PENDING'
    },
    {
        id: 'PEND-002',
        tableNumber: 'B5',
        items: [{ ...PRODUCTS[6], quantity: 1 }, { ...PRODUCTS[7], quantity: 1 }],
        totalAmount: 36.00,
        discountAmount: 0,
        finalAmount: 36.00,
        paymentMethod: PaymentMethod.PENDING,
        timestamp: '11:45',
        status: 'PENDING'
    }
];

export const FINANCE_RECORDS: FinanceRecord[] = [
    { date: '2024-05-20', totalIncome: 4520.00, wechatIncome: 2100, alipayIncome: 1800, cashIncome: 620, redPacketCost: 150, subsidyCost: 320, netIncome: 4370.00, orderCount: 158 },
    { date: '2024-05-19', totalIncome: 3890.50, wechatIncome: 1500, alipayIncome: 2000, cashIncome: 390.50, redPacketCost: 120, subsidyCost: 280, netIncome: 3770.50, orderCount: 132 },
    { date: '2024-05-18', totalIncome: 5600.00, wechatIncome: 2800, alipayIncome: 2500, cashIncome: 300, redPacketCost: 210, subsidyCost: 450, netIncome: 5390.00, orderCount: 204 },
    { date: '2024-05-17', totalIncome: 3200.00, wechatIncome: 1200, alipayIncome: 1500, cashIncome: 500, redPacketCost: 80, subsidyCost: 150, netIncome: 3120.00, orderCount: 110 },
    { date: '2024-05-16', totalIncome: 3100.00, wechatIncome: 1100, alipayIncome: 1600, cashIncome: 400, redPacketCost: 75, subsidyCost: 120, netIncome: 3025.00, orderCount: 105 },
    { date: '2024-05-15', totalIncome: 3500.00, wechatIncome: 1400, alipayIncome: 1800, cashIncome: 300, redPacketCost: 90, subsidyCost: 180, netIncome: 3410.00, orderCount: 120 },
    { date: '2024-05-14', totalIncome: 3000.00, wechatIncome: 1000, alipayIncome: 1500, cashIncome: 500, redPacketCost: 60, subsidyCost: 100, netIncome: 2940.00, orderCount: 98 },
];

export const DASHBOARD_STATS: MarketingStats = {
  redPacketROI: 4.8, // For every 1 yuan red packet, 4.8 yuan revenue
  lockedCustomers: 1256,
  subsidyAmount: 3240.50,
  pointsIssued: 15000
};

export const SALES_DATA = [
  { name: '10:00', sales: 400, subsidy: 20 },
  { name: '12:00', sales: 3000, subsidy: 150 },
  { name: '14:00', sales: 2000, subsidy: 100 },
  { name: '16:00', sales: 2780, subsidy: 130 },
  { name: '18:00', sales: 1890, subsidy: 90 },
  { name: '20:00', sales: 2390, subsidy: 110 },
];

export const RED_PACKET_FLOWS: RedPacketFlow[] = [
  { id: '1', type: 'NEW_CUSTOMER', amount: 20, orderAmount: 58.00, time: '今天 14:20', paymentMethod: '微信支付', description: '新客锁定' },
  { id: '2', type: 'MERCHANT_VERIFY', amount: 6, orderAmount: 120.00, time: '今天 13:45', paymentMethod: '支付宝', description: '商家核销红包' },
  { id: '3', type: 'PLATFORM_SUBSIDY', amount: 10, orderAmount: 35.00, time: '今天 12:10', paymentMethod: '微信支付', description: '平台补贴发红包' },
];