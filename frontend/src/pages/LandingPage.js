import React, { useState, useEffect } from 'react';
import { ChefHat, Sparkles, Heart, Lightbulb } from 'lucide-react';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <ChefHat />,
      title: "AI-powered Recipe Generator",
      description: "Innovative AI-powered recipe generator helping you cook creative meals with what's in your kitchen. No more food waste, only delicious possibilities.",
    },
    {
      icon: <Sparkles />,
      title: "Easy to Use",
      description: "Everything you need to create amazing meals with AI-powered intelligence.",
    },
    {
      icon: <Heart />,
      title: "Loved by Users",
      description: "Join thousands of happy home chefs transforming their cooking.",
    },
  ];

  return (
    <div>
      <header className={scrolled ? "header scrolled" : "header"}>
        <h1>Welcome to AI Recipe Maker</h1>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? "Close Menu" : "Open Menu"}
        </button>
      </header>

      <section>
        <h2>Features</h2>
        <ul>
          {features.map((feature, i) => (
            <li key={i}>
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
