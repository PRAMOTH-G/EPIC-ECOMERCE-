import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import Input from '../components/Input';
import { motion } from 'framer-motion';
import { CreditCard, Calendar, Lock, MapPin } from 'lucide-react';

const Checkout = () => {
    const { cartTotal, cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const shipping = cartTotal > 50 ? 0 : 10;
    const total = cartTotal + shipping + (cartTotal * 0.08);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            clearCart();
            setLoading(false);
            navigate('/success');
        }, 2000);
    };

    if (cart.length === 0) {
        return <div className="pt-24 text-center">Your cart is empty. Redirecting...</div>;
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold font-display mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Billing Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        {/* Shipping Address */}
                        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Full Name" placeholder="John Doe" required />
                                <Input label="Phone Number" placeholder="+1 (555) 000-0000" required />
                                <div className="md:col-span-2">
                                    <Input label="Address" placeholder="123 Main St, Apt 4B" required />
                                </div>
                                <Input label="City" placeholder="New York" required />
                                <Input label="Zip Code" placeholder="10001" required />
                            </div>
                        </div>

                        {/* Payment Details */}
                        <div className="bg-white dark:bg-dark-card p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-semibold mb-4 flex items-center">
                                <CreditCard className="w-5 h-5 mr-2 text-primary-600" />
                                Payment Details
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                <Input label="Card Number" placeholder="0000 0000 0000 0000" required icon={<CreditCard />} />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input label="Expiry Date" placeholder="MM/YY" required icon={<Calendar />} />
                                    <Input label="CVV" placeholder="123" required icon={<Lock />} />
                                </div>
                                <div className="text-xs text-gray-500 flex items-center mt-2">
                                    <Lock className="w-3 h-3 mr-1" />
                                    Your payment information is encrypted and secure.
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:pl-8"
                >
                    <div className="bg-gray-50 dark:bg-dark-card p-6 rounded-2xl shadow-neumorphic dark:shadow-neumorphic-dark sticky top-24">
                        <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                        <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-lg bg-white overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{item.title}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-primary-600 mt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            form="checkout-form"
                            variant="primary"
                            className="w-full mt-6"
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Checkout;
