import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, RotateCcw, Check, ChevronRight, AlertCircle, Clock, Truck, CheckCircle2 } from 'lucide-react';
import { showToast } from '../components/NotificationToast';

const RETURN_REASONS = [
    'Product is damaged', 'Wrong item received', 'Quality not as expected',
    'Product expired', 'Changed my mind', 'Duplicate order', 'Other'
];

const PICKUP_SLOTS = [
    { id: 1, date: 'Tomorrow', time: '9 AM – 12 PM' },
    { id: 2, date: 'Tomorrow', time: '2 PM – 6 PM' },
    { id: 3, date: 'Day After', time: '9 AM – 12 PM' },
    { id: 4, date: 'Day After', time: '2 PM – 6 PM' },
];

const STEPS = ['Select Item', 'Reason', 'Pickup Slot', 'Confirm'];

export default function ReturnRefundPage() {
    const [step, setStep] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [reason, setReason] = useState('');
    const [slot, setSlot] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const pastOrders = (() => {
        try {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            return orders.flatMap(o => (o.items || []).map(item => ({ ...item, orderId: o.id, orderDate: o.date })));
        } catch { return []; }
    })();

    const mockItems = pastOrders.length > 0 ? pastOrders.slice(0, 4) : [
        { id: 1, title: 'Organic Apples (1 kg)', price: 89, image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=120', orderId: 'FM2891' },
        { id: 2, title: 'Fresh Tomatoes (500g)', price: 35, image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=120', orderId: 'FM2891' },
    ];

    const handleSubmit = () => {
        setSubmitted(true);
        showToast({ type: 'success', title: '✅ Return Requested!', message: `Pickup on ${slot?.date} ${slot?.time}. Refund in 3-5 business days.` });
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-6">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full text-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </motion.div>
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-3">Return Initiated! 🎉</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Our pickup executive will collect the item on <strong>{slot?.date}</strong> between <strong>{slot?.time}</strong>. Refund will be credited in <strong>3–5 business days</strong>.</p>

                    {/* Refund Timeline */}
                    <div className="bg-white dark:bg-dark-card rounded-3xl p-6 border border-gray-100 dark:border-gray-800 text-left space-y-4 mb-6">
                        {[
                            { done: true, label: 'Return Requested', sub: 'Just now', icon: '📝' },
                            { done: false, label: 'Item Picked Up', sub: `${slot?.date}, ${slot?.time}`, icon: '📦' },
                            { done: false, label: 'Quality Inspection', sub: 'Within 24 hours', icon: '🔍' },
                            { done: false, label: 'Refund Initiated', sub: '2–3 business days', icon: '💸' },
                            { done: false, label: 'Amount Credited', sub: '3–5 business days', icon: '✅' },
                        ].map((s, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${s.done ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                    {s.done ? <Check className="w-4 h-4" /> : <span>{s.icon}</span>}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{s.label}</p>
                                    <p className="text-xs text-gray-400">{s.sub}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <motion.button whileHover={{ scale: 1.04 }} onClick={() => { setSubmitted(false); setStep(0); setSelectedItem(null); setReason(''); setSlot(null); }}
                        className="px-8 py-3 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-colors shadow-lg">
                        Submit Another Return
                    </motion.button>
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gray-50 dark:bg-dark-bg pb-20">
            {/* Header */}
            <div className="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-gray-800 px-4 py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <RotateCcw className="w-5 h-5 text-orange-600" />
                        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Return & Refund</h1>
                    </div>
                    {/* Step Indicator */}
                    <div className="flex items-center gap-0">
                        {STEPS.map((s, i) => (
                            <React.Fragment key={s}>
                                <div className={`flex flex-col items-center ${i <= step ? 'text-green-600' : 'text-gray-400'}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${i < step ? 'bg-green-600 border-green-600 text-white' : i === step ? 'border-green-600 text-green-600' : 'border-gray-200 dark:border-gray-700'}`}>
                                        {i < step ? <Check className="w-4 h-4" /> : i + 1}
                                    </div>
                                    <span className="text-[10px] font-semibold mt-1 whitespace-nowrap hidden sm:block">{s}</span>
                                </div>
                                {i < STEPS.length - 1 && (
                                    <div className={`flex-1 h-0.5 mx-1 transition-all ${i < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-8 space-y-5">
                {/* Step 0: Select Item */}
                {step === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4">Which item do you want to return?</h2>
                        <div className="space-y-3">
                            {mockItems.map(item => (
                                <button key={item.id}
                                    onClick={() => setSelectedItem(item)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${selectedItem?.id === item.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card hover:border-green-200'}`}
                                >
                                    <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover" />
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-gray-800 dark:text-white">{item.title}</p>
                                        <p className="text-xs text-gray-500">Order #{item.orderId} • ₹{item.price}</p>
                                    </div>
                                    {selectedItem?.id === item.id && <Check className="w-5 h-5 text-green-600" />}
                                </button>
                            ))}
                        </div>
                        <motion.button whileHover={{ scale: 1.02 }} onClick={() => selectedItem && setStep(1)}
                            disabled={!selectedItem}
                            className={`w-full mt-6 py-4 rounded-2xl font-black text-lg transition-all ${selectedItem ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
                            Next: Select Reason →
                        </motion.button>
                    </motion.div>
                )}

                {/* Step 1: Reason */}
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4">Why are you returning it?</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {RETURN_REASONS.map(r => (
                                <button key={r} onClick={() => setReason(r)}
                                    className={`p-4 rounded-2xl border-2 text-sm font-semibold text-left transition-all ${reason === r ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 hover:border-green-200'}`}>
                                    {reason === r ? '✅ ' : '○ '}{r}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(0)} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-2xl hover:bg-gray-200 transition-colors">← Back</button>
                            <motion.button whileHover={{ scale: 1.02 }} onClick={() => reason && setStep(2)} disabled={!reason}
                                className={`flex-1 py-3 rounded-2xl font-black transition-all ${reason ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
                                Next: Choose Slot →
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Pickup Slot */}
                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                        <h2 className="text-lg font-black text-gray-900 dark:text-white mb-4">Choose a pickup slot</h2>
                        <div className="grid grid-cols-2 gap-3">
                            {PICKUP_SLOTS.map(s => (
                                <button key={s.id} onClick={() => setSlot(s)}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all ${slot?.id === s.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-card hover:border-green-200'}`}>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{s.date}</p>
                                    <p className="text-xs text-gray-500 mt-1">🕐 {s.time}</p>
                                    {slot?.id === s.id && <Check className="w-4 h-4 text-green-600 mt-2" />}
                                </button>
                            ))}
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-2xl hover:bg-gray-200 transition-colors">← Back</button>
                            <motion.button whileHover={{ scale: 1.02 }} onClick={() => slot && setStep(3)} disabled={!slot}
                                className={`flex-1 py-3 rounded-2xl font-black transition-all ${slot ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}>
                                Next: Review →
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                        <h2 className="text-lg font-black text-gray-900 dark:text-white">Confirm Return Request</h2>
                        <div className="bg-white dark:bg-dark-card rounded-3xl p-5 border border-gray-100 dark:border-gray-800 space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b border-gray-100 dark:border-gray-800">
                                <img src={selectedItem?.image} alt="" className="w-12 h-12 rounded-xl object-cover" />
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-white">{selectedItem?.title}</p>
                                    <p className="text-xs text-gray-500">₹{selectedItem?.price}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                    <p className="text-gray-400 text-xs">Return Reason</p>
                                    <p className="font-semibold text-gray-800 dark:text-white mt-0.5">{reason}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs">Pickup Slot</p>
                                    <p className="font-semibold text-gray-800 dark:text-white mt-0.5">{slot?.date}, {slot?.time}</p>
                                </div>
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-xs text-blue-700 dark:text-blue-400">Refund will be credited to your original payment method within 3–5 business days after inspection.</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setStep(2)} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold rounded-2xl hover:bg-gray-200 transition-colors">← Back</button>
                            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleSubmit}
                                className="flex-1 py-3 bg-green-600 text-white font-black rounded-2xl hover:bg-green-700 shadow-lg transition-colors">
                                Confirm Return Request ✅
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
}
