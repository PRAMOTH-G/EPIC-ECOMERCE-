import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Package, Tag, Users, TrendingUp,
    AlertTriangle, BarChart2, PieChart, Plus, Trash2
} from 'lucide-react';
import { DEPARTMENTS, PRODUCTS, OFFERS } from '../lib/data';

// ── Simulated analytics ──────────────────────────────────────────
const HOURS = ['6am', '8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm'];
const ORDER_DATA = [3, 7, 15, 22, 18, 30, 42, 35, 18];
const MAX_ORDERS = Math.max(...ORDER_DATA);

const lowStock = PRODUCTS.filter(p => p.stock > 0 && p.stock <= 20)
    .sort((a, b) => a.stock - b.stock).slice(0, 8);
const topProducts = PRODUCTS.sort((a, b) => b.reviews - a.reviews).slice(0, 5);

// Dept revenue (simulated: avg price * product count)
const deptRevenue = DEPARTMENTS.map(d => {
    const prods = PRODUCTS.filter(p => p.category === d.name);
    return {
        ...d,
        revenue: prods.reduce((acc, p) => acc + p.price, 0),
        count: prods.length,
        inStock: prods.filter(p => p.stock > 0).length,
    };
}).sort((a, b) => b.revenue - a.revenue);

const MAX_REV = deptRevenue[0]?.revenue || 1;

// Coupon generator state
let couponIdCounter = 100;
const PRESET_COUPONS = [
    { id: 1, code: 'FRESH10', discount: '10%', expiry: '2026-03-31', uses: 200, used: 47 },
    { id: 2, code: 'SAVE50', discount: '₹50 OFF', expiry: '2026-02-28', uses: 100, used: 100 },
    { id: 3, code: 'ORGANIC20', discount: '20%', expiry: '2026-04-15', uses: 50, used: 12 },
];

const STAT_CARDS = [
    { label: 'Total Products', value: PRODUCTS.length, icon: '📦', color: 'blue', trend: '+12 this week' },
    { label: 'Departments', value: DEPARTMENTS.length, icon: '🏪', color: 'green', trend: 'All active' },
    { label: 'Active Offers', value: OFFERS.length, icon: '🔥', color: 'rose', trend: '3 expiring soon' },
    { label: 'Low Stock ⚠️', value: lowStock.length, icon: '⚠️', color: 'amber', trend: 'Needs attention' },
];

const COLOR_MAP = {
    blue: 'from-blue-500 to-indigo-600',
    green: 'from-green-500 to-emerald-600',
    rose: 'from-rose-500 to-pink-600',
    amber: 'from-amber-500 to-orange-600',
    emerald: 'from-emerald-500 to-teal-600',
};

