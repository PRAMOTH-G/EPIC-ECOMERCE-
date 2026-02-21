import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { DEPARTMENTS, PRODUCTS } from '../lib/data';
import ProductCard from '../components/ProductCard';

const DEPT_GRADIENTS = {
    green: 'from-green-400 to-emerald-600',
    red: 'from-red-400 to-rose-600',
    orange: 'from-orange-400 to-amber-600',
    yellow: 'from-yellow-400 to-amber-500',
    rose: 'from-rose-400 to-pink-600',
    sky: 'from-sky-400 to-blue-600',
    purple: 'from-purple-400 to-violet-600',
    teal: 'from-teal-400 to-cyan-600',
    indigo: 'from-indigo-400 to-blue-700',
    cyan: 'from-cyan-400 to-teal-600',
    lime: 'from-lime-400 to-green-600',
    amber: 'from-amber-400 to-yellow-600',
    emerald: 'from-emerald-400 to-green-700',
    pink: 'from-pink-400 to-rose-500',
    violet: 'from-violet-400 to-purple-600',
};

const SORT_OPTIONS = [
    { label: 'Featured', value: 'featured' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Top Rated', value: 'rating' },
    { label: 'Discount', value: 'discount' },
];

const Department = () => {
    const { slug } = useParams();
    const dept = DEPARTMENTS.find(d => d.slug === slug);
    const [sort, setSort] = useState('featured');
    const [showOrganic, setShowOrganic] = useState(false);
    const [showInStock, setShowInStock] = useState(false);

    const products = useMemo(() => {
        let filtered = PRODUCTS.filter(p => p.category === dept?.name);
        if (showOrganic) filtered = filtered.filter(p => p.isOrganic);
        if (showInStock) filtered = filtered.filter(p => p.stock > 0);

        switch (sort) {
            case 'price_asc': return [...filtered].sort((a, b) => a.price - b.price);
            case 'price_desc': return [...filtered].sort((a, b) => b.price - a.price);
            case 'rating': return [...filtered].sort((a, b) => b.rating - a.rating);
            case 'discount': return [...filtered].sort((a, b) => b.discount - a.discount);
            default: return [...filtered].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        }
    }, [dept, sort, showOrganic, showInStock]);

    if (!dept) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center space-y-4">
                    <p className="text-6xl">🔍</p>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Department Not Found</h1>
                    <Link to="/" className="text-green-600 hover:underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    const grad = DEPT_GRADIENTS[dept.color] || 'from-gray-400 to-gray-600';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pb-20"
        >
            {/* Hero Banner */}
            <div className={`relative bg-gradient-to-br ${grad} text-white py-20 px-6 overflow-hidden`}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_50%,_white_0%,_transparent_60%)]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-5xl shadow-2xl">
                            {dept.icon}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold font-display">{dept.name}</h1>
                            <p className="text-white/80 text-lg mt-2 max-w-xl">{dept.description}</p>
                            <p className="text-white/60 text-sm mt-2">{products.length} products available</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Filter & Sort Bar */}
                <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <SlidersHorizontal className="w-5 h-5 text-gray-400" />

                    <div className="flex flex-wrap gap-3 flex-1">
                        <button
                            onClick={() => setShowInStock(!showInStock)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${showInStock ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-green-300'}`}
                        >
                            ✅ In Stock Only
                        </button>
                        <button
                            onClick={() => setShowOrganic(!showOrganic)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${showOrganic ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-emerald-300'}`}
                        >
                            🌿 Organic Only
                        </button>
                    </div>

                    <div className="relative">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                            className="appearance-none pl-4 pr-10 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                {/* Products Grid */}
                {products.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-24 text-gray-400">
                        <p className="text-6xl mb-4">{dept.icon}</p>
                        <p className="text-xl font-semibold text-gray-500 dark:text-gray-400">No products match your filters</p>
                        <button onClick={() => { setShowInStock(false); setShowOrganic(false); }} className="mt-4 text-green-600 hover:underline text-sm">
                            Clear filters
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Department;
