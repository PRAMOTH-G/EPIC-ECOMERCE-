import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, History } from 'lucide-react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../lib/data';
import { useCart } from '../context/CartContext';

function SectionHead({ icon: Icon, title, subtitle }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-5 h-5 text-green-600" />
                    <h2 className="text-2xl md:text-3xl font-black font-display text-gray-900 dark:text-white">{title}</h2>
                </div>
                {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
            </div>
        </div>
    );
}

/** Picks products based on recently viewed categories */
function usePersonalizedProducts(recentlyViewed, limit = 8) {
    return useMemo(() => {
        if (!recentlyViewed?.length) {
            // Fall back to top-rated products
            return PRODUCTS.filter(p => p.rating >= 4.5).slice(0, limit);
        }
        const categoryCounts = {};
        recentlyViewed.forEach(p => {
            categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
        });
        const topCategories = Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([cat]) => cat);

        const viewedIds = new Set(recentlyViewed.map(p => p.id));
        const personalized = PRODUCTS
            .filter(p => topCategories.includes(p.category) && !viewedIds.has(p.id))
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, limit);

        return personalized.length >= 4 ? personalized : PRODUCTS.filter(p => p.isFeatured).slice(0, limit);
    }, [recentlyViewed, limit]);
}

/** Picks "customers also bought" based on the first recently viewed product's category */
function useAlsoBought(recentlyViewed, limit = 5) {
    return useMemo(() => {
        if (!recentlyViewed?.length) return [];
        const baseProduct = recentlyViewed[0];
        const viewedIds = new Set(recentlyViewed.map(p => p.id));
        return PRODUCTS
            .filter(p => p.category === baseProduct.category && !viewedIds.has(p.id) && p.id !== baseProduct.id)
            .sort((a, b) => (b.reviews || 0) - (a.reviews || 0))
            .slice(0, limit);
    }, [recentlyViewed, limit]);
}

export default function AIRecommendations() {
    const { recentlyViewed } = useCart();
    const personalized = usePersonalizedProducts(recentlyViewed);
    const alsoBought = useAlsoBought(recentlyViewed);

    const container = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } };
    const item = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

    return (
        <div className="space-y-14">
            {/* ── For You ── */}
            <section>
                <SectionHead
                    icon={Sparkles}
                    title="✨ Picked For You"
                    subtitle={recentlyViewed?.length ? 'Based on your browsing history' : 'Top-rated products you\'ll love'}
                />
                <motion.div
                    variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
                >
                    {personalized.map(product => (
                        <motion.div key={product.id} variants={item}>
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* ── Also Bought ── */}
            {alsoBought.length > 0 && (
                <section>
                    <SectionHead
                        icon={TrendingUp}
                        title="👥 Customers Also Bought"
                        subtitle={`Related to: ${recentlyViewed[0]?.title}`}
                    />
                    <motion.div
                        variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5"
                    >
                        {alsoBought.map(product => (
                            <motion.div key={product.id} variants={item}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            )}
        </div>
    );
}
