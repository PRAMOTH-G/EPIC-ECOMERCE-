import React from 'react';
import { motion } from 'framer-motion';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { OFFERS, COMBO_DEALS, PRODUCTS } from '../lib/data';
import { ComboDealsSection } from '../components/ComboDeal';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const OFFER_GRADIENTS = {
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-rose-600',
    orange: 'from-orange-500 to-amber-600',
    sky: 'from-sky-500 to-blue-600',
    teal: 'from-teal-500 to-cyan-600',
    purple: 'from-purple-500 to-violet-600',
};

const Offers = () => {
    const { addToCart } = useCart();

    // Products with discount
    const discountedProducts = PRODUCTS.filter(p => p.discount > 0).sort((a, b) => b.discount - a.discount);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pb-20"
        >
            {/* Hero */}
            <div className="relative bg-gradient-to-br from-rose-500 via-pink-600 to-purple-700 text-white py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(255,255,255,0.15),transparent_60%)]" />
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', bounce: 0.4 }}
                        className="text-6xl mb-4"
                    >
                        🔥
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-bold font-display mb-4">Today's Best Offers</h1>
                    <p className="text-white/80 text-xl max-w-2xl mx-auto">
                        Handpicked deals, flash sales, and exclusive bundles — updated daily just for you.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
                {/* Offer Cards */}
                <section>
                    <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">🎟️ Active Coupons</h2>
                    <div className="h-1 w-16 bg-rose-500 rounded-full mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {OFFERS.map((offer, idx) => {
                            const grad = OFFER_GRADIENTS[offer.color] || 'from-gray-500 to-gray-600';
                            return (
                                <motion.div
                                    key={offer.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.08 }}
                                    className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${grad} text-white shadow-xl p-6 flex flex-col gap-4`}
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-15"
                                        style={{ backgroundImage: `url(${offer.image})` }}
                                    />
                                    <div className="relative z-10 space-y-3">
                                        <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                                            <Tag className="w-3 h-3" /> {offer.discount}
                                        </span>
                                        <h3 className="text-xl font-bold">{offer.title}</h3>
                                        <p className="text-white/80 text-sm">{offer.desc}</p>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 font-mono font-bold tracking-widest text-sm">
                                                {offer.code}
                                            </div>
                                            <span className="text-xs text-white/60">Valid till {offer.validTill}</span>
                                        </div>
                                        <button
                                            onClick={() => navigator.clipboard?.writeText(offer.code)}
                                            className="w-full mt-2 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-sm font-semibold backdrop-blur-sm transition-all"
                                        >
                                            Copy Code
                                        </button>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* Combo Deals */}
                <ComboDealsSection />

                {/* Discounted Products */}
                <section>
                    <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">🏷️ On Sale Now</h2>
                    <div className="h-1 w-16 bg-amber-500 rounded-full mb-8" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {discountedProducts.map((product, idx) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg p-4 hover:shadow-2xl transition-all"
                            >
                                <div className="relative mb-4">
                                    <div className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                                        -{product.discount}%
                                    </div>
                                    <Link to={`/product/${product.id}`}>
                                        <img src={product.image} alt={product.title} className="w-full h-36 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500" />
                                    </Link>
                                </div>
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm hover:text-green-600">{product.title}</h3>
                                </Link>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</span>
                                    <span className="text-xs text-gray-400 line-through">${(product.price * (1 + product.discount / 100)).toFixed(2)}</span>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full mt-3 rounded-xl py-2 text-sm"
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default Offers;
