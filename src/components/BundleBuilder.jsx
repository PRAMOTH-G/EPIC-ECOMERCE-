import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Plus, Minus, Tag, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import { useCart } from '../context/CartContext';
import { showToast } from './NotificationToast';

// Bundle categories
const STEPS = [
    {
        key: 'grain',
        label: 'Pick a Grain/Dal',
        emoji: '🌾',
        categories: ['Flour Varieties', 'Organic & Healthy Products'],
        tags: ['atta', 'rice', 'dal', 'wheat', 'flour', 'lentil', 'oats', 'quinoa', 'poha'],
    },
    {
        key: 'vegetable',
        label: 'Pick a Vegetable',
        emoji: '🥦',
        categories: ['Fruits & Vegetables'],
        tags: ['vegetable', 'sabzi', 'greens', 'onion', 'tomato', 'potato', 'carrot'],
    },
    {
        key: 'spice',
        label: 'Pick a Spice/Masala',
        emoji: '🌶️',
        categories: ['Spices', 'Masala Products'],
        tags: ['spice', 'masala', 'turmeric', 'cumin', 'coriander', 'haldi', 'jeera'],
    },
];

function getStepProducts({ categories, tags }) {
    return PRODUCTS.filter(p =>
        categories.includes(p.category) ||
        tags.some(t => p.title.toLowerCase().includes(t))
    ).slice(0, 6);
}

const BUNDLE_DISCOUNT = 15; // %

const BundleBuilder = () => {
    const { addToCart, addLoyaltyPoints } = useCart();
    const [selections, setSelections] = useState({ grain: null, vegetable: null, spice: null });
    const [openStep, setOpenStep] = useState(0);

    const stepProducts = useMemo(() => STEPS.map(getStepProducts), []);

    const allSelected = STEPS.every(s => selections[s.key]);
    const bundleItems = allSelected ? STEPS.map(s => selections[s.key]) : [];
    const totalOriginal = bundleItems.reduce((acc, p) => acc + p.price, 0);
    const discountAmount = Math.round(totalOriginal * BUNDLE_DISCOUNT / 100);
    const bundlePrice = totalOriginal - discountAmount;

    const handleAddBundle = () => {
        bundleItems.forEach(product => {
            addToCart(product, 1);
            if (addLoyaltyPoints) addLoyaltyPoints(Math.floor(product.price / 10));
        });
        showToast({ type: 'success', title: '🍛 Thali Added!', message: `3 items — Save ₹${discountAmount}!` });
        setSelections({ grain: null, vegetable: null, spice: null });
        setOpenStep(0);
    };

    return (
        <section className="my-10 mx-4 sm:mx-6 lg:mx-8">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/20 border border-orange-100 dark:border-orange-900/30 shadow-lg">
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-2xl">🍛</div>
                        <div>
                            <h2 className="text-xl font-black text-white">Build Your Thali</h2>
                            <p className="text-white/80 text-sm">Pick 3 items — save {BUNDLE_DISCOUNT}% automatically</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold">
                        <Tag className="w-4 h-4" /> {BUNDLE_DISCOUNT}% OFF
                    </div>
                </div>

                <div className="p-5 space-y-3">
                    {STEPS.map((step, idx) => {
                        const isOpen = openStep === idx;
                        const selected = selections[step.key];
                        const products = stepProducts[idx];

                        return (
                            <div key={step.key} className="rounded-2xl overflow-hidden border border-orange-100 dark:border-orange-900/30 bg-white dark:bg-gray-900">
                                {/* Step header */}
                                <button
                                    onClick={() => setOpenStep(isOpen ? -1 : idx)}
                                    className="w-full flex items-center justify-between px-4 py-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{step.emoji}</span>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-800 dark:text-white">Step {idx + 1}: {step.label}</p>
                                            {selected && (
                                                <p className="text-xs text-green-600 font-semibold">{selected.title} — ₹{selected.price}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selected && <span className="w-2.5 h-2.5 rounded-full bg-green-500" />}
                                        {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                    </div>
                                </button>

                                {/* Product options */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 pb-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                                {products.map(product => {
                                                    const isSelected = selections[step.key]?.id === product.id;
                                                    return (
                                                        <motion.button
                                                            key={product.id}
                                                            whileTap={{ scale: 0.96 }}
                                                            onClick={() => {
                                                                setSelections(s => ({ ...s, [step.key]: product }));
                                                                setOpenStep(idx + 1);
                                                            }}
                                                            className={`relative flex items-center gap-2 p-2.5 rounded-xl border-2 transition-all text-left ${isSelected
                                                                ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20'
                                                                : 'border-gray-100 dark:border-gray-800 hover:border-orange-200'}`}
                                                        >
                                                            <img
                                                                src={product.image}
                                                                alt={product.title}
                                                                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                                                onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&auto=format&fit=crop'; }}
                                                            />
                                                            <div className="min-w-0">
                                                                <p className="text-xs font-semibold text-gray-800 dark:text-white line-clamp-1">{product.title}</p>
                                                                <p className="text-xs text-orange-600 font-bold">₹{product.price}</p>
                                                            </div>
                                                            {isSelected && (
                                                                <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                                                                    <span className="text-white text-[8px] font-bold">✓</span>
                                                                </div>
                                                            )}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}

                    {/* Bundle summary */}
                    <AnimatePresence>
                        {allSelected && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <p className="text-sm font-semibold text-white/80">Bundle Total</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-black">₹{bundlePrice}</span>
                                            <span className="text-sm line-through text-white/60">₹{totalOriginal}</span>
                                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">Save ₹{discountAmount}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-white/80 text-xs">
                                        <Zap className="w-3.5 h-3.5" />
                                        Earn {Math.floor(bundlePrice / 10)} coins
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddBundle}
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-white text-orange-600 font-black rounded-xl hover:bg-orange-50 transition-colors active:scale-98"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Add Bundle to Cart
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default BundleBuilder;
