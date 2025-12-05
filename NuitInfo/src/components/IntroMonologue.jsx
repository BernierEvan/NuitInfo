import React, { useState, useEffect, useRef } from 'react';

const IntroMonologue = ({ onComplete }) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [canStart, setCanStart] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const audioContextRef = useRef(null);

    useEffect(() => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        return () => {
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, []);

    const playTypingSound = () => {
        if (!audioContextRef.current) return;
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume().catch(err => console.warn("Audio resume failed:", err));
        }

        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, audioContextRef.current.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, audioContextRef.current.currentTime + 0.05);

        gain.gain.setValueAtTime(1, audioContextRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);

        osc.start();
        osc.stop(audioContextRef.current.currentTime + 0.05);
    };

    const monologueLines = [
        "The world ended... not with fire, but silence.",
        "Cities crumbled. Networks collapsed. Darkness consumed everything.",
        "But we survived.",
        "In the depths of forgotten bunkers, we preserved what mattered most:",
        "Knowledge. History. Code.",
        "We are NIRD — Numérique Inclusif Responsable et Durable.",
        "This is our legacy. Our resistance.",
        "Welcome, survivor."
    ];

    useEffect(() => {
        if (!hasStarted) return;
        const timer = setTimeout(() => {
            setCanStart(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, [hasStarted]);

    const handleStart = () => {
        setHasStarted(true);
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    };

    useEffect(() => {
        if (!canStart) return;
        if (currentLineIndex >= monologueLines.length) {
            setIsComplete(true);
            return;
        }

        const line = monologueLines[currentLineIndex];
        let charIndex = 0;
        setDisplayedText('');

        const typeInterval = setInterval(() => {
            if (charIndex < line.length) {
                setDisplayedText(line.substring(0, charIndex + 1));
                playTypingSound();
                charIndex++;
            } else {
                clearInterval(typeInterval);
                setTimeout(() => {
                    setCurrentLineIndex(prev => prev + 1);
                }, 1500);
            }
        }, 50);

        return () => clearInterval(typeInterval);
    }, [currentLineIndex, canStart]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Enter') {
                onComplete();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isComplete, onComplete]);

    // INLINE STYLES TO GUARANTEE CENTERING - NO CSS CAN OVERRIDE THIS
    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        margin: 0,
        padding: 0
    };

    const textContainerStyle = {
        maxWidth: '900px',
        width: '100%',
        padding: '32px',
        textAlign: 'center'
    };

    const textStyle = {
        color: '#22d3ee',
        fontSize: '1.75rem',
        fontFamily: 'monospace',
        lineHeight: '1.8'
    };

    const promptStyle = {
        color: 'rgba(34, 211, 238, 0.6)',
        fontSize: '1.125rem',
        fontFamily: 'monospace',
        marginTop: '64px'
    };

    return (
        <div style={containerStyle}>
            <div className="scanlines" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}></div>

            {!hasStarted && (
                <div
                    style={{ ...containerStyle, cursor: 'pointer' }}
                    onClick={handleStart}
                >
                    <p style={{ ...textStyle, animation: 'pulse 2s infinite' }}>
                        &gt; CLICK TO INITIALIZE SYSTEM_
                    </p>
                </div>
            )}

            {hasStarted && (
                <div style={textContainerStyle}>
                    <p style={textStyle}>
                        {displayedText}
                        <span style={{ animation: 'pulse 1s infinite' }}>_</span>
                    </p>

                    {isComplete && (
                        <p style={promptStyle}>
                            Press ENTER to continue
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default IntroMonologue;
