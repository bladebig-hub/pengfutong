import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { Search, UserPlus, MoreHorizontal, Lock, Ticket, MessageSquare, Send } from 'lucide-react';

export const Customers: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [showCouponModal, setShowCouponModal] = useState(false);

  const CouponDistributeModal = () => (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-2xl relative">
               <button onClick={() => setShowCouponModal(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">✕</button>
               <h3 className="text-lg font-bold text-slate-800 text-center mb-6">卡券投放</h3>
               
               <div className="space-y-4">
                   <div className="border border-red-100 bg-red-50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-red-300 transition-colors">
                       <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center text-red-500 font-bold border border-red-100 shadow-sm">
                               <span className="text-xs">¥</span><span className="text-xl leading-none">5</span>
                           </div>
                           <div>
                               <p className="font-bold text-slate-800">来的都是客</p>
                               <p className="text-xs text-slate-500">剩余 99999998</p>
                           </div>
                       </div>
                       <button className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg">投放卡券</button>
                   </div>

                   <div className="border border-red-100 bg-red-50 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-red-300 transition-colors">
                       <div className="flex items-center gap-3">
                           <div className="w-12 h-12 bg-white rounded-lg flex flex-col items-center justify-center text-red-500 font-bold border border-red-100 shadow-sm">
                               <span className="text-xs">¥</span><span className="text-xl leading-none">30</span>
                           </div>
                           <div>
                               <p className="font-bold text-slate-800">您是大客户</p>
                               <p className="text-xs text-slate-500">剩余 9999992</p>
                           </div>
                       </div>
                       <button className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg">投放卡券</button>
                   </div>
               </div>
          </div>
      </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
       <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0">
          <h1 className="text-xl font-bold text-slate-800">用户管理</h1>
          <div className="flex gap-3">
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input type="text" placeholder="搜索手机号/昵称" className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 outline-none focus:border-primary" />
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-600">
                <UserPlus className="w-4 h-4" />
                <span>添加会员</span>
            </button>
          </div>
       </div>

       <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                   <tr>
                      <th className="px-6 py-4 font-medium">用户信息</th>
                      <th className="px-6 py-4 font-medium">手机号</th>
                      <th className="px-6 py-4 font-medium">标签</th>
                      <th className="px-6 py-4 font-medium">余额/积分</th>
                      <th className="px-6 py-4 font-medium">累计消费</th>
                      <th className="px-6 py-4 font-medium">最近到店</th>
                      <th className="px-6 py-4 font-medium text-right">操作</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {MOCK_USERS.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <img src={user.avatar} className="w-10 h-10 rounded-full border border-slate-100" />
                               <div>
                                  <p className="font-bold text-slate-800 flex items-center gap-1">
                                      {user.name}
                                      {user.isLocked && <Lock className="w-3 h-3 text-orange-500" />}
                                  </p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4 text-slate-600 font-mono">{user.phone}</td>
                         <td className="px-6 py-4">
                            <div className="flex gap-1">
                                {user.tags?.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs">{tag}</span>
                                ))}
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <p className="text-secondary font-bold">¥{user.balance.toFixed(2)}</p>
                            <p className="text-xs text-slate-400">{user.points} 积分</p>
                         </td>
                         <td className="px-6 py-4 text-slate-800">¥{user.totalSpent?.toFixed(0)}</td>
                         <td className="px-6 py-4 text-slate-500">{user.lastVisit}</td>
                         <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <button 
                                  onClick={() => setShowCouponModal(true)}
                                  className="p-2 hover:bg-purple-50 text-purple-600 rounded-lg flex items-center gap-1 text-xs font-medium"
                                  title="发卡券"
                               >
                                  <Ticket className="w-4 h-4" />
                               </button>
                               <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg flex items-center gap-1 text-xs font-medium" title="发短信">
                                  <MessageSquare className="w-4 h-4" />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

       {showCouponModal && <CouponDistributeModal />}
    </div>
  );
};