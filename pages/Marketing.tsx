import React, { useState } from 'react';
import { Gift, Lock, Ticket, Scan, ChevronLeft, Info, Plus, BarChart3, Users, QrCode, CheckCircle2, ChevronDown, RefreshCw, Calendar, Tag, Filter, SortDesc } from 'lucide-react';
import { MOCK_COUPONS, RED_PACKET_FLOWS } from '../constants';
import { Coupon } from '../types';

type MarketingView = 'MENU' | 'COUPONS' | 'VERIFY' | 'RED_PACKET' | 'LOCKING';

export const Marketing: React.FC = () => {
  const [currentView, setCurrentView] = useState<MarketingView>('MENU');
  
  // Red Packet State
  const [redPacketRatio, setRedPacketRatio] = useState(15); // 15% means 85折
  const [redPacketEnabled, setRedPacketEnabled] = useState(true);

  // Coupon State
  const [couponFilter, setCouponFilter] = useState<'ALL' | 'GROUP' | 'CASH'>('ALL');
  const [couponSort, setCouponSort] = useState<'NEW' | 'VALUE'>('NEW');
  const [showCreateCoupon, setShowCreateCoupon] = useState(false);

  // Verification State
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyResult, setVerifyResult] = useState<'IDLE' | 'SUCCESS'>('IDLE');

  const renderMenu = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-8">
        {/* Card 1: Coupons */}
        <div 
            onClick={() => setCurrentView('COUPONS')}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
        >
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                <Ticket className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">优惠券 / 团购券</h3>
            <p className="text-slate-500">创建代金券或团购套餐，支持美团比价展示，吸引顾客到店核销。</p>
        </div>

        {/* Card 2: Verification */}
        <div 
            onClick={() => setCurrentView('VERIFY')}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
        >
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <Scan className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">核销中心</h3>
            <p className="text-slate-500">快速核销团购券与代金券。支持扫码核销与输码核销。</p>
        </div>

        {/* Card 3: Red Packets */}
        <div 
            onClick={() => setCurrentView('RED_PACKET')}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
        >
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform">
                <Gift className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">支付红包设置</h3>
            <p className="text-slate-500">设置支付返红包比例，提高复购率。支持平台补贴策略配置。</p>
        </div>

        {/* Card 4: Locking */}
        <div 
            onClick={() => setCurrentView('LOCKING')}
            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
        >
            <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">锁客收益</h3>
            <p className="text-slate-500">查看锁客名单与佣金明细。私域流量变现分析。</p>
        </div>
    </div>
  );

  const CreateCouponModal = () => (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[600px] shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">新建优惠券</h3>
                  <button onClick={() => setShowCreateCoupon(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              <div className="space-y-4">
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">卡券类型</label>
                      <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="couponType" className="accent-primary" defaultChecked /> 
                              <span>团购券 (套餐)</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                              <input type="radio" name="couponType" className="accent-primary" /> 
                              <span>代金券 (满减)</span>
                          </label>
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">卡券名称</label>
                      <input type="text" placeholder="例如：双人超值套餐" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">面值 (元)</label>
                          <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">售价/成本 (元)</label>
                          <input type="number" placeholder="0.00" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">美团/原价对比 (元)</label>
                      <input type="number" placeholder="用于前端比价展示，非必填" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">库存数量</label>
                          <input type="number" placeholder="999" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                      </div>
                      <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">有效期至</label>
                          <input type="date" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                      </div>
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">使用门槛</label>
                      <input type="text" placeholder="例如：满100元可用，为空则无门槛" className="w-full border border-slate-300 rounded-lg px-3 py-2" />
                  </div>
              </div>
              <div className="mt-8 flex justify-end gap-3">
                  <button onClick={() => setShowCreateCoupon(false)} className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50">取消</button>
                  <button onClick={() => setShowCreateCoupon(false)} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600">立即创建</button>
              </div>
          </div>
      </div>
  );

  const renderCoupons = () => {
      const filteredCoupons = MOCK_COUPONS.filter(c => {
          if (couponFilter === 'ALL') return true;
          if (couponFilter === 'GROUP') return c.type === 'GROUP_BUY';
          if (couponFilter === 'CASH') return c.type === 'CASH_VOUCHER';
          return true;
      }).sort((a, b) => {
          if (couponSort === 'NEW') return new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime();
          if (couponSort === 'VALUE') return b.value - a.value;
          return 0;
      });

      return (
        <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl font-bold text-slate-800">优惠券管理</h2>
                
                <div className="flex items-center gap-3">
                    {/* Filters */}
                    <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                        <button onClick={() => setCouponFilter('ALL')} className={`px-3 py-1.5 rounded text-sm ${couponFilter === 'ALL' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>全部</button>
                        <button onClick={() => setCouponFilter('GROUP')} className={`px-3 py-1.5 rounded text-sm ${couponFilter === 'GROUP' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>团购券</button>
                        <button onClick={() => setCouponFilter('CASH')} className={`px-3 py-1.5 rounded text-sm ${couponFilter === 'CASH' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}>代金券</button>
                    </div>

                    {/* Sort */}
                    <div className="relative">
                        <select 
                            className="appearance-none bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-sm text-slate-600 outline-none focus:border-primary"
                            value={couponSort}
                            onChange={(e) => setCouponSort(e.target.value as any)}
                        >
                            <option value="NEW">最新创建</option>
                            <option value="VALUE">面值最高</option>
                        </select>
                        <SortDesc className="w-4 h-4 absolute right-2 top-2.5 text-slate-400 pointer-events-none" />
                    </div>

                    <button 
                        onClick={() => setShowCreateCoupon(true)}
                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 text-sm font-medium"
                    >
                        <Plus className="w-4 h-4" /> 新建优惠券
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCoupons.map(coupon => (
                    <div key={coupon.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-purple-500 to-blue-500"></div>
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <span className={`text-xs px-2 py-0.5 rounded ${coupon.type === 'GROUP_BUY' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                                    {coupon.type === 'GROUP_BUY' ? '团购券' : '代金券'}
                                </span>
                                <h4 className="font-bold text-slate-800 mt-1 text-lg">{coupon.title}</h4>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-bold text-slate-800">¥{coupon.value}</span>
                                {coupon.originalPrice && (
                                    <p className="text-xs text-slate-400 line-through">美团 ¥{coupon.originalPrice}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-end border-t border-slate-100 pt-3">
                            <div className="text-xs text-slate-500 space-y-1">
                                <p>库存: {coupon.stock}</p>
                                <p>有效期: {coupon.expiry}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-sm font-medium text-slate-500 hover:text-slate-800 px-2 py-1 transition-colors">
                                    下架
                                </button>
                                <button className="text-sm font-medium text-primary hover:bg-blue-50 px-3 py-1 rounded-lg transition-colors">
                                    编辑
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {showCreateCoupon && <CreateCouponModal />}
        </div>
      );
  };

  const renderVerify = () => (
      <div className="max-w-2xl mx-auto mt-10">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 text-center">
                {verifyResult === 'IDLE' ? (
                    <>
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <QrCode className="w-10 h-10 text-slate-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">核销团购券/代金券</h2>
                        <p className="text-slate-500 mb-8">请扫描顾客出示的二维码，或手动输入核销码</p>
                        
                        <div className="flex gap-2 mb-6">
                            <input 
                                type="text" 
                                placeholder="请输入12位核销码"
                                className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 text-lg outline-none focus:border-primary transition-colors text-center tracking-widest"
                                value={verifyCode}
                                onChange={(e) => setVerifyCode(e.target.value)}
                            />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                             <button className="py-3 rounded-xl border border-slate-300 font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                                <Scan className="w-5 h-5" /> 扫码核销
                             </button>
                             <button 
                                onClick={() => setVerifyResult('SUCCESS')}
                                className="py-3 rounded-xl bg-primary text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/30"
                             >
                                确认核销
                             </button>
                        </div>
                    </>
                ) : (
                    <div className="py-10 animate-in fade-in zoom-in duration-300">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">核销成功!</h2>
                        <p className="text-slate-500 mb-8">双人下午茶套餐 x 1</p>
                         <button 
                            onClick={() => { setVerifyResult('IDLE'); setVerifyCode(''); }}
                            className="bg-slate-100 text-slate-600 px-8 py-2 rounded-lg font-medium hover:bg-slate-200"
                         >
                            继续核销
                         </button>
                    </div>
                )}
          </div>
      </div>
  );

  const renderRedPacket = () => (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
        
        {/* Top Dark Card */}
        <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
            
            {/* Header */}
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">数据概览</h2>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-slate-300 border border-slate-700 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    2026-01-15
                    <ChevronDown className="w-3 h-3" />
                </div>
            </div>

            {/* Main Stats */}
            <div className="text-center mb-10 relative z-10">
                <p className="text-slate-400 text-sm mb-2">今日总营收 (元)</p>
                <h1 className="text-5xl font-black text-yellow-400 tracking-tight">¥12,450</h1>
            </div>

            {/* Sub Stats Grid */}
            <div className="grid grid-cols-3 gap-4 border-b border-slate-800 pb-8 mb-8 relative z-10">
                <div className="text-center border-r border-slate-800">
                    <p className="text-2xl font-bold">1:18.5</p>
                    <p className="text-xs text-slate-500 mt-1">7日投产比(ROI)</p>
                </div>
                <div className="text-center border-r border-slate-800">
                    <p className="text-2xl font-bold">342</p>
                    <p className="text-xs text-slate-500 mt-1">复购订单数</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold">128</p>
                    <p className="text-xs text-slate-500 mt-1">新客锁客数</p>
                </div>
            </div>

            {/* Comparison Bar */}
            <div className="bg-slate-800/50 rounded-xl p-4 flex items-center justify-between relative z-10">
                <div>
                    <p className="text-xs text-slate-400 mb-1">平台补贴红包总额</p>
                    <p className="text-xl font-bold text-blue-400">¥12,800</p>
                </div>
                <div className="bg-black/40 px-2 py-1 rounded text-xs font-bold text-slate-500">VS</div>
                <div className="text-right">
                    <p className="text-xs text-slate-400 mb-1">商家红包支出总额</p>
                    <p className="text-xl font-bold text-red-400">-¥692</p>
                </div>
            </div>
        </div>

        {/* Settings Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold text-slate-800">支付红包设置</h3>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">{redPacketEnabled ? '已开启(笔笔有红包)' : '已关闭'}</span>
                    <button 
                        onClick={() => setRedPacketEnabled(!redPacketEnabled)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${redPacketEnabled ? 'bg-green-500' : 'bg-slate-300'}`}
                    >
                        <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${redPacketEnabled ? 'left-6.5' : 'left-0.5'}`}></div>
                    </button>
                </div>
            </div>

            <div className={`transition-opacity ${redPacketEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                {/* Visual Slider */}
                <div className="relative h-24 mb-6 pt-8">
                    {/* Track */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-slate-100 rounded-full -translate-y-1/2"></div>
                    
                    {/* Active Track */}
                    <div className="absolute top-1/2 left-0 h-2 bg-slate-800 rounded-full -translate-y-1/2" style={{width: `${(25-redPacketRatio)/20 * 100}%`}}></div>
                    
                    {/* Points */}
                    <div className="absolute top-0 left-[5%] -translate-x-1/2 flex flex-col items-center">
                        <div className="bg-slate-200 text-slate-400 text-xs px-2 py-1 rounded mb-2">95折</div>
                    </div>
                    <div className="absolute top-[-10px] left-[50%] -translate-x-1/2 flex flex-col items-center z-10">
                        <div className="bg-red-500 text-white text-sm font-bold px-3 py-2 rounded shadow-lg shadow-red-500/30 mb-2">85折</div>
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-red-500"></div>
                    </div>
                    <div className="absolute top-0 right-[5%] translate-x-1/2 flex flex-col items-center">
                         <div className="bg-slate-200 text-slate-400 text-xs px-2 py-1 rounded mb-2">75折</div>
                    </div>

                    {/* Thumb */}
                    <input 
                        type="range" 
                        min="5" 
                        max="25"
                        step="5"
                        value={redPacketRatio}
                        onChange={(e) => setRedPacketRatio(Number(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                     {/* Custom Thumb Visual (centered based on ratio) - Simplified for demo */}
                     <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white border-4 border-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg z-10"></div>
                </div>
                
                <div className="flex justify-between text-xs text-slate-400 mb-6">
                    <span>95折</span>
                    <span>75折</span>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                     <p className="text-slate-800 font-medium mb-1">
                         当前折扣设置: <span className="text-red-500 font-bold">85折 (15%用于发红包)</span>
                     </p>
                     <p className="text-xs text-slate-400">
                         * 关闭支付红包后恢复至标准费率 千分之三 (0.3%)收银，同时将失去发红包和核销红包能力
                     </p>
                </div>
            </div>
        </div>

        {/* Flow List */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-6">
                 <h3 className="text-lg font-bold text-slate-800 text-slate-500">实时订单 (资金流向)</h3>
                 <button className="flex items-center gap-1 text-sm text-yellow-500 border border-yellow-200 bg-yellow-50 px-3 py-1 rounded-full hover:bg-yellow-100">
                     <RefreshCw className="w-3 h-3" /> 刷新
                 </button>
             </div>

             <div className="space-y-4">
                 {RED_PACKET_FLOWS.map(flow => (
                     <div key={flow.id} className="bg-slate-50 rounded-xl p-4 flex justify-between items-center border border-slate-100">
                         <div>
                             <div className="flex items-center gap-2 mb-1">
                                 {flow.type === 'NEW_CUSTOMER' && <span className="bg-orange-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1"><Lock className="w-3 h-3" /> 新客锁定</span>}
                                 <span className="font-bold text-slate-800">订单 ¥{flow.orderAmount.toFixed(2)}</span>
                             </div>
                             <div className="flex gap-2 mb-2">
                                 {flow.type === 'NEW_CUSTOMER' && (
                                     <>
                                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">平台补贴发红包{flow.amount}元</span>
                                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">首单全额补</span>
                                     </>
                                 )}
                                 {flow.type === 'MERCHANT_VERIFY' && (
                                     <>
                                        <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">商家核销红包</span>
                                        <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">复购</span>
                                     </>
                                 )}
                                 {flow.type === 'PLATFORM_SUBSIDY' && (
                                     <>
                                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">平台补贴发红包{flow.amount}元</span>
                                        <span className="bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded">无红包使用</span>
                                     </>
                                 )}
                             </div>
                             <p className="text-xs text-slate-400">{flow.time} · {flow.paymentMethod}</p>
                         </div>
                         <div className="text-right">
                             <p className={`font-bold ${flow.type === 'MERCHANT_VERIFY' ? 'text-red-500' : 'text-green-600'}`}>
                                 {flow.type === 'MERCHANT_VERIFY' ? `- ¥${flow.amount.toFixed(2)}` : `- ¥0.00`}
                             </p>
                             <p className="text-xs text-slate-400">商家红包支出</p>
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    </div>
  );

  const renderLocking = () => (
     <div className="max-w-4xl mx-auto space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-2 text-slate-500 mb-2">
                     <Users className="w-4 h-4" />
                     <span className="text-sm">累计锁客</span>
                 </div>
                 <p className="text-3xl font-bold text-slate-800">1,256 <span className="text-sm font-normal text-slate-400">人</span></p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-2 text-orange-500 mb-2">
                     <Lock className="w-4 h-4" />
                     <span className="text-sm">本月锁客佣金</span>
                 </div>
                 <p className="text-3xl font-bold text-orange-600">¥ 1,240.50</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center gap-2 text-blue-500 mb-2">
                     <BarChart3 className="w-4 h-4" />
                     <span className="text-sm">锁客消费占比</span>
                 </div>
                 <p className="text-3xl font-bold text-slate-800">35.2%</p>
             </div>
         </div>

         <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                 <h3 className="font-bold text-slate-700">最近锁客记录</h3>
                 <button className="text-sm text-primary hover:underline">导出报表</button>
             </div>
             <table className="w-full text-sm text-left">
                 <thead className="text-slate-500 bg-slate-50">
                     <tr>
                         <th className="px-4 py-3 font-medium">用户</th>
                         <th className="px-4 py-3 font-medium">锁定时间</th>
                         <th className="px-4 py-3 font-medium">累计贡献佣金</th>
                         <th className="px-4 py-3 font-medium">状态</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                     {[1,2,3,4,5].map(i => (
                         <tr key={i} className="hover:bg-slate-50">
                             <td className="px-4 py-3 flex items-center gap-2">
                                 <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                                 <span className="font-medium text-slate-700">用户88{i}</span>
                             </td>
                             <td className="px-4 py-3 text-slate-500">2024-05-{10+i}</td>
                             <td className="px-4 py-3 font-medium">¥{(Math.random() * 100).toFixed(2)}</td>
                             <td className="px-4 py-3"><span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs">活跃</span></td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
     </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
        {/* Header with Back Button logic */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 justify-between">
            <div className="flex items-center gap-4">
                {currentView !== 'MENU' && (
                    <button 
                        onClick={() => setCurrentView('MENU')}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                )}
                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        {currentView === 'MENU' && '营销中心'}
                        {currentView === 'COUPONS' && '优惠券管理'}
                        {currentView === 'VERIFY' && '核销中心'}
                        {currentView === 'RED_PACKET' && '支付红包设置'}
                        {currentView === 'LOCKING' && '锁客收益'}
                    </h1>
                </div>
            </div>
            {currentView === 'MENU' && (
                 <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span>N8H设备在线</span>
                 </div>
            )}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
            {currentView === 'MENU' && renderMenu()}
            {currentView === 'COUPONS' && renderCoupons()}
            {currentView === 'VERIFY' && renderVerify()}
            {currentView === 'RED_PACKET' && renderRedPacket()}
            {currentView === 'LOCKING' && renderLocking()}
        </div>
    </div>
  );
};