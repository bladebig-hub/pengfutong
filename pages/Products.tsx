import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES } from '../constants';
import { Search, Plus, Filter, Edit, Trash2, Scan, Upload } from 'lucide-react';

export const Products: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock Form State
  const [formData, setFormData] = useState({
      name: '',
      category: '招牌推荐',
      price: '',
      cost: '',
      stock: '',
      barcode: '',
      sku: ''
  });

  const AddProductModal = () => (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[500px] shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">新增商品</h3>
                  <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              
              <div className="space-y-4">
                   <div className="flex justify-center mb-4">
                       <div className="w-24 h-24 bg-slate-100 rounded-xl border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-primary hover:text-primary transition-colors">
                           <Upload className="w-6 h-6 mb-1" />
                           <span className="text-xs">上传图片</span>
                       </div>
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">商品名称</label>
                      <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">商品分类</label>
                          <select className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-primary">
                              {CATEGORIES.filter(c => c !== '全部').map(c => <option key={c}>{c}</option>)}
                          </select>
                       </div>
                       <div>
                           <label className="block text-sm font-medium text-slate-700 mb-1">条形码</label>
                           <div className="relative">
                                <input type="text" className="w-full border border-slate-300 rounded-lg pl-3 pr-8 py-2 outline-none focus:border-primary" placeholder="扫描或输入" />
                                <Scan className="w-4 h-4 absolute right-2.5 top-2.5 text-slate-400 cursor-pointer hover:text-primary" />
                           </div>
                       </div>
                   </div>

                   <div className="grid grid-cols-3 gap-4">
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">售价 (元)</label>
                          <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">成本 (元)</label>
                          <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                       </div>
                       <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">初始库存</label>
                          <input type="number" className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-primary" />
                       </div>
                   </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                  <button onClick={() => setShowAddModal(false)} className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600">取消</button>
                  <button onClick={() => setShowAddModal(false)} className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 font-medium">确认保存</button>
              </div>
          </div>
      </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50">
       <div className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between shrink-0">
          <h1 className="text-xl font-bold text-slate-800">商品管理</h1>
          <div className="flex gap-3">
             <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="搜索商品名称/条码" 
                    className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 outline-none focus:border-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button 
                onClick={() => setShowAddModal(true)}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-600"
             >
                <Plus className="w-4 h-4" />
                <span>新增商品</span>
             </button>
          </div>
       </div>

       <div className="p-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                   <tr>
                      <th className="px-6 py-4 font-medium">商品名称</th>
                      <th className="px-6 py-4 font-medium">分类</th>
                      <th className="px-6 py-4 font-medium">条码/SKU</th>
                      <th className="px-6 py-4 font-medium">售价</th>
                      <th className="px-6 py-4 font-medium">成本</th>
                      <th className="px-6 py-4 font-medium">库存</th>
                      <th className="px-6 py-4 font-medium text-right">操作</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                   {PRODUCTS.map(product => (
                      <tr key={product.id} className="hover:bg-slate-50">
                         <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold">
                                  {product.name[0]}
                               </div>
                               <div>
                                  <p className="font-bold text-slate-800">{product.name}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-6 py-4">
                            <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs">
                               {product.category}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-slate-500">{product.barcode || product.sku}</td>
                         <td className="px-6 py-4 font-bold text-slate-700">¥{product.price.toFixed(2)}</td>
                         <td className="px-6 py-4 text-slate-500">¥{product.cost?.toFixed(2) || '-'}</td>
                         <td className="px-6 py-4">
                            <span className={`${product.stock < 20 ? 'text-red-500 font-bold' : 'text-slate-600'}`}>
                               {product.stock}
                            </span>
                         </td>
                         <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg">
                                  <Edit className="w-4 h-4" />
                               </button>
                               <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg">
                                  <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

       {showAddModal && <AddProductModal />}
    </div>
  );
};