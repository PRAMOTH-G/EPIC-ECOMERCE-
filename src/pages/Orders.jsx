import React from 'react';
import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, Truck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

// Read orders from localStorage (populated during checkout)
const getOrders = () => {
    try {
        return JSON.parse(localStorage.getItem('orders') || '[]');
    } catch {
        return [];
    }
};

const STATUS_CONFIG = {
    pending: { label: 'Order Placed', icon: '📋', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
    confirmed: { label: 'Confirmed', icon: '✅', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    preparing: { label: 'Preparing', icon: '👨‍🍳', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20' },
    shipped: { label: 'Out for Delivery', icon: '🚚', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    delivered: { label: 'Delivered', icon: '🎉', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
};

const Orders = () => {
    const orders = getOrders();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"
        >
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">My Orders</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{orders.length} {orders.length === 1 ? 'order' : 'orders'} found</p>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-gray-400 space-y-6">
                    <motion.div className="text-7xl" animate={{ rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
                        📦
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">No orders yet</h2>
                    <p className="text-gray-400 text-center max-w-sm">
                        Once you complete a purchase, your orders will appear here.
                    </p>
                    <Link to="/">
                        <Button variant="primary" className="rounded-xl px-8 flex items-center gap-2">
                            Start Shopping <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, idx) => {
                        const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                        return (
                            <motion.div
                                key={order.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08 }}
                                className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg p-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500">Order #{order.id}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${status.bg} ${status.color}`}>
                                        {status.icon} {status.label}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {(order.items || []).map(item => (
                                        <div key={item.id} className="flex items-center gap-3">
                                            <img src={item.image} alt={item.title} className="w-12 h-12 rounded-xl object-cover" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{item.title}</p>
                                                <p className="text-xs text-gray-400">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                            </div>
                                            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <span className="text-base font-bold text-gray-900 dark:text-white">Total: ${order.total?.toFixed(2) || '—'}</span>
                                    <Link to="/track-order">
                                        <Button variant="outline" size="sm" className="rounded-xl flex items-center gap-2 text-xs">
                                            <Truck className="w-3.5 h-3.5" /> Track Order
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </motion.div>
    );
};

export default Orders;
