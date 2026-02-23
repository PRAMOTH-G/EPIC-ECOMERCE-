import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Share2, Gift, Check, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/NotificationToast';

const REFERRAL_BENEFITS = [
    { you: '₹50 FreshCoins', friend: '5% off first order', icon: '🎁' },
];

const MOCK_REFERRALS = [
    { name: 'Priya M.', status: 'Joined', bonus: '+250 coins', date: '2 days ago', avatar: '👩' },
    { name: 'Rahul K.', status: 'First Purchase', bonus: '+250 coins', date: '5 days ago', avatar: '👨' },
];

export default function ReferralPage() {
    const { currentUser } = useAuth();
    const [copied, setCopied] = useState(false);

    const referralCode = currentUser?.uid ? 'FM' + currentUser.uid.slice(0, 6).toUpperCase() : 'FMFRESH';
    const referralLink = `${window.location.origin}/?ref=${referralCode}`;

    const copyCode = () => {
        navigator.clipboard.writeText(referralCode).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            showToast({ type: 'success', title: 'Copied!', message: `Referral code ${referralCode} copied to clipboard` });
        });
    };

    const shareWhatsApp = () => {
        const text = `Hey! Shop at FreshMart and get 5% off your first order! Use my code: *${referralCode}* or click: ${referralLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
    const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 dark:bg-dark-bg pb-20">

            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={container}>
                        <motion.div variants={item} className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-green-200" />
                            <span className="text-green-200 text-sm font-semibold">Referral Program</span>
                        </motion.div>
                        <motion.h1 variants={item} className="text-4xl md:text-5xl font-black mb-3">Invite & Earn 🎉</motion.h1>
                        <motion.p variants={item} className="text-green-100 text-lg max-w-xl">
                            Invite friends to FreshMart. You both win — you get 250 FreshCoins, they get 5% off their first order!
                        </motion.p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-14 space-y-6">

                {/* Referral Code Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                    className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800"
                >
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-3">Your Unique Referral Code</p>
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-dashed border-green-300 dark:border-green-700 mb-4">
                        <span className="text-3xl font-black text-green-700 dark:text-green-400 tracking-widest flex-1">{referralCode}</span>
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={copyCode}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all ${copied ? 'bg-green-100 text-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}
                        >
                            {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
                        </motion.button>
                    </div>

                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={shareWhatsApp}
                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20b958] text-white font-bold rounded-2xl shadow-lg transition-colors"
                        >
                            <span className="text-lg">📱</span>
                            Share on WhatsApp
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={() => { navigator.clipboard.writeText(referralLink); showToast({ type: 'success', title: 'Link copied!', message: referralLink }); }}
                            className="flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-2xl transition-colors"
                        >
                            <Share2 className="w-4 h-4" />
                            Copy Link
                        </motion.button>
                    </div>
                </motion.div>

                {/* How it works */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800"
                >
                    <h2 className="font-black text-gray-900 dark:text-white text-lg mb-5">How It Works</h2>
                    <div className="space-y-4">
                        {[
                            { step: 1, icon: '🔗', title: 'Share your code', desc: 'Send your unique referral link or code to friends & family' },
                            { step: 2, icon: '👤', title: 'Friend signs up', desc: 'They create a FreshMart account using your referral code' },
                            { step: 3, icon: '🛒', title: 'Friend makes 1st order', desc: 'They place their first order and get 5% off automatically!' },
                            { step: 4, icon: '🎉', title: 'You both earn!', desc: 'You get 250 FreshCoins. They get 5% off!' },
                        ].map(s => (
                            <div key={s.step} className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center font-black flex-shrink-0">{s.step}</div>
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white text-sm">{s.icon} {s.title}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Your Referrals */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-black text-gray-900 dark:text-white text-lg">Your Referrals (2)</h2>
                        <span className="text-sm text-green-600 font-bold">+500 coins earned</span>
                    </div>
                    <div className="space-y-3">
                        {MOCK_REFERRALS.map((ref, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <span className="text-2xl">{ref.avatar}</span>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{ref.name}</p>
                                    <p className="text-xs text-gray-500">{ref.status} • {ref.date}</p>
                                </div>
                                <span className="text-sm font-black text-green-600">{ref.bonus}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
