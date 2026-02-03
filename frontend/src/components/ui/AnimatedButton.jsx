import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const baseStyles = "px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md transition-all flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-primary text-white hover:bg-red-500 shadow-primary/30",
        secondary: "bg-white/80 text-primary hover:bg-white shadow-black/5",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant] || variants.primary} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;
