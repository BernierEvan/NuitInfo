import React, { useState } from 'react';
import { useGame } from '../context/GameContext';
import questionsData from './data/questions.json';

const Quiz = ({ onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const { completeAssessment } = useGame();

  const currentQ = questionsData[currentIndex];
  const progress = ((currentIndex + 1) / questionsData.length) * 100;

  const saveAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const generateProfile = () => {
    const userProfile = {
      level: answers['level'] || 'beginner',
      pain: answers['pain'] || 'no_pain',
      goal: answers['goal'] || 'core',
      infra: answers['infra'] || 'bad_posture',
      uptime: answers['uptime'] || 'medium',
      environment: answers['environment'] || 'home_no_equipment',

      hasPain: answers['pain'] && answers['pain'] !== 'no_pain',
      needsCore: ['bad_posture', 'terrible_posture'].includes(answers['infra']) || answers['pain'] === 'back_pain',
      needsStretch: ['long', 'infinite'].includes(answers['uptime']) || answers['pain'] === 'neck_pain',
      needsWristCare: answers['pain'] === 'wrist_pain',
      isBeginnerFriendly: answers['level'] === 'beginner' || answers['environment'] === 'home_no_equipment',

      riskScore: calculateRiskScore(answers),
      priorities: getPriorities(answers),
      title: getProfileTitle(answers),
      description: getProfileDescription(answers),

      // Game context profile format
      exercises: getExercises(answers),
      schedule: getSchedule(),
      products: getProducts(),

      createdAt: new Date().toISOString()
    };

    return userProfile;
  };

  const calculateRiskScore = (answers) => {
    let score = 0;
    if (answers['infra'] === 'terrible_posture') score += 3;
    else if (answers['infra'] === 'bad_posture') score += 2;
    else if (answers['infra'] === 'mixed_posture') score += 1;

    if (answers['uptime'] === 'infinite') score += 3;
    else if (answers['uptime'] === 'long') score += 2;
    else if (answers['uptime'] === 'medium') score += 1;

    if (answers['pain'] && answers['pain'] !== 'no_pain') score += 2;
    if (answers['level'] === 'beginner') score += 1;

    return Math.min(score, 10);
  };

  const getPriorities = (answers) => {
    const priorities = [];
    if (answers['pain'] === 'back_pain') priorities.push('core', 'flex');
    if (answers['pain'] === 'wrist_pain') priorities.push('stretch');
    if (answers['pain'] === 'neck_pain') priorities.push('mobility', 'stretch');
    if (answers['pain'] === 'knee_pain') priorities.push('flex', 'legs');

    if (answers['goal'] === 'core') priorities.push('core');
    if (answers['goal'] === 'flexibility') priorities.push('flex', 'mobility');
    if (answers['goal'] === 'strength') priorities.push('legs', 'core');
    if (answers['goal'] === 'posture') priorities.push('core', 'mobility');
    if (answers['goal'] === 'recovery') priorities.push('flex', 'stretch');

    return [...new Set(priorities)];
  };

  const getProfileTitle = (answers) => {
    const pain = answers['pain'];
    const level = answers['level'];
    const goal = answers['goal'];

    if (pain === 'back_pain') return "Protocole : Renforcement Dorsal";
    if (pain === 'wrist_pain') return "Protocole : Soins Poignets";
    if (pain === 'neck_pain') return "Protocole : Libération Cervicale";
    if (goal === 'core') return "Protocole : Gainage Intensif";
    if (goal === 'flexibility') return "Protocole : Souplesse";
    if (goal === 'strength') return "Protocole : Renforcement";
    if (level === 'beginner') return "Protocole : Initiation";

    return "Protocole : Maintenance Préventive";
  };

  const getProfileDescription = (answers) => {
    const pain = answers['pain'];
    const uptime = answers['uptime'];

    if (pain === 'back_pain') {
      return "Ton dos a besoin d'attention. On renforce le core et on décompresse la colonne.";
    }
    if (pain === 'wrist_pain') {
      return "Tes poignets sont sollicités. Voici des exercices pour les soulager et les renforcer.";
    }
    if (pain === 'neck_pain') {
      return "Tensions cervicales détectées. On va libérer ta nuque et améliorer ta posture.";
    }
    if (uptime === 'infinite' || uptime === 'long') {
      return "Tu restes trop longtemps assis ! Il est temps de bouger et de relancer la circulation.";
    }

    return "Système stable. Programme de maintenance préventive activé pour rester en forme.";
  };

  const getExercises = (answers) => {
    const level = answers['level'] || 'beginner';

    if (level === 'beginner') {
      return [
        { name: 'Bunker Push-ups', reps: '3x10', description: 'Basic upper body strength' },
        { name: 'Scavenger Squats', reps: '3x15', description: 'Leg strength for long journeys' },
        { name: 'Survivor Planks', reps: '3x30s', description: 'Core stability' },
      ];
    } else if (level === 'intermediate') {
      return [
        { name: 'Ruin Climber Pulls', reps: '4x8', description: 'Upper body power' },
        { name: 'Radioactive Burpees', reps: '4x12', description: 'Full body explosive power' },
        { name: 'Bunker Sprints', reps: '5x30s', description: 'Speed and agility' },
      ];
    } else {
      return [
        { name: 'Apocalypse Muscle-ups', reps: '5x5', description: 'Advanced calisthenics' },
        { name: 'Vault Jumps', reps: '5x15', description: 'Explosive leg power' },
        { name: 'Survival Circuit', reps: '3 rounds', description: 'Complete endurance test' },
      ];
    }
  };

  const getSchedule = () => {
    return [
      { day: 'Monday', focus: 'Strength Training', duration: '45 min' },
      { day: 'Wednesday', focus: 'Cardio & Agility', duration: '30 min' },
      { day: 'Friday', focus: 'Full Body Circuit', duration: '60 min' },
    ];
  };

  const getProducts = () => {
    return [
      { name: 'Resistance Bands (Salvaged)', price: '15 rations' },
      { name: 'Water Purification Tablets', price: '30 rations' },
      { name: 'Protein Supplements (Pre-war)', price: '50 rations' },
    ];
  };

  const handleOptionClick = (option) => {
    if (isTransitioning) return;

    setSelectedOption(option.value);
    setIsTransitioning(true);

    // Save the answer
    saveAnswer(currentQ.id, option.value);

    // Transition animation
    setTimeout(() => {
      if (currentIndex < questionsData.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
      } else {
        // Quiz finished - generate profile and complete assessment
        const profile = generateProfile();
        completeAssessment(profile);
        if (onFinish) onFinish();
      }
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Main Card */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-2xl"></div>

        <div className="relative bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">

          {/* Header with progression */}
          <div className="bg-gradient-to-r from-slate-800/80 via-slate-800/60 to-slate-800/80 px-8 py-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg shadow-cyan-500/20">
                  📋 DIAGNOSTIC
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-sm font-medium">Question</span>
                <span className="bg-slate-800 text-cyan-400 text-sm font-bold px-3 py-1.5 rounded-lg border border-cyan-500/20">
                  {currentIndex + 1} / {questionsData.length}
                </span>
              </div>
            </div>

            {/* Animated progress bar */}
            <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden border border-slate-600/30">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
              {/* Shine effect */}
              <div
                className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                style={{ left: `${progress - 15}%`, transition: 'all 0.5s ease-out' }}
              />
            </div>

            {/* Progress percentage */}
            <div className="flex justify-between mt-2">
              <span className="text-slate-500 text-xs">Progression</span>
              <span className="text-cyan-400 text-xs font-semibold">{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Quiz body */}
          <div className="px-8 py-10">
            {/* Icon and Question */}
            <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
              <div className="flex items-start gap-4 mb-8">
                <div className="text-5xl flex-shrink-0 bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-2xl border border-white/10 shadow-lg">
                  {currentQ.icon || '❓'}
                </div>
                <div className="flex-1">
                  <span className="text-cyan-400/60 text-xs font-medium uppercase tracking-wider mb-2 block">Question {currentIndex + 1}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h2>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className={`grid gap-4 transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  disabled={isTransitioning}
                  className={`
                    relative p-5 md:p-6 text-left rounded-2xl border-2 transition-all duration-300
                    ${selectedOption === opt.value
                      ? 'border-cyan-500 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 scale-[1.01] shadow-lg shadow-cyan-500/10'
                      : 'border-slate-700/50 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800/80'}
                    ${isTransitioning ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                    group
                  `}
                >
                  {/* Option letter */}
                  <span className={`
                    absolute top-1/2 -translate-y-1/2 left-5 w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold transition-all duration-300
                    ${selectedOption === opt.value
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-700 text-slate-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400'}
                  `}>
                    {String.fromCharCode(65 + idx)}
                  </span>

                  {/* Option text */}
                  <span className={`
                    ml-14 font-medium text-base md:text-lg transition-colors block
                    ${selectedOption === opt.value ? 'text-white' : 'text-slate-300 group-hover:text-white'}
                  `}>
                    {opt.label}
                  </span>

                  {/* Selection indicator */}
                  {selectedOption === opt.value && (
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-cyan-400">
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 flex justify-between items-center border-t border-white/5 bg-slate-800/30">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="text-lg">💡</span>
              <span>Réponds honnêtement pour un diagnostic précis</span>
            </div>
            {currentIndex > 0 && (
              <button
                onClick={() => {
                  if (!isTransitioning) {
                    setCurrentIndex(currentIndex - 1);
                    setSelectedOption(null);
                  }
                }}
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors px-4 py-2 rounded-xl hover:bg-cyan-500/10"
              >
                <span>←</span>
                <span>Retour</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress indicators (dots) */}
      <div className="flex justify-center gap-2 mt-8">
        {questionsData.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (idx < currentIndex && !isTransitioning) {
                setCurrentIndex(idx);
                setSelectedOption(null);
              }
            }}
            disabled={idx >= currentIndex}
            className={`
              h-2.5 rounded-full transition-all duration-300
              ${idx === currentIndex
                ? 'w-10 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30'
                : idx < currentIndex
                  ? 'w-2.5 bg-green-500 hover:bg-green-400 cursor-pointer'
                  : 'w-2.5 bg-slate-700'}
            `}
          />
        ))}
      </div>

      {/* Keyboard hint */}
      <div className="text-center mt-4">
        <span className="text-slate-500 text-xs">Clique sur une réponse pour continuer</span>
      </div>
    </div>
  );
};

export default Quiz;