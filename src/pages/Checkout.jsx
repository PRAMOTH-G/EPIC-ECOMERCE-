import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard, Lock, MapPin, ChevronRight, Eye, EyeOff,
    CheckCircle, Smartphone, X, Leaf, ShoppingBag
} from 'lucide-react';

// ── Helpers ────────────────────────────────────────────────────────
const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
};

const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
};

const detectCardType = (number) => {
    const n = number.replace(/\s/g, '');
    if (/^4/.test(n)) return { type: 'Visa', color: '#1A1F71', logo: '💳' };
    if (/^5[1-5]/.test(n)) return { type: 'Mastercard', color: '#EB001B', logo: '💳' };
    if (/^3[47]/.test(n)) return { type: 'Amex', color: '#007BC1', logo: '💳' };
    if (/^6(?:011|5)/.test(n)) return { type: 'Discover', color: '#FF6600', logo: '💳' };
    return null;
};

const luhnCheck = (num) => {
    const arr = num.replace(/\s/g, '').split('').reverse().map(Number);
    return arr.reduce((acc, val, i) => {
        if (i % 2 !== 0) val = val * 2 > 9 ? val * 2 - 9 : val * 2;
        return acc + val;
    }, 0) % 10 === 0;
};

const StepIndicator = ({ steps, currentStep }) => (
    <div className="flex items-center justify-center mb-10">
        {steps.map((step, i) => (
            <React.Fragment key={i}>
                <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                        ${i < currentStep ? 'bg-green-500 text-white' :
                            i === currentStep ? 'bg-green-600 text-white ring-4 ring-green-200 dark:ring-green-800' :
                                'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                        {i < currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
                    </div>
                    <span className={`text-xs mt-1 font-medium ${i === currentStep ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
                </div>
                {i < steps.length - 1 && (
                    <div className={`h-0.5 w-16 sm:w-24 mx-2 mb-5 transition-colors duration-300 ${i < currentStep ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                )}
            </React.Fragment>
        ))}
    </div>
);

// ── Processing overlay ──────────────────────────────────────────────
const ProcessingOverlay = ({ status }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
        <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-10 text-center max-w-sm w-full mx-4 shadow-2xl"
        >
            {status === 'processing' && (
                <>
                    <div className="relative w-20 h-20 mx-auto mb-6">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            className="w-20 h-20 rounded-full border-4 border-green-100 border-t-green-600"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Lock className="w-7 h-7 text-green-600" />
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Processing Payment</h3>
                    <p className="text-gray-500 text-sm">Please wait. Do not close this page…</p>
                    <div className="flex justify-center gap-1.5 mt-5">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-green-500"
                                animate={{ y: [-4, 4, -4] }}
                                transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.2 }}
                            />
                        ))}
                    </div>
                </>
            )}
            {status === 'success' && (
                <>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h3>
                    <p className="text-gray-500 text-sm">Redirecting you to your order confirmation…</p>
                </>
            )}
            {status === 'failed' && (
                <>
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <X className="w-10 h-10 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Payment Declined</h3>
                    <p className="text-gray-500 text-sm">Your card was declined. Please check your details and try again.</p>
                </>
            )}
        </motion.div>
    </motion.div>
);

