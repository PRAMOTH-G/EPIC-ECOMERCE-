import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Leaf, UserPlus } from 'lucide-react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();
    const navigate = useNavigate();

    const strength = (() => {
        if (!password) return 0;
        let s = 0;
        if (password.length >= 6) s++;
        if (password.length >= 10) s++;
        if (/[A-Z]/.test(password)) s++;
        if (/[0-9!@#$%^&*]/.test(password)) s++;
        return s;
    })();

    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
    const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-500'][strength];

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        if (password !== confirm) return setError('Passwords do not match.');
        setLoading(true);
        try {
            await signup(email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    }

    const field = 'w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all placeholder-gray-400';

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/40 dark:bg-emerald-900/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-200/40 dark:bg-green-900/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 relative z-10"
            >
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-600/30 mb-3">
                        <Leaf className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">FreshMart</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Create your free account today 🌿</p>
                </div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-5 flex items-start gap-2"
                    >
                        <span className="mt-0.5">⚠️</span> {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="email"
                                className={`${field} pl-10`}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showPw ? 'text' : 'password'}
                                className={`${field} pl-10 pr-10`}
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {/* Strength bar */}
                        {password && (
                            <div className="mt-2 space-y-1">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors duration-300 ${i <= strength ? strengthColor : 'bg-gray-200 dark:bg-gray-700'}`} />
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400">Password strength: <span className="font-semibold">{strengthLabel}</span></p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 block">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type={showPw ? 'text' : 'password'}
                                className={`${field} pl-10 ${confirm && confirm !== password ? 'border-red-400 focus:ring-red-300' : confirm && confirm === password ? 'border-green-400' : ''}`}
                                placeholder="Re-enter your password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required
                                autoComplete="new-password"
                            />
                            {confirm && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
                                    {confirm === password ? '✅' : '❌'}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Perks */}
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl px-4 py-3 text-xs text-green-700 dark:text-green-400 space-y-1">
                        {['First order discount with code FRESH10', 'Same-day delivery on orders before 2pm', 'Track every order in real time'].map((perk) => (
                            <p key={perk} className="flex items-center gap-1.5"><span>🌿</span>{perk}</p>
                        ))}
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 transition-colors"
                    >
                        {loading ? (
                            <>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                                Creating Account…
                            </>
                        ) : (
                            <><UserPlus className="w-4 h-4" /> Create Free Account</>
                        )}
                    </motion.button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-green-600 hover:text-green-700">Sign in →</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
