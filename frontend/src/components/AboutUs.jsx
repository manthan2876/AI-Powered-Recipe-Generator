import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlassCard from "./ui/GlassCard";

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="flex-1 p-4 md:p-12 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">
              About Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Revolutionizing home cooking with AI-powered creativity.
            </p>
          </div>

          <GlassCard className="p-8 md:p-12">
            <div className="space-y-6 text-lg leading-relaxed text-black dark:text-white">
              <p>
                We solve the daily question of <span className="font-bold text-primary">"What can I cook with the ingredients I have?"</span>.
                Our unique hybrid AI acts as a reliable "workhorse" to find existing recipes that
                minimize waste, and as a creative "innovator" to generate entirely new dishes
                for culinary inspiration.
              </p>
              <p>
                We offer the best of both worlds: the dependability of a search engine and the
                creative potential of a language model. Whether you're looking for tried-and-true
                recipes or want to experiment with new flavor combinations, we've got you covered.
              </p>
              <p>
                Our mission is to help you make the most of what you have, reduce food waste, and
                discover new culinary possibilities every day.
              </p>
            </div>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutUs;
