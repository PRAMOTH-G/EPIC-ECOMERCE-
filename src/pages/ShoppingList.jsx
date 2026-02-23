import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ShoppingBag, Check, Save, RefreshCw, Zap, X } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import { useCart } from '../context/CartContext';
import { showToast } from '../components/NotificationToast';

const SUGGESTED = PRODUCTS.filter(p => p.isFeatured).slice(0, 8);

const ShoppingList = () => {
    const { addToCart, addLoyaltyPoints } = useCart();
    const [lists, setLists] = useState(() => {
        try { return JSON.parse(localStorage.getItem('shoppingLists') || '[]'); }
        catch { return []; }
    });
    const [newItem, setNewItem] = useState('');
    const [activeList, setActiveList] = useState(null);
    const [newListName, setNewListName] = useState('');
    const [showCreate, setShowCreate] = useState(false);

    const save = (updated) => {
        setLists(updated);
        localStorage.setItem('shoppingLists', JSON.stringify(updated));
    };

    const createList = () => {
        if (!newListName.trim()) return;
        const list = { id: Date.now(), name: newListName.trim(), items: [] };
        const updated = [...lists, list];
        save(updated);
        setActiveList(list.id);
        setNewListName('');
        setShowCreate(false);
        showToast({ type: 'success', title: 'List Created', message: list.name });
    };

    const addItem = (listId, text) => {
        if (!text.trim()) return;
        const updated = lists.map(l => l.id === listId
            ? { ...l, items: [...l.items, { id: Date.now(), text: text.trim(), checked: false }] }
            : l
        );
        save(updated);
        setNewItem('');
    };

    const addSuggested = (listId, product) => {
        const updated = lists.map(l => l.id === listId
            ? { ...l, items: [...l.items, { id: Date.now(), text: product.title, productId: product.id, price: product.price, image: product.image, checked: false }] }
            : l
        );
        save(updated);
        showToast({ type: 'success', title: 'Added to list', message: product.title });
    };

    const toggleItem = (listId, itemId) => {
        const updated = lists.map(l => l.id === listId
            ? { ...l, items: l.items.map(i => i.id === itemId ? { ...i, checked: !i.checked } : i) }
            : l
        );
        save(updated);
    };

    const deleteItem = (listId, itemId) => {
        const updated = lists.map(l => l.id === listId
            ? { ...l, items: l.items.filter(i => i.id !== itemId) }
            : l
        );
        save(updated);
    };

    const deleteList = (listId) => {
        const updated = lists.filter(l => l.id !== listId);
        save(updated);
        if (activeList === listId) setActiveList(null);
    };

    const addAllToCart = (list) => {
        let count = 0;
        list.items.forEach(item => {
            const product = item.productId
                ? PRODUCTS.find(p => p.id === item.productId)
                : PRODUCTS.find(p => p.title.toLowerCase().includes(item.text.toLowerCase()));
            if (product) {
                addToCart(product, 1);
                if (addLoyaltyPoints) addLoyaltyPoints(Math.floor(product.price / 10));
                count++;
            }
        });
        showToast({
            type: count > 0 ? 'cart' : 'error',
            title: count > 0 ? `${count} items added to cart! 🛒` : 'No matching products found',
            message: count > 0 ? `From list: "${list.name}"` : 'Add products from suggestions below',
        });
    };

    const currentList = lists.find(l => l.id === activeList);

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">📋 Smart Shopping Lists</h1>
                    <p className="text-gray-500 mt-1">Save your weekly groceries, add all to cart in 1 click</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30"
                >
                    <Plus className="w-4 h-4" /> New List
                </button>
            </div>

            {/* Create list modal */}
            <AnimatePresence>
                {showCreate && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md"
                    >
                        <p className="font-semibold text-gray-800 dark:text-white mb-3">New Shopping List</p>
                        <div className="flex gap-2">
                            <input
                                autoFocus
                                value={newListName}
                                onChange={e => setNewListName(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && createList()}
                                placeholder="e.g. Weekly Groceries, Party Shopping..."
                                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                            />
                            <button onClick={createList} className="px-4 py-2 bg-green-600 text-white font-bold rounded-xl text-sm">Create</button>
                            <button onClick={() => setShowCreate(false)} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-xl">
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {lists.length === 0 ? (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📋</div>
                    <p className="text-xl font-bold text-gray-700 dark:text-gray-300">No lists yet</p>
                    <p className="text-gray-400 mt-2 mb-6">Create your first shopping list to get started</p>
                    <button
                        onClick={() => setShowCreate(true)}
                        className="px-6 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 inline mr-2" />Create Your First List
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Lists sidebar */}
                    <div className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3">Your Lists</p>
                        {lists.map(list => (
                            <motion.div
                                key={list.id}
                                whileTap={{ scale: 0.97 }}
                                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border transition-all ${activeList === list.id
                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-green-200'
                                    }`}
                                onClick={() => setActiveList(list.id)}
                            >
                                <div className="w-8 h-8 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-lg">📋</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-white truncate">{list.name}</p>
                                    <p className="text-xs text-gray-400">{list.items.length} items • {list.items.filter(i => i.checked).length} done</p>
                                </div>
                                <button
                                    onClick={e => { e.stopPropagation(); deleteList(list.id); }}
                                    className="w-6 h-6 rounded-lg flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-gray-300 hover:text-red-400" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* List detail */}
                    <div className="lg:col-span-2">
                        {currentList ? (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                                {/* List header */}
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                                    <div>
                                        <h2 className="font-bold text-gray-900 dark:text-white">{currentList.name}</h2>
                                        <p className="text-xs text-gray-400 mt-0.5">{currentList.items.length} items</p>
                                    </div>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => addAllToCart(currentList)}
                                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-xl hover:bg-green-700 transition-colors shadow-md"
                                    >
                                        <ShoppingBag className="w-4 h-4" /> Add All to Cart
                                    </motion.button>
                                </div>

                                {/* Add item */}
                                <div className="px-5 py-3 border-b border-gray-50 dark:border-gray-800">
                                    <div className="flex gap-2">
                                        <input
                                            value={newItem}
                                            onChange={e => setNewItem(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addItem(currentList.id, newItem)}
                                            placeholder="Type item name and press Enter..."
                                            className="flex-1 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                        />
                                        <button
                                            onClick={() => addItem(currentList.id, newItem)}
                                            className="px-3 py-2 bg-green-600 text-white rounded-xl"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Items */}
                                <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
                                    {currentList.items.length === 0 ? (
                                        <p className="text-sm text-gray-400 text-center py-4">No items yet — type above or pick from suggestions ↓</p>
                                    ) : (
                                        <AnimatePresence initial={false}>
                                            {currentList.items.map(item => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900"
                                                >
                                                    <button
                                                        onClick={() => toggleItem(currentList.id, item.id)}
                                                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${item.checked ? 'bg-green-500 border-green-500' : 'border-gray-300 dark:border-gray-600 hover:border-green-400'}`}
                                                    >
                                                        {item.checked && <Check className="w-3 h-3 text-white" />}
                                                    </button>
                                                    {item.image && <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />}
                                                    <span className={`flex-1 text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>{item.text}</span>
                                                    {item.price && <span className="text-xs font-semibold text-green-600">₹{item.price}</span>}
                                                    <button onClick={() => deleteItem(currentList.id, item.id)} className="text-gray-300 hover:text-red-400">
                                                        <X className="w-3.5 h-3.5" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    )}
                                </div>

                                {/* Suggested products */}
                                <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30">
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Add — Popular Items</p>
                                    <div className="flex gap-2 overflow-x-auto pb-1">
                                        {SUGGESTED.map(product => (
                                            <button
                                                key={product.id}
                                                onClick={() => addSuggested(currentList.id, product)}
                                                className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-green-300 transition-all text-left"
                                            >
                                                <img src={product.image} alt="" className="w-8 h-8 rounded-lg object-cover"
                                                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&auto=format&fit=crop'; }} />
                                                <div>
                                                    <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 max-w-[80px] truncate">{product.title}</p>
                                                    <p className="text-[10px] text-green-600 font-bold">₹{product.price}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full py-16 text-center">
                                <div>
                                    <p className="text-5xl mb-3">👈</p>
                                    <p className="font-semibold text-gray-500">Select a list to manage it</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingList;
