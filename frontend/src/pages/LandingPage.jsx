import React, { useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GlassCard from '../components/ui/GlassCard';
import AnimatedButton from '../components/ui/AnimatedButton';
import IngredientChip from '../components/ui/IngredientChip';
import ScrollProgress from '../components/ui/ScrollProgress';
import QuickActionFAB from '../components/ui/QuickActionFAB';
import ErrorBoundary from '../components/ErrorBoundary';

// Lazy load heavy visual components
const RecipeMarquee = React.lazy(() => import('../components/ui/RecipeMarquee'));
const ParallaxSection = React.lazy(() => import('../components/ui/ParallaxSection'));

function LandingPage() {
  const [demoIngredients, setDemoIngredients] = useState(['Tomato', 'Basil', 'Mozzarella', 'Pasta']);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <ScrollProgress />
      <QuickActionFAB />
      <Header />

      <main className="flex-1 relative">
        {/* Animated Background Blobs */}
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-4 container mx-auto text-center flex flex-col items-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.span
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block py-1 px-4 rounded-full bg-white/70 backdrop-blur-md border border-white/50 text-sm font-bold text-primary mb-6 shadow-sm uppercase tracking-wide"
            >
              ✨ The Future of Home Cooking
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight">
              Turn Your Fridge into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-500 to-red-500 animate-gradient-x">5-Star Meals</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join 50,000+ home chefs who use our AI to reduce food waste and discover delicious new recipes instantly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
              <Link to="/home">
                <AnimatedButton variant="primary" className="text-lg px-10 py-4 shadow-xl shadow-primary/20 hover:shadow-primary/40">
                  Cook Something Now
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </AnimatedButton>
              </Link>
              <Link to="/about-us">
                <AnimatedButton variant="secondary" className="text-lg px-8 py-4 bg-white hover:bg-gray-50">
                  Watch Demo
                </AnimatedButton>
              </Link>
            </div>
          </motion.div>

          {/* Interactive Demo Interface */}
          <ErrorBoundary>
            <ParallaxSection offset={30} className="w-full max-w-5xl mx-auto">
              <GlassCard className="border border-white/60 bg-white/40 backdrop-blur-xl relative overflow-hidden shadow-2xl rounded-3xl">
                {/* Decorative Top Bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-secondary" />

                <div className="flex flex-col md:flex-row gap-10 items-center p-8">
                  {/* Left: Input Simulation */}
                  <div className="flex-1 text-left w-full space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="flex h-3 w-3 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        What's in your pantry?
                      </h3>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">AI Mode: On</span>
                    </div>

                    <div className="p-4 bg-white/60 rounded-xl border border-white min-h-[120px]">
                      <div className="flex flex-wrap gap-2">
                        {demoIngredients.map((ing) => (
                          <IngredientChip key={ing} name={ing} active={true} />
                        ))}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1 rounded-full border-2 border-dashed border-gray-300 text-gray-400 text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                        >
                          + Add Item
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Result Simulation */}
                  <div className="w-full md:w-2/5">
                    <GlassCard className="bg-white !p-4 transform transition-all duration-500 hover:rotate-2 !shadow-xl border-none">
                      <div className="w-full h-40 bg-gray-100 rounded-xl mb-4 overflow-hidden relative group cursor-pointer">
                        <img
                          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80"
                          alt="Pasta"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white font-bold border-2 border-white px-4 py-1 rounded-full">View Recipe</span>
                        </div>
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-xs font-bold text-green-600">
                          98% Match
                        </div>
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 leading-tight">Creamy Tomato Basil Pasta</h4>
                      <div className="flex gap-3 mt-3 text-xs font-medium text-gray-500">
                        <span className="flex items-center gap-1">🕒 15m</span>
                        <span className="flex items-center gap-1">🔥 320 kcal</span>
                        <span className="flex items-center gap-1">👨‍👩‍👧‍👦 2 servings</span>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </GlassCard>
            </ParallaxSection>
          </ErrorBoundary>
        </section>

        {/* Infinite Marquee Section */}
        <section className="py-10 bg-gray-50/50">
          <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Discover Endless Possibilities</p>
          <ErrorBoundary>
            <Suspense fallback={<div className="h-40 w-full bg-gray-200 animate-pulse"></div>}>
              <RecipeMarquee />
            </Suspense>
          </ErrorBoundary>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 container mx-auto relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Why Cook To Go?</h2>
            <p className="text-gray-200 text-lg">We don't just find recipes. We help you manage your kitchen, save money, and eat better every single day.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔎', title: 'Smart Search', desc: 'Our advanced AI algorithm understands flavor profiles, not just keywords.' },
              { icon: '❤️', title: 'Save Favorites', desc: 'Build your personal digital cookbook. Organize by meal type, occasion, or dietary goal.' },
              { icon: '📱', title: 'Mobile First', desc: 'Designed for the kitchen. Big buttons, clear text, and easy navigation while you cook.' }
            ].map((feature, idx) => (
              <GlassCard key={idx} delay={idx * 0.1} className="hover:bg-white/80 transition-colors h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6 text-3xl shadow-inner">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-200 leading-relaxed">
                  {feature.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4">
          <ErrorBoundary>
            <div className="container mx-auto max-w-4xl">
              <GlassCard className="!p-10 md:!p-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 text-center relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-[80px]"></div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">Get Fresh Recipes Weekly</h2>
                <p className="text-white/80 mb-8 max-w-lg mx-auto relative z-10">Join our community newsletter for exclusive chef tips, weekly meal plans, and new features.</p>

                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white/80 backdrop-blur"
                  />
                  <AnimatedButton variant="primary" type="submit" className="whitespace-nowrap">
                    Subscribe
                  </AnimatedButton>
                </form>
              </GlassCard>
            </div>
          </ErrorBoundary>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
