import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    ArrowRight, Sparkles, TrendingUp, Clock, ShoppingBag,
    ChevronRight, Zap, Star, Gift, Truck, Shield, RotateCcw, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import OfferBanner from '../components/OfferBanner';
import { ComboDealsSection } from '../components/ComboDeal';
import FlashSale from '../components/FlashSale';
import BundleBuilder from '../components/BundleBuilder';
import SmartReorder from '../components/SmartReorder';
import AIRecommendations from '../components/AIRecommendations';
import { showToast } from '../components/NotificationToast';
import { PRODUCTS, DEPARTMENTS } from '../lib/data';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// ── Stagger container variants ──────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

// ── Dept gradient map ────────────────────────────────
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

// ── Animated Counter ─────────────────────────────────
const AnimCounter = ({ target, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let raf;
        const duration = 1400;
        const start = performance.now();
        const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(ease * target));
            if (progress < 1) raf = requestAnimationFrame(animate);
        };
        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [started, target]);

    return <span ref={ref}>{count}{suffix}</span>;
};

// ── Floating badge ───────────────────────────────────
const FloatingBadge = ({ className, children, delay = 0 }) => (
    <motion.div
        className={`absolute z-20 bg-white/90 dark:bg-dark-card/90 backdrop-blur-xl rounded-2xl shadow-xl border border-white/60 dark:border-white/10 px-4 py-3 ${className}`}
        animate={{ y: [0, -12, 0], rotate: [0, 1.5, 0] }}
        transition={{ repeat: Infinity, duration: 5 + delay, ease: 'easeInOut', delay }}
    >
        {children}
    </motion.div>
);

// ── Section heading ──────────────────────────────────
const SectionHeading = ({ title, subtitle, link, linkLabel = 'View All' }) => (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-3 mb-8">
        <div>
            <h2 className="text-3xl md:text-4xl font-black font-display text-gray-900 dark:text-white tracking-tight">
                {title}
            </h2>
            <div className="flex items-center gap-3 mt-2">
                <div className="h-1 w-12 bg-green-500 rounded-full" />
                <div className="h-1 w-4 bg-green-300 rounded-full" />
                <div className="h-1 w-2 bg-green-200 rounded-full" />
            </div>
            {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{subtitle}</p>}
        </div>
        {link && (
            <Link
                to={link}
                className="group inline-flex items-center gap-1.5 text-sm font-bold text-green-600 dark:text-green-400 hover:text-green-700 transition-colors whitespace-nowrap"
            >
                {linkLabel}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        )}
    </div>
);

