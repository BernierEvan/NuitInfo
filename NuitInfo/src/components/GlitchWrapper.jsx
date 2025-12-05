import React, { useState, useEffect, useRef } from 'react';

const GlitchWrapper = ({ children, intensity = 'medium', className = '' }) => {
    const [style, setStyle] = useState({});
    const wrapperRef = useRef(null);

    // Configuration based on intensity
    const config = {
        low: {
            skewChance: 0.05,
            moveChance: 0.1,
            flashChance: 0.02,
            maxSkew: 5, // degrees
            maxMove: 2, // pixels
        },
        medium: {
            skewChance: 0.15,
            moveChance: 0.3,
            flashChance: 0.05,
            maxSkew: 15,
            maxMove: 5,
        },
        high: {
            skewChance: 0.4,
            moveChance: 0.6,
            flashChance: 0.15,
            maxSkew: 30,
            maxMove: 10,
        }
    };

    const currentConfig = config[intensity] || config.medium;

    useEffect(() => {
        let animationFrameId;
        let lastUpdate = 0;

        const animate = (timestamp) => {
            // Update roughly every 100-300ms for a jerky, non-smooth feel
            if (timestamp - lastUpdate > 100 + Math.random() * 200) {
                const newStyle = {};

                // Random Skew
                if (Math.random() < currentConfig.skewChance) {
                    const skewX = (Math.random() - 0.5) * 2 * currentConfig.maxSkew;
                    newStyle.transform = `skewX(${skewX}deg)`;
                }

                // Random Move
                if (Math.random() < currentConfig.moveChance) {
                    const x = (Math.random() - 0.5) * 2 * currentConfig.maxMove;
                    const y = (Math.random() - 0.5) * 2 * currentConfig.maxMove;
                    newStyle.transform = `${newStyle.transform || ''} translate(${x}px, ${y}px)`;
                }

                // Random Opacity Flash
                if (Math.random() < currentConfig.flashChance) {
                    newStyle.opacity = 0.5 + Math.random() * 0.5;
                } else {
                    newStyle.opacity = 1;
                }

                // Random Color/Filter Distortion (simulated via text-shadow or filter)
                if (Math.random() < currentConfig.flashChance) {
                    newStyle.filter = `hue-rotate(${Math.random() * 360}deg)`;
                } else {
                    newStyle.filter = 'none';
                }

                setStyle(newStyle);
                lastUpdate = timestamp;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [intensity, currentConfig]);

    return (
        <div
            ref={wrapperRef}
            className={`relative inline-block transition-transform duration-75 ease-linear ${className}`}
            style={style}
        >
            {/* Main Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* Ghost Layers for Chromatic Aberration Effect (only on high intensity or random chance) */}
            {intensity === 'high' && (
                <>
                    <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none mix-blend-screen text-red-500 translate-x-[2px] z-0 animate-pulse">
                        {children}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none mix-blend-screen text-blue-500 -translate-x-[2px] z-0 animate-pulse" style={{ animationDelay: '0.1s' }}>
                        {children}
                    </div>
                </>
            )}
        </div>
    );
};

export default GlitchWrapper;
