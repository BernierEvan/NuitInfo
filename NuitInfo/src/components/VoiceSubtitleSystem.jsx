import React, { useState, useEffect, useRef, createContext, useContext } from 'react';

// Voice configuration
export const VOICE_CONFIG = {
    character: {
        wtfWasThat: { file: 'wtfwasthat.mp3', text: "What the fuck was that?", duration: 3000 },
        nirdTheResistance: { file: 'nird_the_resistance.mp3', text: "NIRD... The Resistance?", duration: 5000 },
        wellGuess: { file: 'welliguessishouldlookintothat.mp3', text: "Well... Guess I should look into that.", duration: 4000 },
        whoAreYou: { file: 'whointhebloodyworldareyou.mp3', text: "Who in the bloody world are you?", duration: 5000 },
        whatIf: { file: 'whatif.mp3', text: "What if...", duration: 2500 },
        yeahAlreadySaid: { file: 'yeahyoualreadysaidthat.mp3', text: "Yeah, you already said that.", duration: 2500 },
        adaLovelace: { file: 'ada_lovelace.mp3', text: "Ada Lovelace, the first computer programmer. You look just like NIRD, curious...", duration: 11000 },
        graceHopper: { file: 'gracehopperindeed.mp3', text: "Grace Hopper indeed..", duration: 2500 },
        margaretHamilton: { file: 'margarethamilton.mp3', text: "Margaret Hamilton is it ?", duration: 2500 },
        katherineJohnson: { file: 'catherinejohnson.mp3', text: "Katherine Johnson.", duration: 2500 },
        hedyLamarr: { file: 'Hedy Lamarr.mp3', text: "Hedy Lamarr", duration: 2000 },
        radiaPerlman: { file: 'Radia Perlman.mp3', text: "Radia Perlman, guess you were as important as the others.", duration: 3500 },
        carolShaw: { file: 'carol_shaw.mp3', text: "Carol Shaw, i don't know who you are but.. yeah.", duration: 3500 },
        robertaWilliams: { file: 'robertawilliams.mp3', text: "Roberta Williams", duration: 2500 },
    },
    ai: {
        imNird: { file: 'nirdyouraiassitant.mp3', text: "I'm NIRD, your AI assistant", duration: 2500 },
        dontHesitate: { file: 'dont hesitate to ask me anything.mp3', text: "Don't hesitate to ask me anything", duration: 2000 },
        canHelp: { file: 'i can help you with anything.mp3', text: "I can help you with anything", duration: 2000 },
        whatWouldYouLike: { file: 'what would you like to know .mp3', text: "What would you like to know?", duration: 2000 },
        discoveredSecret: { file: 'youdiscoveredmysecrethavefun.mp3', text: "You discovered my secret... Have fun!", duration: 3000 },
    }
};

// Map pioneer IDs to voice keys
export const PIONEER_VOICE_MAP = {
    'ada': 'adaLovelace',
    'grace': 'graceHopper',
    'margaret': 'margaretHamilton',
    'katherine': 'katherineJohnson',
    'hedy': 'hedyLamarr',
    'radia': 'radiaPerlman',
    'carol': 'carolShaw',
    'roberta': 'robertaWilliams',
};

// Create context for voice system
const VoiceContext = createContext(null);

