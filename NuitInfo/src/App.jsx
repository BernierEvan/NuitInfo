import React, { useState, useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';

import Quiz from './assets/components/Quiz';
import ExerciseGuide from './assets/components/ExerciseGuide';
import JokesCarousel from './assets/components/Decathlon/JokesCarousel';
import AuthPage from './assets/components/AuthPage';
import HomePage from './assets/components/HomePage';

function AppContent() {
  const [step, setStep] = useState('home');
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { profile, resetProfile } = useUser();

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
    setStep('home');
  };

  const goHome = () => setStep('home');

  // Refaire le quiz (reset le profil)
  const handleRedoQuiz = () => {
    resetProfile();
    setStep('quiz');
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl flex items-center gap-3">
          <span className="animate-spin text-3xl">⚙️</span>
          Chargement...
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // Page d'accueil avec option de sauter le quiz si profil existe
  if (step === 'home') {
    return (
      <HomePage
        onStart={handleRedoQuiz}
        onSkipToRoutine={() => setStep('guide')}
        user={user}
        hasProfile={!!profile}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">

      {/* HEADER */}
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            <div className="flex items-center gap-4">
              <button
                onClick={goHome}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-xl border border-white/20 transition-all"
                title="Retour à l'accueil"
              >
                <span className="text-2xl">🏠</span>
              </button>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-3">
                  CTO Health Monitor
                  <span className="bg-yellow-400 text-blue-900 text-xs font-bold px-2 py-1 rounded-lg shadow">
                    2025
                  </span>
                </h1>
                <p className="text-blue-200 text-xs font-medium">
                  Nuit de l'Info • Corps & Océan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <StepIndicator number={1} label="Quiz" active={step === 'quiz'} completed={step !== 'quiz'} onClick={() => setStep('quiz')} />
                <div className="w-4 h-0.5 bg-white/30" />
                <StepIndicator number={2} label="NIRD" active={step === 'carousel'} completed={step === 'guide'} onClick={() => profile && setStep('carousel')} />
                <div className="w-4 h-0.5 bg-white/30" />
                <StepIndicator number={3} label="Routine" active={step === 'guide'} completed={false} onClick={() => profile && setStep('guide')} />
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <span className="text-white/80 text-sm">
                  👤 <span className="font-bold">{user.username}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/20 hover:bg-red-500/40 text-red-200 px-3 py-1 rounded-lg text-xs font-bold transition-all"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENU */}
      <main className="max-w-7xl mx-auto px-4 py-8">

        {step !== 'quiz' && (
          <button
            onClick={() => setStep(step === 'guide' ? 'carousel' : 'quiz')}
            className="mb-6 flex items-center gap-2 text-gray-500 hover:text-gray-700 font-medium transition-all"
          >
            ← Retour
          </button>
        )}

        {/* Quiz */}
        {step === 'quiz' && (
          <div className="animate-fadeIn">
            <div className="text-center mb-8">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase px-4 py-1 rounded-full inline-block mb-4">
                Étape 1/3 • Diagnostic
              </span>
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Analyse ton profil
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Quelques questions pour créer ton programme personnalisé.
              </p>
            </div>
            <Quiz onFinish={() => setStep('carousel')} />
          </div>
        )}

        {/* Carousel NIRD */}
        {step === 'carousel' && (
          <div className="animate-fadeIn">
            <JokesCarousel onFinish={() => setStep('guide')} />
          </div>
        )}

        {/* Guide avec bouton refaire quiz */}
        {step === 'guide' && (
          <div className="animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <span className="bg-green-100 text-green-800 text-xs font-bold uppercase px-4 py-1 rounded-full inline-block mb-2">
                  Étape 3/3 • Ta Routine
                </span>
                <h2 className="text-3xl font-black text-gray-900">
                  Programme Personnalisé
                </h2>
              </div>
              <button
                onClick={handleRedoQuiz}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-all inline-flex items-center gap-2"
              >
                🔄 Refaire le Quiz
              </button>
            </div>
            <ExerciseGuide />
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            🌊 Corps & Océan • Nuit de l'Info 2025
          </p>
        </div>
      </footer>
    </div>
  );
}

function StepIndicator({ number, label, active, completed, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2 transition-all hover:opacity-80">
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
    </button>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}