import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Records data for pioneers
const pioneersData = [
    {
        id: 'nird',
        name: 'NIRD AI',
        role: 'AI Assistant',
        year: '2245',
        icon: '🤖',
        description: 'Post-apocalyptic AI guardian. The last digital consciousness preserving human knowledge. NIRD maintains the archives and guides survivors through the wasteland of forgotten technology.',
        achievements: ['Digital preservation', 'Survivor guidance', 'Knowledge archival'],
        color: 'cyan'
    },
    {
        id: 'ada',
        name: 'Ada Lovelace',
        role: 'First Programmer',
        year: '1815-1852',
        icon: '✨',
        description: 'Augusta Ada King, Countess of Lovelace, wrote the first algorithm intended for machine processing. She envisioned computers could go beyond mere calculating, predicting they could compose music and create art. She curiously look a lot like NIRD',
        achievements: ['First computer algorithm', 'Analytical Engine notes', 'Vision of computing future'],
        color: 'purple'
    },
    {
        id: 'grace',
        name: 'Grace Hopper',
        role: 'COBOL Pioneer',
        year: '1906-1992',
        icon: '🐛',
        description: 'Rear Admiral Grace Hopper invented the first compiler and popularized the term "debugging" after finding an actual moth in a computer. She believed computers should speak human language.',
        achievements: ['First compiler (A-0)', 'COBOL language', 'Found first literal "bug"'],
        color: 'blue'
    },
    {
        id: 'margaret',
        name: 'Margaret Hamilton',
        role: 'Software Engineer',
        year: '1936-',
        icon: '🚀',
        description: 'Led the team that wrote the onboard flight software for NASA\'s Apollo program. Her software saved Apollo 11 from aborting the moon landing. She coined the term "software engineering".',
        achievements: ['Apollo 11 software', 'Error detection systems', 'Term "software engineering"'],
        color: 'green'
    },
    {
        id: 'katherine',
        name: 'Katherine Johnson',
        role: 'NASA Mathematician',
        year: '1918-2020',
        icon: '📐',
        description: 'A "human computer" at NASA whose calculations were critical to the success of U.S. crewed spaceflights. John Glenn refused to fly unless Katherine personally verified the computer\'s calculations.',
        achievements: ['Orbital trajectory calculations', 'Apollo 11 & 13 trajectories', 'Presidential Medal of Freedom'],
        color: 'pink'
    },
    {
        id: 'hedy',
        name: 'Hedy Lamarr',
        role: 'Frequency Hopping Inventor',
        year: '1914-2000',
        icon: '📡',
        description: 'Hollywood actress who co-invented frequency-hopping spread spectrum technology during WWII. This technology later became the foundation for WiFi, Bluetooth, and GPS.',
        achievements: ['Frequency hopping patent', 'Foundation for WiFi/Bluetooth', 'National Inventors Hall of Fame'],
        color: 'amber'
    },
    {
        id: 'radia',
        name: 'Radia Perlman',
        role: 'Mother of Internet',
        year: '1951-',
        icon: '🌐',
        description: 'Invented the Spanning Tree Protocol (STP), which is fundamental to the operation of network bridges. Her work enabled the creation of the robust, scalable networks that form the internet.',
        achievements: ['Spanning Tree Protocol', 'TRILL protocol', '100+ patents'],
        color: 'teal'
    },
    {
        id: 'carol',
        name: 'Carol Shaw',
        role: 'First Female Game Developer',
        year: '1955-',
        icon: '🎮',
        description: 'One of the first female video game designers and programmers. Created River Raid for Activision, one of the most acclaimed games of its era. Pioneered procedural content generation.',
        achievements: ['River Raid (Atari 2600)', '3-D Tic-Tac-Toe', 'First female game dev at Atari'],
        color: 'red'
    },
    {
        id: 'roberta',
        name: 'Roberta Williams',
        role: 'Adventure Game Creator',
        year: '1953-',
        icon: '👑',
        description: 'Co-founded Sierra On-Line and created the King\'s Quest series. Pioneered graphic adventure games and interactive storytelling. Her games sold millions of copies worldwide.',
        achievements: ['King\'s Quest series', 'Mystery House', 'Founded Sierra On-Line'],
        color: 'indigo'
    }
];

