import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const LoyaltyContext = createContext();

export function useLoyalty() { return useContext(LoyaltyContext); }

const TIERS = [
    { name: 'Bronze', min: 0, color: 'from-amber-600 to-yellow-700', icon: '🥉' },
    { name: 'Silver', min: 500, color: 'from-gray-400 to-gray-500', icon: '🥈' },
    { name: 'Gold', min: 1500, color: 'from-yellow-400 to-amber-500', icon: '🥇' },
    { name: 'Platinum', min: 5000, color: 'from-purple-400 to-violet-600', icon: '💎' },
];

const WHEEL_PRIZES = [
    { label: '50 Coins', value: 50, type: 'coins', color: '#22c55e' },
    { label: '10% Off', value: 10, type: 'discount', color: '#3b82f6' },
    { label: '100 Coins', value: 100, type: 'coins', color: '#f59e0b' },
    { label: 'Free Ship', value: 0, type: 'shipping', color: '#8b5cf6' },
    { label: '5% Off', value: 5, type: 'discount', color: '#ec4899' },
    { label: '150 Coins', value: 150, type: 'coins', color: '#06b6d4' },
    { label: '15% Off', value: 15, type: 'discount', color: '#f97316' },
    { label: '200 Coins', value: 200, type: 'coins', color: '#10b981' },
];

const CHECK_IN_REWARDS = [50, 75, 100, 125, 150, 175, 300]; // days 1-7

export function LoyaltyProvider({ children }) {
    const [points, setPoints] = useState(() => parseInt(localStorage.getItem('loyaltyPoints') || '0', 10));
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('loyaltyHistory') || '[]'));
    const [lastCheckIn, setLastCheckIn] = useState(() => localStorage.getItem('lastCheckIn') || null);
    const [checkInStreak, setCheckInStreak] = useState(() => parseInt(localStorage.getItem('checkInStreak') || '0', 10));
    const [lastSpin, setLastSpin] = useState(() => localStorage.getItem('lastSpin') || null);
    const [redeemedCodes, setRedeemedCodes] = useState(() => JSON.parse(localStorage.getItem('redeemedCodes') || '[]'));

    useEffect(() => { localStorage.setItem('loyaltyPoints', String(points)); }, [points]);
    useEffect(() => { localStorage.setItem('loyaltyHistory', JSON.stringify(history)); }, [history]);
    useEffect(() => { if (lastCheckIn) localStorage.setItem('lastCheckIn', lastCheckIn); }, [lastCheckIn]);
    useEffect(() => { localStorage.setItem('checkInStreak', String(checkInStreak)); }, [checkInStreak]);
    useEffect(() => { if (lastSpin) localStorage.setItem('lastSpin', lastSpin); }, [lastSpin]);
    useEffect(() => { localStorage.setItem('redeemedCodes', JSON.stringify(redeemedCodes)); }, [redeemedCodes]);

    const currentTier = TIERS.slice().reverse().find(t => points >= t.min) || TIERS[0];
    const nextTier = TIERS.find(t => t.min > points);
    const progressToNext = nextTier ? Math.round(((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100) : 100;

    const addPoints = useCallback((amount, reason = 'Purchase') => {
        setPoints(p => p + amount);
        setHistory(h => [{ id: Date.now(), amount, reason, date: new Date().toISOString(), type: 'earn' }, ...h].slice(0, 50));
    }, []);

    const redeemPoints = useCallback((amount, reason = 'Redemption') => {
        setPoints(p => Math.max(0, p - amount));
        setHistory(h => [{ id: Date.now(), amount: -amount, reason, date: new Date().toISOString(), type: 'redeem' }, ...h].slice(0, 50));
        const code = 'FM' + Math.random().toString(36).substr(2, 6).toUpperCase();
        setRedeemedCodes(r => [{ code, amount, date: new Date().toISOString() }, ...r]);
        return code;
    }, []);

    const canCheckIn = useCallback(() => {
        if (!lastCheckIn) return true;
        const last = new Date(lastCheckIn);
        const now = new Date();
        return last.toDateString() !== now.toDateString();
    }, [lastCheckIn]);

    const claimDailyCheckIn = useCallback(() => {
        if (!canCheckIn()) return null;
        const streak = canCheckIn() ? (checkInStreak % 7) : 0;
        const reward = CHECK_IN_REWARDS[streak];
        setCheckInStreak(s => s + 1);
        setLastCheckIn(new Date().toISOString());
        addPoints(reward, `Day ${streak + 1} Check-in`);
        return reward;
    }, [canCheckIn, checkInStreak, addPoints]);

    const canSpin = useCallback(() => {
        if (!lastSpin) return true;
        const last = new Date(lastSpin);
        const now = new Date();
        return last.toDateString() !== now.toDateString();
    }, [lastSpin]);

    const spinWheel = useCallback(() => {
        if (!canSpin()) return null;
        const prize = WHEEL_PRIZES[Math.floor(Math.random() * WHEEL_PRIZES.length)];
        setLastSpin(new Date().toISOString());
        if (prize.type === 'coins') addPoints(prize.value, `Spin Wheel: ${prize.label}`);
        return prize;
    }, [canSpin, addPoints]);

    return (
        <LoyaltyContext.Provider value={{
            points, history, currentTier, nextTier, progressToNext,
            checkInStreak, lastCheckIn, lastSpin, redeemedCodes,
            addPoints, redeemPoints, claimDailyCheckIn, canCheckIn, spinWheel, canSpin,
            TIERS, WHEEL_PRIZES, CHECK_IN_REWARDS,
        }}>
            {children}
        </LoyaltyContext.Provider>
    );
}
