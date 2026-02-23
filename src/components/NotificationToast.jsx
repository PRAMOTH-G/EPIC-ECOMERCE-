import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag, AlertCircle, Star, X } from 'lucide-react';

let toastId = 0;
let listeners = [];

export function showToast({ type = 'success', title, message, duration = 3500 }) {
    const id = ++toastId;
    const toast = { id, type, title, message };
    listeners.forEach(fn => fn(prev => [...prev, toast]));
    setTimeout(() => {
        listeners.forEach(fn => fn(prev => prev.filter(t => t.id !== id)));
    }, duration);
}

const ICONS = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    cart: <ShoppingBag className="w-5 h-5 text-blue-500" />,
    coin: <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
};
const COLORS = {
    success: 'border-green-100 dark:border-green-900/50',
    cart: 'border-blue-100 dark:border-blue-900/50',
    coin: 'border-yellow-100 dark:border-yellow-900/50',
    error: 'border-red-100 dark:border-red-900/50',
};

const NotificationToast = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        listeners.push(setToasts);
        return () => { listeners = listeners.filter(f => f !== setToasts); };
    }, []);

    return (
        <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 pointer-events-none w-80 max-w-[calc(100vw-2rem)]">
            <AnimatePresence>
                {toasts.map(toast => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, x: 80, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 80, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className={`pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border ${COLORS[toast.type] || COLORS.success}`}
                    >
                        <div className="mt-0.5 shrink-0">{ICONS[toast.type] || ICONS.success}</div>
                        <div className="flex-1 min-w-0">
                            {toast.title && <p className="text-sm font-bold text-gray-900 dark:text-white">{toast.title}</p>}
                            {toast.message && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{toast.message}</p>}
                        </div>
                        <button
                            onClick={() => setToasts(p => p.filter(t => t.id !== toast.id))}
                            className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <X className="w-3 h-3 text-gray-400" />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default NotificationToast;
