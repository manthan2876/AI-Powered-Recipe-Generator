import React from 'react';
import { motion } from 'framer-motion';

const IngredientChip = ({ name, onDelete, onClick, active = false }) => {
    return (
        <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`
        inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer text-sm font-medium transition-colors
        ${active
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white/60 text-gray-700 hover:bg-white border border-gray-200'}
      `}
        >
            <span>{name}</span>
            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className="p-1 hover:bg-black/10 rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            )}
        </motion.div>
    );
};

export default IngredientChip;
