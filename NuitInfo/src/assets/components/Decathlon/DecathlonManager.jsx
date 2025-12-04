// src/components/Decathlon/DecathlonManager.jsx
import React, { useState } from 'react';
import { questions, results } from '../../data/decathlonData';
import JokesCarousel from './JokesCarousel'; // Assure-toi d'avoir créé ce fichier comme vu juste avant

// --- IMPORTS DES GIFS ---
// Vérifie que tes fichiers sont bien dans src/assets/gifs/
import gifSquat from '../../gifs/squat.gif';
import gifPlank from '../../gifs/plank.gif';
import gifYoga from '../../gifs/yoga.gif';
import gifWrist from '../../gifs/wrist.gif';
// Tu peux ajouter d'autres imports si besoin, sinon le code gère les manquants

const DecathlonManager = () => {
  // --- ÉTATS (STATES) ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  // États pour gérer les étapes de l'affichage
  const [showCarousel, setShowCarousel] = useState(false); // Étape 2
  const [showResult, setShowResult] = useState(false);     // Étape 3
  
  const [userProfile, setUserProfile] = useState(null);

  // --- LOGIQUE DU QUIZ ---
  const handleAnswer = (option) => {
    const newAnswers = [
      ...answers, 
      { 
        category: questions[currentQuestion].category, 
        value: option.value || null, 
        score: option.score || 0 
      }
    ];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      // Question suivante
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Fin du quiz -> Calcul du profil
      calculateProfile(newAnswers);
    }
  };

  // --- ALGORITHME DE DIAGNOSTIC ---
  const calculateProfile = (finalAnswers) => {
    const pain = finalAnswers.find(a => a.category === 'pain')?.value;
    const goal = finalAnswers.find(a => a.category === 'goal')?.value;

    let selectedKey = 'legs_strength'; // Valeur par défaut (Squats)

    // Arbre de décision simple
    if (pain === 'wrists' || pain === 'neck') {
      selectedKey = 'upper_body'; // Mal aux poignets/nuque -> Étirements
    } else if (pain === 'back' || goal === 'core') {
      selectedKey = 'back_core'; // Mal au dos ou gainage -> Planche
    } else if (goal === 'flex') {
      selectedKey = 'yoga_flex'; // Souplesse -> Yoga
    } else {
      selectedKey = 'legs_strength'; // Force/Jambes -> Squats
    }

    setUserProfile(results[selectedKey]);
    
    // TRANSITION : On lance le Carousel (Étape 2) au lieu du résultat direct
    setShowCarousel(true);
  };

  // --- GESTION DES IMAGES ---
  const renderImage = (key) => {
    let src = null;

    // Mapping Clé JSON <-> Import Webpack
    switch (key) {
      case 'squat_img': src = gifSquat; break;
      case 'plank_img': src = gifPlank; break;
      case 'yoga_img': src = gifYoga; break;
      case 'stretch_img': src = gifWrist; break;
      case 'twist_img': src = null; break; // Exemple sans image
      case 'neck_img': src = null; break; // Exemple sans image
      case 'eyes_img': src = null; break; // Exemple sans image
      default: src = null;
    }

    // Si pas d'image, on affiche un placeholder propre
    if (!src) return (
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <span className="text-gray-400 text-sm font-medium px-4 text-center">
          (Visualisation mentale requise pour cet exercice)
        </span>
      </div>
    );

    return (
      <div className="w-full h-56 bg-white rounded-lg border-2 border-blue-100 overflow-hidden flex items-center justify-center p-2 shadow-sm">
        <img 
          src={src} 
          alt="Démonstration" 
          className="max-h-full max-w-full object-contain" 
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* --- HEADER --- */}
        <div className="bg-blue-900 text-white p-6 text-center shadow-md relative z-10">
          <h1 className="text-2xl md:text-3xl font-extrabold uppercase tracking-widest flex items-center justify-center gap-3">
            <span>🏋️</span>
            CTO Health Monitor 
            <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded ml-2 align-top">v1.0</span>
          </h1>
          <p className="text-blue-200 text-sm mt-2">Analysez votre dette technique corporelle</p>
        </div>

        <div className="p-6 md:p-8 bg-white min-h-[400px]">
          
          {/* --- ÉTAPE 1 : LE QUIZ --- */}
          {!showCarousel && !showResult && (
            <div className="animate-fade-in max-w-2xl mx-auto">
              {/* Barre de progression */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>

              {/* Question */}
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
                {questions[currentQuestion].question}
              </h2>

              {/* Réponses (Grille si beaucoup de choix) */}
              <div className={`gap-4 ${questions[currentQuestion].options.length > 4 ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'}`}>
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="p-4 text-left border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 transform hover:-translate-y-1 shadow-sm group"
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-800">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
              
              <div className="mt-8 text-right text-xs text-gray-400 font-mono">
                Process ID: {currentQuestion + 1} / {questions.length}
              </div>
            </div>
          )}

          {/* --- ÉTAPE 2 : LE CAROUSEL DE BLAGUES --- */}
          {showCarousel && !showResult && (
            <div className="animate-fade-in">
              <JokesCarousel onFinish={() => setShowResult(true)} />
            </div>
          )}

          {/* --- ÉTAPE 3 : RÉSULTAT ET ROUTINE --- */}
          {showResult && (
            <div className="animate-fade-in">
              
              {/* Titre du Profil */}
              <div className="text-center mb-10">
                <span className="inline-block bg-green-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-bold mb-4 border border-green-200">
                  {userProfile.level}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {userProfile.title}
                </h2>
                <p className="text-lg text-gray-600 italic max-w-2xl mx-auto">
                  "{userProfile.description}"
                </p>
              </div>

              {/* Liste des Exercices (Boucle) */}
              <div className="grid grid-cols-1 gap-8 mb-12">
                {userProfile.exercises.map((exo, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col md:flex-row">
                    
                    {/* Partie Gauche : Titre et Image */}
                    <div className="w-full md:w-5/12 bg-blue-50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-blue-100">
                      <h3 className="text-xl font-bold text-blue-900 mb-4 text-center w-full bg-blue-100 py-2 rounded">
                        {exo.name}
                      </h3>
                      {renderImage(exo.imageKey)}
                    </div>

                    {/* Partie Droite : Instructions */}
                    <div className="w-full md:w-7/12 p-6 md:p-8 flex flex-col justify-center bg-white">
                      <h4 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">
                        Documentation Technique (Readme.md)
                      </h4>
                      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line font-medium">
                        {exo.instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Produit Recommandé (Bonus Niveau 4) */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-left">
                  <p className="text-sm font-bold text-yellow-600 uppercase mb-1 flex items-center gap-2">
                    <span>🛒</span> Upgrade Hardware Recommandé
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {userProfile.product.name}
                  </h3>
                  <p className="text-gray-600 text-sm italic">
                    <span className="font-bold">Pourquoi :</span> {userProfile.product.reason}
                  </p>
                </div>
                
                <a 
                  href={userProfile.product.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow transition-transform transform hover:scale-105 whitespace-nowrap"
                >
                  Voir sur Decathlon
                </a>
              </div>

              {/* Bouton Reset */}
              <div className="text-center mt-12">
                <button 
                  onClick={() => window.location.reload()}
                  className="text-gray-400 hover:text-blue-600 underline text-sm transition-colors font-mono"
                >
                  &lt; sudo reboot system /&gt;
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DecathlonManager;