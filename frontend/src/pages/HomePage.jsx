import React from "react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";

function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-white">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 relative z-10 flex flex-col items-center">

        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-5xl text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold font-display text-white mb-6 leading-tight"
          >
            Welcome to Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">
              Smart Kitchen
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Organize your meal planning, generate creative recipes from leftovers, and manage your shopping with the power of AI.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/recipes">
              <AnimatedButton variant="primary" className="w-full sm:w-auto text-lg px-8 py-4 shadow-lg shadow-primary/25">
                Browse Recipes
              </AnimatedButton>
            </Link>
            <Link to="/shopping-lists">
              <AnimatedButton variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
                Your Shopping Lists
              </AnimatedButton>
            </Link>
          </motion.div>
        </motion.section>

        <section className="w-full max-w-6xl mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold font-display text-white mb-2">Platform Features</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: "🍲",
                  title: "Recipe Management",
                  desc: "Save, organize, and edit your favorite recipes in one beautiful digital cookbook."
                },
                {
                  icon: "🛒",
                  title: "Smart Shopping",
                  desc: "Automatically generate shopping lists from your selected recipes with one click."
                },
                {
                  icon: "🤖",
                  title: "AI Generation",
                  desc: "Turn random ingredients into 5-star meals using our advanced AI chef engine."
                },
                {
                  icon: "🔒",
                  title: "Secure Cloud",
                  desc: "Your data is safe and synced across all your devices with secure authentication."
                }
              ].map((feature, index) => (
                <GlassCard
                  key={index}
                  className="h-full flex flex-col items-center text-center p-6 bg-white/40 hover:bg-white/60 transition-colors"
                  delay={index * 0.1}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-white to-gray-100 rounded-full shadow-lg flex items-center justify-center text-3xl mb-4 border border-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    {feature.desc}
                  </p>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
