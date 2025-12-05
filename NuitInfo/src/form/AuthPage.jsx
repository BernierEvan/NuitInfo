import React, { useState } from 'react';

const AuthPage = ({ onAuthSuccess }) => {
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
                throw new Error(data.error || 'Erreur de connexion');
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            onAuthSuccess(data.user);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
            {/* Background décoratif */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                <div className="absolute top-10 left-10 text-9xl">🏋️</div>
                <div className="absolute bottom-10 right-10 text-9xl">🌊</div>
            </div>

            <div className="relative max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl mb-6">
                        <span className="text-4xl">🏋️</span>
                        <span className="text-white font-black text-xl">CTO Health Monitor</span>
                    </div>

                    <h1 className="text-3xl font-black text-white mb-2">
                        {isLogin ? 'Connexion' : 'Créer un compte'}
                    </h1>
                    <p className="text-white/80">
                        {isLogin
                            ? 'Accède à ta routine personnalisée'
                            : 'Rejoins-nous pour améliorer ta posture !'}
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl">

                    {/* Toggle */}
                    <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                        <button
                            type="button"
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${isLogin
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Connexion
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 rounded-lg font-bold transition-all ${!isLogin
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            Inscription
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-gray-700 text-sm font-medium mb-2">
                                    Prénom / Pseudo
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="Ex: Marie"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Adresse email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="exemple@email.com"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                required
                                minLength={4}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${loading
                                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="animate-spin">⏳</span> Chargement...
                                </span>
                            ) : isLogin ? (
                                'Se connecter →'
                            ) : (
                                'Créer mon compte →'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 h-px bg-gray-200"></div>
                        <span className="px-4 text-gray-400 text-sm">ou</span>
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>

                    {/* Footer */}
                    <div className="text-center text-gray-500 text-sm">
                        {isLogin ? (
                            <p>Pas encore inscrit ? <button type="button" onClick={() => setIsLogin(false)} className="text-blue-600 hover:text-blue-700 font-medium">Crée un compte</button></p>
                        ) : (
                            <p>Déjà un compte ? <button type="button" onClick={() => setIsLogin(true)} className="text-blue-600 hover:text-blue-700 font-medium">Connecte-toi</button></p>
                        )}
                    </div>
                </div>

                {/* Theme info */}
                <div className="mt-6 text-center">
                    <p className="text-white/60 text-sm">
                        🌊 Nuit de l'Info 2024 • NIRD × Décathlon
                    </p>
                </div>
            </div>
        </div>

    );
};

export default AuthPage;
