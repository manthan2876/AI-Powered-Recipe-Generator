import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowDownIcon, InstagramIcon } from '../components/Icons'; 

// Animation variants for Framer Motion (no changes needed here)
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

const Hero = () => (
  <section className="min-h-screen flex items-center justify-center text-center p-6 sm:p-8">
    <div>
      <motion.h1 
        variants={fadeIn('right', 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="text-gradient-2 font-commissioner text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider md:tracking-[0.5rem] leading-tight"
      >
        Cook Something Delicious with What You Have
      </motion.h1>
      <motion.p 
        variants={fadeIn('left', 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="font-imprima text-white text-base md:text-lg lg:text-xl tracking-widest mt-6 md:mt-8 max-w-3xl mx-auto"
      >
        Enter your ingredients and find recipes you can cook at home instantly.
      </motion.p>
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-10 md:mt-12"
      >
        <Link to="/home" className="inline-flex items-center justify-center font-kalnia text-lg md:text-xl text-white border-2 border-white px-8 py-4 hover:scale-105 transition-transform duration-200">
          Get Started <ArrowRightIcon />
        </Link>
      </motion.div>
    </div>
  </section>
);

const FeatureSection = ({ id, image, title, description, buttonText, buttonIcon,redirectLink, imageSide = 'left' }) => {
  const isImageLeft = imageSide === 'left';
  return (
    <section id={id} className="min-h-screen w-full flex items-center justify-center bg-black/50 backdrop-blur-md">
      <div className={`flex flex-col md:flex-row w-full max-w-screen-2xl mx-auto ${isImageLeft ? '' : 'md:flex-row-reverse'}`}>
        <motion.div 
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.06 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="w-full md:w-4/10 h-96 md:h-[94vh] overflow-hidden"
        >
          <img src={image} alt={title} className="w-full h-full object-cover object-cneter" />
        </motion.div>
        <div className="w-full md:w-1/2 flex items-center justify-cent  er p-8 md:p-16 lg:p-24">
          <div className={`w-full text-center ${isImageLeft ? 'md:text-left' : 'md:text-right'}`}>
            <motion.p variants={fadeIn('down')} initial="initial" whileInView="animate" viewport={{ once: true }} className="font-inter uppercase text-white tracking-[0.4rem] text-sm">Features</motion.p>
            <motion.h2 variants={fadeIn(isImageLeft ? 'right' : 'left')} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider md:tracking-[0.5rem] mt-4">{title}</motion.h2>
            <motion.p variants={fadeIn(isImageLeft ? 'left' : 'right')} initial="initial" whileInView="animate" viewport={{ once: true }} className="font-imprima text-white text-base md:text-lg mt-6">{description}</motion.p>
            <motion.div variants={fadeIn('up')} initial="initial" whileInView="animate" viewport={{ once: true }} className="mt-12">
              <a href={redirectLink} className={`inline-flex items-center justify-center font-kalnia text-base text-white md:text-lg text-white border-2 border-white px-8 py-4 hover:scale-105 transition-transform duration-200`}>
                {buttonText} {buttonIcon}
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
    <section id="about" className="min-h-screen flex items-center justify-center text-center p-8 sm:p-12 md:p-24">
        <div>
            <motion.h2 variants={fadeIn('right')} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-gradient-1 font-commissioner text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider md:tracking-[0.5rem]">About Us</motion.h2>
            <motion.p variants={fadeIn('left')} initial="initial" whileInView="animate" viewport={{ once: true }} className="font-imprima text-white text-base md:text-lg mt-8 max-w-4xl mx-auto leading-relaxed md:leading-loose tracking-wider">
                CookCanvas, we solve the daily question of "What can I cook with the ingredients I have?". Our unique hybrid AI acts as a reliable "workhorse" to find existing recipes that minimize waste, and as a creative "innovator" to generate entirely new dishes for culinary inspiration. We offer the best of both worlds: the dependability of a search engine and the creative potential of a language model.
            </motion.p>
            <motion.div className="flex items-center justify-center gap-6 md:gap-8 mt-12">
                <motion.a href="#" variants={fadeIn('up', 0.2)} initial="initial" whileInView="animate" viewport={{ once: true }} className="text-white border-2 border-white p-3 md:p-4 text-3xl md:text-4xl hover:scale-110 transition-transform">
                    <InstagramIcon />
                </motion.a>
                {/* Add other icons similarly with increasing delay for a staggered effect */}
            </motion.div>
        </div>
    </section>
);


function LandingPage() {
  return (
    <main className='landing_main'>
      <Hero />
      <div id="features">
        <FeatureSection 
          id="one"
          image="/assets/img01.jpg"
          title="Recipe Search"
          description="Find recipes based on ingredients you have at home."
          buttonText="Start Finding"
          buttonIcon={<ArrowRightIcon />}
          redirectLink="/recipes"
          imageSide="left"
        />
        <FeatureSection 
          id="two"
          image="/assets/img02.jpg"
          title="Save Favorites"
          description="Keep your favorite recipes saved for easy access."
          buttonText="Let's Find Recipes"
          buttonIcon={<ArrowRightIcon />}
          redirectLink="/saved-recipes"
          imageSide="right"
        />
        <FeatureSection 
          id="three"
          image="/assets/img03.jpg"
          title="Step-by-Step Instructions"
          description="Follow clear instructions to cook delicious meals."
          buttonText="Get Steps"
          buttonIcon={<ArrowRightIcon />}
          redirectLink="/generate-recipe"
          imageSide="left"
        />
      </div>
      <AboutSection />
    </main>
  );
}

export default LandingPage;