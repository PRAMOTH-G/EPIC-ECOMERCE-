import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

// Global compare state (module-level, lightweight "store")
let _items = [];
let _listeners = [];

export function useCompare() {
    const [items, setItems] = useState(_items);
    useEffect(() => {
        _listeners.push(setItems);
        return () => { _listeners = _listeners.filter(f => f !== setItems); };
    }, []);

    const addToCompare = (product) => {
        if (_items.find(p => p.id === product.id)) return;
        if (_items.length >= 3) {
            // Replace oldest
            _items = [..._items.slice(1), product];
        } else {
            _items = [..._items, product];
        }
        _listeners.forEach(fn => fn([..._items]));
    };

    const removeFromCompare = (id) => {
        _items = _items.filter(p => p.id !== id);
        _listeners.forEach(fn => fn([..._items]));
    };

    const clearCompare = () => {
        _items = [];
        _listeners.forEach(fn => fn([]));
    };

    const isInCompare = (id) => _items.some(p => p.id === id);

    return { items, addToCompare, removeFromCompare, clearCompare, isInCompare };
}

// Floating comparison bar (shown at bottom of page)
export const ComparisonBar = () => {
    const { items, removeFromCompare, clearCompare } = useCompare();
    if (items.length === 0) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                className="fixed bottom-16 md:bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 px-4 py-3 flex items-center gap-3 max-w-[90vw]"
            >
                <BarChart2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300 hidden sm:block">Compare:</span>
                {items.map(p => (
                    <div key={p.id} className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl px-2 py-1">
                        <img src={p.image} alt="" className="w-7 h-7 rounded-lg object-cover"
                            onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=50&auto=format&fit=crop'; }} />
                        <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 max-w-[60px] truncate">{p.title}</span>
                        <button onClick={() => removeFromCompare(p.id)} className="text-gray-400 hover:text-red-500">
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}
                {items.length < 3 && (
                    <span className="text-[10px] text-gray-400 italic">+{3 - items.length} more</span>
                )}
                {items.length >= 2 && (
                    <Link
                        to="/compare"
                        className="ml-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap"
                    >
                        Compare →
                    </Link>
                )}
                <button onClick={clearCompare} className="ml-1 p-1 text-gray-400 hover:text-gray-600">
                    <X className="w-3.5 h-3.5" />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

// Full compare page
const ComparePage = () => {
    const { items, clearCompare } = useCompare();

    const attrs = [
        { key: 'price', label: 'Price', format: v => `₹${v}` },
        { key: 'discount', label: 'Discount', format: v => v > 0 ? `${v}%` : '—' },
        { key: 'rating', label: 'Rating', format: v => `⭐ ${v}` },
        { key: 'reviews', label: 'Reviews', format: v => v?.toLocaleString() },
        { key: 'stock', label: 'Stock', format: v => v > 0 ? `${v} units` : 'Out of stock' },
        { key: 'isOrganic', label: 'Organic', format: v => v ? '🌿 Yes' : '—' },
        { key: 'unit', label: 'Unit', format: v => v || '—' },
        { key: 'category', label: 'Category', format: v => v },
    ];

    if (items.length < 2) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center gap-4">
                <p className="text-6xl">⚖️</p>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Nothing to Compare</h1>
                <p className="text-gray-500">Add at least 2 products to compare them side-by-side</p>
                <Link to="/" className="px-6 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-colors">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black text-gray-900 dark:text-white">⚖️ Product Comparison</h1>
                <button onClick={clearCompare} className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors">
                    Clear All
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            <td className="p-3 w-32" />
                            {items.map(product => (
                                <td key={product.id} className="p-3 text-center">
                                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-24 h-24 rounded-xl object-cover mx-auto mb-3"
                                            onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop'; }}
                                        />
                                        <p className="text-sm font-bold text-gray-800 dark:text-white line-clamp-2">{product.title}</p>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="inline-block mt-2 text-xs text-green-600 hover:underline"
                                        >
                                            View product
                                        </Link>
                                    </div>
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                        {attrs.map(attr => {
                            const values = items.map(p => p[attr.key]);
                            // Highlight best numerics
                            const numericValues = values.map(v => parseFloat(v));
                            const bestIdx = attr.key === 'price'
                                ? numericValues.indexOf(Math.min(...numericValues.filter(v => !isNaN(v))))
                                : ['rating', 'reviews', 'discount', 'stock'].includes(attr.key)
                                    ? numericValues.indexOf(Math.max(...numericValues.filter(v => !isNaN(v))))
                                    : -1;

                            return (
                                <tr key={attr.key} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                    <td className="p-4 text-sm font-semibold text-gray-500 dark:text-gray-400">{attr.label}</td>
                                    {items.map((product, i) => (
                                        <td key={product.id} className={`p-4 text-center text-sm font-bold ${i === bestIdx ? 'text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/10' : 'text-gray-800 dark:text-gray-200'}`}>
                                            <div className="flex items-center justify-center gap-1">
                                                {i === bestIdx && <Check className="w-3 h-3" />}
                                                {attr.format(product[attr.key])}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparePage;
