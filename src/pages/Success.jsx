import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const Success = () => {
    // Mock Order ID
    const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-gray-50 dark:bg-dark-bg">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="max-w-lg w-full bg-white dark:bg-dark-card p-8 rounded-3xl shadow-neumorphic dark:shadow-neumorphic-dark text-center border border-white/20"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>

                <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white mb-2">Order Successful!</h1>
                <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been confirmed.</p>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-8 text-left space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Order ID</span>
                        <span className="font-mono font-medium">{orderId}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Estimated Delivery</span>
                        <span className="font-medium flex items-center">
                            <Package className="w-3 h-3 mr-1" />
                            {deliveryDate.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                        </span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link to="/">
                        <Button variant="primary" className="w-full">
                            Continue Shopping
                        </Button>
                    </Link>
                    <Link to="/profile">
                        <Button variant="ghost" className="w-full">
                            Track Order <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Success;
