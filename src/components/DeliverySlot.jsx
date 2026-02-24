import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { DELIVERY_SLOTS } from '../lib/data';

const DeliverySlot = ({ selected, onSelect }) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                Select Delivery Slot
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {DELIVERY_SLOTS.map(slot => {
                    const isSelected = selected?.id === slot.id;
                    return (
                        <motion.button
                            key={slot.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => onSelect(slot)}
                            className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${isSelected
                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 shadow-md shadow-green-500/20'
                                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-green-300 dark:hover:border-green-700'
                                }`}
                        >
                            <span className="text-2xl">{slot.icon}</span>
                            <div className="flex-1 min-w-0">
                                <p className={`font-semibold text-sm ${isSelected ? 'text-green-700 dark:text-green-300' : 'text-gray-900 dark:text-gray-100'}`}>
                                    {slot.label}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{slot.time}</p>
                            </div>
                            <div className="flex-none">
                                {slot.price > 0 ? (
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                                        +₹{slot.price.toFixed(0)}
                                    </span>
                                ) : (
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300' : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500'}`}>
                                        Free
                                    </span>
                                )}
                            </div>

                            {isSelected && (
                                <motion.div
                                    layoutId="slot-indicator"
                                    className="absolute top-2 right-2 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                >
                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
};

export default DeliverySlot;
