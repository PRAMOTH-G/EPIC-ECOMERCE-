import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Star, ShoppingCart, Heart, Plus, Minus, ZoomIn,
    ChevronLeft, ChevronRight, Package, Truck, Shield, RefreshCw, Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { showToast } from './NotificationToast';
import { Link } from 'react-router-dom';

// Helper - generate extra "angles" by slightly tweaking the base image URL
function buildGallery(product) {
    const base = product.image || '';
    const extras = [
        base,
        `https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80`,
        `https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&auto=format&fit=crop&q=80`,
    ];
    // If the product has an explicit gallery, use it
    return (product.gallery && product.gallery.length > 0) ? product.gallery : extras;
}

const QuickViewModal = ({ product, onClose }) => {
    const { addToCart, toggleWishlist, wishlist, cart, updateQuantity, removeFromCart, addLoyaltyPoints } = useCart();
    const [qty, setQty] = useState(1);
    const [activeImg, setActiveImg] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [adding, setAdding] = useState(false);

    const cartItem = cart.find(i => i.id === product?.id);
    const isWishlisted = wishlist.some(i => i.id === product?.id);
    const gallery = product ? buildGallery(product) : [];
    const discountedPrice = product?.discount > 0
        ? product.price - (product.price * product.discount / 100)
        : null;
    const displayPrice = discountedPrice ?? product?.price ?? 0;

    // Keyboard handling
    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setActiveImg(i => (i + 1) % gallery.length);
            if (e.key === 'ArrowLeft') setActiveImg(i => (i - 1 + gallery.length) % gallery.length);
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [gallery.length, onClose]);

    const handleAddToCart = useCallback(() => {
        if (!product) return;
        setAdding(true);
        addToCart(product, qty);
        if (addLoyaltyPoints) addLoyaltyPoints(Math.floor(product.price / 10) * qty);
        showToast({ type: 'cart', title: 'Added to Cart! 🛒', message: `${qty} × ${product.title}` });
        setTimeout(() => { setAdding(false); }, 800);
    }, [product, qty, addToCart, addLoyaltyPoints]);

    if (!product) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80] flex items-center justify-center p-4"
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                    onClick={e => e.stopPropagation()}
                    className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                >
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                        {/* Left — Image Gallery */}
                        <div className="relative bg-gray-50 dark:bg-gray-800 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl md:rounded-tr-none overflow-hidden">
                            {/* Main Image */}
                            <div
                                className={`relative overflow-hidden aspect-square cursor-zoom-in ${zoomed ? 'scale-150 cursor-zoom-out' : ''} transition-transform duration-300`}
                                onClick={() => setZoomed(z => !z)}
                            >
                                <img
                                    src={gallery[activeImg]}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                    onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop'; }}
                                />
                                {/* Discount badge */}
                                {product.discount > 0 && (
                                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-black rounded-full">
                                        -{product.discount}%
                                    </div>
                                )}
                                {product.isOrganic && (
                                    <div className="absolute top-3 left-16 px-2.5 py-1 bg-green-500 text-white text-xs font-black rounded-full">
                                        🌿 Organic
                                    </div>
                                )}
                                <div className="absolute bottom-3 right-3 p-1.5 bg-white/80 dark:bg-black/50 rounded-lg">
                                    <ZoomIn className="w-4 h-4 text-gray-600" />
                                </div>
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-2 p-3 justify-center">
                                {gallery.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImg(i)}
                                        className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${activeImg === i ? 'border-green-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover"
                                            onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&auto=format&fit=crop'; }} />
                                    </button>
                                ))}
                            </div>

                            {/* Arrows */}
                            <button
                                onClick={() => setActiveImg(i => (i - 1 + gallery.length) % gallery.length)}
                                className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center hover:bg-white shadow-md"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setActiveImg(i => (i + 1) % gallery.length)}
                                className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center hover:bg-white shadow-md"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Right — Details */}
                        <div className="p-6 flex flex-col gap-4">
                            <div>
                                <p className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full inline-block mb-2">{product.category}</p>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">{product.title}</h2>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                                    <span className="text-xs text-gray-400">({product.reviews} reviews)</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-black text-gray-900 dark:text-white">₹{Math.round(displayPrice)}</span>
                                {discountedPrice && (
                                    <>
                                        <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                                        <span className="text-sm font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full">Save ₹{Math.round(product.price - displayPrice)}</span>
                                    </>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">{product.description || `Fresh ${product.title} from FreshMart. Best quality guaranteed.`}</p>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { icon: Truck, label: 'Free Delivery', sub: 'Orders ₹499+' },
                                    { icon: Shield, label: 'Quality Assured', sub: '100% Fresh' },
                                    { icon: RefreshCw, label: 'Easy Returns', sub: '24hr window' },
                                ].map(({ icon: Icon, label, sub }) => (
                                    <div key={label} className="flex flex-col items-center text-center p-2 rounded-xl bg-gray-50 dark:bg-gray-800">
                                        <Icon className="w-4 h-4 text-green-600 mb-1" />
                                        <p className="text-[9px] font-bold text-gray-700 dark:text-gray-300">{label}</p>
                                        <p className="text-[8px] text-gray-400">{sub}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Qty + Add */}
                            {product.stock > 0 ? (
                                <div className="space-y-3">
                                    {cartItem ? (
                                        <div>
                                            <p className="text-xs text-gray-500 mb-2">In your cart:</p>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                                                    <button
                                                        onClick={() => cartItem.quantity <= 1 ? removeFromCart(product.id) : updateQuantity(product.id, cartItem.quantity - 1)}
                                                        className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center shadow-sm"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="text-base font-bold min-w-[28px] text-center">{cartItem.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                                                        className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center shadow-sm"
                                                    >
                                                        <Plus className="w-3.5 h-3.5 text-white" />
                                                    </button>
                                                </div>
                                                <span className="text-sm font-bold text-green-600">₹{Math.round(displayPrice * cartItem.quantity)} total</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                                                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center">
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="text-base font-bold min-w-[28px] text-center">{qty}</span>
                                                <button onClick={() => setQty(q => q + 1)} className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                                                    <Plus className="w-3.5 h-3.5 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex gap-2">
                                        <motion.button
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleAddToCart}
                                            disabled={adding || !!cartItem}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-500/30"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            {cartItem ? 'In Cart ✓' : adding ? 'Adding...' : 'Add to Cart'}
                                        </motion.button>
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all ${isWishlisted ? 'bg-rose-50 border-rose-300 text-rose-500' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400 hover:border-rose-300 hover:text-rose-500'}`}
                                        >
                                            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-yellow-600 text-xs">
                                        <Zap className="w-3.5 h-3.5" />
                                        <span>Earn <strong>{Math.floor(displayPrice / 10) * qty} FreshCoins</strong> on this purchase</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-3 text-center bg-red-50 dark:bg-red-900/20 rounded-2xl text-red-600 font-semibold text-sm">
                                    Out of Stock
                                </div>
                            )}

                            <Link
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                className="text-center text-sm text-green-600 hover:text-green-700 font-semibold hover:underline"
                            >
                                View Full Product Page →
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default QuickViewModal;
