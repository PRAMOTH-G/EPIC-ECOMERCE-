import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle, Clock, Package, Truck, Home,
    MapPin, Phone, Search, ChevronDown, ChevronUp,
    Leaf, ArrowLeft, AlertCircle
} from 'lucide-react';

// ── Order status pipeline ─────────────────────────────────────────
const STAGES = [
    {
        key: 'confirmed',
        label: 'Order Confirmed',
        icon: CheckCircle,
        color: 'green',
        desc: 'Your order has been received and is being processed.',
    },
    {
        key: 'packing',
        label: 'Being Packed',
        icon: Package,
        color: 'blue',
        desc: 'Our team is carefully picking and packing your fresh items.',
    },
    {
        key: 'out_for_delivery',
        label: 'Out for Delivery',
        icon: Truck,
        color: 'orange',
        desc: 'Your order is on its way! The delivery agent is en route.',
    },
    {
        key: 'delivered',
        label: 'Delivered',
        icon: Home,
        color: 'emerald',
        desc: 'Your fresh groceries have been delivered. Enjoy your meal!',
    },
];

const colorMap = {
    green: { ring: 'ring-green-400', bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-700' },
    blue: { ring: 'ring-blue-400', bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-700' },
    orange: { ring: 'ring-orange-400', bg: 'bg-orange-500', text: 'text-orange-600', light: 'bg-orange-50 dark:bg-orange-900/20', border: 'border-orange-200 dark:border-orange-700' },
    emerald: { ring: 'ring-emerald-400', bg: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-700' },
};

// Compute how far along the stage list an order is (0-indexed)
const stageIndex = (status) => STAGES.findIndex((s) => s.key === status);

// Simulate stage progression based on elapsed time since order
const simulateCurrentStage = (order) => {
    const elapsed = (Date.now() - new Date(order.date).getTime()) / 1000; // seconds
    if (elapsed > 120) return 'delivered';
    if (elapsed > 80) return 'out_for_delivery';
    if (elapsed > 40) return 'packing';
    return 'confirmed';
};

// ── Search bar ────────────────────────────────────────────────────
const TrackingSearch = ({ onSearch }) => {
    const [input, setInput] = useState('');
    return (
        <div className="flex gap-3 max-w-xl mx-auto">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && onSearch(input.trim())}
                    placeholder="Enter Order ID  e.g. FM-XXXXXX"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all font-mono"
                />
            </div>
            <button
                onClick={() => onSearch(input.trim())}
                className="px-6 py-3.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-colors text-sm shadow-lg shadow-green-600/20"
            >
                Track
            </button>
        </div>
    );
};

// ── Main component ────────────────────────────────────────────────
const TrackOrder = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const idFromUrl = searchParams.get('id') || '';

    const [orderId, setOrderId] = useState(idFromUrl);
    const [order, setOrder] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [currentStage, setCurrentStage] = useState('confirmed');
    const [showItems, setShowItems] = useState(false);

    // Auto-load order from URL param on mount
    useEffect(() => {
        if (idFromUrl) findOrder(idFromUrl);
    }, [idFromUrl]);

    // Tick every 10 s to advance demo stage
    useEffect(() => {
        if (!order) return;
        const tick = setInterval(() => {
            setCurrentStage(simulateCurrentStage(order));
        }, 10_000);
        return () => clearInterval(tick);
    }, [order]);

    const findOrder = (id) => {
        if (!id) return;
        const stored = JSON.parse(localStorage.getItem('fm_orders') || '[]');
        const found = stored.find((o) => o.id === id);
        if (found) {
            setOrder(found);
            setCurrentStage(simulateCurrentStage(found));
            setNotFound(false);
            setSearchParams({ id });
        } else {
            setOrder(null);
            setNotFound(true);
        }
    };

    const activeIdx = stageIndex(currentStage);

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">FreshMart</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold font-display text-gray-900 dark:text-white">Track Your Order</h1>
                <p className="text-gray-500 mt-2 text-sm">Enter your order ID to see real-time delivery status</p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <TrackingSearch onSearch={findOrder} />
            </div>

            {/* Not found */}
            <AnimatePresence>
                {notFound && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-5 mb-6"
                    >
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                        <div>
                            <p className="font-semibold text-red-700 dark:text-red-400">Order not found</p>
                            <p className="text-xs text-red-500 mt-0.5">
                                No order with that ID exists. Please check and try again, or{' '}
                                <Link to="/" className="underline">continue shopping</Link>.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Order found ──────────────────────────────────── */}
            <AnimatePresence>
                {order && (
                    <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="space-y-6"
                    >
                        {/* Order meta */}
                        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Order ID</p>
                                <p className="font-mono font-bold text-gray-900 dark:text-white text-lg">{order.id}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    Placed on {new Date(order.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                </p>
                            </div>
                            <div className="flex flex-col items-start sm:items-end gap-1">
                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${colorMap[STAGES[activeIdx]?.color || 'green'].light} ${colorMap[STAGES[activeIdx]?.color || 'green'].text} border ${colorMap[STAGES[activeIdx]?.color || 'green'].border}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                                    {STAGES[activeIdx]?.label || 'Confirmed'}
                                </span>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">${order.orderTotal?.toFixed(2)}</p>
                            </div>
                        </div>

                        {/* ── Visual tracker ──────────────────── */}
                        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                            <h2 className="font-bold text-gray-900 dark:text-white mb-6 text-base">Delivery Progress</h2>

                            {/* Desktop: horizontal stepper */}
                            <div className="hidden sm:flex items-start justify-between relative mb-6">
                                {/* connector line */}
                                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-100 dark:bg-gray-800 -z-0" />
                                <div
                                    className="absolute top-5 left-0 h-0.5 bg-green-500 transition-all duration-700 -z-0"
                                    style={{ width: `${(activeIdx / (STAGES.length - 1)) * 100}%` }}
                                />

                                {STAGES.map((stage, i) => {
                                    const Icon = stage.icon;
                                    const done = i <= activeIdx;
                                    const active = i === activeIdx;
                                    const cm = colorMap[stage.color];
                                    return (
                                        <div key={stage.key} className="flex flex-col items-center w-1/4 relative z-10">
                                            <motion.div
                                                initial={false}
                                                animate={done ? { scale: [1, 1.2, 1] } : {}}
                                                transition={{ duration: 0.4 }}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-white dark:bg-gray-900
                                                    ${done ? `${cm.bg} border-transparent` : 'border-gray-200 dark:border-gray-700'}
                                                    ${active ? `ring-4 ${cm.ring}` : ''}`}
                                            >
                                                <Icon className={`w-5 h-5 ${done ? 'text-white' : 'text-gray-300 dark:text-gray-600'}`} />
                                            </motion.div>
                                            <p className={`text-xs font-semibold mt-2 text-center ${done ? cm.text : 'text-gray-400'}`}>{stage.label}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Mobile: vertical stepper */}
                            <div className="sm:hidden space-y-0">
                                {STAGES.map((stage, i) => {
                                    const Icon = stage.icon;
                                    const done = i <= activeIdx;
                                    const active = i === activeIdx;
                                    const last = i === STAGES.length - 1;
                                    const cm = colorMap[stage.color];
                                    return (
                                        <div key={stage.key} className="flex items-start gap-4">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-500
                                                    ${done ? `${cm.bg} border-transparent` : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900'}
                                                    ${active ? `ring-4 ${cm.ring}` : ''}`}>
                                                    <Icon className={`w-4 h-4 ${done ? 'text-white' : 'text-gray-300 dark:text-gray-600'}`} />
                                                </div>
                                                {!last && <div className={`w-0.5 h-10 transition-colors duration-500 ${i < activeIdx ? 'bg-green-400' : 'bg-gray-100 dark:bg-gray-800'}`} />}
                                            </div>
                                            <div className="pb-6">
                                                <p className={`text-sm font-semibold ${done ? cm.text : 'text-gray-400'}`}>{stage.label}</p>
                                                {active && <p className="text-xs text-gray-400 mt-0.5">{stage.desc}</p>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Active stage description (desktop) */}
                            <div className={`hidden sm:flex items-start gap-3 mt-4 p-4 rounded-xl ${colorMap[STAGES[activeIdx]?.color || 'green'].light} border ${colorMap[STAGES[activeIdx]?.color || 'green'].border}`}>
                                <Clock className={`w-4 h-4 mt-0.5 shrink-0 ${colorMap[STAGES[activeIdx]?.color || 'green'].text}`} />
                                <div>
                                    <p className={`text-sm font-semibold ${colorMap[STAGES[activeIdx]?.color || 'green'].text}`}>{STAGES[activeIdx]?.label}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{STAGES[activeIdx]?.desc}</p>
                                </div>
                            </div>

                            {/* Demo note */}
                            <p className="text-[11px] text-gray-400 mt-4 text-center">
                                🧪 Demo: Status auto-advances every ~40 s from order time. Refresh to update.
                            </p>
                        </div>

                        {/* ── Delivery address ─────────────────── */}
                        {order.delivery && (
                            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                                <h2 className="font-bold text-gray-900 dark:text-white mb-4 text-base">Delivery Address</h2>
                                <div className="flex items-start gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                                    <div className="text-gray-600 dark:text-gray-300 space-y-0.5">
                                        <p className="font-semibold text-gray-900 dark:text-white">{order.delivery.name}</p>
                                        <p>{order.delivery.address}</p>
                                        <p>{order.delivery.city}, {order.delivery.zip}</p>
                                    </div>
                                </div>
                                {order.delivery.phone && (
                                    <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                                        <Phone className="w-4 h-4 text-green-600 shrink-0" />
                                        <span>{order.delivery.phone}</span>
                                    </div>
                                )}
                                {order.delivery.instructions && (
                                    <div className="mt-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                                        📝 {order.delivery.instructions}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ── Order items (collapsible) ─────────── */}
                        <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <button
                                onClick={() => setShowItems(!showItems)}
                                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <Package className="w-5 h-5 text-green-600" />
                                    <span className="font-bold text-gray-900 dark:text-white text-base">
                                        Order Items ({order.items?.reduce((s, i) => s + i.quantity, 0) || 0})
                                    </span>
                                </div>
                                {showItems ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                            </button>

                            <AnimatePresence>
                                {showItems && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 space-y-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                                            {order.items?.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <img src={item.image} alt={item.title}
                                                        className="w-14 h-14 object-cover rounded-xl bg-gray-100 shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.title}</p>
                                                        <p className="text-xs text-gray-400">Qty: {item.quantity} {item.unit && `· ${item.unit}`}</p>
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>
                                            ))}

                                            {/* Price summary */}
                                            <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-1.5 text-sm">
                                                {order.promoDiscount > 0 && (
                                                    <div className="flex justify-between text-green-600">
                                                        <span>Discount ({order.promoCode?.code})</span>
                                                        <span>-${order.promoDiscount.toFixed(2)}</span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between text-gray-500">
                                                    <span>Delivery</span>
                                                    <span>{order.shippingCost === 0 ? 'Free' : `$${order.shippingCost?.toFixed(2)}`}</span>
                                                </div>
                                                <div className="flex justify-between text-gray-500">
                                                    <span>Tax</span>
                                                    <span>${order.tax?.toFixed(2)}</span>
                                                </div>
                                                <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base pt-1 border-t border-gray-100 dark:border-gray-800">
                                                    <span>Total</span>
                                                    <span className="text-green-600">${order.orderTotal?.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Back to shop */}
                        <div className="text-center">
                            <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                                <ArrowLeft className="w-4 h-4" /> Back to FreshMart
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty state (no search yet) */}
            {!order && !notFound && !idFromUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-5">
                        <Truck className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                    </div>
                    <p className="text-gray-400 text-sm">Enter your <span className="font-mono font-semibold">FM-XXXXXX</span> order ID above to track your delivery.</p>
                    <p className="text-xs text-gray-300 dark:text-gray-600 mt-2">You'll find your Order ID in the confirmation email or the Success page.</p>
                </motion.div>
            )}
        </div>
    );
};

export default TrackOrder;
