// ...existing code...
import React, { useState } from 'react';
import { questions, results } from '../../data/decathlonData';
import JokesCarousel from './JokesCarousel'; 

import gifSquat from '../../gifs/squat.gif';
import gifPlank from '../../gifs/plank.gif';
import gifYoga from '../../gifs/yoga.gif';
import gifWrist from '../../gifs/wrist.gif';

// ... le reste du code ...
const DecathlonManager = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // modal for exercise detail
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

  // --- LOGIQUE QUIZ ---
  const handleAnswer = (option) => {
    const newAnswers = [...answers, { category: questions[currentQuestion].category, value: option.value ?? option.value === 0 ? option.value : (option.value || null) }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateProfile(newAnswers);
    }
  };

  const calculateProfile = (finalAnswers) => {
    const pain = finalAnswers.find(a => a.category === 'pain')?.value;
    const goal = finalAnswers.find(a => a.category === 'goal')?.value;

    let selectedKey = 'legs_strength';

    if (pain === 'wrists' || pain === 'neck') selectedKey = 'upper_body';
    else if (pain === 'back' || goal === 'core') selectedKey = 'back_core';
    else if (goal === 'flex' || goal === 'relax') selectedKey = 'yoga_flex';
    else selectedKey = 'legs_strength';

    setUserProfile(results[selectedKey]);
    setShowCarousel(true);
  };

  // --- RENDU IMAGE ---
  const renderImage = (key, alt = '') => {
    let src = null;
    switch (key) {
      case 'squat_img': src = gifSquat; break;
      case 'plank_img': src = gifPlank; break;
      case 'yoga_img': src = gifYoga; break;
      case 'stretch_img': src = gifWrist; break;
      case 'wrist_img': src = gifWrist; break;
      default: src = null;
    }

    if (!src) return <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-xs text-center p-2 rounded">Visualisation Mentale</div>;
    return <img src={src} alt={alt || 'Demo'} className="w-full h-40 object-contain bg-white rounded" />;
  };

  const openExercise = (exo) => {
    setSelectedExercise(exo);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        
        {/* HEADER */}
        <div className="bg-blue-900 text-white p-6 text-center shadow-md">
          <h1 className="text-3xl font-extrabold uppercase tracking-widest flex items-center justify-center gap-3">
            <span>🚀</span> CTO Health Monitor <span className="bg-yellow-400 text-blue-900 text-xs px-2 py-1 rounded">PRO</span>
          </h1>
          <p className="text-blue-200 text-sm mt-1">Maintenance Prédictive de l'Humain</p>
        </div>

        <div className="p-6 md:p-10 min-h-[500px]">
          
          {/* --- PHASE 1 : QUIZ --- */}
          {!showCarousel && !showResult && (
            <div className="max-w-3xl mx-auto animate-fade-in">
              <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
                <div className="bg-blue-600 h-3 rounded-full transition-all duration-500" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-8">{questions[currentQuestion].question}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="p-5 text-left border-2 border-gray-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all shadow-sm group"
                  >
                    <span className="font-semibold text-gray-700 group-hover:text-blue-800">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- PHASE 2 : CAROUSEL --- */}
          {showCarousel && !showResult && (
            <div className="animate-fade-in">
              <JokesCarousel onFinish={() => setShowResult(true)} />
            </div>
          )}

          {/* --- PHASE 3 : RÉSULTATS (3 CARTES) --- */}
          {showResult && userProfile && (
            <div className="animate-fade-in">
              {/* En-tête Profil */}
              <div className="text-center mb-10">
                <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">{userProfile.level}</span>
                <h2 className="text-4xl font-black text-gray-900 mt-4 mb-2">{userProfile.title}</h2>
                <p className="text-xl text-gray-600 italic">"{userProfile.description}"</p>
              </div>

              {/* GRILLE DES 3 ACTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {userProfile.exercises.map((exo, index) => (
                  <div
                    key={index}
                    className={`relative rounded-2xl shadow-lg border-2 overflow-hidden flex flex-col cursor-pointer ${exo.type === 'nird' ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'}`}
                    onClick={() => openExercise(exo)}
                    onKeyDown={(e) => { if (e.key === 'Enter') openExercise(exo); }}
                    role="button"
                    tabIndex={0}
                    title="Cliquez pour voir la fiche détaillée"
                  >
                    
                    {/* Badge Type */}
                    <div className={`absolute top-0 left-0 px-3 py-1 text-xs font-bold text-white rounded-br-lg ${exo.type === 'nird' ? 'bg-green-600' : 'bg-blue-600'}`}>
                      {exo.type === 'nird' ? '🌱 ACTION NIRD' : '💪 ACTION SPORT'}
                    </div>

                    {/* Image */}
                    <div className="p-4 flex justify-center mt-6">
                      {renderImage(exo.imageKey, exo.name)}
                    </div>

                    {/* Contenu */}
                    <div className="p-6 pt-2 flex-grow flex flex-col">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{exo.name}</h3>
                      <p className="text-gray-700 text-sm font-medium mb-3">{exo.instruction}</p>
                      <p className="text-gray-500 text-xs italic mt-auto border-t pt-3 border-gray-200">
                        💡 {exo.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Produit + Reset */}
              <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div>
                  <p className="text-yellow-400 font-bold uppercase text-xs tracking-widest mb-1">Matériel Recommandé</p>
                  <h3 className="text-2xl font-bold">{userProfile.product.name}</h3>
                  <p className="text-gray-300 text-sm mt-1">{userProfile.product.reason}</p>
                </div>
                <div className="flex gap-4">
                  <a href={userProfile.product.link} target="_blank" rel="noopener noreferrer" className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105">
                    Voir le Produit
                  </a>
                  <button onClick={() => window.location.reload()} className="border border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Relancer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal : fiche exercice */}
      {modalOpen && selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="relative max-w-3xl w-full bg-white rounded-xl shadow-2xl overflow-auto z-60">
            <div className="flex justify-between items-start p-6 border-b">
              <div>
                <h3 className="text-2xl font-bold">{selectedExercise.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedExercise.detail}</p>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 ml-4">Fermer ✕</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                {renderImage(selectedExercise.imageKey, selectedExercise.name)}
              </div>
              <div className="col-span-2">
                <h4 className="font-semibold mb-2">Instruction rapide</h4>
                <p className="text-gray-700 mb-4">{selectedExercise.instruction}</p>

                <h4 className="font-semibold mb-2">Étapes</h4>
                <ol className="list-decimal list-inside text-gray-700 mb-4">
                  {selectedExercise.steps?.map((s, i) => <li key={i} className="mb-1">{s}</li>)}
                </ol>

                <h4 className="font-semibold mb-2">Bénéfices</h4>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  {selectedExercise.benefits?.map((b, i) => <li key={i} className="mb-1">{b}</li>)}
                </ul>

                <div className="flex gap-6 mt-4 text-sm text-gray-600">
                  <div>⏱ Durée : <span className="font-medium text-gray-800">{selectedExercise.duration}</span></div>
                  <div>🔁 Reps : <span className="font-medium text-gray-800">{selectedExercise.reps}</span></div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t flex justify-end">
              <button onClick={closeModal} className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DecathlonManager;