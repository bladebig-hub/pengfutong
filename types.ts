export enum PaymentMethod {
  ALIPAY = 'ALIPAY',
  WECHAT = 'WECHAT',
  CASH = 'CASH',
  PENDING = 'PENDING'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
  sku?: string;
  cost?: number; // Cost price
  barcode?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  balance: number; // Red packet balance
  isLocked: boolean; // "Locking" customer status
  phone: string;
  points: number;
  totalSpent?: number;
  lastVisit?: string;
  tags?: string[];
}

export interface Coupon {
  id: string;
  type: 'GROUP_BUY' | 'CASH_VOUCHER';
  title: string;
  value: number; // Face value
  cost: number; // Purchase cost (for group buy)
  originalPrice?: number; // Competitor/Meituan price for comparison
  minSpend?: number;
  expiry: string;
  stock?: number;
  status?: 'ACTIVE' | 'EXPIRED' | 'DEPLETED';
  createdAt?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  discountAmount: number; // Red packet usage
  finalAmount: number;
  paymentMethod: PaymentMethod;
  timestamp: string;
  customer?: User;
  status: 'COMPLETED' | 'REFUNDED' | 'PENDING';
  tableNumber?: string;
}

export interface MarketingStats {
  redPacketROI: number;
  lockedCustomers: number;
  subsidyAmount: number;
  pointsIssued: number;
}

export interface RedPacketFlow {
  id: string;
  type: 'NEW_CUSTOMER' | 'MERCHANT_VERIFY' | 'PLATFORM_SUBSIDY' | 'NORMAL_USAGE';
  amount: number;
  orderAmount: number;
  time: string;
  paymentMethod: string;
  description: string;
}

export interface FinanceRecord {
  date: string;
  totalIncome: number;
  wechatIncome: number;
  alipayIncome: number;
  cashIncome: number;
  redPacketCost: number; // 商家出的红包
  subsidyCost: number; // 平台补贴
  netIncome: number;
  orderCount: number;
}