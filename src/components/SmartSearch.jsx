import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, X, Mic, MicOff, Clock, TrendingUp, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, DEPARTMENTS } from '../lib/data';
import { useCart } from '../context/CartContext';
import { showToast } from './NotificationToast';

// ── AI keyword synonyms / tags ───────────────────────────────
const AI_TAGS = {
    'low sugar': ['diabetic', 'oats', 'wheat', 'healthy', 'stevia', 'sugar free', 'organic'],
    'protein': ['chicken', 'egg', 'paneer', 'soya', 'dal', 'lentil', 'meat', 'fish'],
    'vitamin c': ['lemon', 'orange', 'amla', 'guava', 'tomato', 'capsicum'],
    'calcium': ['milk', 'curd', 'paneer', 'cheese', 'sesame', 'broccoli'],
    'weight loss': ['oats', 'salad', 'cucumber', 'spinach', 'green tea', 'low fat'],
    'kid friendly': ['milk', 'biscuit', 'mango', 'banana', 'cheese', 'juice'],
    'spicy': ['chilli', 'masala', 'pepper', 'chilly', 'hot'],
    'breakfast': ['oats', 'cornflakes', 'bread', 'egg', 'milk', 'banana', 'poha'],
    'immunity': ['ginger', 'turmeric', 'honey', 'amla', 'garlic', 'lemon'],
    'vegan': ['soya', 'tofu', 'almond', 'oat', 'plant', 'coconut', 'vegetable'],
};

function aiSearch(query, products) {
    const q = query.toLowerCase().trim();
    if (!q) return [];

    // Direct match
    let results = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q)
    );

    // AI synonym expansion
    for (const [tag, keywords] of Object.entries(AI_TAGS)) {
        if (q.includes(tag) || tag.includes(q)) {
            const aiResults = products.filter(p =>
                keywords.some(kw =>
                    p.title.toLowerCase().includes(kw) ||
                    p.category.toLowerCase().includes(kw)
                )
            );
            results = [...new Map([...results, ...aiResults].map(p => [p.id, p])).values()];
            break;
        }
    }

    return results.slice(0, 8);
}

const MAX_HISTORY = 6;

