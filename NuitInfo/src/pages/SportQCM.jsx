import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Quiz from '../form/Quiz';
import AuthPage from '../form/AuthPage';

const SportQCM = () => {
    const navigate = useNavigate();
    const { completeAssessment } = useGame();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [checkingAuth, setCheckingAuth] = useState(true);

    // Check if user is already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
                setIsAuthenticated(true);
            } catch (e) {
                // Invalid stored data, clear it
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setCheckingAuth(false);
    }, []);

    const handleAuthSuccess = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    const handleQuizFinish = () => {
        // Mark assessment as complete in the game context
        completeAssessment({
            completed: true,
            completedAt: new Date().toISOString(),
            userId: user?.id,
            username: user?.username
        });

        // Navigate to profile after completion
        setTimeout(() => {
            navigate('/profile');
        }, 500);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
    };

    // Show loading while checking authentication
    if (checkingAuth) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #0a0a0a 100%)' }}>
                <div className="text-center">
                    <div className="text-4xl animate-spin mb-4">⏳</div>
                    <p className="text-cyan-400 font-mono">VERIFYING_CREDENTIALS...</p>
                </div>
            </div>
        );
    }

    // Show authentication page if not logged in
    if (!isAuthenticated) {
        return <StyledAuthPage onAuthSuccess={handleAuthSuccess} />;
    }

    // Show Quiz if authenticated
    return (
        <div className="min-h-screen p-4" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #0a0a0a 100%)' }}>
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
                {/* Header with user info */}
                <div className="flex items-center justify-between mb-8">
                    <div className="text-center flex-1">
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-2">
                            SURVIVOR_ASSESSMENT
                        </h1>
                        <div className="h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
                        <p className="text-cyan-500/60 font-mono text-sm mt-3">
                            // DIAGNOSTIC SYSTEM • REQUIRED FOR PROFILE ACCESS
                        </p>
                    </div>
                </div>

                {/* User Badge */}
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="bg-slate-900/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl px-4 py-2 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {user?.username?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div>
                            <p className="text-white font-medium text-sm">{user?.username || 'Survivor'}</p>
                            <p className="text-cyan-400/60 text-xs font-mono">{user?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="ml-4 text-red-400/60 hover:text-red-400 text-xs font-mono transition-colors"
                            title="Logout"
                        >
                            [LOGOUT]
                        </button>
                    </div>
                </div>

                {/* Quiz Component */}
                <Quiz onFinish={handleQuizFinish} />

                {/* Back Button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="group inline-flex items-center gap-2 text-cyan-400/60 hover:text-cyan-400 transition-all font-mono text-sm bg-slate-900/50 px-6 py-3 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        RETURN_TO_LOBBY
                    </button>
                </div>
            </div>
        </div>
    );
};

// Styled Auth Page Component (adapted to match the theme)
const StyledAuthPage = ({ onAuthSuccess }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://localhost:3001/api';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const endpoint = isLogin ? '/login' : '/register';
            const body = isLogin
                ? { email: formData.email, password: formData.password }
                : formData;

            const res = await fetch(`${API_URL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Connection error');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            onAuthSuccess(data.user);
        } catch (err) {
            // For demo purposes, allow a mock login if server is not running
            if (err.message.includes('fetch')) {
                // Mock authentication for development
                const mockUser = {
                    id: 'demo-user-' + Date.now(),
                    username: formData.username || formData.email.split('@')[0],
                    email: formData.email
                };
                localStorage.setItem('token', 'demo-token-' + Date.now());
                localStorage.setItem('user', JSON.stringify(mockUser));
                onAuthSuccess(mockUser);
                return;
            }
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 30%, #1e1b4b 70%, #020617 100%)' }}>
            {/* Animated Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {/* Floating orbs */}
                <div className="absolute top-20 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/3 right-10 w-48 h-48 bg-pink-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>

                {/* Grid overlay */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            <div className="relative max-w-md w-full">
                {/* Floating Icon Badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl blur-lg opacity-60"></div>
                        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-white/20 shadow-2xl">
                            <span className="text-5xl block transform hover:scale-110 transition-transform">🛡️</span>
                        </div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative pt-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl"></div>
                    <div className="relative bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

                        {/* Header Section */}
                        <div className="relative px-8 pt-12 pb-8 text-center bg-gradient-to-b from-slate-800/50 to-transparent">
                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200 mb-2 tracking-tight">
                                {isLogin ? 'Bienvenue' : 'Rejoins-nous'}
                            </h1>
                            <p className="text-slate-400 text-base max-w-xs mx-auto leading-relaxed">
                                {isLogin
                                    ? 'Connecte-toi pour accéder à ton espace personnel'
                                    : 'Crée ton compte pour commencer l\'aventure'}
                            </p>
                        </div>

                        {/* Content */}
                        <div className="px-8 pb-8">
                            {/* Toggle Tabs */}
                            <div className="flex bg-slate-800/80 rounded-2xl p-1.5 mb-8 border border-slate-700/50">
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${isLogin
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                        }`}
                                >
                                    <span>🔑</span>
                                    Connexion
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${!isLogin
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                        }`}
                                >
                                    <span>✨</span>
                                    Inscription
                                </button>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-4 rounded-2xl mb-6 text-sm flex items-start gap-3">
                                    <span className="text-lg">⚠️</span>
                                    <div>
                                        <p className="font-semibold mb-0.5">Erreur</p>
                                        <p className="text-red-300/80">{error}</p>
                                    </div>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {!isLogin && (
                                    <div className="group">
                                        <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2.5">
                                            <span className="text-lg">👤</span>
                                            Nom d'utilisateur
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Ton pseudo..."
                                            className="w-full px-5 py-4 bg-slate-800/60 border-2 border-slate-700/50 rounded-2xl text-white text-base placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:bg-slate-800 focus:shadow-lg focus:shadow-cyan-500/10 transition-all duration-300"
                                            required={!isLogin}
                                        />
                                    </div>
                                )}

                                <div className="group">
                                    <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2.5">
                                        <span className="text-lg">📧</span>
                                        Adresse email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="ton@email.com"
                                        className="w-full px-5 py-4 bg-slate-800/60 border-2 border-slate-700/50 rounded-2xl text-white text-base placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:bg-slate-800 focus:shadow-lg focus:shadow-cyan-500/10 transition-all duration-300"
                                        required
                                    />
                                </div>

                                <div className="group">
                                    <label className="flex items-center gap-2 text-slate-300 text-sm font-medium mb-2.5">
                                        <span className="text-lg">🔒</span>
                                        Mot de passe
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full px-5 py-4 bg-slate-800/60 border-2 border-slate-700/50 rounded-2xl text-white text-base placeholder-slate-500 focus:outline-none focus:border-cyan-500/70 focus:bg-slate-800 focus:shadow-lg focus:shadow-cyan-500/10 transition-all duration-300"
                                        required
                                        minLength={4}
                                    />
                                    <p className="text-slate-500 text-xs mt-2 ml-1">Minimum 4 caractères</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4.5 rounded-2xl font-bold text-base transition-all duration-300 mt-6 ${loading
                                        ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                                        : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]'
                                        }`}
                                    style={{ paddingTop: '1.125rem', paddingBottom: '1.125rem' }}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                            Chargement...
                                        </span>
                                    ) : isLogin ? (
                                        <span className="flex items-center justify-center gap-2">
                                            Se connecter
                                            <span className="text-lg">→</span>
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Créer mon compte
                                            <span className="text-lg">🚀</span>
                                        </span>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="my-8 flex items-center gap-4">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">ou</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                            </div>

                            {/* Switch Footer */}
                            <div className="text-center">
                                {isLogin ? (
                                    <p className="text-slate-400">
                                        Pas encore de compte ?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsLogin(false)}
                                            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors underline underline-offset-4 decoration-cyan-400/30 hover:decoration-cyan-300"
                                        >
                                            Inscris-toi
                                        </button>
                                    </p>
                                ) : (
                                    <p className="text-slate-400">
                                        Déjà un compte ?{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsLogin(true)}
                                            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors underline underline-offset-4 decoration-cyan-400/30 hover:decoration-cyan-300"
                                        >
                                            Connecte-toi
                                        </button>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back to Lobby */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="group inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 px-5 py-2.5 rounded-xl hover:bg-white/5"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-300 text-lg">←</span>
                        <span className="text-sm font-medium">Retour au Lobby</span>
                    </button>
                </div>

                {/* Footer info */}
                <div className="mt-6 text-center">
                    <p className="text-slate-600 text-xs">
                        NIRD RESISTANCE • Survivor Protocol v2.0
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SportQCM;
