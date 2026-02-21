import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const Wishlist = () => {
    const { wishlist, toggleWishlist, addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"
        >
            <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-500 fill-rose-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">My Wishlist</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-gray-400 space-y-6">
                    <motion.div
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="text-7xl"
                    >
                        💔
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">Your wishlist is empty</h2>
                    <p className="text-gray-400 text-center max-w-sm">
                        Browse our departments and tap the heart icon to save your favourite products here.
                    </p>
                    <Link to="/">
                        <Button variant="primary" className="rounded-xl px-8 flex items-center gap-2">
                            Start Shopping <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.05 }}
                            layout
                            className="group bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-lg p-4 hover:shadow-2xl transition-all"
                        >
                            <div className="relative mb-4">
                                {product.discount > 0 && (
                                    <div className="absolute top-2 left-2 z-10 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                        -{product.discount}%
                                    </div>
                                )}
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className="absolute top-2 right-2 z-10 p-2 bg-white/90 dark:bg-black/50 backdrop-blur-md rounded-full shadow hover:scale-110 transition-all"
                                >
                                    <Trash2 className="w-4 h-4 text-rose-500" />
                                </button>
                                <Link to={`/product/${product.id}`}>
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-40 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                                    />
                                </Link>
                            </div>

                            <div className="px-1 space-y-2">
                                <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                                    {product.category}
                                </span>
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-green-600 text-sm mt-1">
                                        {product.title}
                                    </h3>
                                </Link>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">${product.price.toFixed(2)}</span>
                                    {product.discount > 0 && (
                                        <span className="text-xs text-gray-400 line-through">${(product.price * (1 + product.discount / 100)).toFixed(2)}</span>
                                    )}
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    className="w-full rounded-xl py-2 text-sm flex items-center justify-center gap-2"
                                    onClick={() => { addToCart(product); toggleWishlist(product); }}
                                    disabled={product.stock === 0}
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    {product.stock === 0 ? 'Out of Stock' : 'Move to Cart'}
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
};

export default Wishlist;
