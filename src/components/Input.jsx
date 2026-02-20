import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = ({ label, id, type = 'text', error, className, ...props }) => {
    return (
        <div className="relative mb-4">
            {label && (
                <label
                    htmlFor={id}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={twMerge(
                    clsx(
                        "w-full px-4 py-3 rounded-lg bg-gray-50 border-2 border-gray-200 focus:border-primary-500 focus:ring-0 transition-colors outline-none dark:bg-dark-card dark:border-gray-700 dark:text-white",
                        error && "border-red-500 focus:border-red-500",
                        className
                    )
                )}
                {...props}
            />
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
