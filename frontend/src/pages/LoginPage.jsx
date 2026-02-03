import React, { useState, useContext, useEffect } from 'react';
import { login } from '../services/auth';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';
import { API_BASE } from '../services/apiConfig';
import GlassCard from '../components/ui/GlassCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import { motion } from 'framer-motion';

function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loginUser } = useContext(AuthContext);
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const userData = await login(data);
      loginUser(userData);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/api/users/auth/google`;
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-display text-gray-800 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-200">Login to continue your culinary journey</p>
          </div>

          <GlassCard className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="chef@example.com"
                  value={data.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/80 dark:focus:bg-white/10 transition-all shadow-inner"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">Password</label>
                  <Link to="/forgot-password" className="text-xs text-primary font-bold hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/40 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/80 dark:focus:bg-white/10 transition-all shadow-inner"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-lg text-red-500 dark:text-red-300 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <AnimatedButton
                type="submit"
                disabled={isLoading}
                variant="primary"
                className="w-full justify-center !py-3 !text-base mt-2"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </AnimatedButton>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl font-semibold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 transition-all shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>

            <p className="text-center mt-8 text-gray-600 dark:text-gray-400 font-medium">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-primary-dark font-bold hover:underline transition-colors">
                Sign up for free
              </Link>
            </p>
          </GlassCard>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
