import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, ShoppingBag, Search, Package, Star, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS, DEPARTMENTS } from '../lib/data';

const QUICK_ACTIONS = [
    { icon: '📦', label: 'Track my order', msg: 'track order' },
    { icon: '🛒', label: 'View my cart', msg: 'view cart' },
    { icon: '🔥', label: 'Today\'s deals', msg: 'deals' },
    { icon: '❓', label: 'Help', msg: 'help' },
];

const BOT_RESPONSES = {
    greet: ['Hi there! 👋 I\'m FreshBot, your personal shopping assistant. How can I help you today?'],
    help: ['I can help you with:\n• 🔍 Finding products\n• 📦 Order tracking\n• 🛒 Cart & checkout\n• 🏷️ Deals & offers\n• 📂 Browse departments\n\nJust type what you need!'],
    deals: ['Here are today\'s hottest deals! 🔥', 'Check out our Flash Sale section on the homepage, or visit /offers for exclusive discounts up to 40% off!'],
    order: ['To track your order, visit the Track Order page. I\'ll take you there! 🚀'],
    cart: ['Let me show you your cart right away! 🛒'],
    thanks: ['You\'re welcome! 😊 Happy shopping at FreshMart!'],
    bye: ['Goodbye! 👋 Come back anytime. Happy shopping!'],
    default: ['I\'m not sure about that, but I\'m here to help! Try asking about products, deals, or your orders. 😊'],
};

function getBotReply(message) {
    const msg = message.toLowerCase();
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) return BOT_RESPONSES.greet[0];
    if (msg.includes('help') || msg.includes('what can you')) return BOT_RESPONSES.help[0];
    if (msg.includes('deal') || msg.includes('offer') || msg.includes('discount') || msg.includes('sale')) return BOT_RESPONSES.deals.join(' ');
    if (msg.includes('track') || msg.includes('order status') || msg.includes('where is my')) return BOT_RESPONSES.order[0];
    if (msg.includes('cart') || msg.includes('basket')) return BOT_RESPONSES.cart[0];
    if (msg.includes('thank')) return BOT_RESPONSES.thanks[0];
    if (msg.includes('bye') || msg.includes('goodbye')) return BOT_RESPONSES.bye[0];

    // Product search
    const product = PRODUCTS.find(p => msg.includes(p.title.toLowerCase().split(' ')[0].toLowerCase()));
    if (product) return `Found it! 🎉 **${product.title}** — ₹${product.price}. ${product.isFeatured ? '⭐ Featured pick!' : ''} Check it out in our store!`;

    // Department search
    const dept = DEPARTMENTS.find(d => msg.includes(d.name.toLowerCase()));
    if (dept) return `Great choice! ${dept.icon} The **${dept.name}** department has amazing products. I'll take you there!`;

    return BOT_RESPONSES.default[0];
}

function ChatMessage({ msg }) {
    const isBot = msg.sender === 'bot';
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-2 ${isBot ? 'justify-start' : 'justify-end'}`}
        >
            {isBot && (
                <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-green-600" />
                </div>
            )}
            <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${isBot
                ? 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm border border-gray-100 dark:border-gray-700 rounded-tl-sm'
                : 'bg-green-600 text-white rounded-tr-sm'
                }`}
            >
                {msg.text}
            </div>
        </motion.div>
    );
}

export default function ChatbotAssistant() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi! 👋 I\'m FreshBot. Ask me anything about products, orders, or deals!' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const [unread, setUnread] = useState(1);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const { setSidebarOpen } = useCart();

    useEffect(() => {
        if (open) { setUnread(0); }
    }, [open]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (text) => {
        const userMsg = text || input.trim();
        if (!userMsg) return;
        setInput('');

        const userMessage = { id: Date.now(), sender: 'user', text: userMsg };
        setMessages(prev => [...prev, userMessage]);

        // Handle navigation actions
        const lower = userMsg.toLowerCase();
        setTyping(true);

        setTimeout(() => {
            const reply = getBotReply(userMsg);
            setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: reply }]);
            setTyping(false);

            // Auto navigate for certain actions
            if (lower.includes('track') || lower.includes('order status')) {
                setTimeout(() => navigate('/track-order'), 1000);
            } else if (lower.includes('cart') || lower.includes('basket')) {
                setTimeout(() => setSidebarOpen(true), 800);
            } else if (lower.includes('deal') || lower.includes('offer')) {
                setTimeout(() => navigate('/offers'), 1200);
            } else {
                const dept = DEPARTMENTS.find(d => lower.includes(d.name.toLowerCase()));
                if (dept) setTimeout(() => navigate(`/department/${dept.slug}`), 1200);
            }
        }, 700 + Math.random() * 500);
    };

    return (
        <>
            {/* Floating Bubble */}
            <motion.button
                className="fixed bottom-24 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(o => !o)}
                aria-label="Open chatbot"
            >
                <AnimatePresence mode="wait">
                    {open ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <MessageCircle className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>
                {!open && unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unread}
                    </span>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed bottom-44 right-5 md:bottom-28 md:right-8 z-50 w-[340px] sm:w-[380px] h-[520px] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="px-5 py-4 bg-gradient-to-r from-green-600 to-emerald-600 flex items-center gap-3">
                            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-white text-sm">FreshBot</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                                    <span className="text-green-100 text-[10px]">Always online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                            {messages.map(msg => <ChatMessage key={msg.id} msg={msg} />)}
                            {typing && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 items-center">
                                    <div className="w-7 h-7 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-green-600" />
                                    </div>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center shadow-sm">
                                        {[0, 0.2, 0.4].map((d, i) => (
                                            <motion.div key={i} className="w-2 h-2 bg-gray-400 rounded-full"
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        <div className="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                            {QUICK_ACTIONS.map(action => (
                                <button
                                    key={action.label}
                                    onClick={() => sendMessage(action.msg)}
                                    className="flex-none px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full border border-green-100 dark:border-green-800 hover:bg-green-100 transition-colors whitespace-nowrap"
                                >
                                    {action.icon} {action.label}
                                </button>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="px-4 pb-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                                <input
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-md shadow-green-500/30"
                                >
                                    <Send className="w-4 h-4" />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