// Provider component
export const VoiceProvider = ({ children }) => {
    const [currentSubtitle, setCurrentSubtitle] = useState(null);
    const [isAI, setIsAI] = useState(false);
    const audioRef = useRef(null);
    const timeoutRef = useRef(null);

    const playVoice = async (type, key) => {
        console.log(`Playing voice: ${type}/${key}`);

        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Stop any currently playing audio
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }

        const config = VOICE_CONFIG[type]?.[key];
        if (!config) {
            console.warn(`Voice not found: ${type}/${key}`);
            return Promise.resolve();
        }

        const isAIVoice = type === 'ai';
        setIsAI(isAIVoice);
        setCurrentSubtitle(config.text);
        console.log(`Subtitle set to: ${config.text}`);

        // Create and play audio
        const audioPath = `/voices/${type === 'ai' ? 'ia' : 'character'}/${config.file}`;

        return new Promise((resolve) => {
            try {
                const audio = new Audio(audioPath);
                audioRef.current = audio;

                // Use Web Audio API to amplify with compressor to avoid distortion
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const source = audioContext.createMediaElementSource(audio);

                // Compressor to prevent clipping/distortion
                const compressor = audioContext.createDynamicsCompressor();
                compressor.threshold.value = -24;
                compressor.knee.value = 30;
                compressor.ratio.value = 12;
                compressor.attack.value = 0.003;
                compressor.release.value = 0.25;

                // Moderate gain boost
                const gainNode = audioContext.createGain();
                gainNode.gain.value = 4; // 4x volume boost with compressor protection

                source.connect(compressor);
                compressor.connect(gainNode);
                gainNode.connect(audioContext.destination);

                audio.play().catch(err => {
                    console.warn('Audio play failed:', err);
                });

                // Clear subtitle after duration
                timeoutRef.current = setTimeout(() => {
                    setCurrentSubtitle(null);
                    resolve();
                }, config.duration);
            } catch (error) {
                console.warn('Audio error:', error);
                timeoutRef.current = setTimeout(() => {
                    setCurrentSubtitle(null);
                    resolve();
                }, config.duration);
            }
        });
    };

    const clearSubtitle = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
        setCurrentSubtitle(null);
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (audioRef.current) audioRef.current.pause();
        };
    }, []);

    return (
        <VoiceContext.Provider value={{ playVoice, clearSubtitle, currentSubtitle, isAI }}>
            {children}
            {/* Always render subtitle */}
            {currentSubtitle && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '40px',
                        left: 0,
                        right: 0,
                        zIndex: 99999,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pointerEvents: 'none',
                        padding: '0 20px'
                    }}
                >
                    <p
                        style={{
                            color: isAI ? '#FFD700' : '#FFFFFF',
                            fontSize: '24px',
                            fontWeight: '500',
                            textAlign: 'center',
                            maxWidth: '800px',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)',
                            margin: 0,
                            padding: '10px 20px',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            borderRadius: '8px'
                        }}
                    >
                        {currentSubtitle}
                    </p>
                </div>
            )}
        </VoiceContext.Provider>
    );
};

// Hook to use voice system
export const useVoiceSystem = () => {
    const context = useContext(VoiceContext);
    if (!context) {
        // Fallback for when not wrapped in provider - create local state
        const [currentSubtitle, setCurrentSubtitle] = useState(null);
        const [isAI, setIsAI] = useState(false);
        const audioRef = useRef(null);
        const timeoutRef = useRef(null);

        const playVoice = async (type, key) => {
            console.log(`Playing voice (local): ${type}/${key}`);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }

            const config = VOICE_CONFIG[type]?.[key];
            if (!config) {
                console.warn(`Voice not found: ${type}/${key}`);
                return;
            }

            const isAIVoice = type === 'ai';
            setIsAI(isAIVoice);
            setCurrentSubtitle(config.text);

            const audioPath = `/voices/${type === 'ai' ? 'ia' : 'character'}/${config.file}`;

            return new Promise((resolve) => {
                try {
                    const audio = new Audio(audioPath);
                    audioRef.current = audio;

                    // Use Web Audio API to amplify with compressor to avoid distortion
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const source = audioContext.createMediaElementSource(audio);

                    // Compressor to prevent clipping/distortion
                    const compressor = audioContext.createDynamicsCompressor();
                    compressor.threshold.value = -24;
                    compressor.knee.value = 30;
                    compressor.ratio.value = 12;
                    compressor.attack.value = 0.003;
                    compressor.release.value = 0.25;

                    // Moderate gain boost
                    const gainNode = audioContext.createGain();
                    gainNode.gain.value = 4; // 4x volume boost with compressor protection

                    source.connect(compressor);
                    compressor.connect(gainNode);
                    gainNode.connect(audioContext.destination);

                    audio.play().catch(err => console.warn('Audio play failed:', err));
                    timeoutRef.current = setTimeout(() => {
                        setCurrentSubtitle(null);
                        resolve();
                    }, config.duration);
                } catch (error) {
                    console.warn('Audio error:', error);
                    timeoutRef.current = setTimeout(() => {
                        setCurrentSubtitle(null);
                        resolve();
                    }, config.duration);
                }
            });
        };

        const SubtitleComponent = () => currentSubtitle ? (
            <div
                style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: 0,
                    right: 0,
                    zIndex: 99999,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerEvents: 'none',
                    padding: '0 20px'
                }}
            >
                <p
                    style={{
                        color: isAI ? '#FFD700' : '#FFFFFF',
                        fontSize: '24px',
                        fontWeight: '500',
                        textAlign: 'center',
                        maxWidth: '800px',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)',
                        margin: 0,
                        padding: '10px 20px',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        borderRadius: '8px'
                    }}
                >
                    {currentSubtitle}
                </p>
            </div>
        ) : null;

        return { playVoice, clearSubtitle: () => setCurrentSubtitle(null), SubtitleComponent, currentSubtitle, isAI };
    }

    return {
        playVoice: context.playVoice,
        clearSubtitle: context.clearSubtitle,
        SubtitleComponent: () => null, // Provider already renders it
        currentSubtitle: context.currentSubtitle,
        isAI: context.isAI
    };
};

export default VoiceProvider;
