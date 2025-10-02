import React from "react";
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

// Animation variants for Framer Motion
const fadeIn = (direction = 'up', delay = 0) => ({
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

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow landing_main">
        <section className="min-h-[80vh] flex items-center justify-center text-center p-6 sm:p-8">
          <div>
            <motion.h1 
              variants={fadeIn('right', 0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-gradient-2 font-commissioner text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider md:tracking-[0.5rem] leading-tight"
            >
              Welcome to Your Recipe & Shopping List App
            </motion.h1>
            <motion.p 
              variants={fadeIn('left', 0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-imprima text-white text-base md:text-lg lg:text-xl tracking-widest mt-6 md:mt-8 max-w-3xl mx-auto"
            >
              Organize your meal planning and shopping with ease.
            </motion.p>
            <motion.div 
              variants={fadeIn('up', 0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/recipes" className="inline-flex items-center justify-center font-kalnia text-lg md:text-xl text-white border-2 border-white px-8 py-4 hover:scale-105 transition-transform duration-200">
                Browse Recipes
              </Link>
              <Link to="/shopping-lists" className="inline-flex items-center justify-center font-kalnia text-lg md:text-xl text-white border-2 border-white px-8 py-4 hover:scale-105 transition-transform duration-200">
                Your Shopping Lists
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="min-h-screen w-full flex items-center justify-center bg-black/50 backdrop-blur-md p-6 sm:p-8">
          <div className="w-full max-w-screen-xl mx-auto">
            <motion.h2 
              variants={fadeIn('down', 0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider md:tracking-[0.5rem] text-center mb-12"
            >
              Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'Save and manage your favorite recipes',
                'Create shopping lists automatically from chosen recipes',
                'Generate recipes using AI based on ingredients you have',
                'User authentication and personalized accounts'
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn(index % 2 === 0 ? 'left' : 'right', 0.2 + index * 0.1)}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-white/20"
                >
                  <p className="font-imprima text-white text-lg md:text-xl">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="min-h-[50vh] flex items-center justify-center text-center p-8 sm:p-12 md:p-24">
          <div>
            <motion.h2 
              variants={fadeIn('right', 0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider md:tracking-[0.5rem]"
            >
              Why Choose Us?
            </motion.h2>
            <motion.p 
              variants={fadeIn('left', 0.2)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="font-imprima text-white text-base md:text-lg mt-8 max-w-4xl mx-auto leading-relaxed md:leading-loose tracking-wider"
            >
              Our app simplifies meal planning by combining recipe management and shopping list generation in one powerful, easy to use tool.
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
