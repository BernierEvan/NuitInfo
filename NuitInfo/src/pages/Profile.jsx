import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import exercisesData from '../form/data/exercices.json';
import productsData from '../form/data/products.json';

const Profile = () => {
    const { isAssessmentComplete, userProfile } = useGame();
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('recommended');
    const [showProducts, setShowProducts] = useState(true);
    const [selectedExercise, setSelectedExercise] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (!user) {
            navigate('/assessment');
            return;
        }

        if (!isAssessmentComplete) {
            navigate('/assessment');
            return;
        }
    }, [isAssessmentComplete, navigate]);

    // Exercise definitions by level
    const exercisesByLevel = {
        beginner: ['plank', 'child_pose', 'cat_cow', 'wrist_stretch', 'neck_rotation', 'shoulder_stretch', 'glute_bridge'],
        intermediate: ['plank', 'squat', 'child_pose', 'cat_cow', 'hip_flexor_stretch', 'dead_bug', 'wrist_stretch', 'neck_rotation', 'wall_angels', 'standing_calf_stretch'],
        expert: exercisesData.map(e => e.id)
    };

    // Filter exercises based on profile
    const filteredExercises = useMemo(() => {
        if (!userProfile) return exercisesData.slice(0, 5);

        let exercises = [...exercisesData];
        const level = userProfile.level || 'beginner';

        if (selectedType === 'recommended') {
            const allowedIds = exercisesByLevel[level] || exercisesByLevel.beginner;
            exercises = exercises.filter(e => allowedIds.includes(e.id));

            exercises.sort((a, b) => {
                const priorities = userProfile.priorities || [];
                const aMatch = priorities.includes(a.type) ? 10 : 0;
                const bMatch = priorities.includes(b.type) ? 10 : 0;
                return bMatch - aMatch;
            });

            if (level === 'beginner') exercises = exercises.slice(0, 5);
            else if (level === 'intermediate') exercises = exercises.slice(0, 7);
        } else if (selectedType !== 'all') {
            exercises = exercises.filter(e => e.type === selectedType);
        }

        return exercises;
    }, [userProfile, selectedType]);

    const exerciseTypes = useMemo(() => [...new Set(exercisesData.map(e => e.type))], []);

    const typeLabels = {
        'core': { label: '💪 Gainage', color: 'blue' },
        'legs': { label: '🦵 Jambes', color: 'green' },
        'flex': { label: '🧘 Souplesse', color: 'purple' },
        'stretch': { label: '🤸 Étirements', color: 'orange' },
        'mobility': { label: '🔄 Mobilité', color: 'cyan' }
    };

    const levelLabels = {
        'beginner': { text: '🌱 Débutant', color: 'green' },
        'intermediate': { text: '💪 Intermédiaire', color: 'blue' },
        'expert': { text: '⚡ Expert', color: 'purple' },
        'advanced': { text: '🔥 Avancé', color: 'orange' }
    };

    const difficultyColors = {
        'beginner': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
        'intermediate': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
        'advanced': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
    };

    // Get products based on exercises
    const getProfileProducts = () => {
        const allProducts = [];
        filteredExercises.forEach(exo => {
            exo.products?.forEach(productId => {
                if (!allProducts.includes(productId)) allProducts.push(productId);
            });
        });
        return productsData.filter(p => allProducts.slice(0, 4).includes(p.id));
    };

    if (!isAssessmentComplete || !userProfile) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 30%, #1e1b4b 70%, #020617 100%)' }}>
                {/* Animated Background */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative text-center">
                    <div className="relative inline-block mb-6">
                        <div className="absolute inset-0 bg-red-500/20 rounded-3xl blur-xl"></div>
                        <div className="relative bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-red-500/20">
                            <div className="text-7xl mb-4">🔒</div>
                        </div>
                    </div>
                    <h1 className="text-3xl text-red-400 font-bold mb-3">Accès Refusé</h1>
                    <p className="text-slate-400 mb-8 text-lg max-w-sm mx-auto">
                        Complete le diagnostic pour accéder à ton espace personnel.
                    </p>
                    <button
                        onClick={() => navigate('/assessment')}
                        className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 px-8 py-4 text-white font-bold rounded-2xl transition-all hover:scale-105 shadow-xl shadow-cyan-500/20"
                    >
                        Commencer le Diagnostic →
                    </button>
                </div>
            </div>
        );
    }

    const level = levelLabels[userProfile.level] || levelLabels.beginner;
    const relevantProducts = getProfileProducts();

    return (
        <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #020617 0%, #0f172a 30%, #1e1b4b 70%, #020617 100%)' }}>
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-block">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <span className="text-5xl">🏋️</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200">
                                Ton Programme
                            </h1>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent rounded-full"></div>
                    </div>
                    <p className="text-slate-400 text-base mt-4 max-w-lg mx-auto">
                        Programme d'entraînement personnalisé basé sur ton diagnostic
                    </p>
                </div>

                {/* Profile Header Card */}
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"></div>
                    <div className="relative bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase border border-green-500/30 shadow-lg shadow-green-500/10">
                                        {level.text}
                                    </span>
                                    {userProfile.riskScore >= 5 && (
                                        <span className="bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 px-4 py-1.5 rounded-full text-sm font-bold uppercase border border-red-500/30 animate-pulse">
                                            ⚠️ High Risk: {userProfile.riskScore}/10
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-black text-white mb-2">{userProfile.title}</h2>
                                <p className="text-blue-200/80 text-lg italic max-w-2xl leading-relaxed">{userProfile.description}</p>
                            </div>

                            <div className="flex gap-4">
                                <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-5 backdrop-blur-sm border border-cyan-500/20 text-center min-w-[100px]">
                                    <div className="text-4xl font-black text-cyan-400">{filteredExercises.length}</div>
                                    <div className="text-cyan-200/60 text-xs font-medium uppercase tracking-wider mt-1">Exercices</div>
                                </div>
                                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-5 backdrop-blur-sm border border-purple-500/20 text-center min-w-[100px]">
                                    <div className={`text-4xl font-black ${userProfile.riskScore >= 7 ? 'text-red-400' : userProfile.riskScore >= 4 ? 'text-yellow-400' : 'text-green-400'}`}>
                                        {userProfile.riskScore}/10
                                    </div>
                                    <div className="text-purple-200/60 text-xs font-medium uppercase tracking-wider mt-1">Indice de Risque</div>
                                </div>
                            </div>
                        </div>

                        {/* Priority Tags */}
                        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/10">
                            {userProfile.hasPain && (
                                <span className="bg-orange-500/10 text-orange-300 px-4 py-2 rounded-xl text-sm font-medium border border-orange-500/20 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
                                    {userProfile.pain?.replace('_pain', '').replace('back', 'Back Pain').replace('neck', 'Neck Pain').replace('wrist', 'Wrist Pain').replace('knee', 'Knee Pain')}
                                </span>
                            )}
                            {userProfile.needsCore && (
                                <span className="bg-blue-500/10 text-blue-300 px-4 py-2 rounded-xl text-sm font-medium border border-blue-500/20 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                                    🛡️ Core Priority
                                </span>
                            )}
                            {userProfile.needsStretch && (
                                <span className="bg-purple-500/10 text-purple-300 px-4 py-2 rounded-xl text-sm font-medium border border-purple-500/20 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                                    🧘 Stretching Required
                                </span>
                            )}
                            {userProfile.priorities?.map((priority, idx) => (
                                <span key={idx} className="bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-xl text-sm font-medium border border-cyan-500/20">
                                    {priority}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/5 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            onClick={() => setSelectedType('recommended')}
                            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${selectedType === 'recommended'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30 scale-105'
                                : 'bg-slate-800 text-gray-300 hover:bg-slate-700 hover:scale-102'
                                }`}
                        >
                            ⭐ Pour Toi
                        </button>
                        <button
                            onClick={() => setSelectedType('all')}
                            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${selectedType === 'all'
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                                }`}
                        >
                            Tous ({exercisesData.length})
                        </button>
                        <div className="w-px h-8 bg-slate-700 mx-2" />
                        {exerciseTypes.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${selectedType === type
                                    ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-white shadow-lg scale-105 border border-white/20'
                                    : 'bg-slate-800/50 text-gray-400 hover:bg-slate-700 hover:text-white'
                                    }`}
                            >
                                {typeLabels[type]?.label || type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Exercise Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {filteredExercises.map((exo, index) => (
                        <ExerciseCard
                            key={exo.id}
                            exercise={exo}
                            isRecommended={userProfile.priorities?.includes(exo.type)}
                            userProfile={userProfile}
                            index={index}
                            typeLabels={typeLabels}
                            difficultyColors={difficultyColors}
                            onClick={() => setSelectedExercise(exo)}
                        />
                    ))}
                </div>

                {/* Training Schedule */}
                {userProfile.schedule && (
                    <div className="relative mb-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl"></div>
                        <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-3xl">📅</span>
                                Programme d'Entraînement
                                <span className="text-sm font-normal text-cyan-400/60 ml-auto">Plan hebdomadaire</span>
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                {userProfile.schedule.map((session, idx) => (
                                    <div key={idx} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-5 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all duration-300 group">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="font-bold text-white text-lg group-hover:text-cyan-400 transition-colors">{session.day}</span>
                                            <span className="text-sm text-cyan-400/70 bg-cyan-500/10 px-3 py-1 rounded-full">{session.duration}</span>
                                        </div>
                                        <p className="text-cyan-300 font-medium">{session.focus}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Section */}
                {relevantProducts.length > 0 && (
                    <div className="relative mb-10">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl blur-xl"></div>
                        <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-white/10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <span className="text-3xl">🛒</span>
                                    Équipement Recommandé
                                </h3>
                                <button
                                    onClick={() => setShowProducts(!showProducts)}
                                    className="text-cyan-400 hover:text-white text-sm font-medium px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-all"
                                >
                                    {showProducts ? 'Masquer' : 'Afficher'}
                                </button>
                            </div>
                            {showProducts && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {relevantProducts.map(product => (
                                        <div
                                            key={product.id}
                                            className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl p-5 border border-white/5 hover:border-yellow-500/30 transition-all duration-300 group"
                                        >
                                            <p className="font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">
                                                {product.name}
                                            </p>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-4">{product.description}</p>
                                            <div className="flex items-center justify-between">
                                                {product.price && (
                                                    <span className="text-yellow-400 font-bold text-lg">{product.price}</span>
                                                )}
                                                <a
                                                    href={product.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-slate-900 font-bold text-xs px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20"
                                                >
                                                    Voir →
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Back to Lobby */}
                <div className="text-center mt-10 pb-8">
                    <button
                        onClick={() => navigate('/')}
                        className="group inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 px-6 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800/50"
                    >
                        <span className="group-hover:-translate-x-1 transition-transform duration-300 text-lg">←</span>
                        <span className="text-sm font-medium">Retour au Lobby</span>
                    </button>
                </div>
            </div>

            {/* Exercise Detail Modal */}
            {selectedExercise && (
                <ExerciseModal
                    exercise={selectedExercise}
                    userProfile={userProfile}
                    onClose={() => setSelectedExercise(null)}
                    typeLabels={typeLabels}
                    difficultyColors={difficultyColors}
                />
            )}
        </div>
    );
};

// Exercise Card Component
const ExerciseCard = ({ exercise, isRecommended, userProfile, index, typeLabels, difficultyColors, onClick }) => {
    const typeConfig = typeLabels[exercise.type] || { label: exercise.type, color: 'gray' };
    const diffConfig = difficultyColors[exercise.difficulty] || difficultyColors.beginner;

    const typeColorClasses = {
        core: 'from-blue-500 to-indigo-600',
        legs: 'from-green-500 to-emerald-600',
        flex: 'from-purple-500 to-pink-600',
        stretch: 'from-orange-500 to-red-500',
        mobility: 'from-cyan-500 to-teal-600'
    };

    return (
        <div
            className="group cursor-pointer"
            style={{ animationDelay: `${index * 60}ms` }}
            onClick={onClick}
        >
            <div className="relative h-full">
                {isRecommended && (
                    <div className="absolute -top-3 -right-3 z-20">
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-500/30 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                            RECOMMENDED
                        </span>
                    </div>
                )}

                <div className="h-full bg-slate-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
                    {/* Gradient Header */}
                    <div className={`bg-gradient-to-r ${typeColorClasses[exercise.type] || 'from-gray-600 to-gray-700'} p-5 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{typeConfig.label.split(' ')[0]}</span>
                                <span className={`${diffConfig.bg} ${diffConfig.text} ${diffConfig.border} text-xs px-3 py-1 rounded-full border font-semibold uppercase`}>
                                    {exercise.difficulty}
                                </span>
                            </div>
                            <span className="bg-white/20 text-white text-xs px-3 py-1.5 rounded-full uppercase font-bold backdrop-blur-sm">
                                {exercise.type}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="font-bold text-white text-xl mb-2 group-hover:text-cyan-400 transition-colors">{exercise.name}</h3>

                        {/* Target Muscles */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                            {exercise.targetMuscles?.map((muscle, i) => (
                                <span key={i} className="text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-md">
                                    {muscle}
                                </span>
                            ))}
                        </div>

                        {/* Duration & Reps */}
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                            <span className="flex items-center gap-1.5">
                                <span className="text-cyan-400">⏱️</span>
                                {exercise.duration}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span className="text-purple-400">🔄</span>
                                {exercise.reps}
                            </span>
                        </div>

                        {/* Benefits Preview */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {exercise.benefits?.slice(0, 2).map((benefit, i) => (
                                <span key={i} className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
                                    ✓ {benefit}
                                </span>
                            ))}
                        </div>

                        {/* User-specific instruction */}
                        {userProfile?.pain && exercise.instructions?.[userProfile.pain] && (
                            <div className={`text-xs p-3 rounded-lg mb-3 ${exercise.instructions[userProfile.pain].includes('💚') ? 'bg-green-500/10 text-green-300 border border-green-500/20' : 'bg-orange-500/10 text-orange-300 border border-orange-500/20'}`}>
                                {exercise.instructions[userProfile.pain]}
                            </div>
                        )}

                        <div className="text-center pt-2 border-t border-white/5">
                            <span className="text-cyan-400/60 text-xs group-hover:text-cyan-400 transition-colors">
                                Click for full details →
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exercise Modal Component
const ExerciseModal = ({ exercise, userProfile, onClose, typeLabels, difficultyColors }) => {
    const typeConfig = typeLabels[exercise.type] || { label: exercise.type, color: 'gray' };
    const diffConfig = difficultyColors[exercise.difficulty] || difficultyColors.beginner;

    const typeColorClasses = {
        core: 'from-blue-500 to-indigo-600',
        legs: 'from-green-500 to-emerald-600',
        flex: 'from-purple-500 to-pink-600',
        stretch: 'from-orange-500 to-red-500',
        mobility: 'from-cyan-500 to-teal-600'
    };

    const dangerColors = {
        high: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', icon: '🔴' },
        medium: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', icon: '🟡' },
        low: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', icon: '🟢' }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>

            {/* Modal */}
            <div
                className="relative bg-slate-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                    ✕
                </button>

                {/* Header */}
                <div className={`bg-gradient-to-r ${typeColorClasses[exercise.type] || 'from-gray-600 to-gray-700'} p-8 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-4xl">{typeConfig.label.split(' ')[0]}</span>
                            <span className={`${diffConfig.bg} ${diffConfig.text} ${diffConfig.border} text-sm px-4 py-1.5 rounded-full border font-semibold uppercase`}>
                                {exercise.difficulty}
                            </span>
                            <span className="bg-white/20 text-white text-sm px-4 py-1.5 rounded-full uppercase font-bold backdrop-blur-sm ml-auto">
                                {exercise.type}
                            </span>
                        </div>
                        <h2 className="text-4xl font-black text-white mb-3">{exercise.name}</h2>

                        {/* Target Muscles */}
                        <div className="flex flex-wrap gap-2">
                            {exercise.targetMuscles?.map((muscle, i) => (
                                <span key={i} className="text-sm bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                                    {muscle}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {/* Duration & Reps */}
                    <div className="flex items-center gap-6 text-lg">
                        <span className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
                            <span className="text-cyan-400 text-xl">⏱️</span>
                            <span className="text-white font-semibold">{exercise.duration}</span>
                        </span>
                        <span className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-xl">
                            <span className="text-purple-400 text-xl">🔄</span>
                            <span className="text-white font-semibold">{exercise.reps}</span>
                        </span>
                    </div>

                    {/* General Instructions */}
                    <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                        <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                            <span>📋</span> Instructions
                        </h3>
                        <p className="text-slate-300 text-lg leading-relaxed">{exercise.instructions?.general}</p>

                        {/* Level-specific tips */}
                        {userProfile?.level && exercise.instructions?.[userProfile.level] && (
                            <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <span className="text-blue-400 font-semibold">💡 Tip for your level:</span>
                                <p className="text-blue-200 mt-1">{exercise.instructions[userProfile.level]}</p>
                            </div>
                        )}

                        {/* Pain-specific advice */}
                        {userProfile?.pain && exercise.instructions?.[userProfile.pain] && (
                            <div className={`mt-4 p-4 rounded-xl border ${exercise.instructions[userProfile.pain].includes('💚') ? 'bg-green-500/10 border-green-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
                                <p className={exercise.instructions[userProfile.pain].includes('💚') ? 'text-green-300' : 'text-orange-300'}>
                                    {exercise.instructions[userProfile.pain]}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Steps */}
                    {exercise.steps && (
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                                <span>👣</span> Step-by-Step
                            </h3>
                            <div className="space-y-3">
                                {exercise.steps.map((step, i) => (
                                    <div key={i} className="flex items-start gap-4 group">
                                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 group-hover:scale-110 transition-transform">
                                            {i + 1}
                                        </div>
                                        <p className="text-slate-300 pt-1 text-lg">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Common Mistakes */}
                    {exercise.commonMistakes && exercise.commonMistakes.length > 0 && (
                        <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5">
                            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                                <span>⚠️</span> Common Mistakes to Avoid
                            </h3>
                            <div className="space-y-4">
                                {exercise.commonMistakes.map((item, i) => {
                                    const danger = dangerColors[item.danger] || dangerColors.medium;
                                    return (
                                        <div key={i} className={`${danger.bg} rounded-xl p-4 border ${danger.border}`}>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xl">{danger.icon}</span>
                                                <span className={`font-bold text-lg ${danger.text}`}>{item.mistake}</span>
                                                <span className={`ml-auto text-xs px-2 py-1 rounded-full ${danger.bg} ${danger.text} border ${danger.border} uppercase font-semibold`}>
                                                    {item.danger} risk
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-green-400">
                                                <span>✓</span>
                                                <span className="text-green-300">Fix: {item.fix}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Benefits */}
                    {exercise.benefits && (
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20">
                            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                                <span>✨</span> Benefits
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {exercise.benefits.map((benefit, i) => (
                                    <span key={i} className="bg-green-500/20 text-green-300 px-4 py-2 rounded-xl text-sm font-medium border border-green-500/30 flex items-center gap-2">
                                        <span className="text-green-400">✓</span>
                                        {benefit}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Contraindications */}
                    {exercise.contraindications && exercise.contraindications.length > 0 && (
                        <div className="bg-red-500/10 rounded-2xl p-6 border border-red-500/20">
                            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                                <span>🚫</span> Contraindications
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {exercise.contraindications.map((item, i) => (
                                    <span key={i} className="bg-red-500/20 text-red-300 px-4 py-2 rounded-xl text-sm font-medium border border-red-500/30">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
