import React, { useState, useEffect } from 'react';

const BuggedSequence = ({ onComplete }) => {
    const [isTurningOff, setIsTurningOff] = useState(false);

    useEffect(() => {
        // Play static/glitch sound if possible (optional, requires user interaction usually)
        // For now, we focus on visuals as requested.

        // Run the "bugging" phase for 3 seconds, then turn off
        const timeout = setTimeout(() => {
            setIsTurningOff(true);

            // Wait for animation to finish (0.6s) then complete
            setTimeout(() => {
                onComplete();
            }, 800);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [onComplete]);

    return (
        <div className={`fixed inset-0 z-[99999] w-screen h-screen bg-black overflow-hidden ${isTurningOff ? 'animate-crt-off' : ''}`}>
            {/* Static Noise Background */}
            <div className="absolute inset-0 opacity-50 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    filter: 'contrast(150%) brightness(100%)'
                }}>
            </div>

            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2))',
                    backgroundSize: '100% 4px'
                }}>
            </div>

            {/* Glitch Overlay */}
            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay animate-pulse"></div>

            {/* Random Glitch Text/Elements could be added here if needed, 
                but "TV bugging" usually implies static/signal loss. */}
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-9xl font-bold text-white opacity-10 glitch-text tracking-tighter scale-150 animate-pulse">
                    NO SIGNAL
                </h1>
            </div>
        </div>
    );
};

export default BuggedSequence;
