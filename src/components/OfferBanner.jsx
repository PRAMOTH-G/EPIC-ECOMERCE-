import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Tag, ArrowRight } from 'lucide-react';
import { OFFERS } from '../lib/data';

const OFFER_GRADIENTS = {
    green: 'from-green-500 to-emerald-600',
    red: 'from-red-500 to-rose-600',
    orange: 'from-orange-500 to-amber-600',
    sky: 'from-sky-500 to-blue-600',
    teal: 'from-teal-500 to-cyan-600',
    purple: 'from-purple-500 to-violet-600',
};

const OfferBanner = () => {
    return (
        <section>
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h2 className="text-3xl font-bold font-display text-gray-900 dark:text-white">🔥 Today's Offers</h2>
                    <div className="h-1 w-16 bg-rose-500 mt-2 rounded-full" />
                </div>
                <Link to="/offers" className="flex items-center gap-1 text-sm font-semibold text-green-600 dark:text-green-400 hover:underline">
                    View All <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
                {OFFERS.map((offer, idx) => {
                    const grad = OFFER_GRADIENTS[offer.color] || 'from-gray-500 to-gray-600';
                    return (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.08 }}
                            className="flex-none w-72 snap-start"
                        >
                            <Link to="/offers">
                                <div className={`relative rounded-2xl overflow-hidden h-40 bg-gradient-to-br ${grad} shadow-lg hover:shadow-xl transition-shadow cursor-pointer group`}>
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"
                                        style={{ backgroundImage: `url(${offer.image})` }}
                                    />
                                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                        <div>
                                            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                                                <Tag className="w-3 h-3" />
                                                {offer.discount}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-bold text-lg leading-snug">{offer.title}</p>
                                            <p className="text-white/80 text-xs mt-1 line-clamp-1">{offer.desc}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="text-xs text-white/70 bg-white/10 px-2 py-0.5 rounded font-mono tracking-wider">{offer.code}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default OfferBanner;