const Records = () => {
    const navigate = useNavigate();
    const [selectedPioneer, setSelectedPioneer] = useState(null);
    const [glitchIn, setGlitchIn] = useState(true);

    useEffect(() => {
        // Entry glitch effect
        const timer = setTimeout(() => setGlitchIn(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleBack = () => {
        setGlitchIn(true);
        setTimeout(() => navigate('/'), 500);
    };

    return (
        <div className={`min-h-screen w-full bg-black text-white relative overflow-hidden ${glitchIn ? 'animate-glitch-in' : ''}`}>
            {/* Glitch overlay during transition */}
            {glitchIn && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    <div className="absolute inset-0 bg-amber-500/20 animate-pulse"></div>
                    <div className="absolute inset-0" style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                    }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-amber-400 font-mono text-2xl animate-pulse">
                            ░▓█ LOADING ARCHIVES █▓░
                        </div>
                    </div>
                </div>
            )}

            {/* Scanlines */}
            <div className="scanlines fixed inset-0 pointer-events-none z-40"></div>

            {/* Background grid */}
            <div className="fixed inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(rgba(245,158,11,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.3) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
            }}></div>

            {/* Header */}
            <div className="relative z-10 border-b border-amber-500/30 bg-black/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-mono"
                    >
                        <span className="text-xl">←</span>
                        <span>RETURN_TO_LOBBY</span>
                    </button>
                    <h1 className="text-2xl font-bold text-amber-400 font-mono tracking-wider">
                        📜 PIONEER_ARCHIVES
                    </h1>
                    <div className="text-amber-500/60 font-mono text-sm">
                        {pioneersData.length} RECORDS
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                {!selectedPioneer ? (
                    <>
                        {/* Intro Text */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">
                                Women Who Built The Digital World
                            </h2>
                            <p className="text-amber-500/60 font-mono max-w-2xl mx-auto">
                                // These legendary pioneers shaped the future of technology.
                                Their contributions remain the foundation of our digital resistance.
                            </p>
                        </div>

                        {/* Grid of pioneers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pioneersData.map((pioneer, index) => (
                                <button
                                    key={pioneer.id}
                                    onClick={() => setSelectedPioneer(pioneer)}
                                    className="group relative text-left"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Glow effect */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

                                    {/* Card */}
                                    <div className="relative p-6 rounded-xl border border-amber-500/30 bg-gradient-to-b from-gray-900/80 to-black hover:border-amber-400 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="text-4xl">{pioneer.icon}</span>
                                            <span className="text-amber-500/60 font-mono text-xs bg-amber-500/10 px-2 py-1 rounded">
                                                {pioneer.year}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">
                                            {pioneer.name}
                                        </h3>
                                        <p className="text-amber-500/80 font-mono text-sm mb-3">
                                            {pioneer.role}
                                        </p>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {pioneer.description.substring(0, 100)}...
                                        </p>
                                        <div className="mt-4 flex items-center gap-2 text-amber-400 font-mono text-xs group-hover:translate-x-2 transition-transform">
                                            <span>VIEW_RECORD</span>
                                            <span>→</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Pioneer Detail View */
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        <button
                            onClick={() => setSelectedPioneer(null)}
                            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-mono mb-8"
                        >
                            <span>←</span>
                            <span>BACK_TO_RECORDS</span>
                        </button>

                        <div className="bg-gradient-to-b from-gray-900/80 to-black rounded-2xl border border-amber-500/30 overflow-hidden">
                            {/* Header */}
                            <div className="p-8 border-b border-amber-500/20 bg-amber-500/5">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-5xl">
                                        {selectedPioneer.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-4xl font-bold text-amber-400 mb-2">{selectedPioneer.name}</h2>
                                        <p className="text-amber-500/80 font-mono text-lg">{selectedPioneer.role}</p>
                                        <p className="text-amber-500/50 font-mono text-sm mt-1">{selectedPioneer.year}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">
                                {/* Biography */}
                                <div>
                                    <h3 className="text-amber-400 font-mono text-sm mb-3 flex items-center gap-2">
                                        <span className="text-amber-500">▌</span> BIOGRAPHY
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {selectedPioneer.description}
                                    </p>
                                </div>

                                {/* Achievements */}
                                <div>
                                    <h3 className="text-amber-400 font-mono text-sm mb-3 flex items-center gap-2">
                                        <span className="text-amber-500">▌</span> KEY_ACHIEVEMENTS
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {selectedPioneer.achievements.map((achievement, i) => (
                                            <div
                                                key={i}
                                                className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20"
                                            >
                                                <div className="text-amber-400 mb-1">✓</div>
                                                <p className="text-gray-300 font-mono text-sm">{achievement}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-4 pt-4 border-t border-amber-500/20">
                                    <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                                        <span className="animate-pulse">●</span>
                                        ARCHIVED_IN_NIRD_DATABASE
                                    </div>
                                    <div className="text-amber-500/50 font-mono text-sm">
                                        LEGACY_STATUS: ETERNAL
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none"></div>
        </div>
    );
};

export default Records;
