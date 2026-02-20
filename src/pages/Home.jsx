import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Leaf, Apple, ShoppingBag, Package, Milk } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { PRODUCTS, CATEGORIES } from '../lib/data';

const CATEGORY_ICONS = {
    "Fresh Fruits": Apple,
    "Vegetables": Leaf,
    "Dairy & Eggs": Milk,
    "Bakery": ShoppingBag,
    "Pantry": Package,
};

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts = selectedCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === selectedCategory);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24"
        >

            {/* Hero Section */}
            <section className="relative rounded-[2.5rem] overflow-hidden bg-primary-50 dark:bg-dark-bg text-gray-900 dark:text-white min-h-[600px] flex items-center shadow-2xl shadow-primary-500/10 mt-8">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-200/60 via-emerald-50 to-white dark:from-primary-900/20 dark:via-dark-bg dark:to-dark-bg"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/50 rounded-full blur-[100px]"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-green-100 dark:border-white/10 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-800 dark:text-green-100 tracking-wide">Farm-Fresh. Daily Delivered.</span>
                        </motion.div>

                        <h1 className="text-6xl lg:text-8xl font-bold font-display leading-tight tracking-tight text-gray-900 dark:text-white">
                            Fresh From <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-lime-500 animate-gradient-x">the Farm</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                            Shop the freshest fruits, vegetables, and groceries — sourced daily from local farms and delivered to your door in hours.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-3">
                            {['🌿 100% Organic', '🚚 Same-Day Delivery', '💯 Freshness Guarantee'].map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium border border-green-200 dark:border-green-800">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-6 pt-2">
                            <Link to="/">
                                <Button variant="primary" size="lg" className="shadow-neon hover:shadow-neon-hover px-8 text-lg font-bold text-white bg-green-600 hover:bg-green-700">
                                    Shop Now <ArrowRight className="w-5 h-5 ml-2 inline" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="border-green-300 dark:border-white/20 text-green-700 dark:text-white hover:bg-green-50 dark:hover:bg-white/10 px-8 text-lg">
                                View Offers
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative hidden lg:block h-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-full h-[500px] flex items-center justify-center">
                            {/* Main Hero Image */}
                            <motion.img
                                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900&auto=format&fit=crop&q=80"
                                alt="Fresh fruits and vegetables"
                                className="w-full h-[460px] object-cover rounded-3xl drop-shadow-2xl z-20 relative"
                                animate={{ y: [-10, 10] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", repeatType: "mirror" }}
                            />

                            {/* Floating Cards */}
                            <motion.div
                                className="absolute top-10 right-0 p-4 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/20 shadow-glass z-30"
                                animate={{ y: [15, -15], rotate: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                            >
                                <span className="text-green-600 dark:text-white font-bold text-2xl">-20%</span>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Weekend Sale</p>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-12 left-0 p-3 flex items-center gap-3 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/10 shadow-glass z-30"
                                animate={{ y: [-10, 10], x: [-5, 5] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-900 dark:text-white font-bold text-sm">Organic Certified</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">500+ Products</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why FreshMart — Trust Badges */}
            <section>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { emoji: '🌱', title: 'Farm Direct', desc: 'Sourced from certified organic farms' },
                        { emoji: '⚡', title: 'Same-Day Delivery', desc: 'Order by 2pm, delivered by evening' },
                        { emoji: '❄️', title: 'Cold-Chain Fresh', desc: 'Temperature-controlled throughout' },
                        { emoji: '♻️', title: 'Eco Packaging', desc: '100% biodegradable wrapping' },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center p-6 bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <span className="text-4xl mb-3">{item.emoji}</span>
                            <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{item.title}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Categories */}
            <section>
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Shop by Category</h2>
                        <div className="h-1 w-20 bg-green-500 mt-2 rounded-full"></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <motion.button
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory('All')}
                        className={`p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 transition-all duration-300 border ${selectedCategory === 'All' ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-600/30' : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800'}`}
                    >
                        <div className={`p-3 rounded-full ${selectedCategory === 'All' ? 'bg-white/20' : 'bg-green-50 dark:bg-green-900/30'}`}>
                            <TrendingUp className={`w-6 h-6 ${selectedCategory === 'All' ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
                        </div>
                        <span className="font-semibold text-sm tracking-wide">All Items</span>
                    </motion.button>
                    {CATEGORIES.map((cat, idx) => {
                        const Icon = CATEGORY_ICONS[cat.name] || Package;
                        const isActive = selectedCategory === cat.name;
                        return (
                            <motion.button
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedCategory(cat.name)}
                                className={`p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 transition-all duration-300 border ${isActive ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-600/30' : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800'}`}
                            >
                                <div className={`p-3 rounded-full ${isActive ? 'bg-white/20' : 'bg-green-50 dark:bg-green-900/30'}`}>
                                    <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-green-600 dark:text-green-400'}`} />
                                </div>
                                <span className="font-semibold text-sm tracking-wide text-center leading-tight">{cat.name}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="mb-12">
                    <h2 className="text-4xl font-bold font-display text-gray-900 dark:text-white">
                        {selectedCategory === 'All' ? 'Fresh Picks Today' : selectedCategory}
                    </h2>
                    <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full"></div>
                    {selectedCategory === 'All' && (
                        <p className="text-gray-500 dark:text-gray-400 mt-3 text-base">Handpicked for freshness — restocked every morning</p>
                    )}
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-5xl mb-4">🥦</p>
                        <p className="text-lg">No products found in this category.</p>
                    </div>
                )}
            </section>

            {/* Seasonal Banner */}
            <section className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-green-800 to-emerald-900 text-white py-24 px-8 relative shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-8">
                    <span className="text-4xl">🌿</span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold font-display tracking-tight"
                    >
                        Seasonal Specials
                    </motion.h2>
                    <p className="text-green-100 text-xl max-w-2xl">
                        Enjoy up to 30% off on handpicked seasonal produce fresh from our partner farms every week.
                    </p>
                    <Link to="/">
                        <Button variant="primary" size="lg" className="rounded-full px-10 py-4 text-lg bg-white text-green-800 hover:bg-green-100 shadow-xl hover:scale-105 font-bold">
                            Shop the Season
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="bg-white dark:bg-dark-card rounded-3xl p-12 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="max-w-2xl mx-auto text-center space-y-6">
                    <span className="text-3xl">📬</span>
                    <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Fresh Deals in Your Inbox</h2>
                    <p className="text-gray-500 dark:text-gray-400">Subscribe for weekly fresh deals, seasonal recipes, and exclusive discounts.</p>
                    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="flex-1 px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Button variant="primary" className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl whitespace-nowrap" onClick={(e) => e.preventDefault()}>
                            Subscribe
                        </Button>
                    </form>
                    <p className="text-xs text-gray-400">No spam. Unsubscribe anytime.</p>
                </div>
            </section>

        </motion.div>
    );
};

export default Home;
