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
                            whileHover={{ y: -8, rotateX: -4, rotateY: 5, scale: 1.03 }}
                            style={{ transformStyle: 'preserve-3d', perspective: 800 }}
                            className="flex-none w-72 snap-start"
                        >
                            <Link to="/offers">
                                <div className={`relative rounded-2xl overflow-hidden h-44 bg-gradient-to-br ${grad} shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group`}>
                                    {/* Background image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
                                        style={{ backgroundImage: `url(${offer.image})` }}
                                    />
                                    {/* Shine sweep on hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.12) 50%, transparent 70%)' }} />

                                    <div className="absolute inset-0 p-5 flex flex-col justify-between">
                                        <div>
                                            <span className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-sm text-white text-xs font-black px-3 py-1 rounded-full border border-white/30">
                                                <Tag className="w-3 h-3" />
                                                {offer.discount}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-white font-black text-xl leading-snug drop-shadow">{offer.title}</p>
                                            <p className="text-white/80 text-xs mt-1 line-clamp-1">{offer.desc}</p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <span className="text-xs text-white/80 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-lg font-mono tracking-wider border border-white/20">
                                                    {offer.code}
                                                </span>
                                                <span className="flex items-center gap-1 text-white text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                    GRAB DEAL <ArrowRight className="w-3 h-3" />
                                                </span>
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
