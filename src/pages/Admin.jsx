import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, Package, Tag, Users, TrendingUp, ChevronDown, ChevronUp, Edit, Eye } from 'lucide-react';
import { DEPARTMENTS, PRODUCTS, OFFERS } from '../lib/data';

const STAT_CARDS = [
    { label: 'Total Products', value: PRODUCTS.length, icon: '📦', color: 'blue' },
    { label: 'Departments', value: DEPARTMENTS.length, icon: '🏪', color: 'green' },
    { label: 'Active Offers', value: OFFERS.length, icon: '🔥', color: 'rose' },
    { label: 'In Stock', value: PRODUCTS.filter(p => p.stock > 0).length, icon: '✅', color: 'emerald' },
];

const COLOR_MAP = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    rose: 'from-rose-500 to-pink-600',
    emerald: 'from-emerald-500 to-teal-600',
};

const Admin = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedDept, setExpandedDept] = useState(null);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'departments', label: 'Departments', icon: '🏪' },
        { id: 'offers', label: 'Offers', icon: '🔥' },
    ];

    const deptWithCounts = DEPARTMENTS.map(d => ({
        ...d,
        count: PRODUCTS.filter(p => p.category === d.name).length,
        inStock: PRODUCTS.filter(p => p.category === d.name && p.stock > 0).length,
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pb-20 pt-4"
        >
            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold font-display">Admin Dashboard</h1>
                            <p className="text-gray-400 text-sm">FreshMart Departmental Store Management</p>
                        </div>
                    </div>
                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                        {STAT_CARDS.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`bg-gradient-to-br ${COLOR_MAP[stat.color]} rounded-2xl p-5 shadow-lg`}
                            >
                                <span className="text-3xl">{stat.icon}</span>
                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                                <p className="text-white/80 text-sm">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-gray-400'}`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Department Overview</h2>
                            <div className="space-y-3">
                                {deptWithCounts.map(dept => (
                                    <div key={dept.id} className="flex items-center gap-4 py-2">
                                        <span className="text-xl w-8 text-center">{dept.icon}</span>
                                        <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">{dept.name}</span>
                                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 max-w-32">
                                            <div
                                                className="bg-green-500 h-2 rounded-full"
                                                style={{ width: `${Math.min((dept.count / 8) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 w-20 text-right">{dept.count} products</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                                        <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Product</th>
                                        <th className="text-left px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Category</th>
                                        <th className="text-left px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Price</th>
                                        <th className="text-left px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Stock</th>
                                        <th className="text-left px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Rating</th>
                                        <th className="text-left px-4 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                                    {PRODUCTS.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <img src={product.image} alt={product.title} className="w-10 h-10 rounded-xl object-cover" />
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 max-w-xs">{product.title}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{product.category}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">${product.price.toFixed(2)}</td>
                                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{product.stock}</td>
                                            <td className="px-4 py-3"><span className="text-xs font-bold text-amber-600">★ {product.rating}</span></td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                                                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Departments Tab */}
                {activeTab === 'departments' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {deptWithCounts.map((dept, idx) => (
                            <motion.div
                                key={dept.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">{dept.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white text-sm">{dept.name}</h3>
                                        <p className="text-xs text-gray-400">/{dept.slug}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 text-xs text-gray-500">
                                    <span>📦 {dept.count} products</span>
                                    <span>✅ {dept.inStock} in stock</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Offers Tab */}
                {activeTab === 'offers' && (
                    <div className="space-y-4">
                        {OFFERS.map((offer, idx) => (
                            <motion.div
                                key={offer.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-center gap-6"
                            >
                                <img src={offer.image} alt={offer.title} className="w-20 h-16 rounded-xl object-cover" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{offer.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{offer.desc}</p>
                                    <div className="flex gap-3 mt-2">
                                        <span className="text-xs bg-rose-100 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold px-2.5 py-1 rounded-full">{offer.discount}</span>
                                        <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-mono px-2.5 py-1 rounded-full">{offer.code}</span>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">Valid till {offer.validTill}</span>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Admin;
