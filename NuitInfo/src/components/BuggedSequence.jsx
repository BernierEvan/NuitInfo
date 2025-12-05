import React, { useState, useEffect } from 'react';

const BuggedSequence = ({ onComplete }) => {
    const [isTurningOff, setIsTurningOff] = useState(false);

    useEffect(() => {
        // Run the "bugging" phase for 3 seconds, then turn off
        const timeout = setTimeout(() => {
            setIsTurningOff(true);

            // Wait for animation to finish then complete
            setTimeout(() => {
                onComplete();
            }, 800);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [onComplete]);

    // Generate many glitch bars
    const glitchBars = [];
    for (let i = 0; i < 30; i++) {
        const colors = [
            'rgba(0,255,255,0.4)',   // cyan
            'rgba(255,0,0,0.5)',      // red
            'rgba(0,255,0,0.4)',      // green
            'rgba(255,0,255,0.4)',    // magenta
            'rgba(255,255,0,0.4)',    // yellow
            'rgba(255,255,255,0.3)'   // white
        ];
        glitchBars.push({
            top: `${(i * 3.5)}%`,
            height: `${3 + Math.random() * 10}px`,
            color: colors[i % colors.length],
            duration: 0.08 + Math.random() * 0.15,
            delay: i * 0.015
        });
    }

    return (
        <div
            className="fixed inset-0 z-[99999] bg-black overflow-hidden"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100vw',
                height: '100vh',
                transform: isTurningOff ? 'scaleY(0)' : 'scaleY(1)',
                transition: isTurningOff ? 'transform 0.6s ease-in' : 'none',
                transformOrigin: 'center center'
            }}
        >
            {/* Animated Static Noise Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    opacity: 0.7,
                    animation: 'static-noise 0.1s infinite steps(5)'
                }}
            ></div>

            {/* Heavy scanlines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.5) 1px, rgba(0,0,0,0.5) 2px)',
                    animation: 'scanline-move 0.1s linear infinite'
                }}
            ></div>

            {/* MANY horizontal glitch bars covering entire screen */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {glitchBars.map((bar, i) => (
                    <div
                        key={i}
                        className="absolute w-full"
                        style={{
                            top: bar.top,
                            height: bar.height,
                            backgroundColor: bar.color,
                            animation: `glitch-bar ${bar.duration}s infinite`,
                            animationDelay: `${bar.delay}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* RGB Shift overlay */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                    background: 'linear-gradient(90deg, rgba(255,0,0,0.15) 0%, transparent 33%, rgba(0,255,0,0.15) 66%, rgba(0,0,255,0.15) 100%)',
                    animation: 'rgb-shift 0.15s infinite'
                }}
            ></div>

            {/* Flickering white flash */}
            <div
                className="absolute inset-0 pointer-events-none bg-white"
                style={{
                    animation: 'flicker 0.08s infinite'
                }}
            ></div>

            {/* Center content - NO SIGNAL */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <h1
                        className="text-7xl md:text-9xl font-bold text-white tracking-widest"
                        style={{
                            textShadow: '6px 0 #ff0000, -6px 0 #00ffff, 0 0 30px rgba(255,255,255,0.6)',
                            animation: 'text-glitch 0.08s infinite',
                            opacity: 0.9
                        }}
                    >
                        NO SIGNAL
                    </h1>
                    <div
                        className="mt-8 text-cyan-400 font-mono text-2xl"
                        style={{
                            animation: 'blink 0.4s infinite',
                            textShadow: '0 0 10px rgba(0,255,255,0.8)'
                        }}
                    >
                        ░▓█ SIGNAL_LOST █▓░
                    </div>
                </div>
            </div>

            {/* VHS tracking lines - multiple */}
            <div
                className="absolute left-0 right-0 h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent pointer-events-none"
                style={{ animation: 'vhs-tracking 1.5s linear infinite' }}
            ></div>
            <div
                className="absolute left-0 right-0 h-12 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent pointer-events-none"
                style={{ animation: 'vhs-tracking 2s linear infinite', animationDelay: '0.5s' }}
            ></div>

            {/* Screen edge vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 200px rgba(0,0,0,0.9)' }}
            ></div>

            {/* Turn off flash when closing */}
            {isTurningOff && (
                <div className="absolute inset-0 bg-white" style={{ opacity: 0.9, animation: 'flash-out 0.3s forwards' }}></div>
            )}

            <style>{`
                @keyframes static-noise {
                    0%, 100% { transform: translate(0, 0); }
                    20% { transform: translate(-5%, -5%); }
                    40% { transform: translate(5%, 5%); }
                    60% { transform: translate(-5%, 5%); }
                    80% { transform: translate(5%, -5%); }
                }

                @keyframes scanline-move {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(4px); }
                }

                @keyframes glitch-bar {
                    0%, 100% { transform: translateX(0) scaleX(1); opacity: 0.4; }
                    15% { transform: translateX(-200px) scaleX(2); opacity: 0.8; }
                    30% { transform: translateX(150px) scaleX(0.3); opacity: 0.2; }
                    45% { transform: translateX(-100px) scaleX(1.5); opacity: 0.6; }
                    60% { transform: translateX(200px) scaleX(0.5); opacity: 0.3; }
                    75% { transform: translateX(-50px) scaleX(1.8); opacity: 0.7; }
                    90% { transform: translateX(100px) scaleX(0.8); opacity: 0.5; }
                }

                @keyframes rgb-shift {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(15px); }
                    50% { transform: translateX(-10px); }
                    75% { transform: translateX(5px); }
                }

                @keyframes flicker {
                    0%, 9%, 11%, 19%, 21%, 69%, 71%, 100% { opacity: 0; }
                    10%, 20%, 70% { opacity: 0.15; }
                }

                @keyframes text-glitch {
                    0%, 100% { transform: translate(0) skewX(0); }
                    10% { transform: translate(-5px, 3px) skewX(-5deg); }
                    20% { transform: translate(5px, -3px) skewX(5deg); }
                    30% { transform: translate(-3px, -3px) skewX(-3deg); }
                    40% { transform: translate(3px, 3px) skewX(3deg); }
                    50% { transform: translate(-4px, 2px) skewX(-2deg); }
                    60% { transform: translate(4px, -2px) skewX(4deg); }
                    70% { transform: translate(-2px, -4px) skewX(-4deg); }
                    80% { transform: translate(2px, 4px) skewX(2deg); }
                    90% { transform: translate(-3px, 1px) skewX(-1deg); }
                }

                @keyframes blink {
                    0%, 49% { opacity: 1; }
                    50%, 100% { opacity: 0.3; }
                }

                @keyframes vhs-tracking {
                    0% { top: -15%; }
                    100% { top: 115%; }
                }

                @keyframes flash-out {
                    0% { opacity: 0.9; }
                    100% { opacity: 0; }
                }
            `}</style>
        </div>
    );
};

export default BuggedSequence;
