import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Package } from 'lucide-react';

// Simulated delivery path (lat/lng coordinates - simplified for demo)
const DELIVERY_PATH = [
    [12.9716, 77.5946], // Warehouse
    [12.9720, 77.5980],
    [12.9734, 77.6010],
    [12.9750, 77.6030],
    [12.9771, 77.6058], // Customer location
];

export default function LiveTrackingMap({ orderStatus = 'out_for_delivery' }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markerRef = useRef(null);
    const posIdx = useRef(1); // Start rider at 2nd position

    useEffect(() => {
        // Dynamic import of leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        let L;
        let interval;

        const initMap = async () => {
            L = (await import('leaflet')).default;

            // Fix default marker icons
            delete L.Icon.Default.prototype._getIconUrl;
            L.Icon.Default.mergeOptions({
                iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            });

            if (mapInstance.current) return;

            const map = L.map(mapRef.current, { zoomControl: true, scrollWheelZoom: false })
                .setView(DELIVERY_PATH[0], 14);
            mapInstance.current = map;

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
            }).addTo(map);

            // Draw route line
            L.polyline(DELIVERY_PATH, { color: '#22c55e', weight: 4, opacity: 0.8, dashArray: '8, 6' }).addTo(map);

            // Warehouse icon
            const warehouseIcon = L.divIcon({
                html: `<div style="background:#3b82f6;color:#fff;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🏪</div>`,
                className: '', iconSize: [36, 36], iconAnchor: [18, 18],
            });
            L.marker(DELIVERY_PATH[0], { icon: warehouseIcon }).addTo(map).bindPopup('📦 FreshMart Warehouse');

            // Customer icon
            const homeIcon = L.divIcon({
                html: `<div style="background:#22c55e;color:#fff;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-size:16px;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3)">🏠</div>`,
                className: '', iconSize: [36, 36], iconAnchor: [18, 18],
            });
            L.marker(DELIVERY_PATH[DELIVERY_PATH.length - 1], { icon: homeIcon }).addTo(map).bindPopup('🏠 Your Location');

            // Rider marker
            const riderIcon = L.divIcon({
                html: `<div style="background:#f59e0b;color:#fff;border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid #fff;box-shadow:0 4px 12px rgba(245,158,11,0.5);animation:pulse 1.5s infinite">🛵</div>`,
                className: '', iconSize: [40, 40], iconAnchor: [20, 20],
            });
            const rider = L.marker(DELIVERY_PATH[1], { icon: riderIcon }).addTo(map);
            rider.bindPopup('🛵 Your delivery rider is on the way!');
            markerRef.current = rider;

            // Animate rider movement
            if (orderStatus === 'out_for_delivery') {
                interval = setInterval(() => {
                    posIdx.current = Math.min(posIdx.current + 1, DELIVERY_PATH.length - 1);
                    const pos = DELIVERY_PATH[posIdx.current];
                    markerRef.current?.setLatLng(pos);
                    if (posIdx.current === DELIVERY_PATH.length - 1) clearInterval(interval);
                }, 4000);
            }
        };

        initMap();

        return () => {
            clearInterval(interval);
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [orderStatus]);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                    <span className="text-lg">🛵</span>
                    <div>
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Rider: Raju Kumar</p>
                        <p className="text-[10px] text-amber-600 dark:text-amber-500">⭐ 4.9 • 500+ deliveries</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                    <Clock className="w-4 h-4 text-green-600" />
                    <div>
                        <p className="text-xs font-bold text-green-700 dark:text-green-400">ETA: ~12 minutes</p>
                        <p className="text-[10px] text-green-600 dark:text-green-500">On time ✅</p>
                    </div>
                </div>
            </div>

            {/* Map Container */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                <div ref={mapRef} style={{ height: '340px', width: '100%' }} />
                {/* Overlay legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl px-3 py-2 flex flex-col gap-1.5 shadow-lg border border-gray-100 dark:border-gray-800 text-[11px]">
                    <div className="flex items-center gap-2"><span>🏪</span><span className="text-gray-600 dark:text-gray-300 font-medium">Warehouse</span></div>
                    <div className="flex items-center gap-2"><span>🛵</span><span className="text-gray-600 dark:text-gray-300 font-medium">Your Rider</span></div>
                    <div className="flex items-center gap-2"><span>🏠</span><span className="text-gray-600 dark:text-gray-300 font-medium">Your Location</span></div>
                </div>
            </div>

            <style>{`@keyframes pulse{0%,100%{box-shadow:0 4px 12px rgba(245,158,11,0.5)}50%{box-shadow:0 4px 20px rgba(245,158,11,0.9)}}`}</style>
        </div>
    );
}
