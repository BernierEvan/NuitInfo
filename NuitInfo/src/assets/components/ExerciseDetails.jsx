import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import ProductRecommender from './ProductRecommender';

// Import des GIFs
import gifSquat from '../gifs/squat.gif';
import gifPlank from '../gifs/plank.gif';
import gifYoga from '../gifs/yoga.gif';
import gifWrist from '../gifs/wrist.gif';

// Import des nouvelles images
import imgNeckStretch from '../images/neck_stretch.png';
import imgHipStretch from '../images/hip_stretch.png';
import imgDeadBug from '../images/dead_bug.png';

const ExerciseDetail = ({ exercise }) => {
  const { profile } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // --- LOGIQUE DYNAMIQUE ---
  const getPersonalizedInstruction = () => {
    let instruction = exercise.instructions?.general || "Instructions à venir";
    let adviceType = "Standard";
    let adviceColor = "blue";
    let adviceIcon = "📋";

    if (profile?.pain && exercise.instructions?.[profile.pain]) {
      instruction = exercise.instructions[profile.pain];
      adviceType = "Adapté à ta douleur";
      adviceColor = "orange";
      adviceIcon = "🩹";
    }
    else if (profile?.level === 'beginner' && exercise.instructions?.['beginner']) {
      instruction = exercise.instructions['beginner'];
      adviceType = "Version Débutant";
      adviceColor = "green";
      adviceIcon = "🌱";
    }
    else if ((profile?.level === 'advanced' || profile?.level === 'expert') && exercise.instructions?.['advanced']) {
      instruction = exercise.instructions['advanced'];
      adviceType = "Version Avancée";
      adviceColor = "purple";
      adviceIcon = "⚡";
    }

    return { instruction, adviceType, adviceColor, adviceIcon };
  };

  const { instruction, adviceType, adviceColor, adviceIcon } = getPersonalizedInstruction();

  // Mapping images avec fallback
  const getImage = (key) => {
    const imageMap = {
      'squat_img': gifSquat,
      'plank_img': gifPlank,
      'yoga_img': gifYoga,
      'wrist_img': gifWrist,
      'neck_img': imgNeckStretch,
      'hip_img': imgHipStretch,
      'deadbug_img': imgDeadBug,
    };
    return imageMap[key] || gifYoga;
  };

  // Couleurs et styles pour les types
  const typeStyles = {
    'core': {
      gradient: 'from-blue-600 via-blue-500 to-indigo-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: '🛡️',
      label: 'Gainage'
    },
    'legs': {
      gradient: 'from-orange-500 via-red-500 to-pink-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      icon: '🦵',
      label: 'Jambes'
    },
    'flex': {
      gradient: 'from-purple-600 via-pink-500 to-rose-500',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      icon: '🧘',
      label: 'Souplesse'
    },
    'stretch': {
      gradient: 'from-green-500 via-emerald-500 to-teal-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      icon: '🤸',
      label: 'Étirement'
    },
    'mobility': {
      gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      icon: '🔄',
      label: 'Mobilité'
    }
  };

  const style = typeStyles[exercise.type] || typeStyles['flex'];

  const adviceStyles = {
    'blue': 'bg-blue-100 text-blue-700 border-blue-200',
    'orange': 'bg-orange-100 text-orange-700 border-orange-200',
    'green': 'bg-green-100 text-green-700 border-green-200',
    'purple': 'bg-purple-100 text-purple-700 border-purple-200',
  };

  const difficultyColors = {
    'beginner': 'bg-green-500',
    'intermediate': 'bg-yellow-500',
    'advanced': 'bg-orange-500',
    'expert': 'bg-red-500'
  };

  return (
    <>
      {/* === CARD PREMIUM === */}
      <div
        className={`
          relative bg-white rounded-3xl overflow-hidden
          border-2 ${isHovered ? style.border : 'border-gray-100'}
          shadow-lg hover:shadow-2xl
          transition-all duration-500 ease-out
          cursor-pointer group
          transform ${isHovered ? 'scale-[1.02] -translate-y-2' : ''}
        `}
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Header */}
        <div className={`bg-gradient-to-r ${style.gradient} p-4 relative overflow-hidden`}>
          {/* Effet de brillance au hover */}
          <div className={`absolute inset-0 bg-white/20 transform -skew-x-12 transition-transform duration-700 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`} />

          <div className="relative flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{style.icon}</span>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                  {exercise.name}
                </h3>
                <span className="text-white/80 text-xs font-medium">{style.label}</span>
              </div>
            </div>

            {/* Badge Difficulté */}
            <div className="flex flex-col items-end gap-1">
              <span className={`${difficultyColors[exercise.difficulty] || 'bg-gray-500'} text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shadow-lg`}>
                {exercise.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Zone Image avec effet parallax */}
        <div className={`relative h-48 ${style.bg} overflow-hidden`}>
          <img
            src={getImage(exercise.imageKey)}
            alt={exercise.name}
            className={`
              w-full h-full object-contain p-4
              transition-transform duration-700 ease-out
              ${isHovered ? 'scale-110' : 'scale-100'}
            `}
          />

          {/* Overlay "Voir détails" */}
          <div className={`
            absolute inset-0 bg-black/0 group-hover:bg-black/30 
            transition-all duration-300 flex items-center justify-center
          `}>
            <span className={`
              bg-white text-gray-800 px-4 py-2 rounded-full font-bold text-sm
              shadow-xl transform translate-y-4 opacity-0
              group-hover:translate-y-0 group-hover:opacity-100
              transition-all duration-300
            `}>
              👆 Voir la fiche complète
            </span>
          </div>

          {/* Badge durée/reps flottant */}
          <div className="absolute bottom-2 right-2 flex gap-1">
            <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-lg font-medium">
              ⏱️ {exercise.duration}
            </span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-5">
          {/* Badge Personnalisation */}
          <div className={`
            inline-flex items-center gap-1.5 ${adviceStyles[adviceColor]} 
            text-xs font-bold px-3 py-1.5 rounded-full border mb-3
          `}>
            <span>{adviceIcon}</span>
            {adviceType}
          </div>

          {/* Instruction Preview */}
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
            {instruction}
          </p>

          {/* Muscles ciblés */}
          {exercise.targetMuscles && (
            <div className="flex flex-wrap gap-1 mb-4">
              {exercise.targetMuscles.slice(0, 3).map((muscle, idx) => (
                <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full capitalize">
                  {muscle}
                </span>
              ))}
            </div>
          )}

          {/* Erreur principale (warning) */}
          {exercise.commonMistakes && exercise.commonMistakes[0] && (
            <div className={`
              relative overflow-hidden rounded-xl p-3
              ${exercise.commonMistakes[0].danger === 'high'
                ? 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500'
                : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500'}
            `}>
              <p className="text-xs font-semibold text-gray-800 flex items-center gap-1">
                <span>{exercise.commonMistakes[0].danger === 'high' ? '🔴' : '⚠️'}</span>
                {exercise.commonMistakes[0].mistake}
              </p>
            </div>
          )}
        </div>

        {/* Footer avec CTA */}
        <div className={`
          px-5 py-3 bg-gradient-to-r ${style.bg} border-t ${style.border}
          flex justify-between items-center
        `}>
          <span className="text-xs text-gray-500 font-medium">🔁 {exercise.reps}</span>
          <span className={`
            bg-gradient-to-r ${style.gradient} text-white text-xs font-bold
            px-4 py-1.5 rounded-full shadow-lg
            transform group-hover:scale-105 transition-transform
          `}>
            Voir les détails →
          </span>
        </div>
      </div>

      {/* === MODAL DÉTAILLÉE PREMIUM === */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Overlay avec blur */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-auto bg-white rounded-3xl shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal avec gradient */}
            <div className={`bg-gradient-to-r ${style.gradient} p-8 sticky top-0 z-10 relative overflow-hidden`}>
              {/* Pattern décoratif */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl" />
              </div>

              <div className="relative flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl drop-shadow-lg">{style.icon}</span>
                    <div>
                      <h3 className="text-3xl font-black text-white drop-shadow-lg">{exercise.name}</h3>
                      <p className="text-white/80 font-medium">{style.label}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/30">
                      📊 {exercise.difficulty}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/30">
                      ⏱️ {exercise.duration}
                    </span>
                    <span className="bg-white/20 backdrop-blur-sm text-white text-sm font-bold px-4 py-1.5 rounded-full border border-white/30">
                      🔁 {exercise.reps}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white w-12 h-12 rounded-full flex items-center justify-center transition-all text-xl border border-white/30"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body Modal */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

                {/* Colonne Gauche : Visuel + Instruction */}
                <div className="lg:col-span-2">
                  {/* Image avec cadre stylé */}
                  <div className={`${style.bg} ${style.border} border-2 rounded-2xl p-6 mb-6 relative overflow-hidden`}>
                    <img
                      src={getImage(exercise.imageKey)}
                      alt={exercise.name}
                      className="w-full max-h-72 object-contain"
                    />
                  </div>

                  {/* Box Instruction Personnalisée */}
                  <div className={`${adviceStyles[adviceColor]} border-2 rounded-2xl p-5`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{adviceIcon}</span>
                      <span className="font-bold uppercase text-sm tracking-wide">{adviceType}</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">
                      {instruction}
                    </p>
                  </div>
                </div>

                {/* Colonne Droite : Détails */}
                <div className="lg:col-span-3 space-y-6">

                  {/* Étapes */}
                  {exercise.steps && (
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                      <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-lg">
                        <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">📋</span>
                        Étapes d'exécution
                      </h4>
                      <div className="space-y-3">
                        {exercise.steps.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-4 bg-white rounded-xl p-3 shadow-sm">
                            <span className={`bg-gradient-to-r ${style.gradient} text-white text-sm font-black w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                              {idx + 1}
                            </span>
                            <span className="text-gray-700 font-medium pt-1">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Erreurs à éviter */}
                  {exercise.commonMistakes && (
                    <div>
                      <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2 text-lg">
                        <span className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">⚠️</span>
                        Erreurs à éviter
                      </h4>
                      <div className="grid gap-3">
                        {exercise.commonMistakes.map((item, idx) => (
                          <div
                            key={idx}
                            className={`rounded-2xl p-4 border-l-4 ${item.danger === 'high'
                                ? 'bg-red-50 border-red-500'
                                : item.danger === 'medium'
                                  ? 'bg-yellow-50 border-yellow-500'
                                  : 'bg-orange-50 border-orange-400'
                              }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg">
                                {item.danger === 'high' ? '🔴' : item.danger === 'medium' ? '🟡' : '🟠'}
                              </span>
                              <span className="font-bold text-gray-900">{item.mistake}</span>
                            </div>
                            <p className="text-gray-600 text-sm pl-7">
                              <span className="font-semibold text-green-700">Fix :</span> {item.fix}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bénéfices + Muscles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exercise.benefits && (
                      <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
                        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                          <span>✅</span> Bénéfices
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exercise.benefits.map((benefit, idx) => (
                            <span key={idx} className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {exercise.targetMuscles && (
                      <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
                        <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
                          <span>💪</span> Muscles ciblés
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exercise.targetMuscles.map((muscle, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-medium capitalize">
                              {muscle}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Contre-indications */}
                  {exercise.contraindications && exercise.contraindications.length > 0 && (
                    <div className="bg-gray-100 rounded-2xl p-5">
                      <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2 text-sm">
                        <span>🚫</span> Contre-indications
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {exercise.contraindications.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Produits Recommandés */}
                  <ProductRecommender productIds={exercise.products} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseDetail;