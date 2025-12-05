import React, { useState, useEffect, useRef } from 'react';
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
import backgroundMusic from './assets/music/videoplayback.mp3';
import './App.css';
import './index.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showBuggedSequence, setShowBuggedSequence] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);
  const audioRef = useRef(null);

  // Toggle music on/off
  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicMuted) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setMusicMuted(!musicMuted);
    }
  };

  // Start background music on first user interaction (click or keypress)
  useEffect(() => {
    const startMusic = () => {
      if (musicStarted || !audioRef.current) return;

      try {
        // Start at 30 seconds into the track
        audioRef.current.currentTime = 30;

        // Use Web Audio API to amplify beyond normal max
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(audioRef.current);
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 3.0; // 3x volume boost
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);

        audioRef.current.play().catch(err => {
          console.warn('Background music autoplay blocked:', err);
        });
      } catch (err) {
        // Fallback to normal playback
        audioRef.current.currentTime = 30;
        audioRef.current.volume = 1.0;
        audioRef.current.play().catch(e => console.warn('Music error:', e));
      }
      setMusicStarted(true);

      // Remove listeners after starting
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
    };

    // Listen for any user interaction
    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);

    // Handle music restart when it ends (start again at 30 seconds)
    const handleEnded = () => {
      if (audioRef.current) {
        audioRef.current.currentTime = 30;
        audioRef.current.play();
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener('ended', handleEnded);
    }

    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
      }
    };
  }, [musicStarted]);

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
        {/* Global background music */}
        <audio
          ref={audioRef}
          src={backgroundMusic}
          preload="auto"
        />

        {/* Music toggle button - top right corner */}
        <button
          onClick={toggleMusic}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 99999,
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)'}
          onMouseLeave={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'}
          title={musicMuted ? 'Unmute Music' : 'Mute Music'}
        >
          {musicMuted ? '🔇' : '🔊'}
        </button>

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
