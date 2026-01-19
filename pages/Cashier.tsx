import React, { useState, useMemo, useRef } from 'react';
import { CATEGORIES, PRODUCTS, MOCK_USER, PENDING_ORDERS_MOCK } from '../constants';
import { Product, CartItem, User, Order, PaymentMethod } from '../types';
import { Search, Scan, Trash2, Plus, Minus, User as UserIcon, CreditCard, Banknote, QrCode, ClipboardList, Printer, CheckCircle2, Clock } from 'lucide-react';

export const Cashier: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedUser, setScannedUser] = useState<User | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showPendingDrawer, setShowPendingDrawer] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<Order[]>(PENDING_ORDERS_MOCK);
  const [tableNumber, setTableNumber] = useState('');
  const [paymentStep, setPaymentStep] = useState<'SELECT' | 'SUCCESS'>('SELECT');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory !== '全部') {
      list = list.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      list = list.filter(p => p.name.includes(searchQuery) || p.sku?.includes(searchQuery));
    }
    return list;
  }, [activeCategory, searchQuery]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => {
      setCart([]);
      setTableNumber('');
      setScannedUser(null);
  };

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Red Packet Logic: Automatically deduct if user has balance
  const maxDeduction = scannedUser ? Math.min(scannedUser.balance, subtotal * 0.5) : 0; // Rule: Can use up to 50% of order? Just an example.
  const finalTotal = subtotal - maxDeduction;

  // Handle Hang Order
  const handleHangOrder = () => {
      if (cart.length === 0) return;
      const newPending: Order = {
          id: `PEND-${Date.now().toString().slice(-4)}`,
          items: [...cart],
          totalAmount: subtotal,
          discountAmount: maxDeduction,
          finalAmount: finalTotal,
          paymentMethod: PaymentMethod.PENDING,
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          status: 'PENDING',
          tableNumber: tableNumber || `T-${pendingOrders.length + 1}`,
          customer: scannedUser || undefined
      };
      setPendingOrders(prev => [...prev, newPending]);
      clearCart();
      alert(`订单已挂起，桌号/单号: ${newPending.tableNumber}`);
  };

  const handleRetrieveOrder = (order: Order) => {
      setCart(order.items);
      setTableNumber(order.tableNumber || '');
      if (order.customer) setScannedUser(order.customer);
      setPendingOrders(prev => prev.filter(o => o.id !== order.id));
      setShowPendingDrawer(false);
  };

  // Handle Payment
  const handlePayment = (method: PaymentMethod) => {
      const order: Order = {
          id: `ORD-${Date.now()}`,
          items: [...cart],
          totalAmount: subtotal,
          discountAmount: maxDeduction,
          finalAmount: finalTotal,
          paymentMethod: method,
          timestamp: new Date().toLocaleString(),
          status: 'COMPLETED',
          tableNumber: tableNumber,
          customer: scannedUser || undefined
      };
      setLastOrder(order);
      setPaymentStep('SUCCESS');
      // In a real app, this would save to backend
  };

  const handlePrint = () => {
      // Simulate Printing
      const printWindow = window.open('', '_blank');
      if (printWindow) {
          printWindow.document.write(`
            <html>
                <head>
                    <title>小票打印</title>
                    <style>
                        body { font-family: monospace; font-size: 12px; max-width: 300px; margin: 0 auto; padding: 20px; }
                        .center { text-align: center; }
                        .line { border-bottom: 1px dashed #000; margin: 10px 0; }
                        .flex { display: flex; justify-content: space-between; }
                        .bold { font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="center bold" style="font-size: 16px;">碰付通餐饮店</div>
                    <div class="center">Tel: 138-0000-0000</div>
                    <div class="line"></div>
                    <div>单号: ${lastOrder?.id}</div>
                    <div>时间: ${lastOrder?.timestamp}</div>
                    ${lastOrder?.tableNumber ? `<div>桌号: ${lastOrder.tableNumber}</div>` : ''}
                    <div class="line"></div>
                    ${lastOrder?.items.map(item => `
                        <div class="flex">
                            <span>${item.name} x${item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                    <div class="line"></div>
                    <div class="flex"><span>合计:</span><span>${lastOrder?.totalAmount.toFixed(2)}</span></div>
                    <div class="flex"><span>优惠:</span><span>-${lastOrder?.discountAmount.toFixed(2)}</span></div>
                    <div class="flex bold" style="font-size: 14px;"><span>实收:</span><span>${lastOrder?.finalAmount.toFixed(2)}</span></div>
                    <div class="line"></div>
                    <div class="center">谢谢惠顾，欢迎下次光临！</div>
                </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
      }
  };

  // Simulate scanning a user via QR
  const handleScanUser = () => {
    if (scannedUser) {
        setScannedUser(null);
    } else {
        setScannedUser(MOCK_USER);
    }
  };

  const PayModal = () => (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-[500px] overflow-hidden shadow-2xl">
              {paymentStep === 'SELECT' ? (
                  <>
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">收银台</h3>
                            <p className="text-sm text-slate-500">应收金额 <span className="text-primary font-bold text-lg">¥{finalTotal.toFixed(2)}</span></p>
                        </div>
                        <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                    </div>
                    <div className="p-6 grid grid-cols-2 gap-4">
                        <button 
                            onClick={() => handlePayment(PaymentMethod.ALIPAY)}
                            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all gap-3 group"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                <QrCode className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-slate-700">支付宝</span>
                        </button>
                        <button 
                            onClick={() => handlePayment(PaymentMethod.WECHAT)}
                            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-slate-100 hover:border-green-500 hover:bg-green-50 transition-all gap-3 group"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                                <Scan className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-slate-700">微信支付</span>
                        </button>
                        <button 
                            onClick={() => handlePayment(PaymentMethod.CASH)}
                            className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all gap-3 group"
                        >
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                <Banknote className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-slate-700">现金收款</span>
                        </button>
                    </div>
                  </>
              ) : (
                  <div className="p-8 text-center flex flex-col items-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 animate-in zoom-in duration-300">
                          <CheckCircle2 className="w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-2">收款成功</h3>
                      <p className="text-slate-500 mb-8">订单号: {lastOrder?.id}</p>
                      
                      <div className="flex gap-4 w-full">
                          <button 
                            onClick={handlePrint}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-300 font-bold text-slate-700 hover:bg-slate-50"
                          >
                              <Printer className="w-5 h-5" /> 打印小票
                          </button>
                          <button 
                            onClick={() => {
                                setShowPayModal(false);
                                setPaymentStep('SELECT');
                                clearCart();
                            }}
                            className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-600"
                          >
                              下一单
                          </button>
                      </div>
                  </div>
              )}
          </div>
      </div>
  );

  const PendingDrawer = () => (
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-40 transform transition-transform border-l border-slate-200 flex flex-col">
          <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200 shrink-0">
              <h3 className="text-lg font-bold text-slate-800">挂单列表 (待结账)</h3>
              <button onClick={() => setShowPendingDrawer(false)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {pendingOrders.length === 0 ? (
                  <div className="text-center text-slate-400 mt-20">暂无挂单</div>
              ) : pendingOrders.map(order => (
                  <div 
                    key={order.id} 
                    onClick={() => handleRetrieveOrder(order)}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-primary hover:shadow-md cursor-pointer transition-all"
                  >
                      <div className="flex justify-between items-start mb-3">
                          <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold">
                              {order.tableNumber || '无桌号'}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {order.timestamp}
                          </span>
                      </div>
                      <div className="text-sm text-slate-600 mb-3 line-clamp-2">
                          {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                      </div>
                      <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                          <span className="text-xs text-slate-400">{order.items.reduce((a,b)=>a+b.quantity,0)} 件商品</span>
                          <span className="text-lg font-bold text-slate-800">¥{order.finalAmount.toFixed(2)}</span>
                      </div>
                  </div>
              ))}
          </div>
      </div>
  );

  return (
    <div className="flex h-full bg-slate-100 relative overflow-hidden">
      {/* LEFT: Product Area */}
      <div className="flex-1 flex flex-col border-r border-slate-200">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 w-64">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="搜索商品名称/条码" 
              className="bg-transparent border-none outline-none ml-2 text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
             <button 
                onClick={() => setShowPendingDrawer(true)}
                className="flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-100 transition-colors relative"
             >
                <ClipboardList className="w-5 h-5" />
                <span>取单/桌台</span>
                {pendingOrders.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                        {pendingOrders.length}
                    </span>
                )}
             </button>
             <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors">
                <Scan className="w-5 h-5" />
                <span>扫码识别</span>
             </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto p-2 bg-white border-b border-slate-200 shrink-0 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap mr-2 transition-all ${
                activeCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                onClick={() => addToCart(product)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col overflow-hidden h-48 border border-slate-100 active:scale-95 duration-100"
              >
                <div className="h-28 bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                    {/* Placeholder for product image */}
                   <span className="text-3xl font-bold text-slate-300 select-none">{product.name[0]}</span>
                </div>
                <div className="p-3 flex flex-col justify-between flex-1">
                  <h3 className="font-bold text-slate-700 truncate">{product.name}</h3>
                  <div className="flex justify-between items-end">
                    <span className="text-primary font-bold">¥{product.price.toFixed(2)}</span>
                    <span className="text-xs text-slate-400">库存 {product.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Cart Area */}
      <div className="w-[400px] flex flex-col bg-white h-full shadow-xl z-10">
        {/* User Info / Marketing Header */}
        <div className="h-16 border-b border-slate-100 flex items-center px-4 bg-slate-50">
          {scannedUser ? (
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                    <img src={scannedUser.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-secondary" />
                    <div>
                        <p className="font-bold text-slate-800 flex items-center gap-1">
                            {scannedUser.name}
                            {scannedUser.isLocked && <span className="bg-orange-100 text-orange-600 text-xs px-1 rounded border border-orange-200">已锁客</span>}
                        </p>
                        <p className="text-xs text-slate-500">红包余额: <span className="text-secondary font-bold">¥{scannedUser.balance.toFixed(2)}</span></p>
                    </div>
                </div>
                <button onClick={() => setScannedUser(null)} className="text-xs text-slate-400 hover:text-slate-600">清除</button>
            </div>
          ) : (
            <div 
                onClick={handleScanUser}
                className="w-full h-10 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 gap-2 cursor-pointer hover:border-primary hover:text-primary transition-colors"
            >
                <UserIcon className="w-4 h-4" />
                <span>点击关联会员 / 扫码</span>
            </div>
          )}
        </div>

        {/* Table Number Input for Restaurant Mode */}
        <div className="px-4 pt-4 pb-0">
             <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 px-3 py-2">
                 <span className="text-slate-500 text-sm font-medium mr-2">桌号/备注:</span>
                 <input 
                    type="text" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-800"
                    placeholder="请输入..."
                 />
             </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-300 space-y-4">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                    <Scan className="w-10 h-10" />
                </div>
                <p>请选择商品或扫码</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-sm text-slate-500">¥{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => updateQuantity(item.id, -1)} className="p-1 rounded-full hover:bg-slate-200 text-slate-500">
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="p-1 rounded-full hover:bg-slate-200 text-primary">
                        <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="w-16 text-right font-bold text-slate-800">
                    ¥{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Actions */}
        <div className="bg-white border-t border-slate-200 p-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-slate-500 text-sm">
                    <span>商品小计</span>
                    <span>¥{subtotal.toFixed(2)}</span>
                </div>
                {scannedUser && maxDeduction > 0 && (
                    <div className="flex justify-between text-secondary text-sm">
                        <span>红包抵扣</span>
                        <span>-¥{maxDeduction.toFixed(2)}</span>
                    </div>
                )}
                <div className="flex justify-between items-end pt-2 border-t border-slate-100">
                    <span className="text-slate-800 font-medium">应收金额</span>
                    <span className="text-3xl font-bold text-primary">¥{finalTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 h-14">
                <button 
                    onClick={handleHangOrder}
                    disabled={cart.length === 0}
                    className="col-span-1 rounded-xl bg-orange-100 text-orange-600 flex flex-col items-center justify-center hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span className="text-xs font-bold">挂单/下单</span>
                </button>
                <button 
                    onClick={clearCart}
                    className="col-span-1 rounded-xl bg-slate-100 text-slate-600 flex flex-col items-center justify-center hover:bg-slate-200"
                >
                    <Trash2 className="w-5 h-5 mb-1" />
                </button>
                <button 
                    onClick={() => { setPaymentStep('SELECT'); setShowPayModal(true); }}
                    disabled={cart.length === 0}
                    className={`col-span-2 rounded-xl flex items-center justify-center gap-2 text-lg font-bold text-white transition-colors ${cart.length === 0 ? 'bg-slate-300' : 'bg-primary hover:bg-blue-600'}`}
                >
                    <span>收款</span>
                </button>
            </div>
        </div>
      </div>

      {showPayModal && <PayModal />}
      {showPendingDrawer && <PendingDrawer />}
    </div>
  );
};