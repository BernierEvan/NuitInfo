import React from 'react';

const HomePage = ({ onStart, onSkipToRoutine, user, hasProfile }) => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 text-[200px]">🌊</div>
                    <div className="absolute bottom-10 right-20 text-[150px]">🏋️</div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 text-center text-white">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <span>🌙</span> Nuit de l'Info 2025 • Défi Decathlon
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                        Le Corps Humain <span className="text-cyan-300">&</span> L'Océan
                        <br />
                        <span className="text-yellow-300">Même Combat</span>
                    </h1>

                    <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6 leading-relaxed">
                        <strong>Comme l'océan régule notre planète, ton corps régule ta santé.</strong>
                        <br />
                        Les deux sont des écosystèmes fragiles qui nécessitent attention et protection.
                    </p>

                    <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
                        Découvre comment prendre soin de ton "océan intérieur" et deviens
                        le <strong className="text-white">CTO de ta Santé Posturale</strong> ! 🚀
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {hasProfile ? (
                            <>
                                <button
                                    onClick={onSkipToRoutine}
                                    className="bg-white text-blue-700 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all inline-flex items-center gap-2"
                                >
                                    <span>🏋️</span> Voir ma Routine
                                </button>
                                <button
                                    onClick={onStart}
                                    className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-bold text-lg border border-white/30 hover:bg-white/30 transition-all inline-flex items-center gap-2"
                                >
                                    <span>🔄</span> Refaire le Quiz
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onStart}
                                className="bg-white text-blue-700 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all inline-flex items-center gap-3"
                            >
                                <span>🚀</span> Commencer le Diagnostic
                            </button>
                        )}
                    </div>

                    {user && (
                        <p className="mt-8 text-white/60">
                            👤 Connecté en tant que <span className="font-bold text-white">{user.username}</span>
                            {hasProfile && <span className="ml-2 text-green-300">• Profil sauvegardé ✓</span>}
                        </p>
                    )}
                </div>
            </section>

            {/* Section Parallèle */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-black text-gray-900 text-center mb-4">
                        🌊 Corps Humain = Océan
                    </h2>
                    <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                        Les parallèles entre ton corps et l'océan sont plus nombreux que tu ne le penses !
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        <ParallelCard
                            ocean="🌊 L'océan absorbe 30% du CO2"
                            body="💪 Ton dos absorbe les tensions quotidiennes"
                            lesson="Prends soin de ton dos comme on protège les océans"
                        />
                        <ParallelCard
                            ocean="🔄 Les courants marins régulent le climat"
                            body="❤️ Ton sang circule et régule ta température"
                            lesson="Bouge régulièrement pour maintenir la circulation"
                        />
                        <ParallelCard
                            ocean="🐠 L'écosystème marin est interconnecté"
                            body="🦴 Tes muscles et articulations travaillent ensemble"
                            lesson="Un déséquilibre impacte tout le système"
                        />
                    </div>
                </div>
            </section>

            {/* Section NIRD */}
            <section className="py-16 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-cyan-500/20 px-4 py-2 rounded-full text-sm font-bold mb-6">
                        <span>♻️</span> NIRD • Numérique Responsable
                    </div>

                    <h2 className="text-4xl font-black mb-6">
                        Résistance Numérique <span className="text-cyan-400">=</span> Résistance Physique
                    </h2>

                    <p className="text-xl text-white/80 max-w-3xl mx-auto mb-10">
                        Le numérique responsable, ce n'est pas que du code optimisé.
                        C'est aussi <strong className="text-white">prendre soin de l'humain derrière l'écran</strong>.
                        <br />
                        Ta santé est la ressource la plus précieuse. Ne la gaspille pas !
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard value="8h+" label="assis par jour en moyenne" icon="🪑" />
                        <StatCard value="63%" label="des devs ont eu un burnout" icon="🔥" />
                        <StatCard value="4%" label="du CO2 mondial = numérique" icon="🌍" />
                        <StatCard value="15min" label="d'exercice changent tout" icon="💪" />
                    </div>
                </div>
            </section>

            {/* Section Parcours */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black text-gray-900 mb-4">
                        Ton Parcours en 3 Étapes
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-10">
                        <StepCard number={1} title="Diagnostic" description="Quiz rapide pour analyser ton profil postural" />
                        <Arrow />
                        <StepCard number={2} title="Prise de Conscience" description="Découvre les enjeux NIRD × Santé" />
                        <Arrow />
                        <StepCard number={3} title="Ta Routine" description="Exercices adaptés à TON niveau" />
                    </div>

                    <button
                        onClick={hasProfile ? onSkipToRoutine : onStart}
                        className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                    >
                        {hasProfile ? '🏋️ Accéder à ma Routine' : '🚀 Démarrer maintenant'}
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-8">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-gray-400 text-sm">
                        🏃 Décathlon Digital × 🌙 Nuit de l'Info 2025
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                        "L'océan et le corps humain : même fragilité, même besoin de protection"
                    </p>
                </div>
            </footer>
        </div>
    );
};

// Composants
const ParallelCard = ({ ocean, body, lesson }) => (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-100">
        <p className="text-blue-700 font-medium mb-2">{ocean}</p>
        <p className="text-purple-700 font-medium mb-4">{body}</p>
        <p className="text-gray-600 text-sm italic">→ {lesson}</p>
    </div>
);

const StatCard = ({ value, label, icon }) => (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <div className="text-3xl mb-2">{icon}</div>
        <div className="text-3xl font-black text-cyan-400">{value}</div>
        <p className="text-white/70 text-sm mt-1">{label}</p>
    </div>
);

const StepCard = ({ number, title, description }) => (
    <div className="bg-white rounded-2xl p-6 shadow-lg text-center flex-1">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white font-black text-xl flex items-center justify-center mx-auto mb-4">
            {number}
        </div>
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
    </div>
);

const Arrow = () => (
    <div className="text-gray-300 text-2xl hidden md:block">→</div>
);

export default HomePage;
