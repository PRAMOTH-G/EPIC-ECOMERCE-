import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Send, ThumbsUp, ChevronDown, ChevronUp, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { showToast } from './NotificationToast';

const INITIAL_QA = [
    {
        id: 1, question: 'Is this product organically grown?', askedBy: 'Priya M.', timeAgo: '3 days ago',
        answers: [{ id: 1, text: 'Yes! All our fruits and vegetables are sourced from certified organic farms. No pesticides used.', by: 'FreshMart Team', timeAgo: '2 days ago', official: true, upvotes: 12 }],
    },
    {
        id: 2, question: 'What is the shelf life after delivery?', askedBy: 'Ankit S.', timeAgo: '1 week ago',
        answers: [{ id: 1, text: 'Typically 5-7 days if refrigerated properly.', by: 'Rahul K.', timeAgo: '6 days ago', official: false, upvotes: 8 }],
    },
];

export default function QASection({ productId }) {
    const { currentUser } = useAuth();
    const [qaItems, setQaItems] = useState(INITIAL_QA);
    const [newQ, setNewQ] = useState('');
    const [expanded, setExpanded] = useState(new Set([1]));
    const [answerInputs, setAnswerInputs] = useState({});

    const toggleExpand = (id) => setExpanded(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
    });

    const submitQuestion = (e) => {
        e.preventDefault();
        if (!newQ.trim()) return;
        if (!currentUser) { showToast({ type: 'error', title: 'Login required', message: 'Please login to ask a question.' }); return; }
        const q = { id: Date.now(), question: newQ.trim(), askedBy: currentUser.displayName || 'You', timeAgo: 'Just now', answers: [] };
        setQaItems(prev => [q, ...prev]);
        setNewQ('');
        showToast({ type: 'success', title: '✅ Question submitted!', message: 'Our team will answer shortly.' });
    };

    const submitAnswer = (questionId) => {
        const text = answerInputs[questionId]?.trim();
        if (!text) return;
        setQaItems(prev => prev.map(q => q.id === questionId
            ? { ...q, answers: [...q.answers, { id: Date.now(), text, by: currentUser?.displayName || 'Anonymous', timeAgo: 'Just now', official: false, upvotes: 0 }] }
            : q
        ));
        setAnswerInputs(prev => ({ ...prev, [questionId]: '' }));
    };

    const upvote = (qId, aId) => {
        setQaItems(prev => prev.map(q => q.id === qId
            ? { ...q, answers: q.answers.map(a => a.id === aId ? { ...a, upvotes: a.upvotes + 1 } : a) }
            : q
        ));
    };

    return (
        <div className="space-y-5">
            <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">Questions & Answers</h2>
                <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full">{qaItems.length}</span>
            </div>

            {/* Ask Question */}
            <form onSubmit={submitQuestion} className="flex gap-2 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                <input
                    value={newQ}
                    onChange={e => setNewQ(e.target.value)}
                    placeholder="Have a question about this product?"
                    className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit"
                    className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors flex items-center gap-1.5"
                >
                    <Send className="w-3.5 h-3.5" /> Ask
                </motion.button>
            </form>

            {/* Q&A List */}
            <div className="space-y-4">
                {qaItems.map(q => (
                    <div key={q.id} className="bg-white dark:bg-dark-card rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                        <button
                            onClick={() => toggleExpand(q.id)}
                            className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <HelpCircle className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-gray-800 dark:text-white">{q.question}</p>
                                <p className="text-[11px] text-gray-400 mt-0.5">Asked by {q.askedBy} • {q.timeAgo} • {q.answers.length} answer{q.answers.length !== 1 ? 's' : ''}</p>
                            </div>
                            {expanded.has(q.id) ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />}
                        </button>

                        <AnimatePresence>
                            {expanded.has(q.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                    className="border-t border-gray-50 dark:border-gray-800"
                                >
                                    <div className="px-4 py-3 space-y-3">
                                        {q.answers.map(a => (
                                            <div key={a.id} className={`flex gap-3 p-3 rounded-xl ${a.official ? 'bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30' : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                                                <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                                    <User className="w-3.5 h-3.5 text-gray-500" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-xs font-bold text-gray-700 dark:text-white">{a.by}</span>
                                                        {a.official && <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[9px] font-black rounded-full">✓ OFFICIAL</span>}
                                                        <span className="text-[10px] text-gray-400 ml-auto">{a.timeAgo}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-700 dark:text-gray-300">{a.text}</p>
                                                    <button onClick={() => upvote(q.id, a.id)} className="flex items-center gap-1 mt-2 text-[11px] text-gray-400 hover:text-green-600 transition-colors">
                                                        <ThumbsUp className="w-3 h-3" /> Helpful ({a.upvotes})
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Answer input */}
                                        <div className="flex gap-2 mt-2">
                                            <input
                                                value={answerInputs[q.id] || ''}
                                                onChange={e => setAnswerInputs(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                placeholder="Write an answer..."
                                                className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                            />
                                            <button onClick={() => submitAnswer(q.id)}
                                                className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 rounded-xl hover:bg-blue-100 hover:text-blue-600 transition-colors text-xs font-bold">
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
