import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import OfferBanner from '../components/OfferBanner';
import { ComboDealsSection } from '../components/ComboDeal';
import { PRODUCTS, DEPARTMENTS } from '../lib/data';
import { useCart } from '../context/CartContext';

const DEPT_GRADIENTS = {
    green: 'from-green-400 to-emerald-500',
    red: 'from-red-400 to-rose-500',
    orange: 'from-orange-400 to-amber-500',
    yellow: 'from-yellow-400 to-amber-400',
    rose: 'from-rose-400 to-pink-500',
    sky: 'from-sky-400 to-blue-500',
    purple: 'from-purple-400 to-violet-500',
    teal: 'from-teal-400 to-cyan-500',
    indigo: 'from-indigo-400 to-blue-600',
    cyan: 'from-cyan-400 to-teal-500',
    lime: 'from-lime-400 to-green-500',
    amber: 'from-amber-400 to-yellow-500',
    emerald: 'from-emerald-400 to-green-600',
    pink: 'from-pink-400 to-rose-400',
    violet: 'from-violet-400 to-purple-500',
};

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { recentlyViewed } = useCart();

    const featuredProducts = selectedCategory === 'All'
        ? PRODUCTS.filter(p => p.isFeatured)
        : PRODUCTS.filter(p => p.category === selectedCategory);

    const displayProducts = featuredProducts.length > 0 ? featuredProducts : PRODUCTS.filter(p => p.category === selectedCategory);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20"
        >

            {/* Hero Section */}
            <section className="relative rounded-[2.5rem] overflow-hidden bg-primary-50 dark:bg-dark-bg text-gray-900 dark:text-white min-h-[600px] flex items-center shadow-2xl shadow-primary-500/10 mt-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-green-200/60 via-emerald-50 to-white dark:from-primary-900/20 dark:via-dark-bg dark:to-dark-bg"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-300/30 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/50 rounded-full blur-[100px]"></div>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-green-100 dark:border-white/10 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-medium text-green-800 dark:text-green-100 tracking-wide">Your One-Stop Departmental Store</span>
                        </motion.div>

                        <h1 className="text-5xl lg:text-7xl font-bold font-display leading-tight tracking-tight text-gray-900 dark:text-white">
                            Everything You<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-lime-500 animate-gradient-x">Need, Delivered</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                            15 departments, 70+ products — from fresh farm produce to pet care, all delivered same-day to your door.
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {['🥦 Farm Fresh', '🚚 Same-Day', '🏪 15 Departments', '💯 Best Prices'].map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-medium border border-green-200 dark:border-green-800">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link to="/offers">
                                <Button variant="primary" size="lg" className="shadow-neon hover:shadow-neon-hover px-8 text-lg font-bold text-white bg-green-600 hover:bg-green-700">
                                    Shop Now <ArrowRight className="w-5 h-5 ml-2 inline" />
                                </Button>
                            </Link>
                            <Link to="/offers">
                                <Button variant="outline" size="lg" className="border-green-300 dark:border-white/20 text-green-700 dark:text-white hover:bg-green-50 dark:hover:bg-white/10 px-8 text-lg">
                                    🔥 View Offers
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative hidden lg:block h-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-full h-[500px] flex items-center justify-center">
                            <motion.img
                                src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=900&auto=format&fit=crop&q=80"
                                alt="Departmental store products"
                                className="w-full h-[460px] object-cover rounded-3xl drop-shadow-2xl z-20 relative"
                                animate={{ y: [-10, 10] }}
                                transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', repeatType: 'mirror' }}
                            />
                            <motion.div
                                className="absolute top-10 right-0 p-4 bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/20 shadow-glass z-30"
                                animate={{ y: [15, -15], rotate: [0, 4, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
                            >
                                <span className="text-green-600 dark:text-white font-bold text-2xl">15</span>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Departments</p>
                            </motion.div>
                            <motion.div
                                className="absolute bottom-12 left-0 p-3 flex items-center gap-3 bg-white/80 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/10 shadow-glass z-30"
                                animate={{ y: [-10, 10], x: [-5, 5] }}
                                transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 0.5 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-900 dark:text-white font-bold text-sm">70+ Products</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Across all depts</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Badges */}
            <section>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { emoji: '🏪', title: '15 Departments', desc: 'Everything under one roof' },
                        { emoji: '⚡', title: 'Same-Day Delivery', desc: 'Order by 2pm, delivered today' },
                        { emoji: '❄️', title: 'Cold-Chain Fresh', desc: 'Temperature-controlled throughout' },
                        { emoji: '💳', title: 'UPI / Card / COD', desc: 'Multiple payment options' },
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

            {/* Offers Banner */}
            <OfferBanner />

            {/* Departments Carousel */}
            <section>
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Shop by Department</h2>
                        <div className="h-1 w-20 bg-green-500 mt-2 rounded-full" />
                    </div>
                    <Link to="/" className="text-sm font-semibold text-green-600 dark:text-green-400 hover:underline flex items-center gap-1">
                        All Departments <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Category filter for product grid */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    <motion.button
                        whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedCategory('All')}
                        className={`flex-none px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-semibold transition-all border ${selectedCategory === 'All' ? 'bg-green-600 border-green-500 text-white shadow-lg' : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-green-200'}`}
                    >
                        <TrendingUp className="w-4 h-4" /> All Items
                    </motion.button>
                    {DEPARTMENTS.map(dept => {
                        const isActive = selectedCategory === dept.name;
                        const grad = DEPT_GRADIENTS[dept.color] || 'from-gray-400 to-gray-500';
                        return (
                            <motion.button
                                key={dept.id}
                                whileHover={{ y: -3 }} whileTap={{ scale: 0.96 }}
                                onClick={() => setSelectedCategory(dept.name)}
                                className={`flex-none flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all border ${isActive ? 'bg-green-600 border-green-500 text-white shadow-lg' : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 text-gray-600 dark:text-gray-400'}`}
                            >
                                <span className="text-base">{dept.icon}</span>
                                {dept.name}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Department cards grid (when All selected) */}
                {selectedCategory === 'All' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                        {DEPARTMENTS.map((dept, idx) => {
                            const grad = DEPT_GRADIENTS[dept.color] || 'from-gray-400 to-gray-500';
                            return (
                                <motion.div
                                    key={dept.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                >
                                    <Link
                                        to={`/department/${dept.slug}`}
                                        className="group flex flex-col items-center text-center p-5 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 hover:shadow-lg hover:border-green-200 transition-all duration-300"
                                    >
                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${grad} flex items-center justify-center text-3xl mb-3 shadow-md group-hover:scale-110 transition-transform`}>
                                            {dept.icon}
                                        </div>
                                        <span className="font-semibold text-xs text-gray-700 dark:text-gray-300 group-hover:text-green-600 leading-tight">{dept.name}</span>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Featured Products */}
            <section>
                <div className="mb-10">
                    <h2 className="text-4xl font-bold font-display text-gray-900 dark:text-white">
                        {selectedCategory === 'All' ? '⭐ Featured Picks' : selectedCategory}
                    </h2>
                    <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full" />
                    {selectedCategory === 'All' && (
                        <p className="text-gray-500 dark:text-gray-400 mt-3 text-base">Curated bestsellers from across all departments</p>
                    )}
                </div>

                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {displayProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-400">
                        <p className="text-5xl mb-4">🛒</p>
                        <p className="text-lg">No products found in this category.</p>
                    </div>
                )}

                {selectedCategory !== 'All' && (
                    <div className="mt-8 text-center">
                        <Link to={`/department/${DEPARTMENTS.find(d => d.name === selectedCategory)?.slug || ''}`}>
                            <Button variant="outline" className="px-8 rounded-xl flex items-center gap-2 mx-auto">
                                Browse All {selectedCategory} <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </div>
                )}
            </section>

            {/* Combo Deals */}
            <ComboDealsSection />

            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <Clock className="w-6 h-6 text-gray-400" />
                        <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Recently Viewed</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {recentlyViewed.slice(0, 5).map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            )}

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
                        Enjoy up to 30% off on handpicked seasonal produce and essentials every week.
                    </p>
                    <Link to="/offers">
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
                    <p className="text-gray-500 dark:text-gray-400">Subscribe for weekly deals, seasonal recipes, and exclusive discounts across all departments.</p>
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
