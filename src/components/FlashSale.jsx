import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, Tag, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../lib/data';

// Pick 6 discounted products for flash sale
const FLASH_PRODUCTS = PRODUCTS
    .filter(p => p.discount >= 15)
    .slice(0, 6);

// Fixed end time: 11:59 PM today
function getMidnight() {
    const d = new Date();
    d.setHours(23, 59, 59, 0);
    return d;
}

function useCountdown(targetDate) {
    const calc = () => {
        const diff = Math.max(0, targetDate - Date.now());
        return {
            h: Math.floor(diff / 3_600_000),
            m: Math.floor((diff % 3_600_000) / 60_000),
            s: Math.floor((diff % 60_000) / 1_000),
        };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
        const id = setInterval(() => setTime(calc()), 1000);
        return () => clearInterval(id);
    }, [targetDate]);
    return time;
}

const Digit = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
            <div className="absolute inset-0 bg-white/20 dark:bg-black/30 rounded-xl" />
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={value}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl font-black text-white"
                >
                    {String(value).padStart(2, '0')}
                </motion.div>
            </AnimatePresence>
        </div>
        <span className="text-[9px] uppercase tracking-widest text-white/70 mt-1 font-semibold">{label}</span>
    </div>
);

const FlashSale = ({ onAddToCart }) => {
    const { h, m, s } = useCountdown(getMidnight());
    if (FLASH_PRODUCTS.length === 0) return null;

    return (
        <section className="my-10 mx-4 sm:mx-6 lg:mx-8 rounded-3xl overflow-hidden shadow-2xl shadow-red-500/20">
            {/* Header strip */}
            <div className="bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-2xl font-black text-white">Flash Sale</h2>
                            <span className="px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900 text-[10px] font-black uppercase animate-pulse">Live</span>
                        </div>
                        <p className="text-white/80 text-sm">Exclusive deals, today only</p>
                    </div>
                </div>
                {/* Countdown */}
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-white/70" />
                    <span className="text-white/70 text-xs font-semibold mr-1">Ends in</span>
                    <div className="flex items-center gap-1.5">
                        <Digit value={h} label="hrs" />
                        <span className="text-white text-2xl font-black mb-4">:</span>
                        <Digit value={m} label="min" />
                        <span className="text-white text-2xl font-black mb-4">:</span>
                        <Digit value={s} label="sec" />
                    </div>
                </div>
            </div>

            {/* Products horizontal scroll */}
            <div className="bg-gradient-to-b from-red-50 to-white dark:from-red-950/30 dark:to-gray-900 p-4 sm:p-6">
                <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
                    {FLASH_PRODUCTS.map((product, i) => {
                        const salePrice = Math.round(product.price * (1 - product.discount / 100));
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -10, rotateX: -5, rotateY: 6, scale: 1.04 }}
                                style={{ transformStyle: 'preserve-3d', perspective: 700 }}
                                className="flex-shrink-0 snap-start w-36 sm:w-44 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-red-100 dark:border-red-900/30 shadow-md hover:shadow-2xl hover:shadow-red-500/20 transition-shadow duration-300 group cursor-pointer"
                            >
                                {/* Image */}
                                <Link to={`/product/${product.id}`} className="block relative overflow-hidden h-28 sm:h-36">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop'; }}
                                    />
                                    {/* Discount badge */}
                                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-black rounded-full">
                                        -{product.discount}%
                                    </div>
                                    {/* Urgency */}
                                    {product.stock <= 20 && (
                                        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                            <span className="px-2 py-0.5 bg-black/70 text-white text-[9px] font-bold rounded-full">
                                                Only {product.stock} left!
                                            </span>
                                        </div>
                                    )}
                                </Link>
                                {/* Info */}
                                <div className="p-2.5">
                                    <p className="text-xs font-semibold text-gray-800 dark:text-white line-clamp-2 leading-tight">{product.title}</p>
                                    <div className="flex items-center gap-1.5 mt-1.5">
                                        <span className="text-sm font-black text-red-600">₹{salePrice}</span>
                                        <span className="text-[10px] text-gray-400 line-through">₹{product.price}</span>
                                    </div>
                                    <button
                                        onClick={() => onAddToCart && onAddToCart(product)}
                                        className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold transition-colors active:scale-95"
                                    >
                                        <ShoppingBag className="w-3 h-3" /> Add
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <div className="flex justify-end mt-3">
                    <Link to="/offers" className="text-sm font-semibold text-red-600 hover:text-red-700 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" /> View All Flash Deals →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FlashSale;
