import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';

const CinematicOverlay = () => {
    const { showCinematic, closeCinematic, cinematicContent } = useGame();
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        if (showCinematic && cinematicContent) {
            setDisplayedText('');
            let i = 0;
            const text = cinematicContent.narration;
            const interval = setInterval(() => {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
                if (i >= text.length) clearInterval(interval);
            }, 30); // Typewriter speed

            return () => clearInterval(interval);
        }
    }, [showCinematic, cinematicContent]);

    if (!showCinematic) return null;

    return (
        <AnimatePresence>
            {showCinematic && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black text-cyan-400 font-mono p-8 flex flex-col justify-center items-center overflow-hidden"
                >
                    {/* Glitch Background Effect */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover mix-blend-screen"></div>

                    <div className="max-w-4xl w-full relative z-10 border-2 border-cyan-400 p-8 bg-black/90 shadow-[0_0_20px_rgba(57,255,20,0.5)]">
                        <h2 className="text-2xl mb-4 uppercase tracking-widest border-b border-cyan-400 pb-2 glitch-text" data-text="TRANSMISSION_INCOMING">
                            TRANSMISSION_INCOMING
                        </h2>

                        <div className="mb-8 text-lg leading-relaxed min-h-[150px]">
                            {displayedText}
                            <span className="animate-pulse">_</span>
                        </div>

                        {cinematicContent.pioneer && (
                            <div className="border border-cyan-400/50 p-4 mb-8 bg-blue-900/10">
                                <h3 className="text-sm text-cyan-300 mb-1">ARCHIVE_DATA_RECOVERED:</h3>
                                <p className="text-xl font-bold glitch-text" data-text={cinematicContent.pioneer.name}>
                                    {cinematicContent.pioneer.name}
                                </p>
                                <p className="text-sm italic opacity-80 mt-2">"{cinematicContent.pioneer.quote}"</p>
                            </div>
                        )}

                        <button
                            onClick={closeCinematic}
                            className="px-6 py-2 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors uppercase tracking-wider text-sm"
                        >
                            [ TERMINATE_TRANSMISSION ]
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CinematicOverlay;
