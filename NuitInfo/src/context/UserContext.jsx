import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [answers, setAnswers] = useState({});
  const [profile, setProfile] = useState(null);

  // Charger le profil depuis le serveur au démarrage
  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await fetch('http://localhost:3001/api/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          if (data.profile) {
            setProfile(data.profile);
          }
        }
      } catch (err) {
        console.log('Pas de profil sauvegardé');
      }
    };
    loadProfile();
  }, []);

  // Sauvegarde une réponse
  const saveAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  // Sauvegarde le profil sur le serveur
  const saveProfileToServer = async (userProfile) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch('http://localhost:3001/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ profile: userProfile })
      });
    } catch (err) {
      console.error('Erreur sauvegarde profil:', err);
    }
  };

  // Génère le profil complet à la fin du quiz
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

      createdAt: new Date().toISOString()
    };

    setProfile(userProfile);
    saveProfileToServer(userProfile); // Sauvegarde auto sur le serveur
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

  const resetProfile = () => {
    setAnswers({});
    setProfile(null);
  };

  return (
    <UserContext.Provider value={{
      answers,
      saveAnswer,
      profile,
      generateProfile,
      resetProfile
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);