// ── Main Component ───────────────────────────────────────────────────
const Checkout = () => {
    const { cartTotal, cart, clearCart } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // Pick up promo state passed from cart
    const passedState = location.state || {};
    const promoDiscount = passedState.discount || 0;
    const promoCode = passedState.promoCode || null;
    const shippingCost = passedState.shippingCost !== undefined ? passedState.shippingCost : (cartTotal >= 50 ? 0 : 4.99);
    const tax = passedState.tax !== undefined ? passedState.tax : cartTotal * 0.08;
    const orderTotal = passedState.orderTotal !== undefined ? passedState.orderTotal : (cartTotal - promoDiscount + shippingCost + tax);

    // Steps: 0 = Delivery, 1 = Payment
    const [step, setStep] = useState(0);

    // Delivery form
    const [delivery, setDelivery] = useState({ name: '', phone: '', address: '', city: '', zip: '', instructions: '' });
    const [deliveryErrors, setDeliveryErrors] = useState({});

    // Payment form
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [showCvv, setShowCvv] = useState(false);
    const [payMethod, setPayMethod] = useState('card'); // 'card' | 'upi'
    const [upiId, setUpiId] = useState('');
    const [payErrors, setPayErrors] = useState({});

    // Processing overlay
    const [overlayStatus, setOverlayStatus] = useState(null); // null | 'processing' | 'success' | 'failed'

    const cardInfo = detectCardType(cardNumber);

    // Redirect if cart is empty and overlay is not active
    if (cart.length === 0 && !overlayStatus) {
        return (
            <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center px-4 gap-4">
                <ShoppingBag className="w-16 h-16 text-gray-300" />
                <p className="text-gray-500 text-lg">Your cart is empty.</p>
                <Link to="/" className="text-green-600 hover:underline font-medium">Go back to shop →</Link>
            </div>
        );
    }

    // ── Validate delivery ──────────────────────────────────────────
    const validateDelivery = () => {
        const errs = {};
        if (!delivery.name.trim()) errs.name = 'Full name is required.';
        if (!delivery.phone.trim()) errs.phone = 'Phone number is required.';
        if (!delivery.address.trim()) errs.address = 'Address is required.';
        if (!delivery.city.trim()) errs.city = 'City is required.';
        if (!delivery.zip.trim()) errs.zip = 'ZIP / PIN code is required.';
        setDeliveryErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // ── Validate payment ───────────────────────────────────────────
    const validatePayment = () => {
        const errs = {};
        if (payMethod === 'card') {
            const raw = cardNumber.replace(/\s/g, '');
            if (raw.length < 13 || raw.length > 16) errs.cardNumber = 'Enter a valid card number.';
            else if (!luhnCheck(raw)) errs.cardNumber = 'This card number is invalid.';
            if (!cardName.trim()) errs.cardName = 'Name on card is required.';
            // Expiry
            const [mm, yy] = expiry.split('/');
            const expDate = new Date(2000 + parseInt(yy || '0'), parseInt(mm || '0') - 1, 1);
            if (!mm || !yy || expDate < new Date()) errs.expiry = 'Enter a valid future expiry date.';
            if (!cvv || cvv.length < 3) errs.cvv = 'Enter a valid CVV.';
        } else {
            if (!upiId.trim() || !upiId.includes('@')) errs.upiId = 'Enter a valid UPI ID (e.g. name@upi).';
        }
        setPayErrors(errs);
        return Object.keys(errs).length === 0;
    };

    // ── Submit payment ─────────────────────────────────────────────
    const handlePayment = () => {
        if (!validatePayment()) return;

        setOverlayStatus('processing');

        // Simulate a 50% chance of failure for demo; override — always succeed in real demo
        const willSucceed = true; // set to Math.random() > 0.2 to test failures

        setTimeout(() => {
            if (willSucceed) {
                setOverlayStatus('success');
                // Build and persist order for tracking
                const orderId = 'FM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
                const newOrder = {
                    id: orderId,
                    date: new Date().toISOString(),
                    items: cart,
                    delivery,
                    promoCode,
                    promoDiscount,
                    shippingCost,
                    tax,
                    orderTotal,
                    payMethod,
                    status: 'confirmed',   // confirmed → packing → out_for_delivery → delivered
                };
                const existing = JSON.parse(localStorage.getItem('fm_orders') || '[]');
                localStorage.setItem('fm_orders', JSON.stringify([newOrder, ...existing]));

                setTimeout(() => {
                    clearCart();
                    navigate('/success', { state: { orderId } });
                }, 1500);
            } else {
                setOverlayStatus('failed');
                setTimeout(() => setOverlayStatus(null), 3000);
            }
        }, 2500);
    };

    const fieldClass = (err) =>
        `w-full px-4 py-3 rounded-xl border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all
        ${err ? 'border-red-400 focus:ring-red-300' : 'border-gray-200 dark:border-gray-700 focus:ring-green-400 focus:border-green-400'}`;

    return (
        <>
            {/* Processing Overlay */}
            <AnimatePresence>
                {overlayStatus && <ProcessingOverlay status={overlayStatus} />}
            </AnimatePresence>

            <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                {/* Page title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">FreshMart</span>
                    </div>
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">Secure Checkout</h1>
                    <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
                        <Lock className="w-3.5 h-3.5 text-green-600" />
                        All transactions are 256-bit SSL encrypted
                    </p>
                </div>

                {/* Step Indicator */}
                <StepIndicator steps={['Delivery', 'Payment']} currentStep={step} />

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* ── Left: Forms ──────────────────────────── */}
                    <div className="lg:col-span-3 space-y-6">

                        {/* ── STEP 0: Delivery ──────────────────── */}
                        <AnimatePresence mode="wait">
                            {step === 0 && (
                                <motion.div
                                    key="delivery"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 30 }}
                                    className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
                                >
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-green-600" />
                                        Delivery Address
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Full Name */}
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Full Name *</label>
                                            <input
                                                className={fieldClass(deliveryErrors.name)}
                                                placeholder="John Doe"
                                                value={delivery.name}
                                                onChange={(e) => setDelivery({ ...delivery, name: e.target.value })}
                                            />
                                            {deliveryErrors.name && <p className="mt-1 text-xs text-red-500">{deliveryErrors.name}</p>}
                                        </div>
                                        {/* Phone */}
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Phone Number *</label>
                                            <input
                                                className={fieldClass(deliveryErrors.phone)}
                                                placeholder="+1 (555) 000-0000"
                                                value={delivery.phone}
                                                onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                                            />
                                            {deliveryErrors.phone && <p className="mt-1 text-xs text-red-500">{deliveryErrors.phone}</p>}
                                        </div>
                                        {/* Address */}
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Street Address *</label>
                                            <input
                                                className={fieldClass(deliveryErrors.address)}
                                                placeholder="123 Main St, Apt 4B"
                                                value={delivery.address}
                                                onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                                            />
                                            {deliveryErrors.address && <p className="mt-1 text-xs text-red-500">{deliveryErrors.address}</p>}
                                        </div>
                                        {/* City */}
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">City *</label>
                                            <input
                                                className={fieldClass(deliveryErrors.city)}
                                                placeholder="New York"
                                                value={delivery.city}
                                                onChange={(e) => setDelivery({ ...delivery, city: e.target.value })}
                                            />
                                            {deliveryErrors.city && <p className="mt-1 text-xs text-red-500">{deliveryErrors.city}</p>}
                                        </div>
                                        {/* ZIP */}
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">ZIP / PIN Code *</label>
                                            <input
                                                className={fieldClass(deliveryErrors.zip)}
                                                placeholder="10001"
                                                value={delivery.zip}
                                                onChange={(e) => setDelivery({ ...delivery, zip: e.target.value })}
                                            />
                                            {deliveryErrors.zip && <p className="mt-1 text-xs text-red-500">{deliveryErrors.zip}</p>}
                                        </div>
                                        {/* Special Instructions */}
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Delivery Instructions <span className="text-gray-400 font-normal">(optional)</span></label>
                                            <textarea
                                                rows={2}
                                                className={`${fieldClass(false)} resize-none`}
                                                placeholder="Leave at door, ring bell, etc."
                                                value={delivery.instructions}
                                                onChange={(e) => setDelivery({ ...delivery, instructions: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => validateDelivery() && setStep(1)}
                                        className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-600/20"
                                    >
                                        Continue to Payment
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.button>
                                </motion.div>
                            )}

                            {/* ── STEP 1: Payment ────────────────── */}
                            {step === 1 && (
                                <motion.div
                                    key="payment"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    className="space-y-5"
                                >
                                    {/* Payment Method Tabs */}
                                    <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                                            <CreditCard className="w-5 h-5 text-green-600" />
                                            Payment Method
                                        </h2>

                                        {/* Method selector */}
                                        <div className="flex gap-3 mb-6">
                                            {[
                                                { id: 'card', label: '💳 Card', desc: 'Credit / Debit' },
                                                { id: 'upi', label: '📱 UPI', desc: 'Instant pay' },
                                            ].map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => setPayMethod(m.id)}
                                                    className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all
                                                        ${payMethod === m.id
                                                            ? 'border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                                            : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                                >
                                                    {m.label}
                                                    <p className="text-xs font-normal opacity-70 mt-0.5">{m.desc}</p>
                                                </button>
                                            ))}
                                        </div>

                                        {/* ── Card form ─────────────────── */}
                                        {payMethod === 'card' && (
                                            <div className="space-y-4">
                                                {/* Live Card Preview */}
                                                <div
                                                    className="relative rounded-2xl p-6 text-white overflow-hidden h-44 flex flex-col justify-between"
                                                    style={{ background: cardInfo ? `linear-gradient(135deg, ${cardInfo.color}cc, ${cardInfo.color}88)` : 'linear-gradient(135deg, #1a7a4a, #2ecc71)' }}
                                                >
                                                    <div className="absolute inset-0 opacity-10"
                                                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.12) 10px, rgba(255,255,255,0.12) 20px)' }} />
                                                    <div className="flex justify-between items-start relative z-10">
                                                        <span className="text-xs font-semibold opacity-80 tracking-widest uppercase">
                                                            {cardInfo ? cardInfo.type : 'FreshMart Pay'}
                                                        </span>
                                                        <div className="flex gap-1">
                                                            <div className="w-8 h-8 rounded-full bg-white/30" />
                                                            <div className="w-8 h-8 rounded-full bg-white/20 -ml-3" />
                                                        </div>
                                                    </div>
                                                    <div className="relative z-10">
                                                        <p className="font-mono text-lg tracking-widest mb-2 text-white/90">
                                                            {cardNumber || '•••• •••• •••• ••••'}
                                                        </p>
                                                        <div className="flex justify-between items-end">
                                                            <div>
                                                                <p className="text-[10px] uppercase opacity-60 tracking-wider">Card Holder</p>
                                                                <p className="text-sm font-semibold uppercase tracking-wide truncate max-w-[160px]">
                                                                    {cardName || 'YOUR NAME'}
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[10px] uppercase opacity-60 tracking-wider">Expires</p>
                                                                <p className="text-sm font-semibold">{expiry || 'MM/YY'}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Card Number */}
                                                <div>
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Card Number *</label>
                                                    <div className="relative">
                                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                        <input
                                                            className={`${fieldClass(payErrors.cardNumber)} pl-10 font-mono tracking-widest`}
                                                            placeholder="0000 0000 0000 0000"
                                                            value={cardNumber}
                                                            inputMode="numeric"
                                                            maxLength={19}
                                                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                        />
                                                        {cardInfo && (
                                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
                                                                {cardInfo.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {payErrors.cardNumber && <p className="mt-1 text-xs text-red-500">{payErrors.cardNumber}</p>}
                                                </div>

                                                {/* Card Name */}
                                                <div>
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Name on Card *</label>
                                                    <input
                                                        className={fieldClass(payErrors.cardName)}
                                                        placeholder="John Doe"
                                                        value={cardName}
                                                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                                    />
                                                    {payErrors.cardName && <p className="mt-1 text-xs text-red-500">{payErrors.cardName}</p>}
                                                </div>

                                                {/* Expiry + CVV */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Expiry Date *</label>
                                                        <input
                                                            className={`${fieldClass(payErrors.expiry)} font-mono`}
                                                            placeholder="MM/YY"
                                                            value={expiry}
                                                            maxLength={5}
                                                            inputMode="numeric"
                                                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                                        />
                                                        {payErrors.expiry && <p className="mt-1 text-xs text-red-500">{payErrors.expiry}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">CVV *</label>
                                                        <div className="relative">
                                                            <input
                                                                className={`${fieldClass(payErrors.cvv)} font-mono pr-10`}
                                                                placeholder="•••"
                                                                type={showCvv ? 'text' : 'password'}
                                                                value={cvv}
                                                                maxLength={4}
                                                                inputMode="numeric"
                                                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => setShowCvv(!showCvv)}
                                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                                            >
                                                                {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                            </button>
                                                        </div>
                                                        {payErrors.cvv && <p className="mt-1 text-xs text-red-500">{payErrors.cvv}</p>}
                                                    </div>
                                                </div>

                                                {/* Test card hint */}
                                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
                                                    <strong>🧪 Demo mode:</strong> Use card <strong>4111 1111 1111 1111</strong>, any future date, any CVV.
                                                </div>
                                            </div>
                                        )}

                                        {/* ── UPI form ──────────────────── */}
                                        {payMethod === 'upi' && (
                                            <div className="space-y-4">
                                                <div className="text-center py-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                                                    <Smartphone className="w-10 h-10 text-green-600 mx-auto mb-3" />
                                                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pay via UPI</p>
                                                    <p className="text-xs text-gray-400 mt-1">Google Pay · PhonePe · Paytm · Any UPI app</p>
                                                </div>
                                                <div>
                                                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">UPI ID *</label>
                                                    <input
                                                        className={fieldClass(payErrors.upiId)}
                                                        placeholder="yourname@upi"
                                                        value={upiId}
                                                        onChange={(e) => setUpiId(e.target.value)}
                                                    />
                                                    {payErrors.upiId && <p className="mt-1 text-xs text-red-500">{payErrors.upiId}</p>}
                                                </div>
                                                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
                                                    <strong>🧪 Demo mode:</strong> Enter any UPI ID like <strong>demo@upi</strong> to simulate payment.
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Security badges */}
                                    <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium py-2">
                                        <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5 text-green-500" /> 256-bit SSL</span>
                                        <span className="flex items-center gap-1">🔐 PCI DSS Compliant</span>
                                        <span className="flex items-center gap-1">🛡️ 3D Secure</span>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setStep(0)}
                                            className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                                        >
                                            ← Back
                                        </button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={handlePayment}
                                            className="flex-[2] bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 transition-colors"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Pay ${orderTotal.toFixed(2)} Securely
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ── Right: Order Summary ─────────────────── */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-2"
                    >
                        <div className="bg-white dark:bg-dark-card rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm sticky top-24">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">Your Order</h3>

                            {/* Item list */}
                            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-5">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3">
                                        <div className="relative">
                                            <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover bg-gray-100 shrink-0" />
                                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                                            <p className="text-xs text-gray-400">{item.category}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Price breakdown */}
                            <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2.5 text-sm">
                                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                                </div>
                                {promoDiscount > 0 && (
                                    <div className="flex justify-between text-green-600 dark:text-green-400">
                                        <span>Discount ({promoCode?.code})</span>
                                        <span className="font-medium">-${promoDiscount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                    <span>Delivery</span>
                                    <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                                        {shippingCost === 0 ? '🎉 Free' : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                    <span>Tax (8%)</span>
                                    <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-center">
                                    <span className="text-base font-bold text-gray-900 dark:text-white">Total</span>
                                    <span className="text-xl font-bold text-green-600">${orderTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Payment logos */}
                            <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <p className="text-xs text-gray-400 mb-3 text-center">We accept</p>
                                <div className="flex justify-center gap-3 flex-wrap">
                                    {[
                                        { label: 'VISA', color: '#1A1F71' },
                                        { label: 'MC', color: '#EB001B' },
                                        { label: 'AMEX', color: '#007BC1' },
                                        { label: 'UPI', color: '#5f259f' },
                                    ].map((c) => (
                                        <span
                                            key={c.label}
                                            className="text-[10px] font-bold px-2.5 py-1 rounded-md text-white"
                                            style={{ backgroundColor: c.color }}
                                        >{c.label}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
