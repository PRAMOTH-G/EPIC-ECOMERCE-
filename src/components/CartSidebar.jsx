import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, ShoppingBag, Star, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
    const { cart, sidebarOpen, setSidebarOpen, removeFromCart, updateQuantity, cartTotal, cartCount, loyaltyPoints } = useCart();
    const overlayRef = useRef(null);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    const shippingThreshold = 499;
    const remaining = Math.max(0, shippingThreshold - cartTotal);
    const shippingProgress = Math.min(100, (cartTotal / shippingThreshold) * 100);

    return (
        <AnimatePresence>
            {sidebarOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        ref={overlayRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                                    <ShoppingCart className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-gray-900 dark:text-white text-lg">My Cart</h2>
                                    <p className="text-xs text-gray-500">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* FreshCoins */}
                                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">{loyaltyPoints} FC</span>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                </button>
                            </div>
                        </div>

                        {/* Free shipping progress */}
                        <div className="px-5 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                            {remaining > 0 ? (
                                <p className="text-xs text-gray-500 mb-1.5">
                                    Add <span className="font-bold text-green-600">₹{remaining.toFixed(0)}</span> more for 🎉 <strong>Free Delivery</strong>
                                </p>
                            ) : (
                                <p className="text-xs font-semibold text-green-600 mb-1.5">🎉 You've unlocked Free Delivery!</p>
                            )}
                            <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${shippingProgress}%` }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                />
                            </div>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-3 space-y-3">
                            {cart.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                    <div className="w-24 h-24 rounded-3xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                                        <ShoppingBag className="w-12 h-12 text-green-300" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-700 dark:text-gray-300">Your cart is empty</p>
                                        <p className="text-sm text-gray-400 mt-1">Add some delicious products!</p>
                                    </div>
                                    <Link
                                        to="/"
                                        onClick={() => setSidebarOpen(false)}
                                        className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <AnimatePresence initial={false}>
                                    {cart.map(item => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, x: 40 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 40, height: 0 }}
                                            className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700"
                                        >
                                            <Link to={`/product/${item.id}`} onClick={() => setSidebarOpen(false)} className="shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-16 h-16 rounded-xl object-cover bg-white"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop'; }}
                                                />
                                            </Link>
                                            <div className="flex-1 min-w-0">
                                                <Link to={`/product/${item.id}`} onClick={() => setSidebarOpen(false)}>
                                                    <p className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2 leading-tight hover:text-green-600 transition-colors">{item.title}</p>
                                                </Link>
                                                <p className="text-xs text-gray-400 mt-0.5">{item.unit && `per ${item.unit}`}</p>
                                                <p className="text-sm font-bold text-green-600 mt-1">₹{(item.price * item.quantity).toFixed(0)}</p>
                                            </div>
                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-900/20 flex items-center justify-center hover:bg-red-100 transition-colors"
                                                >
                                                    <Trash2 className="w-3 h-3 text-red-400" />
                                                </button>
                                                <div className="flex items-center gap-1.5 bg-white dark:bg-gray-700 rounded-xl px-2 py-1 border border-gray-200 dark:border-gray-600">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity <= 1}
                                                        className="w-5 h-5 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-600 hover:bg-green-100 disabled:opacity-40 transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3 text-gray-600 dark:text-gray-300" />
                                                    </button>
                                                    <span className="text-sm font-bold text-gray-800 dark:text-white min-w-[20px] text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-5 h-5 flex items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30 hover:bg-green-200 transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3 text-green-600" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer — totals & checkout */}
                        {cart.length > 0 && (
                            <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-3">
                                {/* Loyalty points earn preview */}
                                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800">
                                    <Zap className="w-4 h-4 text-yellow-500 shrink-0" />
                                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                                        You'll earn <strong>{Math.floor(cartTotal / 10)} FreshCoins</strong> on this order!
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-xs text-gray-500">Order Total</p>
                                        <p className="text-2xl font-black text-gray-900 dark:text-white">₹{cartTotal.toFixed(0)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-green-600 font-medium">
                                            {cartTotal >= shippingThreshold ? '🎉 Free Delivery' : `+₹40 delivery`}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    to="/checkout"
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-500/30 active:scale-95"
                                >
                                    <ShoppingBag className="w-5 h-5" />
                                    Proceed to Checkout
                                </Link>
                                <Link
                                    to="/cart"
                                    onClick={() => setSidebarOpen(false)}
                                    className="block text-center text-sm text-gray-500 hover:text-green-600 transition-colors"
                                >
                                    View full cart & apply promo codes
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
