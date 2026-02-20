import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Success = () => {
    const location = useLocation();
    const orderId = location.state?.orderId || ('FM-' + Math.random().toString(36).substr(2, 9).toUpperCase());

    const deliveryDate = new Date();
    const hour = deliveryDate.getHours();
    if (hour >= 14) deliveryDate.setDate(deliveryDate.getDate() + 1);

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-bg">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full bg-white dark:bg-dark-card p-8 rounded-3xl shadow-neumorphic dark:shadow-neumorphic-dark text-center border border-white/20"
            >
                {/* Checkmark */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>

                <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">Order Confirmed! 🎉</h1>
                <p className="text-gray-500 mb-8">Your fresh groceries are being packed! Thank you for shopping with FreshMart.</p>

                {/* Order details card */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6 text-left space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono font-medium text-gray-900 dark:text-white">{orderId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estimated Delivery</span>
                        <span className="font-medium flex items-center text-green-600">
                            <Package className="w-3 h-3 mr-1" />
                            {deliveryDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                            {new Date().getHours() < 14 ? ' (Today!)' : ' (Tomorrow)'}
                        </span>
                    </div>
                </div>

                {/* Mini progress hint */}
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl px-4 py-3 mb-6 flex items-center gap-3 text-left">
                    <MapPin className="w-5 h-5 text-green-600 shrink-0" />
                    <p className="text-xs text-green-700 dark:text-green-400">
                        You can track your order in real time using the <strong>Track Order</strong> button below.
                    </p>
                </div>

                <div className="space-y-3">
                    <Link to={`/track-order?id=${orderId}`} className="block">
                        <Button variant="primary" className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2">
                            Track My Order <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link to="/" className="block">
                        <Button variant="ghost" className="w-full">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
