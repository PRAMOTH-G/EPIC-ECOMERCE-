import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DEPARTMENTS } from '../lib/data';

const DEPT_COLORS = {
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

const MegaMenu = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Menu Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-2xl"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
                                Browse All Departments
                            </p>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                {DEPARTMENTS.map((dept, idx) => {
                                    const gradCls = DEPT_COLORS[dept.color] || 'from-gray-400 to-gray-500';
                                    return (
                                        <motion.div
                                            key={dept.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.03 }}
                                        >
                                            <Link
                                                to={`/department/${dept.slug}`}
                                                onClick={onClose}
                                                className="group flex flex-col items-center text-center p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                                            >
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradCls} flex items-center justify-center text-2xl mb-3 shadow-md group-hover:scale-110 transition-transform duration-200`}>
                                                    {dept.icon}
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 leading-tight">
                                                    {dept.name}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Bottom row */}
                            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-4">
                                <Link to="/offers" onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 text-sm font-semibold hover:bg-rose-100 transition-colors">
                                    🔥 Today's Offers
                                </Link>
                                <Link to="/offers" onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-semibold hover:bg-purple-100 transition-colors">
                                    🎁 Combo Deals
                                </Link>
                                <Link to="/orders" onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold hover:bg-blue-100 transition-colors">
                                    📦 My Orders
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MegaMenu;
