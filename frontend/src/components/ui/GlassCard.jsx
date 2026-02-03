import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hoverEffect = true, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`glass-card p-6 ${className}`}
      whileHover={hoverEffect ? { y: -8, transition: { duration: 0.2 } } : {}}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
