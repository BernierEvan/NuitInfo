import React, { useState, useEffect, useRef } from 'react';

const BuggedSequence = ({ onComplete }) => {
    const [textPositions, setTextPositions] = useState([]);
    const [visibleCount, setVisibleCount] = useState(0);
    const intervalRef = useRef(null);
    const spawnRef = useRef(null);

    // Glitch text fragments
    const glitchTexts = [
        'NO SIGNAL', 'ERROR', 'CORRUPTED', '???', 'HELP',
        'SYSTEM_FAILURE', '404', 'FATAL', 'BREACH', 'OVERRIDE',
        '!@#$%', 'GLITCH', 'VOID', 'NULL', 'UNDEFINED',
        'NIRD', 'RESISTANCE', 'ACCESS', 'DENIED', 'CRASH'
    ];

    const TOTAL_TEXTS = 100;

    useEffect(() => {
        // Generate initial positions for all text fragments
        const generatePositions = () => {
            const positions = [];
            for (let i = 0; i < TOTAL_TEXTS; i++) {
                positions.push({
                    id: i,
                    text: glitchTexts[Math.floor(Math.random() * glitchTexts.length)],
                    x: Math.random() * 95,
                    y: Math.random() * 95,
                    size: 14 + Math.random() * 36
                });
            }
            return positions;
        };

        setTextPositions(generatePositions());

        // Rapidly spawn text one by one (every 20ms for faster buildup)
        spawnRef.current = setInterval(() => {
            setVisibleCount(prev => {
                if (prev >= TOTAL_TEXTS) {
                    clearInterval(spawnRef.current);
                    return prev;
                }
                return prev + 1;
            });
        }, 20);

        // Rapidly update positions every 80ms for erratic movement
        intervalRef.current = setInterval(() => {
            setTextPositions(prev => prev.map(item => ({
                ...item,
                text: Math.random() > 0.7 ? glitchTexts[Math.floor(Math.random() * glitchTexts.length)] : item.text,
                x: Math.random() * 90,
                y: Math.random() * 90,
                size: 20 + Math.random() * 40
            })));
        }, 80);

        // Run for 5 seconds, then complete immediately
        const timeout = setTimeout(() => {
            clearInterval(intervalRef.current);
            clearInterval(spawnRef.current);
            onComplete();
        }, 5000);

        return () => {
            clearTimeout(timeout);
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (spawnRef.current) clearInterval(spawnRef.current);
        };
    }, [onComplete]);

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
                height: '100vh'
            }}
        >
            {/* Animated Static Noise Background */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    opacity: 0.5,
                    animation: 'static-noise 0.1s infinite steps(5)'
                }}
            ></div>

            {/* Scanlines */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
                    animation: 'scanline-move 0.1s linear infinite'
                }}
            ></div>

            {/* Erratic text fragments - staggered appearance, straight lines */}
            {textPositions.slice(0, visibleCount).map((item) => (
                <div
                    key={item.id}
                    className="absolute font-bold font-mono pointer-events-none"
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        fontSize: `${item.size}px`,
                        background: 'linear-gradient(90deg, #0066ff, #ff0000)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                        textShadow: '0 0 10px rgba(0,102,255,0.5), 0 0 20px rgba(255,0,0,0.5)',
                        filter: 'drop-shadow(0 0 5px rgba(0,102,255,0.8)) drop-shadow(0 0 10px rgba(255,0,0,0.8))',
                        opacity: 0.95,
                        whiteSpace: 'nowrap'
                    }}
                >
                    {item.text}
                </div>
            ))}

            {/* Flickering white flash */}
            <div
                className="absolute inset-0 pointer-events-none bg-white"
                style={{
                    animation: 'flicker 0.08s infinite'
                }}
            ></div>

            {/* Screen edge vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 200px rgba(0,0,0,0.8)' }}
            ></div>

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

                @keyframes flicker {
                    0%, 9%, 11%, 19%, 21%, 69%, 71%, 100% { opacity: 0; }
                    10%, 20%, 70% { opacity: 0.1; }
                }
            `}</style>
        </div>
    );
};

export default BuggedSequence;
