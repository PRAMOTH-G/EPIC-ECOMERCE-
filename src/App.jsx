import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LoyaltyProvider } from './context/LoyaltyContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import BottomNav from './components/BottomNav';
import NotificationToast from './components/NotificationToast';
import ChatbotAssistant from './components/ChatbotAssistant';
import { ComparisonBar } from './pages/Compare';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import TrackOrder from './pages/TrackOrder';
import Department from './pages/Department';
import Offers from './pages/Offers';
import Wishlist from './pages/Wishlist';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import ShoppingList from './pages/ShoppingList';
import ComparePage from './pages/Compare';
// New pages
import LoyaltyPage from './pages/Loyalty';
import ReferralPage from './pages/Referral';
import SubscriptionPage from './pages/Subscription';
import ReturnRefundPage from './pages/ReturnRefund';

// Register PWA service worker
function registerSW() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(() => { });
        });
    }
}

function App() {
    useEffect(() => { registerSW(); }, []);

    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <LoyaltyProvider>
                        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
                            <Navbar />
                            {/* Global overlays */}
                            <CartSidebar />
                            <NotificationToast />
                            {/* Floating comparison bar */}
                            <ComparisonBar />
                            {/* AI Chatbot */}
                            <ChatbotAssistant />
                            <main className="flex-grow pb-16 md:pb-0">
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/signup" element={<Signup />} />
                                    <Route path="/product/:id" element={<ProductDetail />} />
                                    <Route path="/cart" element={<Cart />} />
                                    <Route path="/checkout" element={<Checkout />} />
                                    <Route path="/success" element={<Success />} />
                                    <Route path="/track-order" element={<TrackOrder />} />
                                    <Route path="/department/:slug" element={<Department />} />
                                    <Route path="/offers" element={<Offers />} />
                                    <Route path="/wishlist" element={<Wishlist />} />
                                    <Route path="/orders" element={<Orders />} />
                                    <Route path="/admin" element={<Admin />} />
                                    <Route path="/shopping-list" element={<ShoppingList />} />
                                    <Route path="/compare" element={<ComparePage />} />
                                    {/* New Feature Routes */}
                                    <Route path="/loyalty" element={<LoyaltyPage />} />
                                    <Route path="/referral" element={<ReferralPage />} />
                                    <Route path="/subscription" element={<SubscriptionPage />} />
                                    <Route path="/return" element={<ReturnRefundPage />} />
                                </Routes>
                            </main>
                            <Footer />
                            {/* Mobile Bottom Navigation */}
                            <BottomNav />
                        </div>
                    </LoyaltyProvider>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