// ════════════════════════════════════════════════════
const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { recentlyViewed, addToCart } = useCart();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    const featuredProducts = selectedCategory === 'All'
        ? PRODUCTS.filter(p => p.isFeatured)
        : PRODUCTS.filter(p => p.category === selectedCategory);
    const displayProducts = featuredProducts.length > 0 ? featuredProducts : PRODUCTS.filter(p => p.category === selectedCategory);

    // Top picks for secondary section
    const newArrivals = PRODUCTS.filter(p => p.id > 60).slice(0, 4);
    const bestSellers = PRODUCTS.filter(p => p.reviews > 300).slice(0, 4);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            {/* ── HERO ── */}
            <section
                ref={heroRef}
                className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg min-h-[680px] flex items-center"
            >
                {/* Parallax BG blobs */}
                <motion.div style={{ y: heroY }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-green-300/20 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute bottom-[-80px] left-[-80px] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-100/40 rounded-full blur-[150px]" />
                </motion.div>

                {/* Morphing decorative shape */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-300/20 animate-morph hidden lg:block" />

                <motion.div style={{ opacity: heroOpacity }} className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                        {/* Left text */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                            className="space-y-8"
                        >
                            <motion.div variants={itemVariants}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 shadow-sm"
                            >
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-xs font-bold text-green-800 dark:text-green-300 tracking-widest uppercase">
                                    India's #1 Departmental Store
                                </span>
                            </motion.div>

                            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-black font-display leading-[1.05] tracking-tight text-gray-900 dark:text-white">
                                Everything
                                <br />
                                <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-400 to-lime-500 animate-gradient-x">
                                        You Need
                                    </span>
                                    {/* Underline squiggle */}
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                                        <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
                                    </svg>
                                </span>
                                <br />
                                Delivered
                            </motion.h1>

                            <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
                                15 departments, 225+ products — farm fresh produce to pet care, all delivered <strong className="text-green-600">same-day</strong> to your door.
                            </motion.p>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
                                {['🥦 Farm Fresh', '🚚 Same-Day', '🏪 15 Depts', '💯 Best Price', '❄️ Cold-Chain'].map(tag => (
                                    <span key={tag} className="px-3 py-1.5 rounded-full bg-white dark:bg-dark-card text-green-800 dark:text-green-300 text-xs font-semibold border border-green-100 dark:border-green-800 shadow-sm hover:shadow-md hover:border-green-300 transition-all cursor-default">
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>

                            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                                <Link to="/offers">
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-xl shadow-green-500/30 transition-all btn-liquid neon-green text-base"
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        Shop Now
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                                <Link to="/department/fruits-vegetables">
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="flex items-center gap-2 px-8 py-4 bg-white dark:bg-dark-card text-green-700 dark:text-green-400 font-bold rounded-2xl shadow-md border border-green-200 dark:border-green-800 hover:border-green-400 transition-all text-base"
                                    >
                                        🥬 Fresh Picks
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Right image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, x: 60 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                            className="relative flex items-center justify-center h-[300px] lg:h-[520px] mt-8 lg:mt-0"
                        >
                            {/* Main image with 3D perspective container */}
                            <motion.div
                                initial={{ opacity: 0, rotateY: -15 }}
                                animate={{ opacity: 1, rotateY: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                                style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                                className="relative"
                            >
                                <motion.div
                                    animate={{ y: [-8, 8], rotateY: [-2, 2] }}
                                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', repeatType: 'mirror' }}
                                    className="relative w-[260px] h-[260px] lg:w-[420px] lg:h-[420px] rounded-[3rem] overflow-hidden z-10"
                                    style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1), 20px 20px 0 -4px rgba(22,163,74,0.15), -20px -20px 0 -4px rgba(16,185,129,0.1)' }}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&auto=format&fit=crop&q=80"
                                        alt="Fresh grocery basket"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    {/* Inner frame glow */}
                                    <div className="absolute inset-0 rounded-[3rem]" style={{ boxShadow: 'inset 0 0 40px rgba(255,255,255,0.05)' }} />
                                </motion.div>
                            </motion.div>

                            {/* Floating badges — hidden on mobile to avoid clutter */}
                            <FloatingBadge className="top-6 -left-6 hidden sm:flex" delay={0}>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🌿</span>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white">100% Organic</p>
                                        <p className="text-[10px] text-gray-500">Certified fresh</p>
                                    </div>
                                </div>
                            </FloatingBadge>

                            <FloatingBadge className="bottom-16 -left-8 hidden sm:flex" delay={1.5}>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                                        <Truck className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-900 dark:text-white">Same Day</p>
                                        <p className="text-[10px] text-green-600 font-semibold">Free delivery</p>
                                    </div>
                                </div>
                            </FloatingBadge>

                            <FloatingBadge className="top-10 -right-6 hidden sm:block" delay={0.8}>
                                <div className="text-center">
                                    <p className="text-2xl font-black text-green-600">
                                        <AnimCounter target={225} suffix="+" />
                                    </p>
                                    <p className="text-[10px] text-gray-500 font-medium">Products</p>
                                </div>
                            </FloatingBadge>

                            <FloatingBadge className="bottom-6 -right-4" delay={2}>
                                <div className="flex items-center gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    ))}
                                    <span className="text-xs font-bold text-gray-700 dark:text-white ml-1">4.9</span>
                                </div>
                            </FloatingBadge>

                            {/* Spinning ring */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-[460px] h-[460px] border-2 border-dashed border-green-200/40 rounded-full animate-spin-slow" />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400"
                >
                    <div className="w-px h-10 bg-gradient-to-b from-transparent to-green-400" />
                    <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
                </motion.div>
            </section>

            {/* ── TRUST BADGES ── */}
            <section className="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3"
                    >
                        {[
                            { icon: <Truck className="w-5 h-5 text-green-600" />, title: 'Same-Day Delivery', desc: 'Order by 2 PM' },
                            { icon: <Shield className="w-5 h-5 text-green-600" />, title: '100% Fresh Guarantee', desc: 'Or full refund' },
                            { icon: <RotateCcw className="w-5 h-5 text-green-600" />, title: 'Easy Returns', desc: '48-hr hassle-free' },
                            { icon: <Zap className="w-5 h-5 text-green-600" />, title: 'Multiple Payments', desc: 'UPI, Card, COD' },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                whileHover={{ y: -6, rotateX: -4, rotateY: 4, scale: 1.04 }}
                                style={{ transformStyle: 'preserve-3d', perspective: 600 }}
                                className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 hover:bg-white dark:hover:bg-dark-card hover:shadow-lg hover:shadow-green-500/10 transition-all cursor-default"
                            >
                                <div className="w-9 h-9 rounded-xl bg-white dark:bg-dark-bg flex items-center justify-center shadow-sm flex-shrink-0"
                                    style={{ boxShadow: '0 3px 0 rgba(22,163,74,0.2), 0 4px 12px rgba(22,163,74,0.15)' }}
                                >
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 py-16 pb-20">

                {/* ── OFFER BANNER ── */}
                <OfferBanner />

                {/* ── SHOP BY DEPARTMENT ── */}
                <section>
                    <SectionHeading
                        title="Shop by Department"
                        subtitle="Explore our 15 carefully curated categories"
                        link="/"
                        linkLabel="All Departments"
                    />

                    {/* Category filter pills */}
                    <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-hide mb-6">
                        <motion.button
                            whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory('All')}
                            className={`flex-none px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm font-bold transition-all border ${selectedCategory === 'All'
                                ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-500/30'
                                : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 text-gray-500 hover:border-green-200'
                                }`}
                        >
                            <TrendingUp className="w-4 h-4" /> All Items
                        </motion.button>
                        {DEPARTMENTS.map(dept => {
                            const isActive = selectedCategory === dept.name;
                            return (
                                <motion.button
                                    key={dept.id}
                                    whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(dept.name)}
                                    className={`flex-none flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border ${isActive
                                        ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-500/30'
                                        : 'bg-white dark:bg-dark-card border-gray-100 dark:border-gray-800 text-gray-500 hover:border-green-200 dark:hover:border-green-800'
                                        }`}
                                >
                                    {dept.image
                                        ? <img src={dept.image} alt={dept.name} className="w-5 h-5 rounded-full object-cover" />
                                        : <span>{dept.icon}</span>
                                    }
                                    <span className="whitespace-nowrap">{dept.name}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Department cards grid */}
                    {selectedCategory === 'All' && (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3"
                        >
                            {DEPARTMENTS.map((dept) => {
                                const grad = DEPT_GRADIENTS[dept.color] || 'from-gray-400 to-gray-500';
                                return (
                                    <motion.div key={dept.id} variants={itemVariants}
                                        whileHover={{ y: -6, rotateX: -4, rotateY: 4, scale: 1.05 }}
                                        style={{ transformStyle: 'preserve-3d', perspective: 600 }}
                                    >
                                        <Link
                                            to={`/department/${dept.slug}`}
                                            className="group flex flex-col items-center text-center rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-md hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 bg-white dark:bg-dark-card"
                                        >
                                            {/* Photo banner */}
                                            <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                                                {dept.image
                                                    ? <img src={dept.image} alt={dept.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    : <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center text-3xl`}>{dept.icon}</div>
                                                }
                                                {/* gradient overlay */}
                                                <div className={`absolute inset-0 bg-gradient-to-t ${dept.image ? 'from-black/60 via-black/10 to-transparent' : 'from-black/40 to-transparent'}`} />
                                                {/* colour pip */}
                                                <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-gradient-to-br ${grad} shadow-md`} />
                                            </div>
                                            {/* Label */}
                                            <span className="px-1.5 py-2 text-[10px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-600 leading-tight block">
                                                {dept.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </section>

                {/* ── FLASH SALE ── */}
                <FlashSale onAddToCart={(product) => {
                    addToCart(product, 1);
                    showToast({ type: 'cart', title: 'Added to Cart! 🛒', message: product.title });
                }} />

                {/* ── BUNDLE BUILDER (Build Your Thali) ── */}
                <BundleBuilder />

                {/* ── FEATURED / CATEGORY PRODUCTS ── */}
                <section>
                    <SectionHeading
                        title={selectedCategory === 'All' ? '⭐ Featured Picks' : selectedCategory}
                        subtitle={selectedCategory === 'All' ? 'Curated bestsellers from across all departments' : undefined}
                        link={selectedCategory !== 'All' ? `/department/${DEPARTMENTS.find(d => d.name === selectedCategory)?.slug || ''}` : '/offers'}
                        linkLabel={selectedCategory !== 'All' ? `Browse All ${selectedCategory}` : 'View All'}
                    />
                    <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
                        <AnimatePresence mode="popLayout">
                            {displayProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    {displayProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-5xl mb-4">🛒</p>
                            <p className="text-lg text-gray-400">No products found in this category.</p>
                        </div>
                    )}
                </section>

                {/* ── STATS STRIP ── */}
                <section className="rounded-3xl bg-gradient-to-br from-green-600 to-emerald-700 text-white p-10 relative overflow-hidden"
                    style={{ boxShadow: '0 30px 60px -15px rgba(22,163,74,0.5), 0 0 0 1px rgba(255,255,255,0.08)' }}
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15),transparent)]" />
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-black/10 rounded-full" />
                    {/* 3D grid lines */}
                    <div className="absolute inset-0 opacity-5"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
                    >
                        {[
                            { value: 225, suffix: '+', label: 'Products', icon: '📦' },
                            { value: 15, suffix: '', label: 'Departments', icon: '🏪' },
                            { value: 50000, suffix: '+', label: 'Happy Customers', icon: '😊' },
                            { value: 99, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
                        ].map((stat, idx) => (
                            <motion.div key={idx} variants={itemVariants}
                                whileHover={{ y: -8, scale: 1.06 }}
                                className="relative rounded-2xl p-6 cursor-default"
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                                    transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease'
                                }}
                            >
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <p className="text-4xl md:text-5xl font-black tracking-tight">
                                    <AnimCounter target={stat.value} suffix={stat.suffix} />
                                </p>
                                <p className="text-green-100 text-sm font-medium mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* ── COMBO DEALS ── */}
                <ComboDealsSection />

                {/* ── BEST SELLERS ── */}
                <section>
                    <SectionHeading
                        title="🔥 Best Sellers"
                        subtitle="Most loved products by our customers"
                        link="/offers"
                        linkLabel="See All Deals"
                    />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
                        {bestSellers.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                {/* ── RECENTLY VIEWED ── */}
                {recentlyViewed.length > 0 && (
                    <section>
                        <SectionHeading
                            title="Recently Viewed"
                            link="/cart"
                            linkLabel="Go to Cart"
                        />
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-400">Your browsing history</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
                            {recentlyViewed.slice(0, 5).map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                )}

                {/* ── SEASONAL BANNER ── */}
                <section className="relative rounded-[2.5rem] overflow-hidden min-h-[380px] flex items-center">
                    <img
                        src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1600&auto=format&fit=crop&q=80"
                        alt="Fresh seasonal produce"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 via-green-800/75 to-transparent" />

                    <div className="relative z-10 p-10 lg:p-16 max-w-xl">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/30">
                                <Flame className="w-4 h-4 text-orange-300" /> Seasonal Specials
                            </span>
                            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                                Up to 30% Off<br />
                                <span className="text-green-300">Fresh Produce</span>
                            </h2>
                            <p className="text-green-100 text-lg">
                                Handpicked seasonal fruits & vegetables. Freshest quality, biggest savings.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link to="/offers">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-8 py-3.5 bg-white text-green-800 font-black rounded-2xl shadow-xl hover:bg-green-50 transition-all"
                                    >
                                        <Gift className="w-5 h-5" /> Shop the Season
                                    </motion.button>
                                </Link>
                                <Link to="/department/fruits-vegetables">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center gap-2 px-6 py-3.5 bg-transparent text-white font-bold rounded-2xl border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all"
                                    >
                                        View Produce <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── AI RECOMMENDATIONS + SMART REORDER ── */}
                <section className="py-4 space-y-8">
                    <AIRecommendations />
                    <SmartReorder />
                </section>

                {/* ── NEWSLETTER ── */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white dark:bg-dark-card rounded-3xl p-10 md:p-14 border border-gray-100 dark:border-gray-800 shadow-sm text-center relative overflow-hidden"
                    >
                        {/* BG decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 dark:bg-green-900/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50 dark:bg-emerald-900/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                        <div className="relative z-10 max-w-xl mx-auto space-y-5">
                            <span className="text-4xl">📬</span>
                            <h2 className="text-3xl font-black font-display text-gray-900 dark:text-white">
                                Fresh Deals in Your Inbox
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Subscribe for weekly offers, seasonal recipes and exclusive discounts. No spam, ever.
                            </p>
                            <form
                                className="flex flex-col sm:flex-row gap-3"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.96 }}
                                    className="px-7 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl shadow-lg shadow-green-500/30 whitespace-nowrap transition-all btn-liquid"
                                >
                                    Subscribe 🎉
                                </motion.button>
                            </form>
                            <p className="text-xs text-gray-400">Join 50,000+ happy subscribers. Unsubscribe anytime.</p>
                        </div>
                    </motion.div>
                </section>

            </div>
        </motion.div>
    );
};

export default Home;
