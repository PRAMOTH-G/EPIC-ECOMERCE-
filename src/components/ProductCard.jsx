import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Button from './Button';

const ProductCard = ({ product }) => {
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const isWishlisted = wishlist.some(item => item.id === product.id);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-dark-card rounded-3xl p-4 shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-900/20"
        >
            {/* Discount Badge */}
            {product.discount > 0 && (
                <div className="absolute top-4 left-4 z-20 bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-secondary-500/30 flex items-center gap-1">
                    <span>-{product.discount}%</span>
                </div>
            )}

            {/* Organic Badge */}
            {product.isOrganic && !product.discount && (
                <div className="absolute top-4 left-4 z-20 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    🌿 Organic
                </div>
            )}

            {/* Featured Star */}
            {product.isFeatured && (
                <div className="absolute top-4 right-14 z-20">
                    <span className="text-amber-400 text-sm">⭐</span>
                </div>
            )}

            {/* Wishlist Button */}
            <button
                onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 dark:bg-black/50 backdrop-blur-md shadow-sm hover:scale-110 active:scale-90 transition-all duration-300"
            >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-secondary-500 text-secondary-500' : 'text-gray-400 dark:text-gray-300'}`} />
            </button>

            {/* Image Container */}
            <Link to={`/product/${product.id}`} className="block relative aspect-square mb-4 overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-800/50 group-hover:bg-primary-50/30 dark:group-hover:bg-primary-900/10 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                <motion.img
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform z-0"
                />
            </Link>

            {/* Content */}
            <div className="space-y-3 px-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span>
                        {product.reviews && <span className="text-[10px] text-gray-400">({product.reviews})</span>}
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${product.stock > 0 ? 'border-green-200 text-green-700 dark:border-green-900 dark:text-green-400' : 'border-red-200 text-red-700'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Sold Out'}
                    </span>
                </div>
                {product.category && (
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                        {product.category}
                    </span>
                )}

                <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-primary-500 transition-colors text-lg leading-snug">
                        {product.title}
                    </h3>
                </Link>

                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{product.description}</p>

                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-baseline space-x-1">
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">${product.price.toFixed(2)}</span>
                        {product.unit && <span className="text-xs text-gray-400">/ {product.unit}</span>}
                        {product.discount > 0 && (
                            <span className="text-sm text-gray-400 line-through decoration-gray-400/50 ml-1">
                                ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                            </span>
                        )}
                    </div>

                    <Button
                        variant="primary"
                        size="icon"
                        onClick={() => addToCart(product)}
                        className="rounded-xl w-10 h-10 flex items-center justify-center shadow-lg shadow-primary-500/30 hover:scale-110 active:scale-95 transition-all duration-300"
                        disabled={product.stock === 0}
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
