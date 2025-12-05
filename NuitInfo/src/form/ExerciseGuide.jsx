import React, { useState, useMemo } from 'react';
import { useUser } from '../../context/UserContext';

import exercisesData from './data/exercices.json';
import ExerciseDetail from './ExerciseDetails';
import ProductRecommender from './ProductRecommender';

const ExerciseGuide = () => {
  const { profile, resetProfile } = useUser();
  const [selectedType, setSelectedType] = useState('recommended');
  const [showProducts, setShowProducts] = useState(true);

  // Définition des exercices par niveau (avec nouveaux exos)
  const exercisesByLevel = {
    beginner: ['plank', 'child_pose', 'cat_cow', 'wrist_stretch', 'neck_rotation', 'shoulder_stretch', 'glute_bridge'],
    intermediate: ['plank', 'squat', 'child_pose', 'cat_cow', 'hip_flexor_stretch', 'dead_bug', 'wrist_stretch', 'neck_rotation', 'wall_angels', 'standing_calf_stretch'],
    expert: exercisesData.map(e => e.id)
  };

  // Filtrer les exercices selon le profil
  const filteredExercises = useMemo(() => {
    if (!profile) return exercisesData;

    let exercises = [...exercisesData];
    const level = profile.level || 'beginner';

    if (selectedType === 'recommended') {
      const allowedIds = exercisesByLevel[level] || exercisesByLevel.beginner;
      exercises = exercises.filter(e => allowedIds.includes(e.id));

      exercises.sort((a, b) => {
        const aMatch = profile.priorities.includes(a.type) ? 10 : 0;
        const bMatch = profile.priorities.includes(b.type) ? 10 : 0;
        return bMatch - aMatch;
      });

      if (level === 'beginner') exercises = exercises.slice(0, 5);
      else if (level === 'intermediate') exercises = exercises.slice(0, 7);
    } else if (selectedType !== 'all') {
      exercises = exercises.filter(e => e.type === selectedType);
    }

    return exercises;
  }, [profile, selectedType]);

  const exerciseTypes = useMemo(() => [...new Set(exercisesData.map(e => e.type))], []);

  const typeLabels = {
    'core': '💪 Gainage',
    'legs': '🦵 Jambes',
    'flex': '🧘 Souplesse',
    'stretch': '🤸 Étirements',
    'mobility': '🔄 Mobilité'
  };

  const levelLabels = {
    'beginner': { text: '🌱 Débutant', color: 'green' },
    'intermediate': { text: '💪 Intermédiaire', color: 'blue' },
    'expert': { text: '⚡ Expert', color: 'purple' }
  };

  if (!profile) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-500">Profil non chargé. Veuillez compléter le diagnostic.</p>
      </div>
    );
  }

  const getProfileProducts = () => {
    const allProducts = [];
    filteredExercises.forEach(exo => {
      exo.products?.forEach(productId => {
        if (!allProducts.includes(productId)) allProducts.push(productId);
      });
    });
    return allProducts.slice(0, 4);
  };

  const level = levelLabels[profile.level] || levelLabels.beginner;

  return (
    <div className="max-w-7xl mx-auto">

      {/* HEADER PROFIL */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold uppercase border border-green-400/30">
                {level.text}
              </span>
              {profile.riskScore >= 5 && (
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-bold uppercase border border-red-400/30">
                  ⚠️ Risque Élevé
                </span>
              )}
            </div>
            <h2 className="text-3xl lg:text-4xl font-black mb-2">{profile.title}</h2>
            <p className="text-blue-200 text-lg italic max-w-2xl">{profile.description}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 text-center">
              <div className="text-4xl font-black">{filteredExercises.length}</div>
              <div className="text-blue-200 text-xs font-medium">Exercices</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 text-center">
              <div className={`text-4xl font-black ${profile.riskScore >= 7 ? 'text-red-400' : profile.riskScore >= 4 ? 'text-yellow-400' : 'text-green-400'}`}>
                {profile.riskScore}/10
              </div>
              <div className="text-blue-200 text-xs font-medium">Risque</div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
          {profile.hasPain && (
            <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-lg text-xs font-medium border border-orange-400/30">
              🩹 {profile.pain.replace('_pain', '').replace('back', 'Dos').replace('neck', 'Nuque').replace('wrist', 'Poignets')}
            </span>
          )}
          {profile.needsCore && (
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-xs font-medium border border-blue-400/30">
              🛡️ Core prioritaire
            </span>
          )}
          {profile.needsStretch && (
            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-xs font-medium border border-purple-400/30">
              🧘 Étirements
            </span>
          )}
        </div>
      </div>

      {/* FILTRES */}
      <div className="bg-white rounded-xl p-4 shadow-lg mb-6">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedType('recommended')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedType === 'recommended'
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            ⭐ Pour toi
          </button>
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedType === 'all'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Tous ({exercisesData.length})
          </button>
          <div className="w-px h-8 bg-gray-300 mx-2" />
          {exerciseTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all ${selectedType === type
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {typeLabels[type] || type}
            </button>
          ))}
        </div>
      </div>

      {/* Info niveau */}
      {selectedType === 'recommended' && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-700">
            <span className="font-bold">Niveau {level.text}</span> —
            {profile.level === 'beginner' && " Exercices simples et accessibles pour bien démarrer !"}
            {profile.level === 'intermediate' && " Tu as les bases, on ajoute des exercices plus ciblés."}
            {profile.level === 'expert' && " Tu peux tout faire ! Voici une sélection complète."}
          </p>
        </div>
      )}

      {/* GRILLE EXERCICES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {filteredExercises.map((exo, index) => (
          <div key={exo.id} className="relative animate-fadeIn" style={{ animationDelay: `${index * 80}ms` }}>
            {profile.priorities.includes(exo.type) && (
              <span className="absolute -top-2 -right-2 z-10 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg">
                RECOMMANDÉ
              </span>
            )}
            <ExerciseDetail exercise={exo} />
          </div>
        ))}
      </div>

      {/* PRODUITS */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 shadow-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">🛒 Équipements Conseillés</h3>
            <p className="text-gray-400 text-sm">Sélectionnés pour ton niveau</p>
          </div>
          <button onClick={() => setShowProducts(!showProducts)} className="text-blue-300 hover:text-white text-sm">
            {showProducts ? 'Masquer' : 'Afficher'}
          </button>
        </div>
        {showProducts && <ProductRecommender productIds={getProfileProducts()} isGlobal={true} />}
      </div>

      {/* BOUTON REFAIRE */}
      <div className="text-center">
        <button
          onClick={() => { resetProfile(); window.location.reload(); }}
          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-bold transition-all"
        >
          🔄 Refaire le Diagnostic
        </button>
      </div>
    </div>
  );
};

export default ExerciseGuide;