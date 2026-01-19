import React, { useState } from 'react';
import { Store, ChevronRight, Gift, Ticket, CreditCard, Smartphone, List, QrCode, PenSquare, ArrowLeft, CheckCircle2 } from 'lucide-react';

type SettingsView = 'MENU' | 'SHOP_INFO' | 'RED_PACKET' | 'COUPON' | 'PAYMENT' | 'BINDING' | 'CASHIER_LIST';

export const Settings: React.FC = () => {
  const [currentView, setCurrentView] = useState<SettingsView>('MENU');

  const SettingCard = ({ icon: Icon, title, desc, onClick, colorClass }: any) => (
      <div 
        onClick={onClick}
        className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group h-40"
      >
          <div className="flex justify-between items-start">
               <div className={`p-3 rounded-xl ${colorClass || 'bg-slate-100 text-slate-600'} group-hover:scale-110 transition-transform`}>
                   <Icon className="w-6 h-6" />
               </div>
               <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary transition-colors" />
          </div>
          <div>
              <h3 className="font-bold text-lg text-slate-800">{title}</h3>
              <p className="text-sm text-slate-400 mt-1">{desc}</p>
          </div>
      </div>
  );

  const SubPageHeader = ({ title }: { title: string }) => (
      <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shrink-0 sticky top-0 z-10">
          <button 
            onClick={() => setCurrentView('MENU')} 
            className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          >
              <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">{title}</h1>
      </div>
  );

  const ShopInfoView = () => (
      <div className="flex flex-col h-full bg-slate-50">
          <SubPageHeader title="店铺信息设置" />
          <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
                   <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">商铺名称 <span className="text-red-500">*</span></label>
                       <input type="text" defaultValue="天顺斋创冰店" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white transition-colors outline-none focus:border-primary" />
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">商铺电话 <span className="text-red-500">*</span></label>
                       <input type="text" defaultValue="13810393262" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white transition-colors outline-none focus:border-primary" />
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">经营类目 <span className="text-red-500">*</span></label>
                       <select className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white outline-none focus:border-primary">
                           <option>餐饮-饮品/甜品</option>
                           <option>零售-便利店</option>
                       </select>
                   </div>
                   <div>
                       <label className="block text-sm font-medium text-slate-700 mb-2">商铺标签</label>
                       <div className="flex gap-2 flex-wrap mb-2">
                           <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm border border-blue-100 flex items-center gap-1">
                               老字号 <button className="hover:text-blue-800">×</button>
                           </span>
                       </div>
                       <input type="text" placeholder="+ 添加标签" className="w-full border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus:bg-white outline-none focus:border-primary" />
                   </div>
                   <div className="pt-6">
                        <button onClick={() => setCurrentView('MENU')} className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/20 transition-all">保存更改</button>
                   </div>
              </div>
          </div>
      </div>
  );

  const RedPacketSettingsView = () => (
      <div className="flex flex-col h-full bg-slate-50">
          <SubPageHeader title="红包参数设置" />
          <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                      <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500">
                              <Gift className="w-6 h-6" />
                          </div>
                          <div>
                              <h3 className="text-lg font-bold text-slate-800">全局红包策略</h3>
                              <p className="text-slate-500 text-sm">控制全店红包发放比例与上限</p>
                          </div>
                      </div>

                      <div className="space-y-6">
                          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <span className="text-slate-700 font-medium">当前红包发放比例</span>
                              <div className="flex items-center gap-2">
                                  <span className="font-bold text-2xl text-red-500">10%</span>
                                  <button className="text-primary text-sm font-medium hover:underline">修改</button>
                              </div>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <span className="text-slate-700 font-medium">每月最大红包发放量</span>
                              <div className="flex items-center gap-2 text-slate-500">
                                  <span>无限制</span>
                                  <PenSquare className="w-4 h-4 cursor-pointer hover:text-slate-800" />
                              </div>
                          </div>

                          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                              <span className="text-slate-700 font-medium">锁客门槛 (客单价)</span>
                              <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-800">¥ 5.00</span>
                                  <PenSquare className="w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-800" />
                              </div>
                          </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-6 bg-yellow-50 p-3 rounded-lg border border-yellow-100 text-yellow-700">
                          提示：请在5%~25%范围内设置您的红包比例，红包比例越大，获得积分返现奖励越多，顾客复购意愿越强。
                      </p>
                  </div>
                  
                  <div className="flex justify-end">
                      <button onClick={() => setCurrentView('MENU')} className="bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-300 mr-4">取消</button>
                      <button onClick={() => setCurrentView('MENU')} className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600">保存设置</button>
                  </div>
              </div>
          </div>
      </div>
  );

  const CouponDistributeView = () => (
      <div className="flex flex-col h-full bg-slate-50">
          <SubPageHeader title="快捷卡券投放" />
          <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                      { title: '来的都是客', value: 5, remain: 99999998, color: 'red' },
                      { title: '您是大客户', value: 30, remain: 99999992, color: 'purple' },
                      { title: '清凉一夏', value: 8, remain: 500, color: 'blue' }
                  ].map((coupon, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between h-48 relative overflow-hidden group">
                          <div className={`absolute top-0 right-0 w-24 h-24 bg-${coupon.color}-50 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
                          <div className="relative z-10 flex justify-between items-start">
                              <div>
                                  <h3 className="font-bold text-lg text-slate-800">{coupon.title}</h3>
                                  <p className="text-slate-500 text-sm mt-1">剩余库存: {coupon.remain}</p>
                              </div>
                              <div className={`text-2xl font-bold text-${coupon.color}-500 bg-${coupon.color}-50 px-3 py-1 rounded-lg border border-${coupon.color}-100`}>
                                  ¥{coupon.value}
                              </div>
                          </div>
                          <button className="relative z-10 w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-primary transition-colors flex items-center justify-center gap-2">
                              <Ticket className="w-4 h-4" /> 立即投放
                          </button>
                      </div>
                  ))}
                  
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary cursor-pointer transition-colors h-48 bg-slate-50">
                      <Ticket className="w-8 h-8 mb-2" />
                      <span>新建投放计划</span>
                  </div>
              </div>
          </div>
      </div>
  );

  const PaymentSettingsView = () => (
      <div className="flex flex-col h-full bg-slate-50">
          <SubPageHeader title="收款账户设置" />
          <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-blue-500 p-8 text-center text-white">
                      <QrCode className="w-24 h-24 mx-auto mb-4 bg-white p-2 rounded-xl text-blue-600" />
                      <p className="font-bold text-lg">支付宝收款码</p>
                      <p className="text-blue-100 text-sm mt-2">请使用支付宝扫码绑定商户UID</p>
                  </div>
                  <div className="p-8 space-y-6">
                       <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                           <span className="text-slate-500">当前绑定UID</span>
                           <span className="font-mono font-bold text-slate-800">2088002025936533</span>
                       </div>
                       <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex justify-between items-center">
                           <span className="text-slate-500">实名认证</span>
                           <span className="font-bold text-slate-800 flex items-center gap-1">
                               李*涛 <CheckCircle2 className="w-4 h-4 text-green-500" />
                           </span>
                       </div>
                       
                       <button onClick={() => setCurrentView('MENU')} className="w-full border border-slate-200 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-50">
                           重新绑定
                       </button>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
        {currentView === 'MENU' && (
            <>
                <div className="h-24 bg-white border-b border-slate-200 flex items-center px-8 shrink-0">
                   <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                           <img src="https://picsum.photos/100/100" alt="Shop" className="w-full h-full object-cover" />
                       </div>
                       <div>
                           <h1 className="text-2xl font-bold text-slate-800">店铺设置</h1>
                           <p className="text-slate-500">天顺斋创冰店</p>
                       </div>
                   </div>
                </div>
                
                <div className="p-8 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl">
                        <SettingCard 
                            icon={Store} 
                            title="店铺信息" 
                            desc="修改名称、电话、标签" 
                            colorClass="bg-blue-100 text-blue-600"
                            onClick={() => setCurrentView('SHOP_INFO')} 
                        />
                        <SettingCard 
                            icon={Gift} 
                            title="红包设置" 
                            desc="比例、上限、锁客门槛" 
                            colorClass="bg-red-100 text-red-600"
                            onClick={() => setCurrentView('RED_PACKET')} 
                        />
                        <SettingCard 
                            icon={Ticket} 
                            title="卡券投放" 
                            desc="管理与发放代金券" 
                            colorClass="bg-purple-100 text-purple-600"
                            onClick={() => setCurrentView('COUPON')} 
                        />
                        <SettingCard 
                            icon={CreditCard} 
                            title="收款设置" 
                            desc="绑定支付宝/微信账户" 
                            colorClass="bg-green-100 text-green-600"
                            onClick={() => setCurrentView('PAYMENT')} 
                        />
                        <SettingCard 
                            icon={Smartphone} 
                            title="绑定收银台" 
                            desc="NFC 碰一碰绑定" 
                            colorClass="bg-orange-100 text-orange-600"
                            onClick={() => alert('请使用安卓手机碰一下收款设备进行绑定')} 
                        />
                        <SettingCard 
                            icon={List} 
                            title="收银台列表" 
                            desc="管理已绑定的设备" 
                            colorClass="bg-slate-100 text-slate-600"
                            onClick={() => setCurrentView('CASHIER_LIST')} 
                        />
                    </div>
                </div>
            </>
        )}

        {currentView === 'SHOP_INFO' && <ShopInfoView />}
        {currentView === 'RED_PACKET' && <RedPacketSettingsView />}
        {currentView === 'COUPON' && <CouponDistributeView />}
        {currentView === 'PAYMENT' && <PaymentSettingsView />}
        {currentView === 'CASHIER_LIST' && (
            <div className="flex flex-col h-full bg-slate-50">
                <SubPageHeader title="收银台列表" />
                <div className="p-8 text-center text-slate-400">暂无绑定设备</div>
            </div>
        )}
    </div>
  );
};