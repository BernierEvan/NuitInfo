import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';

import Quiz from './assets/components/Quiz';
import ExerciseGuide from './assets/components/ExerciseGuide';
import JokesCarousel from './assets/components/Decathlon/JokesCarousel';
import AuthPage from './assets/components/AuthPage';

function AppContent() {
  const [step, setStep] = useState('quiz');
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { profile } = useUser();

  // Vérifier si déjà connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsCheckingAuth(false);
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setStep('quiz');
  };

  // Loader pendant la vérification auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl flex items-center gap-3">
          <span className="animate-spin text-3xl">⚙️</span>
          Chargement du système...
        </div>
      </div>
    );
  }

  // Page de connexion si non authentifié
  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">

      {/* === HEADER === */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Logo / Titre */}
            <div className="flex items-center gap-4">
              <div className="bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <span className="text-3xl">🏋️‍♂️</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
                  CTO Health Monitor
                  <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-lg shadow">
                    PRO
                  </span>
                </h1>
                <p className="text-blue-200 text-sm font-medium">
                  Maintenance Prédictive de l'Humain • Nuit de l'Info 2024
                </p>
              </div>
            </div>

            {/* User Info + Étapes */}
            <div className="flex items-center gap-4">

              {/* Étapes */}
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <StepIndicator number={1} label="Diagnostic" active={step === 'quiz'} completed={step !== 'quiz'} />
                <div className="w-6 h-0.5 bg-white/30" />
                <StepIndicator number={2} label="NIRD" active={step === 'carousel'} completed={step === 'guide'} />
                <div className="w-6 h-0.5 bg-white/30" />
                <StepIndicator number={3} label="Routine" active={step === 'guide'} completed={false} />
              </div>

              {/* User Menu */}
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-white/80 text-sm">
                  👤 <span className="font-bold">{user.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500/40 text-red-200 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                >
                  Déconnexion
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* === CONTENU PRINCIPAL === */}
      <main className="max-w-7xl mx-auto px-4 py-10">

        {/* STEP 1: Quiz */}
        {step === 'quiz' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-10">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase px-4 py-1 rounded-full inline-block mb-4">
                Étape 1 : Diagnostic Système
              </span>
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Analyse de ton infrastructure corporelle
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Réponds honnêtement pour obtenir un programme personnalisé adapté à ton profil.
              </p>
            </div>
            <Quiz onFinish={() => setStep('carousel')} />
          </div>
        )}

        {/* STEP 2: Carousel NIRD */}
        {step === 'carousel' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-bold uppercase px-4 py-1 rounded-full inline-block mb-4">
                Étape 2 : Prise de Conscience NIRD
              </span>
            </div>
            <JokesCarousel onFinish={() => setStep('guide')} />
          </div>
        )}

        {/* STEP 3: Guide */}
        {step === 'guide' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-10">
              <span className="bg-green-100 text-green-800 text-xs font-bold uppercase px-4 py-1 rounded-full inline-block mb-4">
                Étape 3 : Ta Routine de Maintenance
              </span>
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Programme Personnalisé
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Exercices sélectionnés selon ton profil pour améliorer ta posture et prévenir les blessures.
              </p>
            </div>
            <ExerciseGuide />
          </div>
        )}
      </main>

      {/* === FOOTER === */}
      <footer className="bg-gray-900 text-white py-8 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-6 mb-4">
            <a href="https://www.decathlon.fr" target="_blank" rel="noopener noreferrer" className="opacity-70 hover:opacity-100 transition-opacity">
              <span className="text-2xl">🏃</span>
              <span className="text-sm font-medium ml-2">Decathlon Digital</span>
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-sm text-gray-400">Nuit de l'Info 2024</span>
          </div>
          <p className="text-xs text-gray-500">
            "Devenez le CTO de votre Santé Posturale" • Projet réalisé en 24h 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}

// Composant pour les indicateurs d'étape
function StepIndicator({ number, label, active, completed }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`
        w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all
        ${completed ? 'bg-green-500 text-white' :
          active ? 'bg-white text-blue-900' : 'bg-white/20 text-white/60'}
      `}>
        {completed ? '✓' : number}
      </span>
      <span className={`hidden md:inline text-sm font-medium ${active ? 'text-white' : 'text-white/60'}`}>
        {label}
      </span>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}