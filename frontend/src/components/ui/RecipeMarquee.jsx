import React from 'react';
import { motion } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80",
];

const RecipeMarquee = () => {
    return (
        <div className="w-full overflow-hidden py-12 bg-white/30 backdrop-blur-sm border-y border-white/40">
            <div className="flex relative">
                <motion.div
                    className="flex gap-8 flex-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20
                    }}
                >
                    {[...images, ...images, ...images, ...images].map((src, index) => (
                        <div key={index} className="w-64 h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                            <img
                                src={src}
                                alt="Food"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default RecipeMarquee;
