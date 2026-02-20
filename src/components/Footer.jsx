import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">FreshMart</span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Your neighbourhood grocery store, online. We bring farm-fresh fruits, vegetables and pantry essentials to your door — every single day.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { label: 'Home', path: '/' },
                                { label: 'Fresh Fruits', path: '/' },
                                { label: 'Vegetables', path: '/' },
                                { label: 'Dairy & Eggs', path: '/' },
                                { label: 'Pantry & Bakery', path: '/' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link to={item.path} className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-6">Support</h3>
                        <ul className="space-y-3">
                            {['FAQ', 'Delivery Policy', 'Returns & Refunds', 'Privacy Policy', 'Terms of Service'].map((item) => (
                                <li key={item}>
                                    <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-6">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-5 h-5 text-green-500 shrink-0" />
                                <span>42 Greenfield Market,<br />Farmside District, CA 94043</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Phone className="w-5 h-5 text-green-500 shrink-0" />
                                <span>+1 (800) FRESH-99</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Mail className="w-5 h-5 text-green-500 shrink-0" />
                                <span>hello@freshmart.store</span>
                            </li>
                        </ul>
                        <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                            <p className="text-xs text-green-700 dark:text-green-400 font-medium">🕐 Delivery Hours</p>
                            <p className="text-xs text-green-600 dark:text-green-300 mt-1">Mon–Sat: 7am – 9pm<br />Sun: 8am – 6pm</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 text-center md:text-left">
                        © 2026 FreshMart Inc. All rights reserved. 🌿 Freshness Guaranteed.
                    </p>
                    <div className="flex gap-6">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
