import React from 'react';

const Logo = ({ className = "w-8 h-8", color = "currentColor" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full overflow-visible"
            >
                {/* Abstract Flame / Leaf / Chef Hat Fusion */}
                <path
                    d="M50 95C25.1472 95 5 74.8528 5 50C5 25.1472 25.1472 5 50 5C74.8528 5 95 25.1472 95 50C95 74.8528 74.8528 95 50 95Z"
                    className="fill-primary/20 animate-pulse-slow"
                />
                <path
                    d="M50 20C50 20 65 35 65 50C65 65 50 80 50 80C50 80 35 65 35 50C35 35 50 20 50 20Z"
                    className="fill-primary drop-shadow-lg"
                />
                <path
                    d="M50 20C50 20 75 30 75 50C75 70 50 80 50 80"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-50"
                />
                {/* Sparkle for AI */}
                <path
                    d="M75 25L78 18L85 15L78 12L75 5L72 12L65 15L72 18L75 25Z"
                    className="fill-accent animate-bounce"
                />
            </svg>
        </div>
    );
};

export default Logo;
