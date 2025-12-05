import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchWrapper from '../components/GlitchWrapper';
import { womenInTechLore } from '../data/LoreData';
import LoreModal from '../components/LoreModal';
import Chatbot from './Chatbot';
import SnakeGameWrapper from '../components/SnakeGameWrapper';
import adaIcon from '../assets/ada_lovelace_chatbot.jpg';
import { useVoiceSystem } from '../components/VoiceSubtitleSystem';
import { useGame } from '../context/GameContext';

const Lobby = () => {
    const navigate = useNavigate();
    const [selectedLore, setSelectedLore] = useState(null);
    const [showChatbot, setShowChatbot] = useState(false);
    const [showSnake, setShowSnake] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const [introPlayed, setIntroPlayed] = useState(false);
    const [iconBounce, setIconBounce] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    // Game context for assessment state
    const { isAssessmentComplete } = useGame();

    // Check for logged in user
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                setCurrentUser(JSON.parse(savedUser));
            } catch (e) {
                console.log('Invalid user data');
            }
        }
    }, []);

    // Voice system
    const { playVoice, SubtitleComponent } = useVoiceSystem();
    const introPlayedRef = useRef(false);

    const shards = useMemo(() => {
        return womenInTechLore.map(lore => {
            const edgeBias = Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15;
            return {
                ...lore,
                top: Math.random() * 90 + 5,
                left: edgeBias,
                delay: Math.random() * 2,
                scale: 0.5 + Math.random() * 0.3
            };
        });
    }, []);

    // Play intro sequence when entering lobby
    useEffect(() => {
        // Check sessionStorage - only play once per session
        if (sessionStorage.getItem('lobbyIntroPlayed') === 'true') {
            introPlayedRef.current = true;
            setIntroPlayed(true);
            return;
        }

        // Only play once per mount cycle
        if (introPlayedRef.current) return;
        introPlayedRef.current = true;

        // Small delay before starting intro
        const runIntro = async () => {
            console.log('Starting intro sequence...');

            try {
                await playVoice('character', 'wtfWasThat');
                await new Promise(r => setTimeout(r, 300));

                await playVoice('character', 'nirdTheResistance');
                await new Promise(r => setTimeout(r, 300));

                await playVoice('character', 'wellGuess');
                await new Promise(r => setTimeout(r, 1500));

                // Make icon bounce
                setIconBounce(true);

                await playVoice('character', 'whoAreYou');
                await new Promise(r => setTimeout(r, 300));

                await playVoice('ai', 'imNird');
                await new Promise(r => setTimeout(r, 300));

                await playVoice('ai', 'dontHesitate');

                // Mark as played in sessionStorage for this session
                sessionStorage.setItem('lobbyIntroPlayed', 'true');
                setIntroPlayed(true);
                console.log('Intro sequence complete');
            } catch (err) {
                console.error('Intro sequence error:', err);
            }
        };

        const timer = setTimeout(runIntro, 1000);
        return () => {
            clearTimeout(timer);
            // Reset ref on cleanup so intro can play after StrictMode remount
            introPlayedRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle chatbot icon click - play "What would you like to know?"
    const handleChatbotClick = async () => {
        await playVoice('ai', 'whatWouldYouLike');
        setShowChatbot(true);
    };

    // Handle snake game open - AI says "You discovered my secret"
    const handleOpenSnake = async () => {
        setShowChatbot(false);
        await playVoice('ai', 'discoveredSecret');
        setShowSnake(true);
    };

    // Glitchy transition to Records page
    const handleRecordsClick = () => {
        setIsGlitching(true);
        setTimeout(() => {
            navigate('/records');
        }, 800);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 relative overflow-hidden bg-black">
            {/* Subtitle display */}
            <SubtitleComponent />

            {/* Glitch Transition Overlay */}
            {isGlitching && (
                <div className="fixed inset-0 z-[9999] pointer-events-none">
                    {/* Glitch bars */}
                    <div className="absolute inset-0 animate-pulse" style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,158,11,0.1) 2px, rgba(245,158,11,0.1) 4px)'
                    }}></div>

                    {/* Random glitch blocks */}
                    <div className="absolute top-1/4 left-0 w-full h-8 bg-amber-500/30" style={{ animation: 'glitch-block 0.1s infinite' }}></div>
                    <div className="absolute top-1/2 left-0 w-3/4 h-4 bg-cyan-500/30" style={{ animation: 'glitch-block 0.15s infinite', animationDelay: '0.05s' }}></div>
                    <div className="absolute top-3/4 left-1/4 w-1/2 h-6 bg-red-500/30" style={{ animation: 'glitch-block 0.08s infinite', animationDelay: '0.1s' }}></div>

                    {/* Screen tear effect */}
                    <div className="absolute inset-0" style={{
                        background: 'linear-gradient(transparent 0%, transparent 45%, rgba(245,158,11,0.2) 45%, rgba(245,158,11,0.2) 55%, transparent 55%)',
                        animation: 'screen-tear 0.2s infinite'
                    }}></div>

                    {/* Loading text */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-amber-400 font-mono text-4xl" style={{
                            textShadow: '2px 0 #ff0000, -2px 0 #00ffff',
                            animation: 'text-glitch 0.1s infinite'
                        }}>
                            ░▓█ ACCESSING ARCHIVES █▓░
                        </div>
                    </div>

                    {/* Noise overlay */}
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
                        animation: 'noise 0.2s infinite'
                    }}></div>
                </div>
            )}

            {/* Darkening Overlay for Chatbot */}
            <div
                className={`absolute inset-0 bg-black/80 z-40 transition-opacity duration-500 pointer-events-none ${showChatbot ? 'opacity-100' : 'opacity-0'}`}
            ></div>

            {/* Lore Shards Layer */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {shards.map((shard) => (
                    <div
                        key={shard.id}
                        className="absolute pointer-events-auto cursor-pointer group"
                        style={{
                            top: `${shard.top}%`,
                            left: `${shard.left}%`,
                            transform: `scale(${shard.scale})`
                        }}
                        onClick={() => setSelectedLore(shard)}
                    >
                        <GlitchWrapper intensity="low">
                            <div className="flex flex-col items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="w-8 h-8 border border-cyan-500/30 bg-cyan-900/10 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                    <span className="text-cyan-400/50 font-mono text-[10px] -rotate-45 group-hover:rotate-0 transition-transform duration-500">{shard.icon}</span>
                                </div>
                            </div>
                        </GlitchWrapper>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className={`relative z-10 flex flex-col items-center w-full transition-all duration-500 ${showChatbot ? 'blur-sm scale-95 opacity-50' : ''} ${isGlitching ? 'animate-shake' : ''}`}>

                {/* User Header Bar */}
                {currentUser && (
                    <div className="absolute top-0 left-0 w-full z-20 p-6 flex justify-between items-start pointer-events-none">
                        {/* Left side spacer or logo placeholder if needed */}
                        <div className="pointer-events-auto">
                            {/* Potential Logo Area */}
                        </div>

                        {/* Right side - User Profile & Logout */}
                        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-2 flex items-center gap-4 shadow-lg shadow-cyan-500/10 transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/20">
                            {/* User Info */}
                            <div className="flex items-center gap-3 pl-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-inner">
                                    {currentUser.username?.[0]?.toUpperCase() || '?'}
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-white font-bold text-sm leading-tight">{currentUser.username}</p>
                                    <p className="text-cyan-400/60 text-[10px] font-mono tracking-wider uppercase">
                                        // {currentUser.email?.split('@')[0]}
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="h-8 w-px bg-white/10"></div>

                            {/* Wide Logout Button */}
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('user');
                                    setCurrentUser(null);
                                }}
                                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 px-6 py-2.5 rounded-xl font-mono text-sm font-bold tracking-wider transition-all flex items-center gap-2 group min-w-[140px] justify-center"
                                title="Disconnect"
                            >
                                <span>LOGOUT</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Title */}
                <GlitchWrapper intensity="high">
                    <div className="mb-16">
                        <h1 className="text-6xl md:text-8xl font-bold glitch-text tracking-tighter text-center text-cyan-400" data-text="NIRD_RESISTANCE">
                            NIRD_RESISTANCE
                        </h1>
                    </div>
                </GlitchWrapper>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
                    {/* Profile Card */}
                    <GlitchWrapper intensity="medium">
                        <div className="group relative">
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${isAssessmentComplete ? 'from-green-500 to-cyan-500' : 'from-cyan-500 to-purple-500'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                            <button
                                onClick={() => isAssessmentComplete ? navigate('/profile') : navigate('/assessment')}
                                className={`relative w-full h-80 rounded-2xl overflow-hidden border ${isAssessmentComplete ? 'border-green-500/30 hover:border-green-400' : 'border-cyan-500/30 hover:border-cyan-400'} bg-gradient-to-b from-gray-900 to-black transition-all duration-500 flex flex-col`}
                            >
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-cyan-400 text-3xl"></span>
                                            {isAssessmentComplete ? (
                                                <span className="text-green-500 text-xs font-mono bg-green-500/10 border border-green-500/30 px-2 py-1 rounded">UNLOCKED</span>
                                            ) : (
                                                <span className="text-red-500 text-xs font-mono bg-red-500/10 border border-red-500/30 px-2 py-1 rounded">LOCKED</span>
                                            )}
                                        </div>
                                        <h2 className={`text-3xl font-bold text-white ${isAssessmentComplete ? 'group-hover:text-green-400' : 'group-hover:text-cyan-400'} transition-colors duration-300`}>PROFILE</h2>
                                        <p className={`${isAssessmentComplete ? 'text-green-500/60' : 'text-cyan-500/60'} font-mono text-sm mt-2`}>
                                            {isAssessmentComplete ? '// ACCESS_GRANTED' : '// ACCESS_DENIED'}
                                        </p>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {isAssessmentComplete
                                            ? 'Your survival protocol is ready. View your personalized training program.'
                                            : 'Complete the assessment to unlock your profile.'}
                                    </p>
                                </div>
                                <div className={`h-1 w-full bg-gradient-to-r from-transparent ${isAssessmentComplete ? 'via-green-500/50' : 'via-cyan-500/50'} to-transparent`}></div>
                            </button>
                        </div>
                    </GlitchWrapper>

                    {/* Records Card */}
                    <GlitchWrapper intensity="medium">
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                            <button
                                onClick={handleRecordsClick}
                                className={`relative w-full h-80 rounded-2xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-gray-900 to-black hover:border-amber-400 transition-all duration-500 flex flex-col ${isGlitching ? 'animate-glitch-card' : ''}`}
                            >
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-amber-400 text-3xl"></span>
                                            <span className="text-amber-400 text-xs font-mono bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded">ARCHIVES</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">RECORDS</h2>
                                        <p className="text-amber-500/60 font-mono text-sm mt-2">// PIONEERS_DATABASE</p>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Discover the legendary women who shaped technology.
                                    </p>
                                </div>
                                <div className="h-1 w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
                            </button>
                        </div>
                    </GlitchWrapper>

                    {/* Assessment Card */}
                    <GlitchWrapper intensity="high">
                        <div className="group relative">
                            <div className={`absolute -inset-0.5 bg-gradient-to-r ${isAssessmentComplete ? 'from-green-500 to-emerald-500' : 'from-purple-500 to-pink-500'} rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                            <button
                                onClick={() => navigate('/assessment')}
                                className={`relative w-full h-80 rounded-2xl overflow-hidden border ${isAssessmentComplete ? 'border-green-500/30 hover:border-green-400' : 'border-purple-500/30 hover:border-purple-400'} bg-gradient-to-b from-gray-900 to-black transition-all duration-500 flex flex-col`}
                            >
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`${isAssessmentComplete ? 'text-green-400' : 'text-purple-400'} text-3xl`}>
                                                {isAssessmentComplete ? '✅' : '🎯'}
                                            </span>
                                            {isAssessmentComplete ? (
                                                <span className="text-green-400 text-xs font-mono bg-green-500/10 border border-green-500/30 px-2 py-1 rounded">COMPLETE</span>
                                            ) : (
                                                <span className="text-purple-400 text-xs font-mono bg-purple-500/10 border border-purple-500/30 px-2 py-1 rounded">REQUIRED</span>
                                            )}
                                        </div>
                                        <h2 className={`text-3xl font-bold text-white ${isAssessmentComplete ? 'group-hover:text-green-400' : 'group-hover:text-purple-400'} transition-colors duration-300`}>ASSESSMENT</h2>
                                        <p className={`${isAssessmentComplete ? 'text-green-500/60' : 'text-purple-500/60'} font-mono text-sm mt-2`}>
                                            {isAssessmentComplete ? '// DIAGNOSTIC_COMPLETE' : '// PENDING'}
                                        </p>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {isAssessmentComplete
                                            ? 'Assessment complete. Retake to update your profile.'
                                            : 'Begin the evaluation protocol. Prove your worth.'}
                                    </p>
                                </div>
                                <div className={`h-1 w-full bg-gradient-to-r from-transparent ${isAssessmentComplete ? 'via-green-500/50' : 'via-purple-500/50'} to-transparent`}></div>
                            </button>
                        </div>
                    </GlitchWrapper>
                </div>
            </div>

            {/* Lore Modal */}
            {selectedLore && (
                <LoreModal
                    data={selectedLore}
                    onClose={() => setSelectedLore(null)}
                />
            )}

            {/* Chatbot Overlay */}
            {showChatbot && (
                <Chatbot
                    onClose={() => setShowChatbot(false)}
                    onOpenSnake={handleOpenSnake}
                />
            )}

            {/* Snake Game Overlay */}
            {showSnake && (
                <SnakeGameWrapper onClose={() => setShowSnake(false)} />
            )}

            {/* Bottom Fade */}
            <div className="fixed bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent z-30 pointer-events-none"></div>

            {/* Chatbot Icon */}
            <div
                style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}
                className={`transition-opacity duration-300 ${showChatbot ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
                {/* Bounce indicator */}
                {iconBounce && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 animate-bounce z-50">
                        <span className="text-[150px] text-red-500 font-bold drop-shadow-[0_0_10px_rgba(255,0,0,0.8)]">!</span>
                    </div>
                )}

                <div
                    onClick={handleChatbotClick}
                    style={{ width: '350px', height: '350px' }}
                    className={`rounded-full border-2 border-cyan-400 cursor-pointer overflow-hidden hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] bg-black ${iconBounce && !introPlayed ? 'animate-pulse' : ''}`}
                >
                    <img
                        src={adaIcon}
                        alt="AI Chatbot"
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>

            {/* Glitch animations style */}
            <style>{`
                @keyframes glitch-block {
                    0%, 100% { transform: translateX(0); opacity: 0.3; }
                    25% { transform: translateX(-100%); opacity: 0.5; }
                    50% { transform: translateX(100%); opacity: 0.2; }
                    75% { transform: translateX(-50%); opacity: 0.4; }
                }
                
                @keyframes screen-tear {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(20px); }
                }
                
                @keyframes text-glitch {
                    0%, 100% { transform: translate(0); }
                    20% { transform: translate(-2px, 2px); }
                    40% { transform: translate(2px, -2px); }
                    60% { transform: translate(-2px, -2px); }
                    80% { transform: translate(2px, 2px); }
                }
                
                @keyframes noise {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -5%); }
                    20% { transform: translate(5%, 5%); }
                    30% { transform: translate(-5%, 5%); }
                    40% { transform: translate(5%, -5%); }
                }
                
                .animate-shake {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                
                .animate-glitch-card {
                    animation: glitch-card 0.3s infinite;
                }
                
                @keyframes glitch-card {
                    0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
                    20% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
                    40% { transform: translate(5px, -5px); filter: hue-rotate(180deg); }
                    60% { transform: translate(-5px, -5px); filter: hue-rotate(270deg); }
                    80% { transform: translate(5px, 5px); filter: hue-rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default Lobby;
