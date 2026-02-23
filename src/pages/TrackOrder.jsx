import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Check, Clock, Truck, Star, MapPin, Phone, ChevronRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveTrackingMap from '../components/LiveTrackingMap';

const STAGES = [
    { key: 'placed', icon: Package, label: 'Order Placed', color: 'blue', desc: 'Your order has been confirmed' },
    { key: 'packed', icon: Package, label: 'Packing', color: 'purple', desc: 'Items are being packed carefully' },
    { key: 'picked', icon: Truck, label: 'Picked Up', color: 'orange', desc: 'Out for delivery with our rider' },
    { key: 'enroute', icon: MapPin, label: 'On the Way', color: 'amber', desc: '10 mins away from your location' },
    { key: 'delivered', icon: Check, label: 'Delivered', color: 'green', desc: 'Package delivered successfully! 🎉' },
];

// Simulate current stage based on time (demo purposes)
function getDemoStage() {
    const min = new Date().getMinutes();
    if (min < 12) return 0;
    if (min < 24) return 1;
    if (min < 36) return 2;
    if (min < 48) return 3;
    return 4;
}

function useDeliveryCountdown() {
    const [secs, setSecs] = useState(() => {
        const eta = new Date();
        eta.setMinutes(eta.getMinutes() + 30);
        return Math.max(0, Math.floor((eta - Date.now()) / 1000));
    });
    useEffect(() => {
        const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
        return () => clearInterval(id);
    }, []);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

const DEMO_ORDERS = [
    {
        id: 'FM-2026-001',
        date: '22 Feb 2026, 10:30 AM',
        items: ['Organic Red Apples', 'Amul Fresh Milk 500ml', 'Turmeric Powder'],
        total: 718,
        address: '42, Green Park Layout, Bengaluru - 560001',
        rider: { name: 'Rajan Kumar', phone: '+91 98765 43210', rating: 4.8 },
        stage: getDemoStage(),
    },
];

const TrackOrder = () => {
    const countdown = useDeliveryCountdown();
    const [selectedOrder] = useState(DEMO_ORDERS[0]);
    const currentStage = selectedOrder.stage;

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">📦 Track Your Order</h1>
                <p className="text-gray-500 mt-1">Real-time delivery status</p>
            </div>

            {/* Order card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden mb-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-5 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white/70 text-xs">Order ID</p>
                            <p className="text-lg font-black">{selectedOrder.id}</p>
                            <p className="text-white/70 text-xs mt-0.5">{selectedOrder.date}</p>
                        </div>
                        {currentStage < 4 && (
                            <div className="text-right">
                                <p className="text-white/70 text-xs">Estimated delivery in</p>
                                <p className="text-3xl font-black tabular-nums">{countdown}</p>
                                <p className="text-white/70 text-xs">minutes</p>
                            </div>
                        )}
                        {currentStage === 4 && (
                            <div className="text-right">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <Check className="w-7 h-7 text-white" />
                                </div>
                                <p className="text-xs text-white/80 mt-1">Delivered!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Timeline */}
                <div className="px-6 py-6">
                    <div className="relative">
                        {/* Vertical line */}
                        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100 dark:bg-gray-800" />
                        {/* Progress line */}
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${(currentStage / (STAGES.length - 1)) * 100}%` }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                            className="absolute left-5 top-5 w-0.5 bg-green-500 origin-top"
                        />
                        <div className="space-y-6">
                            {STAGES.map((stage, i) => {
                                const Icon = stage.icon;
                                const done = i <= currentStage;
                                const active = i === currentStage;
                                return (
                                    <motion.div
                                        key={stage.key}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.15 }}
                                        className="flex items-start gap-4 relative"
                                    >
                                        {/* Step circle */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 transition-all duration-500 ${done
                                            ? 'bg-green-500 shadow-lg shadow-green-500/30'
                                            : 'bg-gray-100 dark:bg-gray-800'
                                            } ${active ? 'ring-4 ring-green-100 dark:ring-green-900/40' : ''}`}>
                                            {done
                                                ? i < currentStage
                                                    ? <Check className="w-5 h-5 text-white" />
                                                    : <Icon className="w-5 h-5 text-white" />
                                                : <Icon className="w-5 h-5 text-gray-400" />
                                            }
                                            {active && (
                                                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
                                            )}
                                        </div>
                                        {/* Text */}
                                        <div className="pt-1.5">
                                            <p className={`text-sm font-bold ${done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                                                {stage.label}
                                                {active && <span className="ml-2 text-[10px] text-green-600 font-black bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded-full">NOW</span>}
                                            </p>
                                            <p className={`text-xs ${done ? 'text-gray-500' : 'text-gray-300 dark:text-gray-600'}`}>{stage.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Live Map — shown once picked up */}
                {currentStage >= 2 && (
                    <div className="px-6 pb-4">
                        <LiveTrackingMap orderId={selectedOrder.id} />
                    </div>
                )}

                {/* Rider info */}
                {currentStage >= 2 && currentStage < 4 && (
                    <div className="px-6 pb-6">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 rounded-2xl p-4 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
                                {selectedOrder.rider.name[0]}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 dark:text-white">{selectedOrder.rider.name}</p>
                                <p className="text-xs text-gray-500">Your Delivery Partner</p>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                    <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{selectedOrder.rider.rating}</span>
                                </div>
                            </div>
                            <a
                                href={`tel:${selectedOrder.rider.phone}`}
                                className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors"
                            >
                                <Phone className="w-3.5 h-3.5" /> Call
                            </a>
                        </div>
                    </div>
                )}

                {/* Items */}
                <div className="px-6 pb-6 border-t border-gray-50 dark:border-gray-800 pt-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Items in this order</p>
                    <div className="space-y-1.5">
                        {selectedOrder.items.map(item => (
                            <div key={item} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-50 dark:border-gray-800">
                        <p className="text-sm text-gray-500">Order Total</p>
                        <p className="text-sm font-black text-gray-900 dark:text-white">₹{selectedOrder.total}</p>
                    </div>
                </div>
            </div>

            {/* Delivery address */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-white">Delivery Address</p>
                    <p className="text-sm text-gray-500 mt-0.5">{selectedOrder.address}</p>
                </div>
            </div>

            {/* Rate order (after delivered) */}
            {currentStage === 4 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/20 rounded-2xl border border-yellow-100 dark:border-yellow-900/30 p-5 text-center"
                >
                    <p className="text-xl font-black text-gray-900 dark:text-white mb-1">🎉 Order Delivered!</p>
                    <p className="text-sm text-gray-500 mb-4">How was your experience?</p>
                    <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map(s => (
                            <button key={s} className="text-3xl hover:scale-125 transition-transform">⭐</button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-400">Earned 71 FreshCoins from this order! 🪙</p>
                </motion.div>
            )}

            {/* Return link */}
            <div className="mt-4 text-center">
                <Link to="/return" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                    Need to return an item?
                </Link>
            </div>
        </div>
    );
};

export default TrackOrder;