const Admin = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [coupons, setCoupons] = useState(PRESET_COUPONS);
    const [newCoupon, setNewCoupon] = useState({ code: '', discount: '', expiry: '', uses: 100 });
    const [showCouponForm, setShowCouponForm] = useState(false);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'departments', label: 'Departments', icon: '🏪' },
        { id: 'coupons', label: 'Coupons', icon: '🎟️' },
        { id: 'offers', label: 'Offers', icon: '🔥' },
    ];

    const addCoupon = () => {
        if (!newCoupon.code || !newCoupon.discount) return;
        setCoupons(prev => [...prev, { ...newCoupon, id: ++couponIdCounter, used: 0 }]);
        setNewCoupon({ code: '', discount: '', expiry: '', uses: 100 });
        setShowCouponForm(false);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-20 pt-4">
            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 text-white px-6 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <LayoutDashboard className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                            <p className="text-gray-400 text-sm">FreshMart — Real-Time Store Management</p>
                        </div>
                    </div>
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
                                <p className="text-white/60 text-[11px] mt-1">{stat.trend}</p>
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

                {/* ── OVERVIEW TAB ── */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Low stock alert */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertTriangle className="w-5 h-5 text-amber-500" />
                                <h2 className="font-bold text-gray-900 dark:text-white">Low Stock Alerts</h2>
                            </div>
                            <div className="space-y-2">
                                {lowStock.map(p => (
                                    <div key={p.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-800">
                                        <img src={p.image} alt="" className="w-9 h-9 rounded-xl object-cover"
                                            onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&auto=format&fit=crop'; }} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{p.title}</p>
                                            <p className="text-[10px] text-gray-400">{p.category}</p>
                                        </div>
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.stock <= 5 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
                                            {p.stock} left
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Top products */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="w-5 h-5 text-green-500" />
                                <h2 className="font-bold text-gray-900 dark:text-white">Top Products This Week</h2>
                            </div>
                            {topProducts.map((p, i) => (
                                <div key={p.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 dark:border-gray-800">
                                    <span className="text-lg font-black text-gray-300 w-6 text-center">{i + 1}</span>
                                    <img src={p.image} alt="" className="w-9 h-9 rounded-xl object-cover"
                                        onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&auto=format&fit=crop'; }} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-1">{p.title}</p>
                                        <div className="flex items-center gap-1 mt-0.5">
                                            <div className="h-1.5 bg-green-500 rounded-full" style={{ width: `${(p.reviews / topProducts[0].reviews) * 80}px` }} />
                                            <span className="text-[10px] text-gray-400">{p.reviews} reviews</span>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-green-600">₹{p.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── ANALYTICS TAB ── */}
                {activeTab === 'analytics' && (
                    <div className="space-y-6">
                        {/* Orders by hour bar chart */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <BarChart2 className="w-5 h-5 text-blue-500" />
                                <h2 className="font-bold text-gray-900 dark:text-white">Orders by Hour Today</h2>
                            </div>
                            <div className="flex items-end gap-2 h-48">
                                {ORDER_DATA.map((val, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                        <span className="text-[9px] text-gray-500 font-bold">{val}</span>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(val / MAX_ORDERS) * 160}px` }}
                                            transition={{ delay: i * 0.07, duration: 0.5, ease: 'easeOut' }}
                                            className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 min-h-[4px]"
                                        />
                                        <span className="text-[9px] text-gray-400">{HOURS[i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Revenue by Department */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <PieChart className="w-5 h-5 text-purple-500" />
                                <h2 className="font-bold text-gray-900 dark:text-white">Revenue Potential by Department</h2>
                            </div>
                            <div className="space-y-3">
                                {deptRevenue.slice(0, 10).map((dept, i) => (
                                    <div key={dept.id} className="flex items-center gap-3">
                                        <span className="text-lg w-7 text-center">{dept.icon}</span>
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-36 truncate">{dept.name}</span>
                                        <div className="flex-1 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(dept.revenue / MAX_REV) * 100}%` }}
                                                transition={{ delay: i * 0.05, duration: 0.6 }}
                                                className="h-full rounded-full"
                                                style={{ background: `hsl(${140 + i * 18}, 70%, 45%)` }}
                                            />
                                        </div>
                                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300 w-20 text-right">₹{dept.revenue.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── PRODUCTS TAB ── */}
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
                                                    <img src={product.image} alt="" className="w-10 h-10 rounded-xl object-cover"
                                                        onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&auto=format&fit=crop'; }} />
                                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 max-w-[200px]">{product.title}</p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">{product.category}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-gray-200">₹{product.price}</td>
                                            <td className="px-4 py-3">
                                                <span className={`text-sm font-semibold ${product.stock <= 10 ? 'text-red-500' : product.stock <= 20 ? 'text-amber-500' : 'text-gray-600 dark:text-gray-400'}`}>{product.stock}</span>
                                            </td>
                                            <td className="px-4 py-3"><span className="text-xs font-bold text-amber-600">★ {product.rating}</span></td>
                                            <td className="px-4 py-3">
                                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 dark:bg-green-900/30 text-green-700' : 'bg-red-100 dark:bg-red-900/30 text-red-700'}`}>
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

                {/* ── DEPARTMENTS TAB ── */}
                {activeTab === 'departments' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {deptRevenue.map((dept, idx) => (
                            <motion.div
                                key={dept.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.04 }}
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
                                <div className="mt-3 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${Math.min((dept.count / 20) * 100, 100)}%` }} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ── COUPONS TAB ── */}
                {activeTab === 'coupons' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-bold text-gray-900 dark:text-white text-lg">🎟️ Promo Codes</h2>
                            <button
                                onClick={() => setShowCouponForm(v => !v)}
                                className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" /> Create Coupon
                            </button>
                        </div>

                        {showCouponForm && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5"
                            >
                                <p className="font-semibold text-gray-800 dark:text-white mb-4">New Promo Code</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Code *</label>
                                        <input
                                            value={newCoupon.code}
                                            onChange={e => setNewCoupon(c => ({ ...c, code: e.target.value.toUpperCase() }))}
                                            placeholder="SAVE20"
                                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Discount *</label>
                                        <input
                                            value={newCoupon.discount}
                                            onChange={e => setNewCoupon(c => ({ ...c, discount: e.target.value }))}
                                            placeholder="20% or ₹100"
                                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Expiry Date</label>
                                        <input
                                            type="date"
                                            value={newCoupon.expiry}
                                            onChange={e => setNewCoupon(c => ({ ...c, expiry: e.target.value }))}
                                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 mb-1 block">Max Uses</label>
                                        <input
                                            type="number"
                                            value={newCoupon.uses}
                                            onChange={e => setNewCoupon(c => ({ ...c, uses: parseInt(e.target.value) || 100 }))}
                                            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button onClick={addCoupon} className="px-5 py-2.5 bg-green-600 text-white font-bold rounded-xl text-sm hover:bg-green-700 transition-colors">
                                        Create Code
                                    </button>
                                    <button onClick={() => setShowCouponForm(false)} className="px-5 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 font-bold rounded-xl text-sm">
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {coupons.map(coupon => {
                            const usagePercent = Math.round((coupon.used / coupon.uses) * 100);
                            const isExpired = coupon.expiry && new Date(coupon.expiry) < new Date();
                            return (
                                <motion.div
                                    key={coupon.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl font-mono text-sm font-bold text-gray-800 dark:text-white">
                                                {coupon.code}
                                            </div>
                                            <div>
                                                <span className="text-sm font-bold text-rose-600 bg-rose-50 dark:bg-rose-900/20 px-2.5 py-1 rounded-full">{coupon.discount}</span>
                                                {coupon.expiry && (
                                                    <p className={`text-xs mt-1 ${isExpired ? 'text-red-500' : 'text-gray-400'}`}>
                                                        {isExpired ? '❌ Expired' : `Valid till ${coupon.expiry}`}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setCoupons(prev => prev.filter(c => c.id !== coupon.id))}
                                            className="p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="mt-3">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Usage: {coupon.used}/{coupon.uses}</span>
                                            <span>{usagePercent}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full">
                                            <div
                                                className={`h-full rounded-full ${usagePercent >= 100 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-amber-500' : 'bg-green-500'}`}
                                                style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* ── OFFERS TAB ── */}
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
                                <img src={offer.image} alt={offer.title} className="w-20 h-16 rounded-xl object-cover"
                                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop'; }} />
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900 dark:text-white">{offer.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{offer.desc}</p>
                                    <div className="flex gap-3 mt-2">
                                        <span className="text-xs bg-rose-100 dark:bg-rose-900/20 text-rose-600 font-bold px-2.5 py-1 rounded-full">{offer.discount}</span>
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
