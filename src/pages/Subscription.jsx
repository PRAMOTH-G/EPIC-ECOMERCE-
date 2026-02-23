import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Calendar, Package, Check, Plus, Minus, ShoppingBag, Pause, X } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import { useCart } from '../context/CartContext';
import { showToast } from '../components/NotificationToast';

const PLANS = [
    { id: 'weekly', label: 'Weekly', freq: 'Every 7 days', discount: 5, badge: 'Most Popular', color: 'from-green-500 to-emerald-600' },
    { id: 'biweekly', label: 'Bi-Weekly', freq: 'Every 14 days', discount: 8, badge: null, color: 'from-blue-500 to-indigo-600' },
    { id: 'monthly', label: 'Monthly', freq: 'Every 30 days', discount: 12, badge: 'Best Value', color: 'from-purple-500 to-violet-600' },
];

const POPULAR_SUBSCRIPTION_PRODUCTS = PRODUCTS.filter(p =>
    ['Fruits & Vegetables', 'Dairy & Eggs', 'Beverages'].includes(p.category)
).slice(0, 8);

export default function SubscriptionPage() {
    const [selectedPlan, setSelectedPlan] = useState('weekly');
    const [basketItems, setBasketItems] = useState([]);
    const [subscribed, setSubscribed] = useState(() => {
        try { return JSON.parse(localStorage.getItem('subscription') || 'null'); } catch { return null; }
    });
    const { addToCart } = useCart();

    const addToBasket = (product) => {
        setBasketItems(prev => {
            const exists = prev.find(i => i.id === product.id);
            if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromBasket = (productId) => {
        setBasketItems(prev => {
            const item = prev.find(i => i.id === productId);
            if (item?.qty === 1) return prev.filter(i => i.id !== productId);
            return prev.map(i => i.id === productId ? { ...i, qty: i.qty - 1 } : i);
        });
    };

    const totalOriginal = basketItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const plan = PLANS.find(p => p.id === selectedPlan);
    const totalDiscounted = totalOriginal * (1 - plan.discount / 100);

    const handleSubscribe = () => {
        if (basketItems.length === 0) {
            showToast({ type: 'error', title: 'Empty basket!', message: 'Add at least one product to subscribe.' });
            return;
        }
        const sub = { plan: selectedPlan, items: basketItems, nextDelivery: 'Tomorrow, 10 AM - 12 PM', status: 'active', createdAt: new Date().toISOString() };
        localStorage.setItem('subscription', JSON.stringify(sub));
        setSubscribed(sub);
        showToast({ type: 'success', title: '🎉 Subscribed!', message: `Your ${plan.label} delivery starts tomorrow!` });
    };

    const handleCancel = () => {
        localStorage.removeItem('subscription');
        setSubscribed(null);
        showToast({ type: 'info', title: 'Subscription Cancelled', message: 'Your subscription has been cancelled.' });
    };

    if (subscribed) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 dark:bg-dark-bg pb-20">
                <div className="max-w-2xl mx-auto px-4 py-12 space-y-6">
                    <div className="text-center mb-8">
                        <span className="text-5xl block mb-3">✅</span>
                        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Active Subscription</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">{PLANS.find(p => p.id === subscribed.plan)?.label} delivery plan</p>
                    </div>
                    <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                            <span className="font-bold text-green-600">Active</span>
                            <span className="text-gray-400 text-sm ml-auto">Next delivery: {subscribed.nextDelivery}</span>
                        </div>
                        <div className="space-y-3 mb-5">
                            {subscribed.items.map(item => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <img src={item.image} alt={item.title} className="w-10 h-10 rounded-xl object-cover" />
                                    <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">{item.title}</span>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">×{item.qty}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <motion.button whileHover={{ scale: 1.03 }} onClick={handleCancel}
                                className="flex-1 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 font-bold rounded-2xl border border-red-200 dark:border-red-800 hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
                                <X className="w-4 h-4" /> Cancel Plan
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 dark:bg-dark-bg pb-20">
            {/* Hero */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-16 mb-8">
                <div className="max-w-3xl mx-auto text-center">
                    <RefreshCw className="w-10 h-10 mx-auto mb-3 text-blue-200" />
                    <h1 className="text-4xl font-black mb-3">Auto-Delivery Subscription</h1>
                    <p className="text-blue-100 text-lg">Set it & forget it. Fresh groceries delivered automatically — save up to 12%!</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 space-y-8">
                {/* Plan Selection */}
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">1. Choose Your Plan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {PLANS.map(p => (
                            <motion.button
                                key={p.id}
                                whileHover={{ y: -2 }}
                                onClick={() => setSelectedPlan(p.id)}
                                className={`relative p-5 rounded-3xl border-2 text-left transition-all ${selectedPlan === p.id ? 'border-green-500 bg-white dark:bg-dark-card shadow-xl' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card hover:border-green-200'}`}
                            >
                                {p.badge && (
                                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-gradient-to-r ${p.color} text-white text-[10px] font-black rounded-full whitespace-nowrap`}>
                                        {p.badge}
                                    </span>
                                )}
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${p.color} flex items-center justify-center mb-3`}>
                                    <RefreshCw className="w-5 h-5 text-white" />
                                </div>
                                <p className="font-black text-gray-900 dark:text-white text-lg">{p.label}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{p.freq}</p>
                                <p className="mt-2 text-green-600 font-black text-lg">{p.discount}% off</p>
                                {selectedPlan === p.id && <Check className="absolute top-4 right-4 w-5 h-5 text-green-600" />}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Product Basket */}
                <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">2. Build Your Basket</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {POPULAR_SUBSCRIPTION_PRODUCTS.map(product => {
                            const inBasket = basketItems.find(i => i.id === product.id);
                            return (
                                <div key={product.id} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                    <img src={product.image} alt={product.title} className="w-full h-24 object-cover" />
                                    <div className="p-3">
                                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 line-clamp-1 mb-1">{product.title}</p>
                                        <p className="text-sm font-black text-green-600 mb-2">₹{product.price}</p>
                                        {inBasket ? (
                                            <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 rounded-xl px-2 py-1">
                                                <button onClick={() => removeFromBasket(product.id)} className="text-green-600 hover:text-green-700"><Minus className="w-3.5 h-3.5" /></button>
                                                <span className="text-sm font-black text-green-700">{inBasket.qty}</span>
                                                <button onClick={() => addToBasket(product)} className="text-green-600 hover:text-green-700"><Plus className="w-3.5 h-3.5" /></button>
                                            </div>
                                        ) : (
                                            <button onClick={() => addToBasket(product)}
                                                className="w-full py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-bold rounded-xl hover:bg-green-100 hover:text-green-700 transition-colors flex items-center justify-center gap-1">
                                                <Plus className="w-3 h-3" /> Add
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Summary + Subscribe */}
                {basketItems.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-xl">
                        <h3 className="font-black text-gray-900 dark:text-white mb-4">3. Review & Subscribe</h3>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500 text-sm">Original Total</span>
                            <span className="text-gray-400 line-through text-sm">₹{totalOriginal.toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500 text-sm">{plan.label} Discount ({plan.discount}%)</span>
                            <span className="text-green-600 font-bold text-sm">-₹{(totalOriginal - totalDiscounted).toFixed(0)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-800 mb-5">
                            <span className="font-black text-gray-900 dark:text-white">Per Delivery</span>
                            <span className="font-black text-green-600 text-xl">₹{totalDiscounted.toFixed(0)}</span>
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSubscribe}
                            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            Start {plan.label} Subscription
                        </motion.button>
                        <p className="text-xs text-gray-400 text-center mt-3">Cancel anytime. No hidden fees.</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
