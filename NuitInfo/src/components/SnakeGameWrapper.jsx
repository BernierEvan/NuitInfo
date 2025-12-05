import React, { useEffect, useRef } from 'react';

const SnakeGameWrapper = ({ onClose }) => {
    const iframeRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    // Focus the iframe when it loads so arrow keys work
    const handleIframeLoad = () => {
        if (iframeRef.current) {
            iframeRef.current.focus();
        }
    };

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[10000] bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-mono font-bold transition-all duration-300 shadow-lg hover:shadow-red-500/50"
                style={{
                    boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)',
                    border: '2px solid #ff0000'
                }}
            >

            </button>

            {/* Title */}
            <div
                className="absolute top-4 left-4 text-cyan-400 font-mono text-xl font-bold"
                style={{
                    textShadow: '0 0 10px rgba(0, 204, 204, 0.6)',
                    letterSpacing: '3px'
                }}
            >
                🐍 SNAKE - Ada Lovelace Edition
            </div>

            {/* Game Container */}
            <div
                className="relative"
                style={{
                    border: '3px solid #00cccc',
                    boxShadow: '0 0 40px rgba(0, 204, 204, 0.4), inset 0 0 20px rgba(0, 204, 204, 0.1)',
                    borderRadius: '8px',
                    overflow: 'hidden'
                }}
            >
                <iframe
                    ref={iframeRef}
                    src="/snake-game.html"
                    title="Snake Game"
                    width="700"
                    height="600"
                    style={{
                        border: 'none',
                        display: 'block',
                        background: '#0a0a0a'
                    }}
                    onLoad={handleIframeLoad}
                />
            </div>

            {/* Instructions */}
            <p
                className="mt-6 text-cyan-400/60 font-mono text-sm"
                style={{ textShadow: '0 0 5px rgba(0, 204, 204, 0.3)' }}
            >
                Use Arrow Keys to control | Press ESC or click EXIT to close
            </p>
        </div>
    );
};

export default SnakeGameWrapper;
