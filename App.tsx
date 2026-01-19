import React, { useState } from 'react';
import { ShoppingBag, PieChart, Users, Settings as SettingsIcon, DollarSign, LogOut, Package, Gift, Landmark } from 'lucide-react';
import { Cashier } from './pages/Cashier';
import { Marketing } from './pages/Marketing';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Customers } from './pages/Customers';
import { Settings } from './pages/Settings';
import { Finance } from './pages/Finance';

enum View {
  CASHIER = 'CASHIER',
  MARKETING = 'MARKETING',
  DASHBOARD = 'DASHBOARD',
  PRODUCTS = 'PRODUCTS',
  ORDERS = 'ORDERS',
  CUSTOMERS = 'CUSTOMERS',
  SETTINGS = 'SETTINGS',
  FINANCE = 'FINANCE'
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.CASHIER);
  // Mock global state for Red Packet status to show in sidebar
  const [isRedPacketActive] = useState(true); 

  const menuItems = [
    { id: View.CASHIER, label: '收银台', icon: ShoppingBag },
    { 
      id: View.MARKETING, 
      label: '红包营销', 
      icon: Gift,
      // Custom rendering for the badge
      extra: isRedPacketActive ? (
        <span className="flex h-2 w-2 relative ml-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
        </span>
      ) : (
        <span className="ml-2 h-2 w-2 rounded-full bg-slate-600"></span>
      )
    },
    { id: View.DASHBOARD, label: '经营数据', icon: PieChart },
    { id: View.FINANCE, label: '财务对账', icon: Landmark },
    { id: View.PRODUCTS, label: '商品管理', icon: Package },
    { id: View.ORDERS, label: '订单记录', icon: DollarSign },
    { id: View.CUSTOMERS, label: '用户私域', icon: Users },
    { id: View.SETTINGS, label: '店铺设置', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen w-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Sidebar Navigation */}
      <div className="w-20 md:w-64 bg-slate-900 text-white flex flex-col shrink-0 transition-all duration-300 shadow-2xl z-20">
        
        {/* Brand / Logo */}
        <div className="h-20 flex items-center justify-center md:justify-start md:px-6 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="碰付通" className="h-8 w-auto object-contain hidden md:block" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}/>
                <h1 className="font-bold text-xl tracking-tight hidden md:block leading-none">
                    <span className="text-blue-500">碰付通</span> 
                    <span className="text-white ml-1 font-light italic">Plus</span>
                </h1>
                <div className="md:hidden w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-lg">P</div>
            </div>
        </div>

        {/* Menu */}
        <div className="flex-1 py-6 space-y-1 overflow-y-auto no-scrollbar">
            {menuItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center px-4 md:px-6 py-3.5 transition-all relative group
                        ${currentView === item.id 
                            ? 'text-white bg-slate-800 shadow-[inset_3px_0_0_0_#1677ff]' 
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'}
                    `}
                >
                    <item.icon className={`w-6 h-6 shrink-0 ${currentView === item.id ? 'text-primary' : 'group-hover:text-white transition-colors'}`} />
                    <span className={`ml-3 font-medium text-[15px] hidden md:flex items-center ${currentView === item.id ? 'text-white' : ''}`}>
                        {item.label}
                        {item.extra}
                    </span>
                    
                    {/* Tooltip for collapsed view */}
                    <div className="md:hidden absolute left-full ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                        {item.label}
                    </div>
                </button>
            ))}
        </div>

        {/* User / Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950">
            <button className="flex items-center justify-center md:justify-start w-full text-slate-400 hover:text-red-400 transition-colors py-2">
                <LogOut className="w-5 h-5 shrink-0" />
                <span className="ml-3 hidden md:block text-sm font-medium">退出登录</span>
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative bg-slate-100">
        <main className="flex-1 overflow-hidden relative">
            {currentView === View.CASHIER && <Cashier />}
            {currentView === View.MARKETING && <Marketing />}
            {currentView === View.DASHBOARD && <Dashboard />}
            {currentView === View.FINANCE && <Finance />}
            {currentView === View.PRODUCTS && <Products />}
            {currentView === View.ORDERS && <Orders />}
            {currentView === View.CUSTOMERS && <Customers />}
            {currentView === View.SETTINGS && <Settings />}
        </main>
      </div>

    </div>
  );
};

export default App;