import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, Tag, ShoppingBag, CheckCircle, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

// Valid promo codes
const PROMO_CODES = {
    FRESH10: { discount: 0.10, label: '10% off your order' },
    FARM20: { discount: 0.20, label: '20% off your order' },
    SAVE5: { discount: 0.05, label: '5% off your order' },
    ORGANIC: { discount: 0.15, label: '15% off your order' },
};

const FREE_SHIPPING_THRESHOLD = 50;

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [promoInput, setPromoInput] = useState('');
    const [promoCode, setPromoCode] = useState(null);  // applied code object
    const [promoError, setPromoError] = useState('');
    const [promoSuccess, setPromoSuccess] = useState('');

    const discount = promoCode ? cartTotal * promoCode.discount : 0;
    const discountedSubtotal = cartTotal - discount;
    const shipping = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FREE_SHIPPING_THRESHOLD - discountedSubtotal;
    const shippingCost = discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99;
    const tax = discountedSubtotal * 0.08;
    const orderTotal = discountedSubtotal + shippingCost + tax;

    // Free-shipping progress (0–100%)
    const freeShippingProgress = Math.min((discountedSubtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

    const handleApplyPromo = () => {
        const code = promoInput.trim().toUpperCase();
        if (!code) { setPromoError('Please enter a promo code.'); setPromoSuccess(''); return; }
        if (PROMO_CODES[code]) {
            setPromoCode({ ...PROMO_CODES[code], code });
            setPromoSuccess(`✅ "${code}" applied — ${PROMO_CODES[code].label}!`);
            setPromoError('');
        } else {
            setPromoError('Invalid promo code. Try FRESH10 or FARM20.');
            setPromoSuccess('');
            setPromoCode(null);
        }
    };

    const handleRemovePromo = () => {
        setPromoCode(null);
        setPromoInput('');
        setPromoSuccess('');
        setPromoError('');
    };

    // ── Empty cart screen ──────────────────────────────────────────
    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-40 h-40 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-8 border-4 border-green-100 dark:border-green-800"
                >
                    <ShoppingBag className="w-20 h-20 text-green-400" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">Your cart is empty</h2>
                <p className="text-gray-500 mb-4 max-w-sm">Add some fresh fruits, veggies or groceries and they'll show up here.</p>
                <p className="text-sm text-green-600 font-medium mb-8">🎁 Use code <strong>FRESH10</strong> for 10% off your first order!</p>
                <Link to="/">
                    <Button variant="primary" size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                        Start Shopping
                    </Button>
                </Link>
            </div>
        );
    }

    // ── Cart screen ────────────────────────────────────────────────
    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
                        Shopping Cart
                    </h1>
                    <p className="text-gray-500 mt-1">{cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''} in your basket</p>
                </div>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors"
                >
                    <Trash2 className="w-4 h-4" /> Clear All
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* ── Left: Cart Items ────────────────────── */}
                <div className="lg:col-span-2 space-y-4">
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -120, transition: { duration: 0.25 } }}
                                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-dark-card shadow-sm border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-green-800 transition-colors"
                            >
                                {/* Image */}
                                <Link to={`/product/${item.id}`} className="shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl bg-gray-100"
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&auto=format&fit=crop&q=80'; }}
                                    />
                                </Link>

                                {/* Info */}
                                <div className="flex-1 text-left min-w-0">
                                    <Link to={`/product/${item.id}`}>
                                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white hover:text-green-600 transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                    </Link>
                                    <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                                    <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                                        ₹{item.price.toFixed(0)} {item.unit && <span className="text-gray-400 font-normal">/ {item.unit}</span>}
                                    </p>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-3 w-full sm:w-auto">
                                    {/* Line total */}
                                    <p className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                                        ₹{(item.price * item.quantity).toFixed(0)}
                                    </p>

                                    {/* Quantity stepper */}
                                    <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 rounded-xl p-1 border border-gray-100 dark:border-gray-700">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed font-bold"
                                        >
                                            <Minus className="w-3.5 h-3.5" />
                                        </button>
                                        <span className="w-9 text-center font-semibold text-sm">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all font-bold"
                                        >
                                            <Plus className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 text-xs font-medium flex items-center gap-1 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Remove
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Continue shopping */}
                    <Link to="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm mt-2 transition-colors">
                        ← Continue Shopping
                    </Link>
                </div>

                {/* ── Right: Order Summary ─────────────────── */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-lg sticky top-24 space-y-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h3>

                        {/* Free-shipping progress */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800">
                            <div className="flex items-center gap-2 mb-2">
                                <Truck className="w-4 h-4 text-green-600" />
                                {discountedSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                                    <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                                        🎉 You've unlocked <strong>Free Delivery</strong>!
                                    </p>
                                ) : (
                                    <p className="text-xs font-medium text-green-700 dark:text-green-400">
                                        Add <strong>₹{shipping.toFixed(0)}</strong> more for <strong>Free Delivery</strong>
                                    </p>
                                )}
                            </div>
                            <div className="w-full bg-green-100 dark:bg-green-800 rounded-full h-2">
                                <motion.div
                                    className="bg-green-500 h-2 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${freeShippingProgress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Promo code */}
                        <div>
                            {promoCode ? (
                                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">{promoCode.code}</span>
                                        <span className="text-xs text-green-600">(-{(promoCode.discount * 100).toFixed(0)}%)</span>
                                    </div>
                                    <button onClick={handleRemovePromo} className="text-xs text-red-500 hover:text-red-700 font-medium">Remove</button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input
                                                type="text"
                                                value={promoInput}
                                                onChange={(e) => { setPromoInput(e.target.value.toUpperCase()); setPromoError(''); }}
                                                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                                                placeholder="Promo code"
                                                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                                            />
                                        </div>
                                        <button
                                            onClick={handleApplyPromo}
                                            className="px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
                                        >
                                            Apply
                                        </button>
                                    </div>
                                    {promoError && <p className="text-xs text-red-500">{promoError}</p>}
                                    {promoSuccess && <p className="text-xs text-green-600 font-medium">{promoSuccess}</p>}
                                    <p className="text-xs text-gray-400">Try: FRESH10 · FARM20 · ORGANIC</p>
                                </div>
                            )}
                        </div>

                        {/* Price breakdown */}
                        <div className="space-y-3 text-sm border-t border-gray-100 dark:border-gray-800 pt-4">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900 dark:text-white">₹{cartTotal.toFixed(0)}</span>
                            </div>
                            {promoCode && (
                                <div className="flex justify-between text-green-600 dark:text-green-400">
                                    <span>Discount ({(promoCode.discount * 100).toFixed(0)}%)</span>
                                    <span className="font-medium">-₹{discount.toFixed(0)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Delivery</span>
                                <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                                    {shippingCost === 0 ? '🎉 FREE' : `₹${shippingCost.toFixed(0)}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Tax (8%)</span>
                                <span className="font-medium text-gray-900 dark:text-white">₹{tax.toFixed(0)}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between items-center text-lg font-bold">
                                <span className="text-gray-900 dark:text-white">Total</span>
                                <span className="text-green-600 text-xl">₹{orderTotal.toFixed(0)}</span>
                            </div>
                        </div>

                        {/* Checkout CTA */}
                        <Link
                            to="/checkout"
                            state={{ promoCode, discount, orderTotal, shippingCost, tax }}
                            className="block"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/30 transition-colors text-base"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>

                        {/* Trust badges */}
                        <div className="flex justify-center gap-6 pt-2 border-t border-gray-100 dark:border-gray-800">
                            {['🔒 Secure', '🌿 Fresh Guarantee', '🚚 Fast Delivery'].map((badge) => (
                                <span key={badge} className="text-xs text-gray-400 font-medium">{badge}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
