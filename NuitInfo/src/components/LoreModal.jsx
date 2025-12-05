import React from 'react';
import GlitchWrapper from './GlitchWrapper';

const LoreModal = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={onClose}>
            <div
                className="relative w-full max-w-2xl bg-gray-900 border-2 border-cyan-500 p-8 shadow-[0_0_50px_rgba(0,212,255,0.3)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Corner Lines */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-cyan-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-cyan-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-cyan-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-cyan-500"></div>

                {/* Header */}
                <div className="flex justify-between items-start mb-6 border-b border-cyan-500/30 pb-4">
                    <div>
                        <GlitchWrapper intensity="low">
                            <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 font-mono mb-1">
                                {data.name.toUpperCase()}
                            </h2>
                        </GlitchWrapper>
                        <p className="text-cyan-200/70 font-mono text-sm tracking-widest uppercase">
                            // {data.title}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-cyan-500/50 font-mono">ID: {data.id}</div>
                        <div className="text-xs text-cyan-500/50 font-mono">STATUS: RECOVERED</div>
                    </div>
                </div>

                {/* Content */}
                <div className="font-mono text-cyan-100 leading-relaxed text-lg mb-8">
                    <p className="typing-effect">
                        {data.description}
                    </p>
                </div>

                {/* Footer */}
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors font-mono uppercase text-sm tracking-wider"
                    >
                        [ CLOSE_FILE ]
                    </button>
                </div>

                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]"></div>
            </div>
        </div>
    );
};

export default LoreModal;
