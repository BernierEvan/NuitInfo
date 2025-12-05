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
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { profile, resetProfile } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsCheckingAuth(false);
  }, []);

  const handleAuthSuccess = (userData) => setUser(userData);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setStep('home');
    setShowUserMenu(false);
  };

  const handleRedoQuiz = () => {
    resetProfile();
    setStep('quiz');
  };

  const goHome = () => {
    setStep('home');
    setShowUserMenu(false);
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🏋️</div>
          <div className="text-white text-xl font-bold">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <header className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={goHome} className="bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/20 transition-all">
                <span className="text-2xl">🏠</span>
              </button>
              <div>
                <h1 className="text-xl font-black text-white">CTO Health Monitor</h1>
                <p className="text-blue-200 text-xs">Nuit de l Info 2025</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <StepIndicator num={1} label="Quiz" active={step === 'quiz'} done={step !== 'quiz'} onClick={() => setStep('quiz')} />
              <div className="w-6 h-0.5 bg-white/30"></div>
              <StepIndicator num={2} label="NIRD" active={step === 'carousel'} done={step === 'guide'} onClick={() => profile && setStep('carousel')} />
              <div className="w-6 h-0.5 bg-white/30"></div>
              <StepIndicator num={3} label="Routine" active={step === 'guide'} done={false} onClick={() => profile && setStep('guide')} />
            </div>

            <div className="relative">
              <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl">
                <span className="text-2xl">👤</span>
                <span className="text-white font-medium hidden sm:inline">{user.username}</span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-4 bg-gray-50 border-b">
                    <p className="font-bold text-gray-800">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <button onClick={goHome} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3 text-gray-700">🏠 Accueil</button>
                    <button onClick={() => { handleRedoQuiz(); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-3 text-gray-700">🔄 Refaire Quiz</button>
                    <hr className="my-2" />
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-medium flex items-center gap-3">🚪 Deconnexion</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {showUserMenu && <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>}

      <main className="max-w-7xl mx-auto px-4 py-8">
        {step !== 'quiz' && (
          <button onClick={() => setStep(step === 'guide' ? 'carousel' : 'quiz')} className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-600 font-medium">
            ← Retour
          </button>
        )}

        {step === 'quiz' && (
          <div>
            <div className="text-center mb-8">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold uppercase px-4 py-1 rounded-full mb-4 inline-block">Etape 1/3</span>
              <h2 className="text-3xl font-black text-gray-900 mb-2">Analyse ton profil</h2>
              <p className="text-gray-500">Quelques questions pour creer ton programme.</p>
            </div>
            <Quiz onFinish={() => setStep('carousel')} />
          </div>
        )}

        {step === 'carousel' && <JokesCarousel onFinish={() => setStep('guide')} />}

        {step === 'guide' && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <span className="bg-green-100 text-green-800 text-xs font-bold uppercase px-4 py-1 rounded-full mb-2 inline-block">Etape 3/3</span>
                <h2 className="text-3xl font-black text-gray-900">Ta Routine</h2>
              </div>
              <button onClick={handleRedoQuiz} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium text-sm">🔄 Refaire Quiz</button>
            </div>
            <ExerciseGuide />
          </div>
        )}
      </main>

      <footer className="bg-gray-900 text-white py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">Nuit de l Info 2025 - Decathlon</p>
        </div>
      </footer>
    </div>
  );
}

function StepIndicator({ num, label, active, done, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-2">
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${done ? 'bg-green-500 text-white' : active ? 'bg-white text-blue-900' : 'bg-white/20 text-white/60'}`}>
        {done ? '✓' : num}
      </span>
      <span className={`text-sm font-medium ${active ? 'text-white' : 'text-white/60'}`}>{label}</span>
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