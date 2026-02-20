import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const shipping = cartTotal > 50 ? 0 : 10;
    const total = cartTotal + shipping;

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center text-center px-4">
                <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Trash2 className="w-16 h-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/">
                    <Button variant="primary" size="lg">Start Shopping</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold font-display mb-8">Shopping Cart ({cart.length} items)</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    <AnimatePresence>
                        {cart.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-white dark:bg-dark-card shadow-sm border border-gray-100 dark:border-gray-800"
                            >
                                <Link to={`/product/${item.id}`} className="shrink-0">
                                    <img src={item.image} alt={item.title} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl bg-gray-100" />
                                </Link>

                                <div className="flex-1 text-center sm:text-left space-y-2">
                                    <Link to={`/product/${item.id}`}>
                                        <h3 className="font-semibold text-lg hover:text-primary-600 transition-colors">{item.title}</h3>
                                    </Link>
                                    <p className="text-gray-500 text-sm">{item.category}</p>
                                    <p className="font-bold text-primary-600 sm:hidden">${item.price}</p>
                                </div>

                                <div className="flex flex-col items-center sm:items-end space-y-4">
                                    <p className="font-bold text-xl hidden sm:block">${(item.price * item.quantity).toFixed(2)}</p>

                                    <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="p-1 rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all disabled:opacity-50"
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-medium w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="p-1 rounded-md hover:bg-white dark:hover:bg-gray-700 shadow-sm transition-all"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 shadow-neumorphic dark:shadow-neumorphic-dark sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600 dark:text-gray-400">Tax Estimate</span>
                                <span className="font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary-600">${(total + cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Promo Code"
                                    className="w-full pl-4 pr-24 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                                />
                                <button className="absolute right-2 top-2 bottom-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">Apply</button>
                            </div>
                            <Link to="/checkout" className="block">
                                <Button variant="primary" className="w-full flex items-center justify-between group">
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
