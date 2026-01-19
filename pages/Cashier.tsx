import React, { useState, useMemo } from 'react';
import { CATEGORIES, PRODUCTS, MOCK_USER } from '../constants';
import { Product, CartItem, User } from '../types';
import { Search, Scan, Trash2, Plus, Minus, User as UserIcon, CreditCard, Banknote, QrCode } from 'lucide-react';

export const Cashier: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [scannedUser, setScannedUser] = useState<User | null>(null);
  const [showPayModal, setShowPayModal] = useState(false);

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

  const clearCart = () => setCart([]);

  // Totals
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Red Packet Logic: Automatically deduct if user has balance
  const maxDeduction = scannedUser ? Math.min(scannedUser.balance, subtotal * 0.5) : 0; // Rule: Can use up to 50% of order? Just an example.
  const finalTotal = subtotal - maxDeduction;

  // Simulate scanning a user via QR
  const handleScanUser = () => {
    // In a real app, this would open a camera modal.
    // For prototype, we toggle the mock user.
    if (scannedUser) {
        setScannedUser(null);
    } else {
        setScannedUser(MOCK_USER);
    }
  };

  return (
    <div className="flex h-full bg-slate-100">
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
                <button className="col-span-1 rounded-xl bg-orange-100 text-orange-600 flex flex-col items-center justify-center hover:bg-orange-200">
                    <span className="text-xs font-bold">挂单</span>
                </button>
                <button 
                    onClick={clearCart}
                    className="col-span-1 rounded-xl bg-slate-100 text-slate-600 flex flex-col items-center justify-center hover:bg-slate-200"
                >
                    <Trash2 className="w-5 h-5 mb-1" />
                </button>
                <button 
                    disabled={cart.length === 0}
                    className={`col-span-2 rounded-xl flex items-center justify-center gap-2 text-lg font-bold text-white transition-colors ${cart.length === 0 ? 'bg-slate-300' : 'bg-primary hover:bg-blue-600'}`}
                >
                    <span>收款</span>
                    {/* Arrow or Icon */}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};