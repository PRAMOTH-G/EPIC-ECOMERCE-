import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Menu, X, User, LogOut, Package, ChevronDown, MapPin, LayoutGrid, Star, Truck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Button from './Button';
import MegaMenu from './MegaMenu';
import SmartSearch from './SmartSearch';
import { motion, AnimatePresence } from 'framer-motion';
import { DEPARTMENTS } from '../lib/data';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const { cart, wishlist } = useCart();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = wishlist.length;

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            setIsMenuOpen(false);
        } catch (error) {
            console.error('Failed to log out', error);
        }
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-2' : 'bg-transparent py-4'}`}>
            {/* Top row */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12 gap-4">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center transform group-hover:rotate-6 transition-transform shadow-lg shadow-green-600/30">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                                FreshMart
                            </span>
                            <p className="text-[9px] text-gray-400 -mt-0.5 font-medium tracking-widest uppercase">Departmental Store</p>
                        </div>
                    </Link>

                    {/* Location pill — desktop */}
                    <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 cursor-pointer hover:bg-green-100 transition-colors flex-shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs font-semibold text-green-700 dark:text-green-300">Delhi, India</span>
                        <ChevronDown className="w-3 h-3 text-green-500" />
                    </div>

                    {/* Smart Search */}
                    <SmartSearch />

                    {/* Desktop actions */}
                    <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
                        {/* Departments mega menu trigger */}
                        <div className="relative">
                            <button
                                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isMegaMenuOpen ? 'bg-green-600 text-white shadow-lg' : 'text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-700'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                                Departments
                                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <Link to="/offers" className="text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1">
                            🔥 Offers
                        </Link>

                        {currentUser ? (
                            <>
                                <Link to="/wishlist" className="relative text-gray-500 hover:text-rose-500 transition-colors p-2">
                                    <Heart className="h-6 w-6" />
                                    {wishlistCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-rose-500 rounded-full">
                                            {wishlistCount}
                                        </span>
                                    )}
                                </Link>

                                <Link to="/cart" className="relative text-gray-500 hover:text-primary-500 transition-colors p-2">
                                    <ShoppingCart className="h-6 w-6" />
                                    {cartCount > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-primary-600 rounded-full shadow-md">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>

                                {/* User dropdown */}
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 focus:outline-none">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 p-[2px]">
                                            <div className="w-full h-full rounded-full bg-white dark:bg-dark-bg overflow-hidden">
                                                <img
                                                    src={currentUser.photoURL || `https://ui-avatars.com/api/?name=${currentUser.email}&background=random`}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-dark-card rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100 z-50">
                                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{currentUser.email}</p>
                                        </div>
                                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">Your Profile</Link>
                                        <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">📦 My Orders</Link>
                                        <Link to="/track-order" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">🚚 Track Order</Link>
                                        <Link to="/wishlist" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">❤️ Wishlist</Link>
                                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">⚙️ Admin</Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
                                <Link to="/signup"><Button variant="primary" size="sm" className="shadow-lg shadow-primary-500/20">Sign up</Button></Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile row */}
                    <div className="flex md:hidden items-center space-x-3">
                        <Link to="/cart" className="relative p-2 text-gray-600">
                            <ShoppingCart className="h-6 w-6" />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-primary-600 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mega Menu (desktop) */}
            <div className="relative">
                <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-gray-100 dark:border-gray-800"
                    >
                        <div className="px-4 pt-3 pb-4 space-y-1">
                            {/* Mobile Search */}
                            <div className="mb-3">
                                <SmartSearch onClose={() => setIsMenuOpen(false)} />
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2">
                                {DEPARTMENTS.slice(0, 6).map(dept => (
                                    <Link
                                        key={dept.id}
                                        to={`/department/${dept.slug}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex flex-col items-center gap-1 p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-center"
                                    >
                                        <span className="text-xl">{dept.icon}</span>
                                        <span className="text-[9px] font-medium text-gray-700 dark:text-gray-300 leading-tight">{dept.name}</span>
                                    </Link>
                                ))}
                            </div>

                            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Home</Link>
                            <Link to="/offers" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-rose-600 hover:bg-rose-50">🔥 Offers</Link>
                            <Link to="/track-order" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">🚚 Track Order</Link>

                            {currentUser ? (
                                <>
                                    <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">❤️ Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</Link>
                                    <Link to="/orders" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">📦 My Orders</Link>
                                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">⚙️ Admin</Link>
                                    <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50">Sign out</button>
                                </>
                            ) : (
                                <div className="mt-4 flex flex-col space-y-2">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}><Button variant="ghost" className="w-full justify-start">Log in</Button></Link>
                                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}><Button variant="primary" className="w-full">Sign up</Button></Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
