import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { useLoyalty } from '../context/LoyaltyContext';
import { showToast } from './NotificationToast';

const SEGMENTS = [
    { label: '50 Coins', color: '#22c55e', textColor: '#fff' },
    { label: '10% Off', color: '#3b82f6', textColor: '#fff' },
    { label: '100 Coins', color: '#f59e0b', textColor: '#fff' },
    { label: 'Free Ship', color: '#8b5cf6', textColor: '#fff' },
    { label: '5% Off', color: '#ec4899', textColor: '#fff' },
    { label: '150 Coins', color: '#06b6d4', textColor: '#fff' },
    { label: '15% Off', color: '#f97316', textColor: '#fff' },
    { label: '200 Coins', color: '#10b981', textColor: '#fff' },
];

export default function SpinWheelModal({ onClose }) {
    const { spinWheel, canSpin } = useLoyalty();
    const [spinning, setSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [prize, setPrize] = useState(null);
    const canvasRef = useRef(null);

    const numSegments = SEGMENTS.length;
    const arc = (2 * Math.PI) / numSegments;

    useEffect(() => {
        drawWheel(rotation);
    }, [rotation]);

    function drawWheel(rot) {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const size = canvas.width;
        const center = size / 2;
        const radius = center - 4;
        ctx.clearRect(0, 0, size, size);

        SEGMENTS.forEach((seg, i) => {
            const startAngle = i * arc + rot;
            const endAngle = startAngle + arc;
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.arc(center, center, radius, startAngle, endAngle);
            ctx.fillStyle = seg.color;
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.save();
            ctx.translate(center, center);
            ctx.rotate(startAngle + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 13px Inter, sans-serif';
            ctx.fillText(seg.label, radius - 14, 5);
            ctx.restore();
        });

        // Center circle
        ctx.beginPath();
        ctx.arc(center, center, 28, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    const handleSpin = () => {
        if (spinning || !canSpin()) return;
        setSpinning(true);
        setPrize(null);

        const targetIdx = Math.floor(Math.random() * numSegments);
        const extraSpins = 5 + Math.floor(Math.random() * 3); // 5-7 full rotations
        const totalDeg = 360 * extraSpins + (360 - (targetIdx * (360 / numSegments)) - (180 / numSegments));
        const totalRad = (totalDeg * Math.PI) / 180;

        const duration = 4000;
        const start = performance.now();
        const startRot = rotation;

        const animate = (now) => {
            const elapsed = now - start;
            const t = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - t, 4);
            const current = startRot + totalRad * ease;
            setRotation(current);
            drawWheel(current);

            if (t < 1) {
                requestAnimationFrame(animate);
            } else {
                setSpinning(false);
                const result = spinWheel();
                setPrize(result);
                if (result) {
                    showToast({ type: 'success', title: `🎉 You won: ${result.label}!`, message: result.type === 'coins' ? `+${result.value} FreshCoins added!` : 'Applied to your next order!' });
                }
            }
        };
        requestAnimationFrame(animate);
    };

    const alreadySpun = !canSpin();

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="relative bg-white dark:bg-dark-card rounded-3xl p-8 shadow-2xl max-w-sm w-full text-center"
            >
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                </button>

                <Gift className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-1">Spin & Win! 🎡</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    {alreadySpun ? 'Come back tomorrow for another spin!' : 'One spin per day. Try your luck!'}
                </p>

                {/* Pointer */}
                <div className="relative flex items-center justify-center mb-4">
                    <div className="absolute top-0 z-10 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[22px] border-l-transparent border-r-transparent border-t-red-500 -translate-y-1" />
                    <canvas
                        ref={canvasRef}
                        width={280}
                        height={280}
                        className="rounded-full shadow-xl"
                    />
                </div>

                {/* Prize display */}
                <AnimatePresence>
                    {prize && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            className="mb-4 px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl"
                        >
                            <p className="font-black text-green-700 dark:text-green-400 text-lg">🎉 You won: {prize.label}!</p>
                            <p className="text-xs text-green-600 dark:text-green-500 mt-1">
                                {prize.type === 'coins' ? `${prize.value} FreshCoins added to your account!` : 'Discount applied to your next checkout!'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={!spinning && !alreadySpun ? { scale: 1.04 } : {}}
                    whileTap={!spinning && !alreadySpun ? { scale: 0.96 } : {}}
                    onClick={handleSpin}
                    disabled={spinning || alreadySpun}
                    className={`w-full py-3.5 rounded-2xl font-black text-lg transition-all ${spinning || alreadySpun
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/30 hover:shadow-2xl'
                        }`}
                >
                    {spinning ? '🌀 Spinning...' : alreadySpun ? '✅ Spun Today' : '🎡 Spin Now!'}
                </motion.button>
            </motion.div>
        </motion.div>
    );
}
