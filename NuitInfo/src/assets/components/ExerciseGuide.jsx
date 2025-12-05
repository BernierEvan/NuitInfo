import React, { useState, useMemo } from 'react';
import { useUser } from '../../context/UserContext';

import exercisesData from '../data/exercices.json';
import ExerciseDetail from './ExerciseDetails';
import ProductRecommender from './ProductRecommender';

const ExerciseGuide = () => {
  const { profile, resetProfile } = useUser();
  const [selectedType, setSelectedType] = useState('all');
  const [showProducts, setShowProducts] = useState(true);

  // Filtrer et trier les exercices selon le profil
  const sortedExercises = useMemo(() => {
    if (!profile) return exercisesData;

    let exercises = [...exercisesData];

    // Filtrer par type si sélectionné
    if (selectedType !== 'all') {
      exercises = exercises.filter(e => e.type === selectedType);
    }

    // Trier par priorité (les exercices qui matchent le profil en premier)
    exercises.sort((a, b) => {
      const aScore = profile.priorities.includes(a.type) ? 1 : 0;
      const bScore = profile.priorities.includes(b.type) ? 1 : 0;
      return bScore - aScore;
    });

    return exercises;
  }, [profile, selectedType]);

  // Types disponibles pour le filtre
  const exerciseTypes = useMemo(() => {
    const types = [...new Set(exercisesData.map(e => e.type))];
    return types;
  }, []);

  // Labels pour les types
  const typeLabels = {
    'core': '💪 Gainage',
    'legs': '🦵 Jambes',
    'flex': '🧘 Souplesse',
    'stretch': '🤸 Étirements',
    'mobility': '🔄 Mobilité'
  };

  // Couleurs pour les badges de priorité
  const getPriorityBadge = (type) => {
    if (profile?.priorities.includes(type)) {
      return (
        <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg animate-pulse">
          RECOMMANDÉ
        </span>
      );
    }
    return null;
  };

  if (!profile) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-500">Profil non chargé. Veuillez compléter le diagnostic.</p>
      </div>
    );
  }

  // Récupérer les produits recommandés basés sur le profil
  const getProfileProducts = () => {
    const allProducts = [];
    sortedExercises.forEach(exo => {
      exo.products.forEach(productId => {
        if (!allProducts.includes(productId)) {
          allProducts.push(productId);
        }
      });
    });
    return allProducts.slice(0, 4); // Max 4 produits
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto">

      {/* === HEADER PROFIL === */}
      <div className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-2xl p-8 mb-8 text-white shadow-2xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          {/* Info Profil */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-green-400/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-green-400/30">
                {profile.level === 'beginner' ? '🌱 Junior Dev' : profile.level === 'expert' ? '⚡ Lead Dev' : '💻 Dev Confirmé'}
              </span>
              {profile.riskScore >= 5 && (
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-red-400/30">
                  ⚠️ Risque Élevé
                </span>
              )}
            </div>
            <h2 className="text-3xl lg:text-4xl font-black mb-2">{profile.title}</h2>
            <p className="text-blue-200 text-lg italic max-w-2xl">{profile.description}</p>
          </div>

          {/* Score de risque */}
          <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20 text-center min-w-[160px]">
            <div className="text-5xl font-black mb-1">
              {profile.riskScore}
              <span className="text-2xl text-white/60">/10</span>
            </div>
            <div className="text-blue-200 text-sm font-medium">Score de Risque</div>
            <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${profile.riskScore >= 7 ? 'bg-red-500' :
                    profile.riskScore >= 4 ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                style={{ width: `${profile.riskScore * 10}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tags du profil */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
          {profile.hasPain && (
            <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-lg text-xs font-medium border border-orange-400/30">
              🩹 Douleur détectée : {profile.pain.replace('_pain', '').replace('_', ' ')}
            </span>
          )}
          {profile.needsCore && (
            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-lg text-xs font-medium border border-blue-400/30">
              🛡️ Core prioritaire
            </span>
          )}
          {profile.needsStretch && (
            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-lg text-xs font-medium border border-purple-400/30">
              🧘 Étirements recommandés
            </span>
          )}
          {profile.isBeginnerFriendly && (
            <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-lg text-xs font-medium border border-green-400/30">
              🌱 Adapté débutants
            </span>
          )}
        </div>
      </div>

      {/* === FILTRES === */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedType === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
          >
            Tous les exercices
          </button>
          {exerciseTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all relative ${selectedType === type
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
            >
              {typeLabels[type] || type}
              {profile.priorities.includes(type) && selectedType !== type && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-500">
          {sortedExercises.length} exercice{sortedExercises.length > 1 ? 's' : ''} disponible{sortedExercises.length > 1 ? 's' : ''}
        </div>
      </div>

      {/* === GRILLE DES EXERCICES === */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
        {sortedExercises.map((exo, index) => (
          <div key={exo.id} className="relative" style={{ animationDelay: `${index * 100}ms` }}>
            {getPriorityBadge(exo.type)}
            <ExerciseDetail exercise={exo} />
          </div>
        ))}
      </div>

      {/* === SECTION PRODUITS RECOMMANDÉS === */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 shadow-2xl mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">🛒 Hardware Recommandé</h3>
            <p className="text-gray-400 text-sm">Équipements sélectionnés pour ton profil</p>
          </div>
          <button
            onClick={() => setShowProducts(!showProducts)}
            className="text-blue-300 hover:text-white transition-colors text-sm"
          >
            {showProducts ? 'Masquer' : 'Afficher'}
          </button>
        </div>

        {showProducts && (
          <ProductRecommender productIds={getProfileProducts()} isGlobal={true} />
        )}
      </div>

      {/* === BOUTON RELANCER === */}
      <div className="text-center">
        <button
          onClick={() => {
            resetProfile();
            window.location.reload();
          }}
          className="bg-gradient-to-r from-gray-700 to-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:from-gray-600 hover:to-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          🔄 Relancer le Diagnostic Complet
        </button>
        <p className="text-gray-400 text-sm mt-2">Modifier ton profil pour obtenir de nouvelles recommandations</p>
      </div>
    </div>
  );
};

export default ExerciseGuide;