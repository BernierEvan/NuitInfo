import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { VoiceProvider } from './components/VoiceSubtitleSystem';
import CinematicOverlay from './components/CinematicOverlay';
import IntroMonologue from './components/IntroMonologue';
import BuggedSequence from './components/BuggedSequence';
import Lobby from './pages/Lobby';
import Records from './pages/Records';
import SnakeGame from './pages/SnakeGame';
import SportQCM from './pages/SportQCM';
import Profile from './pages/Profile';
import './App.css';
import './index.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showBuggedSequence, setShowBuggedSequence] = useState(false);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowBuggedSequence(true);
    // Don't remove black background yet
  };

  const handleBuggedSequenceComplete = () => {
    setShowBuggedSequence(false);
    document.body.classList.remove('background-black-monologue');
    document.body.classList.add('background-linear');
  };

  return (
    <GameProvider>
      <VoiceProvider>
        <Router>
          {showIntro ? (
            // ONLY show intro - pitch black screen with blue text
            <IntroMonologue onComplete={handleIntroComplete} />
          ) : showBuggedSequence ? (
            <BuggedSequence onComplete={handleBuggedSequenceComplete} />
          ) : (
            // ONLY show main app after Enter is pressed

            <div className="App">

              {/* Scanline effect */}
              <div id="appbackground" className="background-Intro"></div>

              {/* Routes */}
              <Routes>
                <Route path="/" element={<Lobby />} />
                <Route path="/records" element={<Records />} />
                <Route path="/bunker-snake" element={<SnakeGame />} />
                <Route path="/assessment" element={<SportQCM />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </div>
          )}
        </Router>
      </VoiceProvider>
    </GameProvider>
  );
}

export default App;
