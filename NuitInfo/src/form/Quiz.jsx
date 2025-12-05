import React, { useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';
import questionsData from './data/questions.json';

const Quiz = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { saveAnswer, generateProfile } = useUser();

  const currentQ = questionsData[currentIndex];
  const progress = ((currentIndex + 1) / questionsData.length) * 100;

  const handleOptionClick = (option) => {
    if (isTransitioning) return;

    setSelectedOption(option.value);
    setIsTransitioning(true);

    // Sauvegarde la réponse
    saveAnswer(currentQ.id, option.value);

    // Animation de transition
    setTimeout(() => {
      if (currentIndex < questionsData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        generateProfile();
        onFinish();
      }
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Card principale */}
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">

        {/* Header avec progression */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
              DIAGNOSTIC SYSTÈME
            </span>
            <span className="text-blue-200 text-sm font-medium">
              {currentIndex + 1} / {questionsData.length}
            </span>
          </div>

          {/* Barre de progression animée */}
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Effet de brillance */}
            <div
              className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"
              style={{ left: `${progress - 10}%` }}
            />
          </div>
        </div>

        {/* Corps du quiz */}
        <div className="p-8">
          {/* Icône et Question */}
          <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
            <div className="text-5xl mb-4">{currentQ.icon || '❓'}</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-tight">
              {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className={`grid gap-3 transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(opt)}
                disabled={isTransitioning}
                className={`
                  relative p-5 text-left rounded-xl border-2 transition-all duration-200
                  ${selectedOption === opt.value
                    ? 'border-blue-500 bg-blue-50 scale-[1.02]'
                    : 'border-gray-100 bg-white hover:border-blue-300 hover:bg-blue-50/50'}
                  ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}
                  group
                `}
              >
                {/* Numéro de l'option */}
                <span className={`
                  absolute top-1/2 -translate-y-1/2 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                  ${selectedOption === opt.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600'}
                `}>
                  {String.fromCharCode(65 + idx)}
                </span>

                {/* Texte de l'option */}
                <span className={`
                  ml-10 font-medium transition-colors
                  ${selectedOption === opt.value ? 'text-blue-800' : 'text-gray-700 group-hover:text-blue-700'}
                `}>
                  {opt.label}
                </span>

                {/* Indicateur de sélection */}
                {selectedOption === opt.value && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 flex justify-between items-center text-sm text-gray-400">
          <span>💡 Réponds honnêtement pour un diagnostic précis</span>
          {currentIndex > 0 && (
            <button
              onClick={() => {
                if (!isTransitioning) {
                  setCurrentIndex(currentIndex - 1);
                  setSelectedOption(null);
                }
              }}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              ← Retour
            </button>
          )}
        </div>
      </div>

      {/* Indicateurs de progression (dots) */}
      <div className="flex justify-center gap-2 mt-6">
        {questionsData.map((_, idx) => (
          <div
            key={idx}
            className={`
              h-2 rounded-full transition-all duration-300
              ${idx === currentIndex
                ? 'w-8 bg-blue-600'
                : idx < currentIndex
                  ? 'w-2 bg-green-500'
                  : 'w-2 bg-gray-200'}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;