import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, ShoppingCart, Plus, Minus, Eye, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, compact = false }) => {
    const { addToCart, toggleWishlist, wishlist, cart, updateQuantity, removeFromCart } = useCart();
    const isWishlisted = wishlist.some(item => item.id === product.id);
    const cartItem = cart.find(item => item.id === product.id);
    const [isAdding, setIsAdding] = useState(false);
    const [imgError, setImgError] = useState(false);
    const cardRef = useRef(null);

    const handleAddToCart = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (product.stock === 0) return;
        setIsAdding(true);
        addToCart(product);
        setTimeout(() => setIsAdding(false), 900);
    };

    const discountedPrice = product.discount > 0
        ? product.price - (product.price * product.discount / 100)
        : null;
    const displayPrice = discountedPrice ?? product.price;

    // Reliable fallback image per category — all IDs are stable/verified
    const fallbackImages = {
        'Fruits & Vegetables': 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format&fit=crop&q=80',
        'Spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
        'Masala Products': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&auto=format&fit=crop&q=80',
        'Dairy Products': 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=80',
        'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&auto=format&fit=crop&q=80',
        'Snacks & Packaged Foods': 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&auto=format&fit=crop&q=80',
        'Bakery Products': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&auto=format&fit=crop&q=80',
        'Meat Varieties': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c1?w=500&auto=format&fit=crop&q=80',
        'Flour Varieties': 'https://images.unsplash.com/photo-1621496832759-a0d2e3ab0a98?w=500&auto=format&fit=crop&q=80',
        'Household Essentials': 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=500&auto=format&fit=crop&q=80',
        'Ice Creams & Frozen Items': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&auto=format&fit=crop&q=80',
        'Bathroom & Personal Care': 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&auto=format&fit=crop&q=80',
        'Organic & Healthy Products': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&auto=format&fit=crop&q=80',
        'Baby Care Products': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80',
        'Pet Care Products': 'https://images.unsplash.com/photo-1589924691995-400dc9eef119?w=500&auto=format&fit=crop&q=80',
    };
    const fallback = fallbackImages[product.category] || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';

    return (
        <motion.div
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-white dark:bg-dark-card rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-md hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-400 magnetic-card card-shine flex flex-col"
        >
            {/* Top Badges */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-1.5">
                {product.discount > 0 && (
                    <motion.span
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="bg-rose-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-rose-500/30"
                    >
                        -{product.discount}%
                    </motion.span>
                )}
                {product.isOrganic && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-emerald-500/30 flex items-center gap-0.5">
                        🌿 Organic
                    </span>
                )}
                {product.isFeatured && !product.discount && !product.isOrganic && (
                    <span className="bg-amber-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg shadow-amber-400/30">
                        ⭐ Featured
                    </span>
                )}
            </div>

            {/* Wishlist Button */}
            <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-md shadow-md transition-all duration-300 ${isWishlisted
                    ? 'bg-rose-500 text-white shadow-rose-500/40'
                    : 'bg-white/90 dark:bg-black/50 text-gray-400 hover:text-rose-500'
                    }`}
            >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </motion.button>

            {/* Image */}
            <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-50 dark:bg-gray-800/50" style={{ aspectRatio: '1/1' }}>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />

                {/* Quick View overlay pill */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none"
                >
                    <Eye className="w-3 h-3" /> Quick View
                </motion.div>

                <img
                    src={imgError ? fallback : product.image}
                    alt={product.title}
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover transform group-hover:scale-[1.07] transition-transform duration-600 ease-out"
                />

                {/* Out of stock overlay */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-white/60 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
                        <span className="bg-gray-800 text-white text-xs font-bold px-4 py-2 rounded-full">Sold Out</span>
                    </div>
                )}
            </Link>

            {/* Content */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                {/* Category pill + stock */}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-100 dark:border-green-800 truncate max-w-[55%]">
                        {product.category}
                    </span>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${product.stock > 20
                        ? 'border-green-200 text-green-700 dark:border-green-800 dark:text-green-400'
                        : product.stock > 0
                            ? 'border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-400'
                            : 'border-red-200 text-red-600'
                        }`}>
                        {product.stock > 20 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Sold Out'}
                    </span>
                </div>

                {/* Title */}
                <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug hover:text-green-600 dark:hover:text-green-400 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-700'}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                    {product.reviews && (
                        <span className="text-[10px] text-gray-400">({product.reviews})</span>
                    )}
                </div>

                {/* Price + Add to cart */}
                <div className="flex items-center justify-between pt-1 mt-auto">
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-black text-green-600 dark:text-green-400">
                                ₹{displayPrice.toFixed(0)}
                            </span>
                            {product.unit && (
                                <span className="text-[10px] text-gray-400">/{product.unit}</span>
                            )}
                        </div>
                        {discountedPrice && (
                            <span className="text-xs text-gray-400 line-through">
                                ₹{product.price.toFixed(0)}
                            </span>
                        )}
                    </div>

                    {/* Cart button — shows quantity controls if already in cart */}
                    <AnimatePresence mode="wait">
                        {cartItem ? (
                            <motion.div
                                key="qty"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-1"
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (cartItem.quantity <= 1) {
                                            removeFromCart(product.id);
                                        } else {
                                            updateQuantity(product.id, cartItem.quantity - 1);
                                        }
                                    }}
                                    className="w-7 h-7 rounded-lg bg-white dark:bg-dark-card text-green-600 flex items-center justify-center shadow-sm hover:bg-green-600 hover:text-white transition-all font-bold"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-6 text-center text-sm font-bold text-green-700 dark:text-green-300">
                                    {cartItem.quantity}
                                </span>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-7 h-7 rounded-lg bg-green-600 text-white flex items-center justify-center shadow-sm hover:bg-green-700 transition-all"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </motion.div>
                        ) : (
                            <motion.button
                                key="add"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.92 }}
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                                className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 btn-liquid overflow-hidden ${product.stock === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : isAdding
                                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/40 scale-95'
                                        : 'bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-500/30 neon-green'
                                    }`}
                            >
                                <AnimatePresence mode="wait">
                                    {isAdding ? (
                                        <motion.span
                                            key="added"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-1"
                                        >
                                            <Zap className="w-4 h-4" /> Added!
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="add"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-1"
                                        >
                                            <ShoppingCart className="w-4 h-4" /> Add
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
