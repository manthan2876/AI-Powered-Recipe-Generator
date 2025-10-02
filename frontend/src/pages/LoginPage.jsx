import React, { useState } from 'react';
import { login } from '../services/auth'; // Your authentication service
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Reusable animation variants for Framer Motion
const fadeIn = (direction = 'up', delay = 0) => ({
  initial: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.8,
      delay: delay,
      ease: [0.25, 0.25, 0.25, 0.75],
    },
  },
});

// Stagger animation for the container's children
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function LoginPage() {
  // --- Core Login Logic (Preserved) ---
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(data);
      navigate('/home'); // Redirect after successful login
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  // --- End of Core Logic ---

  return (
    // --- Appearance & Animation ---
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-inter login_main">
      <motion.div
        variants={fadeIn('up')}
        initial="initial"
        animate="animate"
        className="w-full max-w-md p-8 md:p-12 space-y-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20"
      >
        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          animate="animate" 
          className="text-center"
        >
          <motion.h2 variants={fadeIn('down')} className="text-gradient-1 font-commissioner text-4xl lg:text-5xl font-bold tracking-wider py-2">
            Login
          </motion.h2>
          <motion.p variants={fadeIn('down', 0.1)} className="mt-2 text-white/70">
            Welcome back to your CookCanvas.
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <motion.div variants={fadeIn('up', 0.2)}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            />
          </motion.div>
          <motion.div variants={fadeIn('up', 0.3)}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            />
          </motion.div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-center font-semibold"
            >
              {error}
            </motion.p>
          )}

          <motion.div variants={fadeIn('up', 0.4)}>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full font-kalnia text-lg text-white border-2 border-white px-8 py-3 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </motion.div>
        </form>

        <motion.p variants={fadeIn('up', 0.5)} className="text-center text-white/60">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-white hover:underline">
            Register here
          </Link>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}

export default LoginPage;