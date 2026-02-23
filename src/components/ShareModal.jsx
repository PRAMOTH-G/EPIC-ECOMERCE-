import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, X, Copy, Check, MessageCircle } from 'lucide-react';
import { showToast } from './NotificationToast';

export default function ShareModal({ onClose, title = 'Share', url, text }) {
    const [copied, setCopied] = useState(false);
    const shareUrl = url || window.location.href;
    const shareText = text || 'Check this out on FreshMart!';

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            showToast({ type: 'success', title: 'Copied!', message: 'Link copied to clipboard' });
        });
    };

    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
    };

    const shareTelegram = () => {
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
    };

    const shareTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
                    onClick={e => e.stopPropagation()}
                    className="w-full sm:max-w-sm bg-white dark:bg-dark-card rounded-3xl p-6 shadow-2xl"
                >
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Share2 className="w-5 h-5 text-green-600" />
                            <h3 className="font-black text-gray-900 dark:text-white">{title}</h3>
                        </div>
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <X className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>

                    {/* Share Options */}
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {[
                            { label: 'WhatsApp', icon: '📱', bg: 'bg-[#25D366]', action: shareWhatsApp },
                            { label: 'Telegram', icon: '✈️', bg: 'bg-[#2AABEE]', action: shareTelegram },
                            { label: 'Twitter', icon: '🐦', bg: 'bg-[#1DA1F2]', action: shareTwitter },
                        ].map(opt => (
                            <motion.button
                                key={opt.label}
                                whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                                onClick={opt.action}
                                className={`flex flex-col items-center gap-2 py-4 ${opt.bg} text-white rounded-2xl font-semibold text-xs shadow-lg`}
                            >
                                <span className="text-2xl">{opt.icon}</span>
                                {opt.label}
                            </motion.button>
                        ))}
                    </div>

                    {/* Copy Link */}
                    <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                        <p className="text-xs text-gray-500 dark:text-gray-400 flex-1 truncate">{shareUrl}</p>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={copyLink}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${copied ? 'bg-green-100 text-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                        >
                            {copied ? <><Check className="w-3.5 h-3.5" />Copied!</> : <><Copy className="w-3.5 h-3.5" />Copy</>}
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