const SmartSearch = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [listening, setListening] = useState(false);
    const [history, setHistory] = useState(() => {
        try { return JSON.parse(localStorage.getItem('searchHistory') || '[]'); }
        catch { return []; }
    });
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { addToCart, addLoyaltyPoints } = useCart();
    const recognitionRef = useRef(null);

    const results = aiSearch(query, PRODUCTS);
    const categoryMatches = query.trim().length > 1
        ? DEPARTMENTS.filter(d => d.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
        : [];

    // Check what AI tag matched (if any)
    const aiTagMatched = query.trim().length > 1
        ? Object.keys(AI_TAGS).find(tag => query.toLowerCase().includes(tag) || tag.includes(query.toLowerCase()))
        : null;

    const saveToHistory = useCallback((q) => {
        if (!q.trim()) return;
        setHistory(prev => {
            const updated = [q, ...prev.filter(h => h !== q)].slice(0, MAX_HISTORY);
            localStorage.setItem('searchHistory', JSON.stringify(updated));
            return updated;
        });
    }, []);

    const handleSelect = (product) => {
        saveToHistory(query || product.title);
        navigate(`/product/${product.id}`);
        setQuery('');
        setIsOpen(false);
        onClose?.();
    };

    const handleDeptSelect = (dept) => {
        saveToHistory(dept.name);
        navigate(`/department/${dept.slug}`);
        setQuery('');
        setIsOpen(false);
        onClose?.();
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (results.length > 0) handleSelect(results[0]);
    };

    const handleQuickAdd = (e, product) => {
        e.stopPropagation();
        addToCart(product, 1);
        if (addLoyaltyPoints) addLoyaltyPoints(Math.floor(product.price / 10));
        showToast({ type: 'cart', title: '🛒 Added!', message: product.title });
    };

    // Voice Search via Web Speech API
    const startVoice = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            showToast({ type: 'error', title: 'Voice not supported', message: 'Use Chrome for voice search' });
            return;
        }
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SR();
        rec.lang = 'en-IN';
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        rec.onstart = () => setListening(true);
        rec.onend = () => setListening(false);
        rec.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            setQuery(transcript);
            setIsOpen(true);
            showToast({ type: 'success', title: '🎤 Heard!', message: `"${transcript}"` });
        };
        rec.onerror = () => {
            setListening(false);
            showToast({ type: 'error', title: 'Voice error', message: 'Try again' });
        };
        recognitionRef.current = rec;
        rec.start();
    }, []);

    const stopVoice = useCallback(() => {
        recognitionRef.current?.stop();
        setListening(false);
    }, []);

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('searchHistory');
    };

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') { setIsOpen(false); setQuery(''); }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    const showDropdown = isOpen && (results.length > 0 || categoryMatches.length > 0 || (!query && history.length > 0));

    return (
        <div className="relative flex-1 max-w-lg mx-4 md:mx-8">
            <form onSubmit={handleSubmit} className="relative group">
                {/* Search icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    className="block w-full pl-10 pr-20 py-2.5 border border-gray-200 dark:border-gray-700 rounded-2xl leading-5 bg-gray-50/80 dark:bg-gray-800/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all sm:text-sm shadow-sm"
                    placeholder={listening ? '🎤 Listening...' : 'Search or say "low sugar items"...'}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
                    onFocus={() => setIsOpen(true)}
                />

                {/* Right icons */}
                <div className="absolute inset-y-0 right-2 flex items-center gap-1">
                    {query && (
                        <button type="button" onClick={() => { setQuery(''); setIsOpen(false); }} className="p-1 text-gray-400 hover:text-gray-600">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={listening ? stopVoice : startVoice}
                        className={`p-1.5 rounded-lg transition-all ${listening ? 'text-red-500 bg-red-50 dark:bg-red-900/20 animate-pulse' : 'text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20'}`}
                        title="Voice Search"
                    >
                        {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {showDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 z-[100] overflow-hidden"
                    >
                        {/* AI Tag match indicator */}
                        {aiTagMatched && (
                            <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 flex items-center gap-2 border-b border-purple-100 dark:border-purple-800">
                                <Zap className="w-3.5 h-3.5 text-purple-500" />
                                <p className="text-xs font-semibold text-purple-700 dark:text-purple-300">
                                    AI matched: <span className="font-black">"{aiTagMatched}"</span> — showing smart results
                                </p>
                            </div>
                        )}

                        {/* Recent searches (when no query) */}
                        {!query && history.length > 0 && (
                            <div className="p-3 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-2 px-2">
                                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Recent</p>
                                    <button onClick={clearHistory} className="text-[10px] text-gray-400 hover:text-red-500">Clear</button>
                                </div>
                                {history.map(h => (
                                    <button
                                        key={h}
                                        onClick={() => { setQuery(h); setIsOpen(true); }}
                                        className="w-full text-left px-3 py-1.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 transition-colors flex items-center gap-2"
                                    >
                                        <Clock className="w-3 h-3 text-gray-300" /> {h}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Department matches */}
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

                        {/* Product results */}
                        {results.length > 0 && (
                            <div className="p-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2 px-2 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> Products ({results.length})
                                </p>
                                {results.map(product => {
                                    const salePrice = product.discount > 0
                                        ? Math.round(product.price * (1 - product.discount / 100))
                                        : product.price;
                                    return (
                                        <div
                                            key={product.id}
                                            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer"
                                            onClick={() => handleSelect(product)}
                                        >
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-11 h-11 rounded-xl object-cover flex-shrink-0 bg-gray-100"
                                                onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&auto=format&fit=crop'; }}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">{product.title}</p>
                                                <div className="flex items-center gap-1.5">
                                                    <p className="text-xs text-gray-400">{product.category}</p>
                                                    <span className="text-gray-300 dark:text-gray-600">•</span>
                                                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                                    <span className="text-[10px] text-gray-500">{product.rating}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end gap-1 flex-shrink-0">
                                                <span className="text-sm font-bold text-green-600 dark:text-green-400">₹{salePrice}</span>
                                                {product.discount > 0 && (
                                                    <span className="text-[10px] text-gray-400 line-through">₹{product.price}</span>
                                                )}
                                            </div>
                                            <button
                                                onClick={(e) => handleQuickAdd(e, product)}
                                                className="opacity-0 group-hover:opacity-100 ml-1 w-7 h-7 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center hover:bg-green-200 transition-all flex-shrink-0"
                                            >
                                                <span className="text-green-600 text-lg leading-none font-bold">+</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {query && results.length === 0 && categoryMatches.length === 0 && (
                            <div className="p-6 text-center">
                                <p className="text-sm text-gray-400">No results for "<strong>{query}</strong>"</p>
                                <p className="text-xs text-gray-300 mt-1">Try "low sugar", "protein", "breakfast"...</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SmartSearch;
