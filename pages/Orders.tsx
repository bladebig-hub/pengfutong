import React, { useState } from 'react';
import { RECENT_ORDERS } from '../constants';
import { Search, Filter, Download, Eye, Calendar, ArrowUpDown, Printer } from 'lucide-react';
import { Order } from '../types';

export const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [dateRange, setDateRange] = useState('2024-05-20');

  const handlePrint = (order: Order) => {
      // Simulate Printing logic reuse
      const printWindow = window.open('', '_blank');
      if (printWindow) {
          printWindow.document.write(`
            <html>
                <head>
                    <title>补打小票</title>
                    <style>
                        body { font-family: monospace; font-size: 12px; max-width: 300px; margin: 0 auto; padding: 20px; }
                        .center { text-align: center; }
                        .line { border-bottom: 1px dashed #000; margin: 10px 0; }
                        .flex { display: flex; justify-content: space-between; }
                        .bold { font-weight: bold; }
                    </style>
                </head>
                <body>
                    <div class="center bold" style="font-size: 16px;">碰付通餐饮店 (补打)</div>
                    <div class="line"></div>
                    <div>单号: ${order.id}</div>
                    <div>时间: ${order.timestamp}</div>
                    ${order.tableNumber ? `<div>桌号: ${order.tableNumber}</div>` : ''}
                    <div class="line"></div>
                    ${order.items.map(item => `
                        <div class="flex">
                            <span>${item.name} x${item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    `).join('')}
                    <div class="line"></div>
                    <div class="flex"><span>合计:</span><span>${order.totalAmount.toFixed(2)}</span></div>
                    <div class="flex"><span>优惠:</span><span>-${order.discountAmount.toFixed(2)}</span></div>
                    <div class="flex bold" style="font-size: 14px;"><span>实收:</span><span>${order.finalAmount.toFixed(2)}</span></div>
                </body>
            </html>
          `);
          printWindow.document.close();
          printWindow.print();
      }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
       <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0">
          <h1 className="text-xl font-bold text-slate-800">订单记录</h1>
          <div className="flex gap-2">
             <button className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50">
                <Download className="w-4 h-4" /> 导出
             </button>
          </div>
       </div>

       {/* Filters */}
       <div className="px-6 py-4 flex items-center justify-between border-b border-slate-200 bg-white">
            <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    {['ALL', 'ALIPAY', 'WECHAT'].map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab ? 'bg-white shadow text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            {tab === 'ALL' ? '全部订单' : tab === 'ALIPAY' ? '支付宝' : '微信支付'}
                        </button>
                    ))}
                </div>
                
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-600 cursor-pointer hover:bg-slate-100">
                    <Calendar className="w-4 h-4" />
                    <span>{dateRange}</span>
                </div>
                
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-slate-600 cursor-pointer hover:bg-slate-100">
                    <ArrowUpDown className="w-4 h-4" />
                    <span>按时间排序</span>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>共 {RECENT_ORDERS.length} 笔订单</span>
                <span>合计营收: <span className="font-bold text-slate-800">¥{RECENT_ORDERS.reduce((a,b) => a + b.finalAmount, 0).toFixed(2)}</span></span>
            </div>
       </div>

       <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                   <tr>
                      <th className="px-6 py-4 font-medium">订单号/时间</th>
                      <th className="px-6 py-4 font-medium">商品明细</th>
                      <th className="px-6 py-4 font-medium">顾客</th>
                      <th className="px-6 py-4 font-medium">支付方式</th>
                      <th className="px-6 py-4 font-medium text-right">金额</th>
                      <th className="px-6 py-4 font-medium text-right">状态</th>
                      <th className="px-6 py-4 font-medium text-right">操作</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {RECENT_ORDERS.filter(o => activeTab === 'ALL' || o.paymentMethod === activeTab).map(order => (
                      <tr key={order.id} className="hover:bg-slate-50">
                         <td className="px-6 py-4">
                            <p className="font-medium text-slate-800">{order.id}</p>
                            <p className="text-xs text-slate-400">{order.timestamp}</p>
                         </td>
                         <td className="px-6 py-4">
                            <p className="text-slate-700 truncate w-48" title={order.items.map(i => i.name).join(', ')}>
                                {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
                            </p>
                         </td>
                         <td className="px-6 py-4">
                            {order.customer ? (
                                <div className="flex items-center gap-2">
                                    <img src={order.customer.avatar} className="w-6 h-6 rounded-full" />
                                    <span className="text-slate-700">{order.customer.name}</span>
                                </div>
                            ) : (
                                <span className="text-slate-400">散客</span>
                            )}
                         </td>
                         <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${order.paymentMethod === 'ALIPAY' ? 'bg-blue-100 text-blue-600' : order.paymentMethod === 'WECHAT' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                               {order.paymentMethod === 'ALIPAY' ? '支付宝' : order.paymentMethod === 'WECHAT' ? '微信' : '现金'}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <p className="font-bold text-slate-800">¥{order.finalAmount.toFixed(2)}</p>
                            {order.discountAmount > 0 && <p className="text-xs text-secondary">优惠 -¥{order.discountAmount}</p>}
                         </td>
                         <td className="px-6 py-4 text-right">
                             <span className="text-green-600">已完成</span>
                         </td>
                         <td className="px-6 py-4 text-right">
                             <button onClick={() => handlePrint(order)} className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors" title="打印小票">
                                 <Printer className="w-4 h-4" />
                             </button>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
};