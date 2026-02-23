import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Package, Tag, Zap, Check } from 'lucide-react';

const SAMPLE_NOTIFICATIONS = [
    { id: 1, icon: '⚡', type: 'sale', title: 'Flash Sale Live!', message: 'Up to 40% off on fruits & veggies. Ends in 2 hours!', time: '2 min ago', read: false },
    { id: 2, icon: '📦', type: 'order', title: 'Order Dispatched', message: 'Your order #FM2891 is out for delivery!', time: '1 hour ago', read: false },
    { id: 3, icon: '🎁', type: 'promo', title: 'Exclusive Offer', message: 'Use code FRESH20 for 20% off your next order.', time: '3 hours ago', read: true },
    { id: 4, icon: '⭐', type: 'loyalty', title: 'FreshCoins Earned!', message: 'You earned 150 coins from your last purchase.', time: 'Yesterday', read: true },
];

export default function PushNotificationBell() {
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
    const [permissionGranted, setPermissionGranted] = useState(
        typeof Notification !== 'undefined' ? Notification.permission === 'granted' : false
    );

    const unread = notifications.filter(n => !n.read).length;

    const requestPermission = async () => {
        if (typeof Notification === 'undefined') return;
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            setPermissionGranted(true);
            new Notification('FreshMart Notifications Enabled! 🛒', {
                body: 'You\'ll now receive flash sale alerts and order updates.',
                icon: '/favicon.ico',
            });
        }
    };

    const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    const markRead = (id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

    const iconBg = { sale: 'bg-orange-100', order: 'bg-blue-100', promo: 'bg-green-100', loyalty: 'bg-yellow-100' };
    const iconText = { sale: 'text-orange-600', order: 'text-blue-600', promo: 'text-green-600', loyalty: 'text-yellow-600' };

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setOpen(o => !o); if (!permissionGranted) requestPermission(); }}
                className="relative w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Notifications"
            >
                <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                {unread > 0 && (
                    <motion.span
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    >
                        {unread}
                    </motion.span>
                )}
            </motion.button>

            <AnimatePresence>
                {open && (
                    <>
                        <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-12 z-40 w-80 bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <Bell className="w-4 h-4 text-green-600" />
                                    <span className="font-bold text-gray-900 dark:text-white text-sm">Notifications</span>
                                    {unread > 0 && (
                                        <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 text-[10px] font-bold rounded-full">{unread} new</span>
                                    )}
                                </div>
                                {unread > 0 && (
                                    <button onClick={markAllRead} className="text-xs text-green-600 font-semibold hover:text-green-700">Mark all read</button>
                                )}
                            </div>

                            {/* List */}
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map(notif => (
                                    <motion.button
                                        key={notif.id}
                                        onClick={() => markRead(notif.id)}
                                        className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0 ${!notif.read ? 'bg-green-50/50 dark:bg-green-900/5' : ''}`}
                                    >
                                        <span className={`w-9 h-9 rounded-xl ${iconBg[notif.type]} flex items-center justify-center text-base flex-shrink-0`}>
                                            {notif.icon}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{notif.title}</p>
                                                <span className="text-[10px] text-gray-400 whitespace-nowrap">{notif.time}</span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{notif.message}</p>
                                        </div>
                                        {!notif.read && (
                                            <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-1" />
                                        )}
                                    </motion.button>
                                ))}
                            </div>

                            {/* Push permission nudge */}
                            {!permissionGranted && (
                                <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border-t border-green-100 dark:border-green-900/30">
                                    <button
                                        onClick={requestPermission}
                                        className="flex items-center gap-2 text-xs text-green-700 dark:text-green-400 font-semibold hover:text-green-800 transition-colors"
                                    >
                                        <Zap className="w-3.5 h-3.5" />
                                        Enable push notifications for real-time alerts
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
