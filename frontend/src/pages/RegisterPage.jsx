import React, { useState } from "react";
import { register } from "../services/auth"; // Your authentication service
import { useNavigate, Link } from "react-router-dom";
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

export default function RegisterPage() {
  // --- Core Register Logic (Preserved) ---
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await register({ name: data.name, email: data.email, password: data.password });
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  // --- End of Core Logic ---

  return (
    // --- Appearance & Animation ---
    <div className="min-h-screen w-full flex items-center justify-center p-4 font-inter register_main">
      <motion.div
        variants={fadeIn('up')}
        initial="initial"
        animate="animate"
        className="w-full max-w-md p-8 md:p-12 space-y-6 bg-black/40 backdrop-blur-md rounded-2xl border border-white/20"
      >
        <motion.div 
          variants={staggerContainer} 
          initial="initial" 
          animate="animate" 
          className="text-center"
        >
          <motion.h2 variants={fadeIn('down')} className="text-gradient-1 font-commissioner text-4xl lg:text-5xl font-bold tracking-wider">
            Create Account
          </motion.h2>
          <motion.p variants={fadeIn('down', 0.1)} className="mt-2 text-white/70">
            Start your culinary journey with us.
          </motion.p>
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <motion.div variants={fadeIn('up', 0.2)}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={data.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-transparent border-2 border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            />
          </motion.div>
          <motion.div variants={fadeIn('up', 0.3)}>
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
          <motion.div variants={fadeIn('up', 0.4)}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-transparent border-2 border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            />
          </motion.div>
          <motion.div variants={fadeIn('up', 0.5)}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={data.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-transparent border-2 border-white/40 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            />
          </motion.div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-center font-semibold pt-2"
            >
              {error}
            </motion.p>
          )}

          <motion.div variants={fadeIn('up', 0.6)} className="!mt-8">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full font-kalnia text-lg text-white border-2 border-white px-8 py-3 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-lg"
            >
              {isLoading ? 'Creating Account...' : 'Register'}
            </button>
          </motion.div>
        </form>

        <motion.p variants={fadeIn('up', 0.7)} className="text-center text-white/60">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-white hover:underline">
            Login here
          </Link>
          .
        </motion.p>
      </motion.div>
    </div>
  );
}