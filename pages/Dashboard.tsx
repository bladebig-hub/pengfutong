import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { SALES_DATA, DASHBOARD_STATS } from '../constants';
import { TrendingUp, Users, Wallet, Activity } from 'lucide-react';

const StatCard = ({ title, value, subValue, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">{value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${color === 'blue' ? 'bg-blue-50 text-blue-600' : color === 'red' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                <Icon className="w-6 h-6" />
            </div>
        </div>
        <div className="text-sm text-slate-400">
            {subValue}
        </div>
    </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">经营数据</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
                title="今日营收" 
                value="¥ 12,450.00" 
                subValue="比昨日 +12.5%" 
                icon={TrendingUp} 
                color="blue" 
            />
            <StatCard 
                title="红包ROI" 
                value={`1 : ${DASHBOARD_STATS.redPacketROI}`} 
                subValue="每发1元红包带动4.8元营收" 
                icon={Activity} 
                color="red" 
            />
            <StatCard 
                title="累计锁客" 
                value={DASHBOARD_STATS.lockedCustomers} 
                subValue="本月新增 +120" 
                icon={Users} 
                color="green" 
            />
            <StatCard 
                title="平台补贴" 
                value={`¥ ${DASHBOARD_STATS.subsidyAmount}`} 
                subValue="累计积分: 15,000" 
                icon={Wallet} 
                color="blue" 
            />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Trend */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">实时营收与补贴趋势</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={SALES_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1677ff" stopOpacity={0.1}/>
                                    <stop offset="95%" stopColor="#1677ff" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                            />
                            <Area type="monotone" dataKey="sales" stroke="#1677ff" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" name="营收" />
                            <Area type="monotone" dataKey="subsidy" stroke="#ff4d4f" strokeWidth={2} fillOpacity={0} name="补贴发出" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6">支付方式占比</h3>
                <div className="h-80 w-full flex flex-col items-center justify-center space-y-6">
                    {/* Simple Custom Radial Representation for demo */}
                    <div className="relative w-40 h-40">
                         <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                            {/* Background Circle */}
                            <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                            {/* Alipay (60%) */}
                            <path className="text-blue-500" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                            {/* WeChat (30%) - offset by 60 */}
                             <path className="text-green-500" strokeDasharray="30, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.8" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs text-slate-400">总订单</span>
                            <span className="text-xl font-bold text-slate-800">158</span>
                        </div>
                    </div>
                    <div className="w-full space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                <span>支付宝</span>
                            </div>
                            <span className="font-bold">60%</span>
                        </div>
                         <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                                <span>微信支付</span>
                            </div>
                            <span className="font-bold">30%</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                                <span>其他/现金</span>
                            </div>
                            <span className="font-bold">10%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};