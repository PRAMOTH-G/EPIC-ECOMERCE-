import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, DEPARTMENTS } from '../lib/data';

const SmartSearch = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const results = query.trim().length > 1
        ? PRODUCTS.filter(p =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 7)
        : [];

    const categoryMatches = query.trim().length > 1
        ? DEPARTMENTS.filter(d => d.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
        : [];

    const handleSelect = (product) => {
        navigate(`/product/${product.id}`);
        setQuery('');
        setIsOpen(false);
        onClose?.();
    };

    const handleDeptSelect = (dept) => {
        navigate(`/department/${dept.slug}`);
        setQuery('');
        setIsOpen(false);
        onClose?.();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsOpen(false);
            setQuery('');
        }
    };

    return (
        <div className="relative flex-1 max-w-lg mx-4 md:mx-8">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-200 dark:border-gray-700 rounded-2xl leading-5 bg-gray-50/80 dark:bg-gray-800/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all sm:text-sm shadow-sm"
                    placeholder="Search products, categories..."
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                    onKeyDown={handleKeyDown}
                />
                {query && (
                    <button
                        className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                        onClick={() => { setQuery(''); setIsOpen(false); }}
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && (results.length > 0 || categoryMatches.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] overflow-hidden"
                    >
                        {categoryMatches.length > 0 && (
                            <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-2">Departments</p>
                                {categoryMatches.map(dept => (
                                    <button
                                        key={dept.id}
                                        onClick={() => handleDeptSelect(dept)}
                                        className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <span className="text-xl">{dept.icon}</span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dept.name}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {results.length > 0 && (
                            <div className="p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-2">Products</p>
                                {results.map(product => (
                                    <button
                                        key={product.id}
                                        onClick={() => handleSelect(product)}
                                        className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <img src={product.image} alt={product.title} className="w-10 h-10 rounded-lg object-cover" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{product.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{product.category}</p>
                                        </div>
                                        <span className="text-sm font-bold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SmartSearch;
