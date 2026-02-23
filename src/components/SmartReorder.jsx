import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ShoppingCart, Clock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { showToast } from './NotificationToast';

export default function SmartReorder() {
    const { addToCart } = useCart();

    // Read past orders from localStorage
    const pastOrders = useMemo(() => {
        try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            // Flatten all items from all orders, count frequency
            const itemMap = {};
            orders.forEach(order => {
                (order.items || []).forEach(item => {
                    if (itemMap[item.id]) {
                        itemMap[item.id].count += 1;
                    } else {
                        itemMap[item.id] = { ...item, count: 1 };
                    }
                });
            });
            return Object.values(itemMap)
                .filter(i => i.count >= 1)
                .sort((a, b) => b.count - a.count)
                .slice(0, 6);
        } catch {
            return [];
        }
    }, []);

    if (pastOrders.length === 0) return null;

    const reorderAll = () => {
        pastOrders.forEach(item => addToCart(item, 1));
        showToast({ type: 'cart', title: 'Reordered! 🛒', message: `${pastOrders.length} items added to cart` });
    };

    return (
        <section>
            <div className="flex items-center justify-between mb-5">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <RefreshCw className="w-5 h-5 text-blue-600" />
                        <h2 className="text-2xl md:text-3xl font-black font-display text-gray-900 dark:text-white">
                            🔄 Smart Reorder
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Items you frequently buy — reorder instantly</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={reorderAll}
                    className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-sm transition-colors"
                >
                    <ShoppingCart className="w-4 h-4" />
                    Reorder All
                </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {pastOrders.map((item, idx) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
                    >
                        <div className="relative">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-28 object-cover"
                            />
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" />
                                ×{item.count}
                            </span>
                        </div>
                        <div className="p-3">
                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 line-clamp-1 mb-1">{item.title}</p>
                            <p className="text-sm font-black text-green-600">₹{item.price}</p>
                        </div>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                addToCart(item, 1);
                                showToast({ type: 'cart', title: 'Added!', message: item.title });
                            }}
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-blue-600/90 text-white font-bold flex items-center justify-center gap-2 text-sm transition-opacity duration-200 rounded-2xl"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            Reorder
                        </motion.button>
                    </motion.div>
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={reorderAll}
                className="mt-4 sm:hidden w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg text-sm transition-colors"
            >
                <ShoppingCart className="w-4 h-4" />
                Reorder All {pastOrders.length} Items
            </motion.button>
        </section>
    );
}
