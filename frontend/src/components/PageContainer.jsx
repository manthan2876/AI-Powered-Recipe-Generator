import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

// Animation variants for Framer Motion
export const fadeIn = (direction = 'up', delay = 0) => ({
  initial: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    x: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 1,
      delay: delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

// Stagger animation for container children
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PageContainer = ({ children, className = '', mainClassName = 'landing_main' }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-grow ${mainClassName} ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;