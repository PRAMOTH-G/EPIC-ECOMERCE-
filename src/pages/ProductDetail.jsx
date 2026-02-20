import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Truck, RefreshCw, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../lib/data';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
    const { id } = useParams();
    const product = PRODUCTS.find(p => p.id === parseInt(id));
    const { addToCart, toggleWishlist, wishlist } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);

    if (!product) {
        return <div className="min-h-screen pt-24 text-center">Product not found</div>;
    }

    const isWishlisted = wishlist.some(item => item.id === product.id);
    const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    // Mock multiple images
    const images = [
        product.image,
        "https://images.unsplash.com/photo-1524678606372-571d75dc1e8a?w=500&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60"
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex text-sm text-gray-500 mb-8 space-x-2">
                <Link to="/" className="hover:text-primary-600">Home</Link>
                <span>/</span>
                <Link to="/products" className="hover:text-primary-600">{product.category}</Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">{product.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                {/* Images */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative shadow-neumorphic dark:shadow-neumorphic-dark group"
                    >
                        <motion.img
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            src={images[selectedImage]}
                            alt={product.title}
                            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                            onClick={() => toggleWishlist(product)}
                            className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-red-50 transition-colors"
                        >
                            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                    </motion.div>
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedImage(idx)}
                                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-primary-500 scale-95' : 'border-transparent hover:border-gray-200'}`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold font-display text-gray-900 dark:text-white mb-2">{product.title}</h1>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                            <span className="text-gray-500">({product.reviews} reviews)</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-end space-x-4">
                        <span className="text-4xl font-bold text-primary-600">${product.price}</span>
                        {product.discount > 0 && (
                            <div className="flex flex-col mb-1">
                                <span className="text-lg text-gray-400 line-through">${(product.price * (1 + product.discount / 100)).toFixed(2)}</span>
                                <span className="text-red-500 font-bold text-sm">Save {product.discount}%</span>
                            </div>
                        )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <Button
                            variant="primary"
                            size="lg"
                            className="flex-1 space-x-2"
                            onClick={() => addToCart(product)}
                            disabled={product.stock === 0}
                        >
                            <ShoppingCart className="w-5 h-5" />
                            <span>Add to Cart</span>
                        </Button>
                        <Button variant="secondary" size="lg" className="flex-1">
                            Buy Now
                        </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-6">
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-dark-card rounded-xl">
                            <Truck className="w-6 h-6 text-primary-500 mb-2" />
                            <span className="text-xs font-medium">Free Delivery</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-dark-card rounded-xl">
                            <RefreshCw className="w-6 h-6 text-primary-500 mb-2" />
                            <span className="text-xs font-medium">30 Days Return</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 dark:bg-dark-card rounded-xl">
                            <ShieldCheck className="w-6 h-6 text-primary-500 mb-2" />
                            <span className="text-xs font-medium">1 Year Warranty</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold font-display mb-8">Similar Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetail;
