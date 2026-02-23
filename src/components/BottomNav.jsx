import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, ShoppingCart, Package, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/offers', icon: Search, label: 'Search' },
    { to: null, icon: ShoppingCart, label: 'Cart', isCart: true },
    { to: '/orders', icon: Package, label: 'Orders' },
    { to: '/login', icon: User, label: 'Profile' },
];

const BottomNav = () => {
    const location = useLocation();
    const { cartCount, setSidebarOpen } = useCart();

    // Hide on checkout / success pages
    const hidden = ['/checkout', '/success'].includes(location.pathname);
    if (hidden) return null;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 safe-area-pb shadow-[0_-4px_30px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => {
                    const isActive = item.to && location.pathname === item.to;

                    if (item.isCart) {
                        return (
                            <button
                                key="cart"
                                onClick={() => setSidebarOpen(true)}
                                className="relative flex flex-col items-center justify-center gap-0.5 px-4 py-1 -mt-6"
                            >
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center shadow-xl shadow-green-500/40"
                                >
                                    <ShoppingCart className="w-7 h-7 text-white" />
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-0 right-1 min-w-[20px] h-5 px-1 flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
                                        >
                                            {cartCount > 9 ? '9+' : cartCount}
                                        </motion.span>
                                    )}
                                </motion.div>
                                <span className="text-[9px] font-bold text-green-600">Cart</span>
                            </button>
                        );
                    }

                    return (
                        <Link
                            key={item.to}
                            to={item.to}
                            className="flex flex-col items-center justify-center gap-0.5 px-4 py-2 flex-1 relative"
                        >
                            <motion.div whileTap={{ scale: 0.85 }} className="relative">
                                <item.icon
                                    className={`w-6 h-6 transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'}`}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                />
                                {isActive && (
                                    <motion.div
                                        layoutId="bottomNavIndicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-600"
                                    />
                                )}
                            </motion.div>
                            <span className={`text-[9px] font-semibold transition-colors ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
