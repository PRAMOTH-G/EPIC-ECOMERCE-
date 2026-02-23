import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Gift, Coins, Calendar, Zap, ChevronRight } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import { showToast } from './NotificationToast';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DailyCheckIn() {
    const { CHECK_IN_REWARDS, claimDailyCheckIn, canCheckIn, checkInStreak } = useLoyalty();
    const [claimed, setClaimed] = useState(false);
    const [reward, setReward] = useState(null);

    const handleCheckIn = () => {
        if (!canCheckIn()) return;
        const r = claimDailyCheckIn();
        if (r) {
            setClaimed(true);
            setReward(r);
            showToast({ type: 'success', title: `🎉 Day ${(checkInStreak % 7) + 1} Check-In!`, message: `+${r} FreshCoins earned!` });
        }
    };

    const todayChecked = !canCheckIn() || claimed;
    const currentDay = checkInStreak % 7; // 0-6

    return (
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10 rounded-3xl p-6 border border-purple-100 dark:border-purple-900/30">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <h3 className="font-black text-gray-900 dark:text-white text-lg">Daily Check-In</h3>
                </div>
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full">
                    🔥 {checkInStreak} day streak
                </span>
            </div>

            {/* 7-day grid */}
            <div className="grid grid-cols-7 gap-2 mb-5">
                {CHECK_IN_REWARDS.map((coins, idx) => {
                    const isDone = idx < (todayChecked ? currentDay + 1 : currentDay);
                    const isToday = idx === currentDay;
                    const isFuture = idx > currentDay;
                    return (
                        <motion.div
                            key={idx}
                            whileHover={isToday && !todayChecked ? { scale: 1.08 } : {}}
                            className={`relative flex flex-col items-center rounded-2xl p-2 border transition-all ${isDone
                                ? 'bg-green-500 border-green-400 text-white'
                                : isToday && !todayChecked
                                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/30 cursor-pointer'
                                    : isToday && todayChecked
                                        ? 'bg-green-500 border-green-400 text-white'
                                        : 'bg-white dark:bg-dark-bg border-gray-100 dark:border-gray-700 text-gray-400'
                                }`}
                        >
                            <span className="text-[9px] font-bold opacity-80 mb-1">{DAY_LABELS[idx]}</span>
                            {isDone || (isToday && todayChecked)
                                ? <CheckCircle2 className="w-4 h-4" />
                                : <span className="text-xs font-black">{idx === 6 ? '⭐' : `${coins}`}</span>
                            }
                            <span className="text-[8px] mt-0.5 opacity-75">{idx === 6 ? 'Bonus' : 'pts'}</span>
                            {isToday && !todayChecked && (
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Claim section */}
            <AnimatePresence>
                {reward && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="mb-4 px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl text-center"
                    >
                        <p className="font-black text-green-700 dark:text-green-400">🎉 +{reward} FreshCoins Earned!</p>
                        <p className="text-xs text-green-600 dark:text-green-500 mt-1">Keep your streak for bigger rewards!</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={!todayChecked ? { scale: 1.02 } : {}}
                whileTap={!todayChecked ? { scale: 0.98 } : {}}
                onClick={handleCheckIn}
                disabled={todayChecked}
                className={`w-full py-3 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${todayChecked
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/30'
                    }`}
            >
                {todayChecked
                    ? <><CheckCircle2 className="w-4 h-4 text-green-500" /> Checked In Today!</>
                    : <><Zap className="w-4 h-4" /> Claim +{CHECK_IN_REWARDS[currentDay]} Coins</>
                }
            </motion.button>
        </div>
    );
}
