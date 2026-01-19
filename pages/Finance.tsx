import React, { useState } from 'react';
import { FINANCE_RECORDS } from '../constants';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const Finance: React.FC = () => {
    const [period, setPeriod] = useState<'WEEK' | 'MONTH'>('WEEK');

    // Stats calculations based on mock data
    const totalIncome = FINANCE_RECORDS.reduce((acc, cur) => acc + cur.totalIncome, 0);
    const totalRedPacket = FINANCE_RECORDS.reduce((acc, cur) => acc + cur.redPacketCost, 0);
    const totalSubsidy = FINANCE_RECORDS.reduce((acc, cur) => acc + cur.subsidyCost, 0);
    const netIncome = FINANCE_RECORDS.reduce((acc, cur) => acc + cur.netIncome, 0);

    return (
        <div className="flex flex-col h-full bg-slate-50">
            <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0">
                <h1 className="text-xl font-bold text-slate-800">财务对账</h1>
                <div className="flex gap-2">
                    <button className="px-3 py-2 border border-slate-200 rounded-lg flex items-center gap-2 text-sm text-slate-600 hover:bg-slate-50">
                        <Download className="w-4 h-4" /> 导出报表
                    </button>
                </div>
            </div>

            <div className="p-6 overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-6">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setPeriod('WEEK')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${period === 'WEEK' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                最近7天
                            </button>
                            <button 
                                onClick={() => setPeriod('MONTH')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${period === 'MONTH' ? 'bg-primary text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                            >
                                本月
                            </button>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-50 px-3 py-2 rounded-lg border border-slate-200">
                             <Calendar className="w-4 h-4" />
                             <span>2024-05-14 至 2024-05-20</span>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-sm">总营收</span>
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">¥ {totalIncome.toFixed(2)}</h3>
                            <div className="flex items-center gap-2 mt-2 text-sm text-green-500">
                                <TrendingUp className="w-4 h-4" />
                                <span>+12.5%</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-sm">实收净额</span>
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Wallet className="w-5 h-5" /></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">¥ {netIncome.toFixed(2)}</h3>
                            <p className="text-xs text-slate-400 mt-2">扣除红包支出后</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-sm">红包/核销支出</span>
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg"><TrendingDown className="w-5 h-5" /></div>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">¥ {totalRedPacket.toFixed(2)}</h3>
                            <p className="text-xs text-slate-400 mt-2">商家承担成本</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                             <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-sm">平台补贴收入</span>
                                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><DollarSign className="w-5 h-5" /></div>
                            </div>
                            <h3 className="text-2xl font-bold text-purple-600">¥ {totalSubsidy.toFixed(2)}</h3>
                            <p className="text-xs text-slate-400 mt-2">平台发放红包额</p>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">营收与净收入趋势</h3>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[...FINANCE_RECORDS].reverse()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} 
                                        cursor={{fill: '#f8fafc'}}
                                    />
                                    <Legend />
                                    <Bar dataKey="totalIncome" name="总营收" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                                    <Bar dataKey="netIncome" name="净收入" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Detailed Table */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100">
                             <h3 className="font-bold text-slate-800">每日对账明细</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-50 text-slate-500">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">日期</th>
                                        <th className="px-6 py-3 font-medium">订单数</th>
                                        <th className="px-6 py-3 font-medium">总营收</th>
                                        <th className="px-6 py-3 font-medium text-blue-600">支付宝</th>
                                        <th className="px-6 py-3 font-medium text-green-600">微信</th>
                                        <th className="px-6 py-3 font-medium text-slate-600">现金</th>
                                        <th className="px-6 py-3 font-medium text-red-500">红包支出</th>
                                        <th className="px-6 py-3 font-medium">净收入</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {FINANCE_RECORDS.map((record, i) => (
                                        <tr key={i} className="hover:bg-slate-50">
                                            <td className="px-6 py-4 text-slate-500">{record.date}</td>
                                            <td className="px-6 py-4">{record.orderCount}</td>
                                            <td className="px-6 py-4 font-bold">¥{record.totalIncome.toFixed(2)}</td>
                                            <td className="px-6 py-4">¥{record.alipayIncome.toFixed(2)}</td>
                                            <td className="px-6 py-4">¥{record.wechatIncome.toFixed(2)}</td>
                                            <td className="px-6 py-4">¥{record.cashIncome.toFixed(2)}</td>
                                            <td className="px-6 py-4 text-red-500">-¥{record.redPacketCost.toFixed(2)}</td>
                                            <td className="px-6 py-4 font-bold text-green-600">¥{record.netIncome.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};