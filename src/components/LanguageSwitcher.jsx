import React, { useState } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Supported languages
export const LANGUAGES = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
];

// Simple translations for key UI strings
export const STRINGS = {
    en: {
        addToCart: 'Add to Cart',
        outOfStock: 'Out of Stock',
        viewAll: 'View All',
        freshDelivery: 'Fresh Delivery in 30 mins',
        search: 'Search groceries...',
        cart: 'Cart',
        orders: 'Orders',
        home: 'Home',
        profile: 'Profile',
        deals: 'Deals',
        subscribe: 'Subscribe & Save',
        organic: 'Organic',
        flashSale: '⚡ Flash Sale',
    },
    hi: {
        addToCart: 'कार्ट में डालें',
        outOfStock: 'स्टॉक में नहीं',
        viewAll: 'सब देखें',
        freshDelivery: '30 मिनट में ताज़ा डिलीवरी',
        search: 'खोजें...',
        cart: 'कार्ट',
        orders: 'ऑर्डर',
        home: 'होम',
        profile: 'प्रोफ़ाइल',
        deals: 'डील',
        subscribe: 'सब्सक्राइब & बचाएं',
        organic: 'जैविक',
        flashSale: '⚡ फ्लैश सेल',
    },
    ta: {
        addToCart: 'கூடைக்கு சேர்',
        outOfStock: 'கையிருப்பு இல்லை',
        viewAll: 'அனைத்தும் காண்க',
        freshDelivery: '30 நிமிடத்தில் டெலிவரி',
        search: 'தேடுங்கள்...',
        cart: 'கூடை',
        orders: 'ஆர்டர்கள்',
        home: 'முகப்பு',
        profile: 'சுயவிவரம்',
        deals: 'சலுகைகள்',
        subscribe: 'சந்தா & சேமி',
        organic: 'இயற்கை',
        flashSale: '⚡ ஃபிளாஷ் சேல்',
    },
    te: {
        addToCart: 'కార్ట్‌కు జోడించు',
        outOfStock: 'స్టాక్ లేదు',
        viewAll: 'అన్నీ చూడు',
        freshDelivery: '30 నిమిషాల్లో డెలివరీ',
        search: 'వెతకండి...',
        cart: 'కార్ట్',
        orders: 'ఆర్డర్లు',
        home: 'హోం',
        profile: 'ప్రొఫైల్',
        deals: 'డీల్స్',
        subscribe: 'సబ్‌స్క్రైబ్ & సేవ్',
        organic: 'సేంద్రీయ',
        flashSale: '⚡ ఫ్లాష్ సేల్',
    },
    kn: {
        addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸು',
        outOfStock: 'ಸ್ಟಾಕ್ ಇಲ್ಲ',
        viewAll: 'ಎಲ್ಲ ನೋಡು',
        freshDelivery: '30 ನಿಮಿಷದಲ್ಲಿ ಡೆಲಿವರಿ',
        search: 'ಹುಡುಕಿ...',
        cart: 'ಕಾರ್ಟ್',
        orders: 'ಆರ್ಡರ್‌ಗಳು',
        home: 'ಮನೆ',
        profile: 'ಪ್ರೊಫೈಲ್',
        deals: 'ಡೀಲ್ಸ್',
        subscribe: 'ಸಬ್ಸ್ಕ್ರೈಬ್ & ಉಳಿಸು',
        organic: 'ಸಾವಯವ',
        flashSale: '⚡ ಫ್ಲ್ಯಾಶ್ ಸೇಲ್',
    },
    mr: {
        addToCart: 'कार्टमध्ये टाका',
        outOfStock: 'स्टॉक नाही',
        viewAll: 'सर्व पाहा',
        freshDelivery: '30 मिनिटांत ताजी डिलिव्हरी',
        search: 'शोधा...',
        cart: 'कार्ट',
        orders: 'ऑर्डर',
        home: 'होम',
        profile: 'प्रोफाइल',
        deals: 'डील',
        subscribe: 'सदस्य व्हा & बचत करा',
        organic: 'सेंद्रिय',
        flashSale: '⚡ फ्लॅश सेल',
    },
};

// Hook to use translations — call as: const t = useTranslation();  t('addToCart')
let _lang = 'en';
let _langListeners = [];

export function useTranslation() {
    const [lang, setLang] = useState(_lang);
    React.useEffect(() => {
        _langListeners.push(setLang);
        return () => { _langListeners = _langListeners.filter(f => f !== setLang); };
    }, []);
    return (key) => STRINGS[lang]?.[key] || STRINGS['en'][key] || key;
}

export function setLanguage(code) {
    _lang = code;
    _langListeners.forEach(fn => fn(code));
    localStorage.setItem('fm_lang', code);
}

// Init from localStorage
if (typeof localStorage !== 'undefined') {
    const saved = localStorage.getItem('fm_lang');
    if (saved && STRINGS[saved]) _lang = saved;
}

// ── Language Switcher Component ───────────────────────────────
const LanguageSwitcher = () => {
    const [open, setOpen] = useState(false);
    const [activeLang, setActiveLang] = useState(_lang);

    const handleSelect = (code) => {
        setLanguage(code);
        setActiveLang(code);
        setOpen(false);
    };

    const current = LANGUAGES.find(l => l.code === activeLang) || LANGUAGES[0];

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(v => !v)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-semibold text-gray-700 dark:text-gray-300"
                title="Change Language"
            >
                <span className="text-base">{current.flag}</span>
                <span className="hidden sm:block text-xs">{current.native}</span>
                <Globe className="w-3.5 h-3.5" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden"
                    >
                        {LANGUAGES.map(lang => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelect(lang.code)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${activeLang === lang.code ? 'bg-green-50 dark:bg-green-900/20' : ''}`}
                            >
                                <span className="text-base">{lang.flag}</span>
                                <div>
                                    <p className="text-xs font-bold text-gray-800 dark:text-white">{lang.native}</p>
                                    <p className="text-[10px] text-gray-400">{lang.label}</p>
                                </div>
                                {activeLang === lang.code && (
                                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500" />
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSwitcher;
