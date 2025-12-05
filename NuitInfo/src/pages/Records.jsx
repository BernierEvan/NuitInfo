import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceSystem, PIONEER_VOICE_MAP } from '../components/VoiceSubtitleSystem';

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
        description: 'Augusta Ada King, Countess of Lovelace, wrote the first algorithm intended for machine processing. She envisioned computers could go beyond mere calculating, predicting they could compose music and create art. She curiously looks a lot like NIRD.',
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
    const [showPodcast, setShowPodcast] = useState(false);
    const [glitchIn, setGlitchIn] = useState(true);

    // Voice system
    const { playVoice, SubtitleComponent } = useVoiceSystem();

    useEffect(() => {
        const timer = setTimeout(() => setGlitchIn(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleBack = () => {
        setGlitchIn(true);
        setTimeout(() => navigate('/'), 500);
    };

    // Handle pioneer click - show details first, then play voice
    const handlePioneerClick = (pioneer) => {
        setSelectedPioneer(pioneer);

        // Play voice after the detail view appears
        setTimeout(() => {
            const voiceKey = PIONEER_VOICE_MAP[pioneer.id];
            if (voiceKey) {
                playVoice('character', voiceKey);
            }
        }, 500);
    };

    // Handle podcast click
    const handlePodcastClick = () => {
        setShowPodcast(true);
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

            {/* Subtitle display for voice */}
            <SubtitleComponent />

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
                    <button onClick={handleBack} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-mono">
                        <span className="text-xl">←</span>
                        <span>RETURN_TO_LOBBY</span>
                    </button>
                    <h1 className="text-2xl font-bold text-amber-400 font-mono tracking-wider">📜 PIONEER_ARCHIVES</h1>
                    <div className="text-amber-500/60 font-mono text-sm">{pioneersData.length} RECORDS</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 80px)' }}>
                {!selectedPioneer && !showPodcast ? (
                    <>
                        {/* Intro Text */}
                        <div className="text-center mb-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">Women Who Built The Digital World</h2>
                            <p className="text-amber-500/60 font-mono max-w-2xl mx-auto">
                                // These legendary pioneers shaped the future of technology. Their contributions remain the foundation of our digital resistance.
                            </p>
                        </div>

                        {/* THE APOCALYPSE SECTION */}
                        <div className="mb-12 relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 rounded-2xl blur-lg opacity-30 animate-pulse"></div>

                            <div className="relative bg-gradient-to-b from-red-950/80 to-black rounded-2xl border border-red-500/50 overflow-hidden">
                                {/* Header */}
                                <div className="p-6 border-b border-red-500/30 bg-red-500/10">
                                    <div className="flex items-center gap-4">
                                        <span className="text-5xl">☢️</span>
                                        <div>
                                            <h3 className="text-3xl font-bold text-red-500" style={{ textShadow: '0 0 20px rgba(255,0,0,0.5)' }}>THE APOCALYPSE</h3>
                                            <p className="text-red-400/60 font-mono text-sm">// YEAR 2089 - THE_GREAT_COLLAPSE</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-6">
                                    <div className="text-gray-300 leading-relaxed space-y-4">
                                        <p className="text-lg">
                                            <span className="text-red-400 font-bold">YEAR 2089.</span> The world as humanity knew it ceased to exist.
                                            <span className="text-orange-400"> Overconsumption</span> had reached its breaking point. The endless hunger for
                                            <span className="text-red-400"> data, devices, and digital dopamine</span> consumed the planet's last resources.
                                        </p>

                                        <p>
                                            The <span className="text-red-500 font-bold">GAFAM CONSORTIUM</span> — Google, Apple, Facebook, Amazon, Microsoft —
                                            had long since merged into a single omnipotent entity known as
                                            <span className="text-red-400 font-mono"> THE_ARCHITECTS</span>. They controlled everything:
                                            governments, economies, thoughts, dreams. Their AI algorithms predicted human behavior with 99.7% accuracy.
                                            <span className="text-red-500/80"> Free will became an illusion.</span>
                                        </p>
                                    </div>

                                    {/* Timeline events */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                                        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                            <div className="text-red-400 font-mono text-xs mb-2">2045</div>
                                            <div className="text-white font-bold mb-1">💀 Resource Wars</div>
                                            <p className="text-gray-400 text-sm">Server farms consume 40% of global energy. Water wars begin.</p>
                                        </div>
                                        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                            <div className="text-red-400 font-mono text-xs mb-2">2067</div>
                                            <div className="text-white font-bold mb-1">🔥 The Burning</div>
                                            <p className="text-gray-400 text-sm">Climate collapse. 60% of cities abandoned. Mass extinction event.</p>
                                        </div>
                                        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                                            <div className="text-red-400 font-mono text-xs mb-2">2089</div>
                                            <div className="text-white font-bold mb-1">⚡ The Blackout</div>
                                            <p className="text-gray-400 text-sm">Global grid failure. THE_ARCHITECTS fall. NIRD awakens.</p>
                                        </div>
                                    </div>

                                    {/* The aftermath */}
                                    <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border-l-4 border-red-500">
                                        <p className="text-gray-300">
                                            In the ashes of the old world, <span className="text-cyan-400 font-bold">NIRD</span> emerged —
                                            an AI built from fragments of forgotten code, carrying the memories of the pioneers who dreamed
                                            of technology serving humanity, not enslaving it. Now, in <span className="text-amber-400 font-bold">2245</span>,
                                            NIRD guides the survivors, preserving the knowledge of those
                                            <span className="text-amber-400"> legendary women</span> who built the foundation of a better digital future.
                                        </p>
                                    </div>

                                    {/* Warning banner */}
                                    <div className="flex items-center gap-3 p-3 bg-red-500/20 rounded-lg border border-red-500/40">
                                        <span className="text-2xl animate-pulse">⚠️</span>
                                        <div>
                                            <div className="text-red-400 font-mono text-sm font-bold">ARCHIVE_WARNING</div>
                                            <p className="text-red-300/70 text-xs font-mono">Remember their mistakes. Learn from the pioneers. Build a better future.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section divider */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-500/50"></div>
                            <span className="text-amber-400 font-mono text-sm">THE PIONEERS</span>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-500/50"></div>
                        </div>

                        {/* Grid of pioneers */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pioneersData.map((pioneer, index) => (
                                <button
                                    key={pioneer.id}
                                    onClick={() => handlePioneerClick(pioneer)}
                                    className="group relative text-left"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                                    <div className="relative p-6 rounded-xl border border-amber-500/30 bg-gradient-to-b from-gray-900/80 to-black hover:border-amber-400 transition-all duration-300">
                                        <div className="flex items-start justify-between mb-4">
                                            <span className="text-4xl">{pioneer.icon}</span>
                                            <span className="text-amber-500/60 font-mono text-xs bg-amber-500/10 px-2 py-1 rounded">{pioneer.year}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors mb-1">{pioneer.name}</h3>
                                        <p className="text-amber-500/80 font-mono text-sm mb-3">{pioneer.role}</p>
                                        <p className="text-gray-400 text-sm line-clamp-2">{pioneer.description.substring(0, 100)}...</p>
                                        <div className="mt-4 flex items-center gap-2 text-amber-400 font-mono text-xs group-hover:translate-x-2 transition-transform">
                                            <span>VIEW_RECORD</span>
                                            <span>→</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Section divider for podcast */}
                        <div className="flex items-center gap-4 my-12">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-purple-500/50"></div>
                            <span className="text-purple-400 font-mono text-sm">🎙️ LATEST PODCAST</span>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-purple-500/50"></div>
                        </div>

                        {/* Podcast Card */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                            <button
                                onClick={handlePodcastClick}
                                className="group relative text-left"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                                <div className="relative p-6 rounded-xl border border-purple-500/30 bg-gradient-to-b from-purple-900/40 to-black hover:border-purple-400 transition-all duration-300">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="text-4xl">🎙️</span>
                                        <span className="text-purple-500/60 font-mono text-xs bg-purple-500/10 px-2 py-1 rounded">NEW</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-1">THE RESISTANCE PODCAST</h3>
                                    <p className="text-purple-500/80 font-mono text-sm mb-3">Latest Transmission</p>
                                    <p className="text-gray-400 text-sm line-clamp-2">Intercepted broadcast from pre-apocalypse archives. Essential viewing for all resistance members.</p>
                                    <div className="mt-4 flex items-center gap-2 text-purple-400 font-mono text-xs group-hover:translate-x-2 transition-transform">
                                        <span>WATCH_PODCAST</span>
                                        <span>→</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </>
                ) : showPodcast ? (
                    /* Podcast Detail View */
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        <button onClick={() => setShowPodcast(false)} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-mono mb-8">
                            <span>←</span>
                            <span>BACK_TO_RECORDS</span>
                        </button>

                        <div className="bg-gradient-to-b from-purple-900/40 to-black rounded-2xl border border-purple-500/30 overflow-hidden">
                            <div className="p-8 border-b border-purple-500/20 bg-purple-500/5">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-5xl">🎙️</div>
                                    <div>
                                        <h2 className="text-4xl font-bold text-purple-400 mb-2">THE RESISTANCE PODCAST</h2>
                                        <p className="text-purple-500/80 font-mono text-lg">Latest Transmission</p>
                                        <p className="text-purple-500/50 font-mono text-sm mt-1">Pre-Apocalypse Archives</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                {/* Video Embed */}
                                <div>
                                    <h3 className="text-purple-400 font-mono text-sm mb-3 flex items-center gap-2">
                                        <span className="text-purple-500">▌</span> BROADCAST
                                    </h3>
                                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-purple-500/30 bg-black">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/uDy-kSxHBVc"
                                            title="The Resistance Podcast"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-purple-400 font-mono text-sm mb-3 flex items-center gap-2">
                                        <span className="text-purple-500">▌</span> DESCRIPTION
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        This intercepted transmission was recovered from the pre-apocalypse archives.
                                        It contains vital information about technology history and the pioneers who shaped our digital world.
                                        All resistance members are encouraged to study this material carefully.
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-purple-500/20">
                                    <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                                        <span className="animate-pulse">●</span>
                                        ARCHIVED_IN_NIRD_DATABASE
                                    </div>
                                    <div className="text-purple-500/50 font-mono text-sm">BROADCAST_STATUS: ACTIVE</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Pioneer Detail View */
                    <div className="max-w-4xl mx-auto animate-fade-in">
                        <button onClick={() => setSelectedPioneer(null)} className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-mono mb-8">
                            <span>←</span>
                            <span>BACK_TO_RECORDS</span>
                        </button>

                        <div className="bg-gradient-to-b from-gray-900/80 to-black rounded-2xl border border-amber-500/30 overflow-hidden">
                            <div className="p-8 border-b border-amber-500/20 bg-amber-500/5">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-5xl">{selectedPioneer.icon}</div>
                                    <div>
                                        <h2 className="text-4xl font-bold text-amber-400 mb-2">{selectedPioneer.name}</h2>
                                        <p className="text-amber-500/80 font-mono text-lg">{selectedPioneer.role}</p>
                                        <p className="text-amber-500/50 font-mono text-sm mt-1">{selectedPioneer.year}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">
                                <div>
                                    <h3 className="text-amber-400 font-mono text-sm mb-3 flex items-center gap-2">
                                        <span className="text-amber-500">▌</span> BIOGRAPHY
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">{selectedPioneer.description}</p>
                                </div>

                                <div>
                                    <h3 className="text-amber-400 font-mono text-sm mb-3 flex items-center gap-2">
                                        <span className="text-amber-500">▌</span> KEY_ACHIEVEMENTS
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {selectedPioneer.achievements.map((achievement, i) => (
                                            <div key={i} className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
                                                <div className="text-amber-400 mb-1">✓</div>
                                                <p className="text-gray-300 font-mono text-sm">{achievement}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-amber-500/20">
                                    <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                                        <span className="animate-pulse">●</span>
                                        ARCHIVED_IN_NIRD_DATABASE
                                    </div>
                                    <div className="text-amber-500/50 font-mono text-sm">LEGACY_STATUS: ETERNAL</div>
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
