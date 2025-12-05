// src/components/Decathlon/JokesCarousel.jsx
import React, { useState } from 'react';

// Données NIRD - Résistance Numérique
const nirdFacts = [
  {
    id: 1,
    icon: "🖥️",
    title: "Le Coût Caché du Code",
    stat: "4%",
    fact: "du CO2 mondial est émis par le numérique",
    tip: "Ton code a une empreinte carbone. Chaque requête, chaque boucle inefficace consomme de l'énergie.",
    challenge: "Optimise ton code = Optimise la planète",
    color: "from-red-500 to-orange-500"
  },
  {
    id: 2,
    icon: "🪑",
    title: "Le Syndrome du Dev",
    stat: "8h+",
    fact: "passées assis par jour en moyenne",
    tip: "Ton corps n'est pas un serveur. Il n'est pas conçu pour un uptime de 16h sans maintenance.",
    challenge: "Applique la règle 20-20-20 : Pause toutes les 20 min",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    icon: "🧠",
    title: "Burnout Loading...",
    stat: "63%",
    fact: "des développeurs ont déjà vécu un burnout",
    tip: "Le surmenage n'est pas un badge d'honneur. C'est une dette technique sur toi-même.",
    challenge: "Déconnecte-toi. Ton cerveau a besoin de garbage collection.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 4,
    icon: "🌊",
    title: "Océan & Code",
    stat: "∞",
    fact: "de parallèles entre le corps humain et l'océan",
    tip: "Comme l'océan régule le climat, ton corps régule ta santé. Les deux sont interconnectés.",
    challenge: "Prends soin de ton 'écosystème interne'",
    color: "from-teal-500 to-blue-500"
  },
  {
    id: 5,
    icon: "💪",
    title: "La Solution NIRD",
    stat: "15min",
    fact: "d'exercice par jour changent tout",
    tip: "Résistance Numérique = Résistance Physique. Les deux vont ensemble.",
    challenge: "Deviens le CTO de ta santé posturale !",
    color: "from-green-500 to-emerald-500"
  }
];

const JokesCarousel = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState([false, false, false, false, false]);

  const currentFact = nirdFacts[currentIndex];

  const revealFact = () => {
    const newRevealed = [...revealed];
    newRevealed[currentIndex] = true;
    setRevealed(newRevealed);
  };

  const nextFact = () => {
    if (currentIndex < nirdFacts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevFact = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const allRevealed = revealed.every(r => r);
  const progress = ((currentIndex + 1) / nirdFacts.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
          <span>🌊</span> NIRD × OCÉAN × SANTÉ
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">
          Prise de Conscience
        </h2>
        <p className="text-gray-600">
          Découvre les connexions entre numérique responsable et santé posturale
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Ta progression</span>
          <span>{currentIndex + 1} / {nirdFacts.length}</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${currentFact.color} transition-all duration-500`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main Card */}
      <div className={`relative bg-gradient-to-br ${currentFact.color} rounded-3xl p-8 text-white shadow-2xl mb-6 min-h-[400px] flex flex-col`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 overflow-hidden rounded-3xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-grow flex flex-col">
          {/* Icon & Title */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{currentFact.icon}</span>
            <div>
              <h3 className="text-2xl font-black">{currentFact.title}</h3>
              <p className="text-white/80">Fait #{currentIndex + 1}</p>
            </div>
          </div>

          {/* Big Stat */}
          <div className="text-center my-6">
            <div className="text-7xl font-black mb-2 drop-shadow-lg">
              {currentFact.stat}
            </div>
            <p className="text-xl font-medium text-white/90">
              {currentFact.fact}
            </p>
          </div>

          {/* Reveal Section */}
          {!revealed[currentIndex] ? (
            <button
              onClick={revealFact}
              className="mt-auto mx-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/40 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105"
            >
              🔍 Révéler la prise de conscience
            </button>
          ) : (
            <div className="mt-auto space-y-4 animate-fadeIn">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                <p className="font-medium leading-relaxed">
                  💡 {currentFact.tip}
                </p>
              </div>
              <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="font-bold text-lg">
                  🎯 Défi : {currentFact.challenge}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={prevFact}
          disabled={currentIndex === 0}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${currentIndex === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          ← Précédent
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {nirdFacts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex
                  ? 'bg-blue-600 w-8'
                  : revealed[idx]
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}
            />
          ))}
        </div>

        <button
          onClick={nextFact}
          disabled={currentIndex === nirdFacts.length - 1}
          className={`px-6 py-3 rounded-xl font-bold transition-all ${currentIndex === nirdFacts.length - 1
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
        >
          Suivant →
        </button>
      </div>

      {/* CTA Final */}
      {allRevealed && (
        <div className="text-center p-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl text-white animate-fadeIn">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-black mb-2">Prise de conscience terminée !</h3>
          <p className="text-white/80 mb-6">
            Tu as découvert les enjeux du numérique responsable et de la santé posturale.
            <br />Maintenant, passons à l'action !
          </p>
          <button
            onClick={onFinish}
            className="bg-white text-green-600 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
          >
            🚀 Accéder à ma Routine de Réparation
          </button>
        </div>
      )}

      {!allRevealed && (
        <div className="text-center text-gray-500 text-sm">
          💡 Révèle tous les faits pour débloquer ta routine personnalisée
        </div>
      )}
    </div>
  );
};

export default JokesCarousel;
