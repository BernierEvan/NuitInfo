import React, { useState } from 'react';
import { useUser } from '../../context/UserContext';
import ProductRecommender from './ProductRecommender';

// Import des GIFs
import gifSquat from '../gifs/squat.gif';
import gifPlank from '../gifs/plank.gif';
import gifYoga from '../gifs/yoga.gif';
import gifWrist from '../gifs/wrist.gif';

// Import des images
import imgNeckStretch from '../images/neck_stretch.png';
import imgHipStretch from '../images/hip_stretch.png';
import imgDeadBug from '../images/dead_bug.png';

// Descriptions humoristiques thème dev
const funDescriptions = {
  'plank': { short: "Ton firewall corporel 🛡️", full: "Comme un serveur stable, ta planche doit tenir sans planter !" },
  'squat': { short: "Git push ton body 🦵", full: "Push jour après jour. Tes jambes sont ta fondation !" },
  'child_pose': { short: "Garbage collector 🧹", full: "Libère la mémoire de ton corps. Nettoie le stress !" },
  'cat_cow': { short: "Hot reload colonne 🔄", full: "Refresh ta colonne comme tu refresh ton navigateur." },
  'wrist_stretch': { short: "Debug I/O ports ⌨️", full: "Prends soin de tes poignets ou gare au crash !" },
  'neck_rotation': { short: "Scan system 360° 🔍", full: "Fais tourner le système pour éviter les bugs cervicaux." },
  'hip_flexor_stretch': { short: "Memory leak fix 🔧", full: "Libère le psoas raccourci par les heures assis !" },
  'dead_bug': { short: "Core.exe stable 💪", full: "Zéro risque de crash, 100% de gains pour le dos." },
  'shoulder_stretch': { short: "Décompile épaules 🎯", full: "Relâche la pression pour coder plus zen." },
  'glute_bridge': { short: "Backend power 🍑", full: "Fessiers forts = dos protégé. Le backend de ton corps !" },
  'wall_angels': { short: "Open source posture 👼", full: "Ouvre ta cage thoracique, libère tes épaules." },
  'standing_calf_stretch': { short: "Boot les mollets 🥾", full: "Évite le lag dans tes déplacements." }
};

const ExerciseDetail = ({ exercise }) => {
  const { profile } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const funDesc = funDescriptions[exercise.id] || { short: "Exercice santé", full: "" };

  const getAdvice = () => {
    if (profile?.pain && exercise.instructions?.[profile.pain]) {
      return { text: exercise.instructions[profile.pain], type: "douleur", icon: "🩹", color: "orange" };
    }
    if (profile?.level === 'beginner' && exercise.instructions?.beginner) {
      return { text: exercise.instructions.beginner, type: "débutant", icon: "🌱", color: "green" };
    }
    if (profile?.level === 'expert' && exercise.instructions?.advanced) {
      return { text: exercise.instructions.advanced, type: "expert", icon: "⚡", color: "purple" };
    }
    return { text: exercise.instructions?.general || "", type: "général", icon: "📋", color: "blue" };
  };

  const advice = getAdvice();

  const getImage = (key) => {
    const map = {
      'squat_img': gifSquat, 'plank_img': gifPlank, 'yoga_img': gifYoga, 'wrist_img': gifWrist,
      'neck_img': imgNeckStretch, 'hip_img': imgHipStretch, 'deadbug_img': imgDeadBug,
    };
    return map[key] || gifYoga;
  };

  const typeConfig = {
    'core': { color: 'blue', icon: '🛡️', label: 'Gainage', gradient: 'from-blue-500 to-indigo-600' },
    'legs': { color: 'orange', icon: '🦵', label: 'Jambes', gradient: 'from-orange-500 to-red-500' },
    'flex': { color: 'purple', icon: '🧘', label: 'Souplesse', gradient: 'from-purple-500 to-pink-500' },
    'stretch': { color: 'green', icon: '🤸', label: 'Étirement', gradient: 'from-green-500 to-teal-500' },
    'mobility': { color: 'cyan', icon: '🔄', label: 'Mobilité', gradient: 'from-cyan-500 to-blue-500' }
  };

  const config = typeConfig[exercise.type] || typeConfig.flex;

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl border-2 border-gray-100 hover:border-blue-400 transition-all duration-300 cursor-pointer group"
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${config.gradient} p-4`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl bg-white/20 p-2 rounded-xl">{config.icon}</span>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{exercise.name}</h3>
                <span className="text-white/80 text-xs">{config.label}</span>
              </div>
            </div>
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded-lg">
              {exercise.difficulty === 'beginner' ? '🌱' : exercise.difficulty === 'intermediate' ? '💪' : '⚡'}
            </span>
          </div>
        </div>

        {/* Image + Bouton visible */}
        <div className="relative h-36 bg-gray-50 overflow-hidden">
          <img src={getImage(exercise.imageKey)} alt={exercise.name} className="w-full h-full object-contain" />
          <div className="absolute bottom-2 right-2">
            <span className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm shadow-lg inline-flex items-center gap-2 group-hover:bg-blue-700 transition-all">
              👀 Voir détails
            </span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4">
          <p className="text-gray-800 font-bold text-sm mb-1">{funDesc.short}</p>
          <p className="text-gray-500 text-xs mb-3 line-clamp-2">{funDesc.full}</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">⏱️ {exercise.duration}</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">🔁 {exercise.reps}</span>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>

            {/* Header Modal */}
            <div className={`bg-gradient-to-r ${config.gradient} p-6 relative`}>
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full font-bold text-xl">✕</button>
              <div className="flex items-center gap-4">
                <span className="text-5xl bg-white/20 p-3 rounded-2xl">{config.icon}</span>
                <div>
                  <h2 className="text-white font-black text-2xl">{exercise.name}</h2>
                  <p className="text-white/80 text-lg">{funDesc.short}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Image + Desc */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <img src={getImage(exercise.imageKey)} alt={exercise.name} className="w-full h-48 object-contain bg-gray-50 rounded-xl" />
                </div>
                <div className="md:w-1/2">
                  <h3 className="font-bold text-gray-800 mb-2">🎯 Description</h3>
                  <p className="text-gray-600 mb-4">{funDesc.full}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">⏱️ {exercise.duration}</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium">🔁 {exercise.reps}</span>
                  </div>
                </div>
              </div>

              {/* Conseil perso */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{advice.icon}</span>
                  <span className="text-blue-700 font-bold">Conseil {advice.type}</span>
                </div>
                <p className="text-gray-700">{advice.text}</p>
              </div>

              {/* Étapes */}
              {exercise.steps && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">📋 Étapes</h3>
                  <ol className="space-y-2">
                    {exercise.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">{i + 1}</span>
                        <span className="text-gray-600">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Erreurs */}
              {exercise.commonMistakes && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">⚠️ Erreurs à éviter</h3>
                  <div className="space-y-2">
                    {exercise.commonMistakes.map((m, i) => (
                      <div key={i} className={`p-3 rounded-lg ${m.danger === 'high' ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                        <div className="flex items-center gap-2">
                          <span>{m.danger === 'high' ? '🚨' : '⚡'}</span>
                          <span className="font-medium text-gray-800">{m.mistake}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">✅ {m.fix}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bénéfices */}
              {exercise.benefits && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">💚 Bénéfices</h3>
                  <div className="flex flex-wrap gap-2">
                    {exercise.benefits.map((b, i) => (
                      <span key={i} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">✓ {b}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Produits */}
              {exercise.products?.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">🛒 Équipement</h3>
                  <ProductRecommender productIds={exercise.products} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExerciseDetail;