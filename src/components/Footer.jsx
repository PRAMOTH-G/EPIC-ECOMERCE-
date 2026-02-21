import React from 'react';
import { Link } from 'react-router-dom';
import { Store, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { DEPARTMENTS } from '../lib/data';

const Footer = () => {
    const deptCol1 = DEPARTMENTS.slice(0, 5);
    const deptCol2 = DEPARTMENTS.slice(5, 10);
    const deptCol3 = DEPARTMENTS.slice(10, 15);

    return (
        <footer className="bg-white dark:bg-dark-card border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                                <Store className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">FreshMart</span>
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                            Your one-stop departmental store — 15 departments, 70+ products, delivered to your door daily.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-green-500 hover:text-white transition-all duration-300">
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                        {/* Contact */}
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <MapPin className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                <span>42 Greenfield Market, Farmside District, Delhi 110001</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Phone className="w-4 h-4 text-green-500 shrink-0" />
                                <span>+91 98765 43210</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                                <Mail className="w-4 h-4 text-green-500 shrink-0" />
                                <span>hello@freshmart.store</span>
                            </li>
                        </ul>
                    </div>

                    {/* Department Columns */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wider">Fresh & Food</h3>
                        <ul className="space-y-2.5">
                            {deptCol1.map(dept => (
                                <li key={dept.id}>
                                    <Link to={`/department/${dept.slug}`} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm">
                                        <span>{dept.icon}</span> {dept.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wider">Grocery</h3>
                        <ul className="space-y-2.5">
                            {deptCol2.map(dept => (
                                <li key={dept.id}>
                                    <Link to={`/department/${dept.slug}`} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm">
                                        <span>{dept.icon}</span> {dept.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wider">Lifestyle</h3>
                        <ul className="space-y-2.5">
                            {deptCol3.map(dept => (
                                <li key={dept.id}>
                                    <Link to={`/department/${dept.slug}`} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm">
                                        <span>{dept.icon}</span> {dept.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-5 text-sm uppercase tracking-wider">Support</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: '🔥 Offers', path: '/offers' },
                                { label: '📦 My Orders', path: '/orders' },
                                { label: '❤️ Wishlist', path: '/wishlist' },
                                { label: '🚚 Track Order', path: '/track-order' },
                                { label: '⚙️ Admin Panel', path: '/admin' },
                                { label: 'FAQ', path: '/' },
                                { label: 'Delivery Policy', path: '/' },
                                { label: 'Returns & Refunds', path: '/' },
                            ].map(item => (
                                <li key={item.label}>
                                    <Link to={item.path} className="text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800">
                            <p className="text-xs text-green-700 dark:text-green-400 font-medium">🕐 Delivery Hours</p>
                            <p className="text-xs text-green-600 dark:text-green-300 mt-1">Mon–Sat: 7am – 9pm<br />Sun: 8am – 6pm</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 text-center md:text-left">
                        © 2026 FreshMart Departmental Store. All rights reserved. 🛒 Shop Smart.
                    </p>
                    <div className="flex gap-6 items-center">
                        <span className="text-xs text-gray-400">Payment Partners:</span>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50 grayscale hover:grayscale-0 transition-all" />
                        <span className="text-sm opacity-50 hover:opacity-100 transition-all font-bold text-gray-600">UPI</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
