import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, TrendingUp, Clock, Award, ChevronRight, RotateCcw, Coins, History, Zap, Shield } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import { useAuth } from '../context/AuthContext';
import SpinWheelModal from '../components/SpinWheelModal';
import DailyCheckIn from '../components/DailyCheckIn';
import { showToast } from '../components/NotificationToast';

const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };
const itemVariants = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const REDEEM_OPTIONS = [
    { points: 100, discount: 10, label: '₹10 Off', icon: '🎁' },
    { points: 250, discount: 25, label: '₹25 Off', icon: '💸' },
    { points: 500, discount: 55, label: '₹55 Off', icon: '🔥' },
    { points: 1000, discount: 120, label: '₹120 Off', icon: '⭐' },
];

export default function LoyaltyPage() {
    const { points, history, currentTier, nextTier, progressToNext, redeemPoints, TIERS } = useLoyalty();
    const { currentUser } = useAuth();
    const [showSpin, setShowSpin] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    const handleRedeem = (option) => {
        if (points < option.points) {
            showToast({ type: 'error', title: 'Not enough coins!', message: `You need ${option.points - points} more FreshCoins` });
            return;
        }
        const code = redeemPoints(option.points, `Redeemed for ${option.label}`);
        showToast({ type: 'success', title: `🎉 ${option.label} Unlocked!`, message: `Your coupon code: ${code}` });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 dark:from-dark-bg dark:via-dark-bg dark:to-dark-bg pb-20">

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.1),transparent)]" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
                        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-yellow-300" />
                            <span className="text-purple-200 text-sm font-semibold">FreshMart Rewards</span>
                        </motion.div>
                        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-3">
                            Your Loyalty Hub 🎁
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-purple-200 text-lg mb-6">
                            Earn coins, unlock rewards, and climb the tiers!
                        </motion.p>

                        {/* Points Card */}
                        <motion.div variants={itemVariants}
                            className="inline-flex flex-col items-center bg-white/15 backdrop-blur-sm border border-white/20 rounded-3xl px-8 py-5">
                            <p className="text-purple-200 text-sm font-semibold mb-1">Your FreshCoins</p>
                            <p className="text-6xl font-black">{points.toLocaleString()}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-2xl">{currentTier.icon}</span>
                                <span className="font-bold text-yellow-300">{currentTier.name} Member</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 space-y-6">

                {/* Tier Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-white dark:bg-dark-card rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-black text-gray-900 dark:text-white text-lg">Tier Progress</h2>
                        {nextTier && <span className="text-sm text-gray-500">{nextTier.min - points} pts to {nextTier.name}</span>}
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        {TIERS.map((tier, i) => (
                            <React.Fragment key={tier.name}>
                                <div className={`flex flex-col items-center ${tier.name === currentTier.name ? 'opacity-100' : tier.min <= points ? 'opacity-100' : 'opacity-40'}`}>
                                    <span className="text-2xl">{tier.icon}</span>
                                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 mt-1">{tier.name}</span>
                                </div>
                                {i < TIERS.length - 1 && (
                                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                        <div className={`h-full bg-gradient-to-r ${tier.color} rounded-full transition-all duration-1000`}
                                            style={{ width: tier.min <= points ? (TIERS[i + 1].min <= points ? '100%' : `${progressToNext}%`) : '0%' }} />
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {nextTier
                            ? `Earn ${nextTier.min - points} more coins to reach ${nextTier.icon} ${nextTier.name}!`
                            : '🎉 You\'ve reached the highest tier – Platinum! Enjoy exclusive benefits.'}
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {['overview', 'redeem', 'history'].map(tab => (
                        <button key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-none px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border capitalize ${activeTab === tab
                                ? 'bg-purple-600 text-white border-purple-500 shadow-lg'
                                : 'bg-white dark:bg-dark-card text-gray-500 border-gray-100 dark:border-gray-800 hover:border-purple-200'
                                }`}
                        >
                            {tab === 'overview' && '🏠 '}{tab === 'redeem' && '🎁 '}{tab === 'history' && '📋 '}{tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* ── Overview Tab ── */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Daily Check-In */}
                        <DailyCheckIn />

                        {/* Spin Wheel CTA */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 text-white relative overflow-hidden"
                        >
                            <div className="absolute right-0 bottom-0 text-[100px] opacity-10 leading-none">🎡</div>
                            <div className="relative z-10">
                                <Gift className="w-8 h-8 mb-3" />
                                <h3 className="text-2xl font-black mb-2">Spin & Win!</h3>
                                <p className="text-amber-100 text-sm mb-5">Try your luck for coins, discounts, or free shipping. One spin per day!</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowSpin(true)}
                                    className="px-6 py-3 bg-white text-amber-600 font-black rounded-2xl shadow-lg hover:shadow-xl transition-all"
                                >
                                    🎡 Spin Now!
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* How to earn */}
                        <div className="lg:col-span-2 bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
                            <h3 className="font-black text-gray-900 dark:text-white text-lg mb-4">💡 How to Earn More Coins</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {[
                                    { icon: '🛒', action: 'Make a Purchase', coins: '1 coin per ₹10' },
                                    { icon: '📝', action: 'Write a Review', coins: '+50 coins' },
                                    { icon: '👥', action: 'Refer a Friend', coins: '+250 coins' },
                                    { icon: '📅', action: 'Daily Check-In', coins: '+50–300 coins' },
                                ].map(item => (
                                    <div key={item.action} className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-2xl border border-purple-100 dark:border-purple-900/30 text-center">
                                        <span className="text-3xl mb-2 block">{item.icon}</span>
                                        <p className="text-xs font-bold text-gray-800 dark:text-white">{item.action}</p>
                                        <p className="text-[11px] text-purple-600 dark:text-purple-400 font-semibold mt-1">{item.coins}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Redeem Tab ── */}
                {activeTab === 'redeem' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {REDEEM_OPTIONS.map(option => (
                            <motion.div
                                key={option.points}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800 flex items-center gap-4"
                            >
                                <span className="text-4xl">{option.icon}</span>
                                <div className="flex-1">
                                    <p className="font-black text-gray-900 dark:text-white text-xl">{option.label}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{option.points.toLocaleString()} FreshCoins</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                    onClick={() => handleRedeem(option)}
                                    disabled={points < option.points}
                                    className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all ${points >= option.points
                                        ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Redeem
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* ── History Tab ── */}
                {activeTab === 'history' && (
                    <div className="bg-white dark:bg-dark-card rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        {history.length === 0 ? (
                            <div className="text-center py-16">
                                <span className="text-5xl block mb-3">📋</span>
                                <p className="text-gray-500 dark:text-gray-400">No transactions yet. Start earning!</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50 dark:divide-gray-800">
                                {history.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 px-5 py-4">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.type === 'earn' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
                                            {item.type === 'earn' ? <Zap className="w-5 h-5 text-green-600" /> : <Gift className="w-5 h-5 text-red-500" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-gray-800 dark:text-white">{item.reason}</p>
                                            <p className="text-xs text-gray-400">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                        <span className={`font-black text-lg ${item.type === 'earn' ? 'text-green-600' : 'text-red-500'}`}>
                                            {item.type === 'earn' ? '+' : ''}{item.amount}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Spin Wheel Modal */}
            <AnimatePresence>
                {showSpin && <SpinWheelModal onClose={() => setShowSpin(false)} />}
            </AnimatePresence>
        </motion.div>
    );
}
