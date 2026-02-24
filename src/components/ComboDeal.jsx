import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Tag } from 'lucide-react';
import { COMBO_DEALS, PRODUCTS } from '../lib/data';

const ComboDeal = ({ deal }) => {
    const products = deal.products.map(pid => PRODUCTS.find(p => p.id === pid)).filter(Boolean);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl hover:shadow-primary-500/10 transition-all overflow-hidden"
        >
            {/* Badge */}
            <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                {deal.badge}
            </div>

            {/* Product Images Strip */}
            <div className="flex h-36 overflow-hidden rounded-t-3xl">
                {products.map((p, i) => (
                    <img
                        key={p.id}
                        src={p.image}
                        alt={p.title}
                        className="flex-1 object-cover"
                        style={{ filter: i > 0 ? 'brightness(0.85)' : 'none' }}
                    />
                ))}
            </div>

            <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base leading-snug">{deal.title}</h3>
                </div>

                <div className="flex items-baseline gap-3">
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        ₹{deal.comboPrice.toFixed(0)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">₹{deal.originalPrice.toFixed(0)}</span>
                    <span className="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-bold px-2 py-0.5 rounded-full">
                        Save ₹{deal.savings.toFixed(0)}
                    </span>
                </div>

                <div className="flex flex-wrap gap-1">
                    {products.map(p => (
                        <span key={p.id} className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                            {p.title.split('(')[0].trim()}
                        </span>
                    ))}
                </div>

                <Link to="/offers">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="w-full mt-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-sm font-bold shadow-md shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <Package className="w-4 h-4" />
                        Add Bundle to Cart
                    </motion.button>
                </Link>
            </div>
        </motion.div>
    );
};

export const ComboDealsSection = () => (
    <section>
        <div className="flex justify-between items-end mb-6">
            <div>
                <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">🎁 Combo Deals</h2>
                <div className="h-1 w-16 bg-purple-500 mt-2 rounded-full" />
                <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Bundle products and save more</p>
            </div>
            <Link to="/offers" className="flex items-center gap-1 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:underline">
                View All <ArrowRight className="w-4 h-4" />
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMBO_DEALS.map(deal => (
                <ComboDeal key={deal.id} deal={deal} />
            ))}
        </div>
    </section>
);

export default ComboDeal;
