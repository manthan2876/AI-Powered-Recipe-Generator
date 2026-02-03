import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const QuickActionFAB = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: '🍳', label: 'Generate', path: '/generate-recipe', color: 'bg-orange-500' },
        { icon: '📸', label: 'Scan', path: '/scan', color: 'bg-blue-500' },
        { icon: '❤️', label: 'Saved', path: '/saved-recipes', color: 'bg-red-500' },
    ];

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col gap-3 items-end">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                <div className="bg-white/90 backdrop-blur text-gray-700 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                                    {item.label}
                                </div>
                                <Link to={item.path}>
                                    <button className={`${item.color} w-10 h-10 rounded-full flex items-center justify-center shadow-lg text-white text-lg hover:scale-110 transition-transform`}>
                                        {item.icon}
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={toggleOpen}
                className="w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center text-2xl hover:bg-primary-dark transition-colors focus:outline-none"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </motion.button>
        </div>
    );
};

export default QuickActionFAB;
