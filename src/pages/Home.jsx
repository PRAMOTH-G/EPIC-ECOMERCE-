import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { PRODUCTS, CATEGORIES } from '../lib/data';

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
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-200/50 via-white to-white dark:from-primary-900/20 dark:via-dark-bg dark:to-dark-bg"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-300/30 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary-200/50 rounded-full blur-[100px]"></div>

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
                            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 dark:bg-white/5 backdrop-blur-md border border-primary-100 dark:border-white/10 shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                            <span className="text-sm font-medium text-primary-800 dark:text-primary-100 tracking-wide">Summer Collection 2025</span>
                        </motion.div>

                        <h1 className="text-6xl lg:text-8xl font-bold font-display leading-tight tracking-tight text-gray-900 dark:text-white">
                            The Future is <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-yellow-500 to-primary-600 animate-gradient-x">Bright</span>
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                            Discover our vibrant new collection. Fresh styles, bold colors, and premium quality for your everyday life.
                        </p>

                        <div className="flex flex-wrap gap-6 pt-6">
                            <Link to="/products">
                                <Button variant="primary" size="lg" className="shadow-neon hover:shadow-neon-hover px-8 text-lg font-bold text-white">
                                    Shop Now
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 px-8 text-lg">
                                View Trending
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="relative hidden lg:block h-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-full h-[500px] flex items-center justify-center perspective-1000">
                            {/* Main Floating Product */}
                            <motion.img
                                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
                                alt="Yellow Sneakers"
                                className="w-96 h-auto drop-shadow-2xl z-20 relative -rotate-12"
                                animate={{
                                    y: [-20, 20],
                                    rotateZ: [-12, -8, -12],
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 6,
                                    ease: "easeInOut",
                                    repeatType: "mirror"
                                }}
                            />

                            {/* Floating Cards */}
                            <motion.div
                                className="absolute top-20 right-10 p-4 bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-white/20 shadow-glass z-10"
                                animate={{ y: [15, -15], rotate: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
                            >
                                <span className="text-primary-600 dark:text-white font-bold text-2xl">-30%</span>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Summer Sale</p>
                            </motion.div>

                            <motion.div
                                className="absolute bottom-20 left-10 p-3 flex items-center gap-3 bg-white/60 dark:bg-dark-card/80 backdrop-blur-md rounded-2xl border border-white/40 dark:border-white/10 shadow-glass z-30"
                                animate={{ y: [-10, 10], x: [-5, 5] }}
                                transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 0.5 }}
                            >
                                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-green-500/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-primary-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <p className="text-gray-900 dark:text-white font-bold text-sm">Best Seller</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Top Rated</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Categories */}
            <section>
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Categories</h2>
                        <div className="h-1 w-20 bg-primary-500 mt-2 rounded-full"></div>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    <motion.button
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory('All')}
                        className={`p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 transition-all duration-300 border ${selectedCategory === 'All' ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-600/30' : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'}`}
                    >
                        <div className={`p-3 rounded-full ${selectedCategory === 'All' ? 'bg-white/20' : 'bg-primary-50 dark:bg-primary-900/30'}`}>
                            <TrendingUp className={`w-6 h-6 ${selectedCategory === 'All' ? 'text-white' : 'text-primary-600 dark:text-primary-400'}`} />
                        </div>
                        <span className="font-semibold text-sm tracking-wide">All Items</span>
                    </motion.button>
                    {CATEGORIES.map((cat, idx) => (
                        <motion.button
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`p-6 rounded-2xl flex flex-col items-center justify-center space-y-4 transition-all duration-300 border ${selectedCategory === cat.name ? 'bg-primary-600 border-primary-500 text-white shadow-lg shadow-primary-600/30' : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800'}`}
                        >
                            <span className="font-semibold text-sm tracking-wide">{cat.name}</span>
                        </motion.button>
                    ))}
                </div>
            </section>

            {/* Featured Products */}
            <section>
                <div className="mb-12">
                    <h2 className="text-4xl font-bold font-display text-gray-900 dark:text-white">Trending Now</h2>
                    <div className="h-1 w-20 bg-secondary-500 mt-2 rounded-full"></div>
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
            </section>

            {/* Banner */}
            <section className="rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white py-24 px-8 relative shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl mx-auto space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold font-display tracking-tight"
                    >
                        Upgrade Your Setup
                    </motion.h2>
                    <p className="text-gray-300 text-xl max-w-2xl">
                        Explore our premium collection of tech gadgets designed for professionals and enthusiasts.
                    </p>
                    <Button variant="primary" size="lg" className="rounded-full px-10 py-4 text-lg shadow-neon hover:scale-105">
                        Explore Collection
                    </Button>
                </div>
            </section>
        </motion.div>
    );
};

export default Home;
