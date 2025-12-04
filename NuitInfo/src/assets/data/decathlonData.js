// src/data/decathlonData.js

// ==========================================================
// 1. LE QUIZ (DIAGNOSTIC)
// ==========================================================
export const questions = [
  // --- QUESTION 1 : POSTURE (INFRA) ---
  {
    id: 1,
    question: "Quelle est ton infrastructure de déploiement actuelle ?",
    category: "infra",
    options: [
      { text: "Serveur Rack Optimisé (Chaise ergo + écran réglé)", score: 2 },
      { text: "Legacy Hardware (Chaise de cuisine + pc portable)", score: 0 },
      { text: "Architecture Cloud Flottante (Allongé dans le lit/canapé)", score: 0 },
    ],
  },
  // --- QUESTION 2 : SÉDENTARITÉ (UPTIME) ---
  {
    id: 2,
    question: "Quel est ton Uptime (temps sans bouger) depuis le dernier reboot ?",
    category: "uptime",
    options: [
      { text: "< 1h (Micro-services agiles)", score: 3 },
      { text: "2h - 4h (Monolithe stable)", score: 1 },
      { text: "8h+ (Infinite Loop, aidez-moi)", score: 0 },
    ],
  },
  // --- QUESTION 3 : HYDRATATION (COOLING) ---
  {
    id: 3,
    question: "État de ton système de refroidissement (Hydratation) ?",
    category: "water",
    options: [
      { text: "Liquid Cooling actif (Je bois de l'eau)", score: 2 },
      { text: "Juste du Café (Java Runtime Environment)", score: 1 },
      { text: "Surchauffe critique (J'ai soif)", score: 0 },
    ],
  },
  // --- QUESTION 4 : DOULEURS (BUGS) - CRUCIAL ---
  {
    id: 4,
    question: "Où se situent tes principaux bugs physiques ?",
    category: "pain",
    options: [
      { text: "Backend (Lombaires / Dos)", value: "back" },
      { text: "Interface Input/Output (Poignets / Mains)", value: "wrists" },
      { text: "Head Node (Nuque / Cervicales)", value: "neck" },
      { text: "Aucun bug, tout est en prod (Aucune douleur)", value: "general" },
    ],
  },
  // --- QUESTION 5 : SPORT (FRÉQUENCE) ---
  {
    id: 5,
    question: "Combien de sessions de 'Build Musculaire' lances-tu par semaine ?",
    category: "activity",
    options: [
      { text: "0 - 404 Muscle Not Found", score: 0 },
      { text: "1 - Weekly Backup (Le dimanche)", score: 1 },
      { text: "2 - Patch Tuesday (Occasionnel)", score: 2 },
      { text: "3 - Release Candidate (Régulier)", score: 3 },
      { text: "4 - High Availability (Sérieux)", score: 4 },
      { text: "5 - Overclocking (Intense)", score: 5 },
      { text: "6+ - DDoS Attack (Je vis à la salle)", score: 6 },
    ],
  },
  // --- QUESTION 6 : YEUX (VISION) ---
  {
    id: 6,
    question: "État de tes capteurs optiques après cette Nuit de l'Info ?",
    category: "eyes",
    options: [
      { text: "4K HDR (Tout va bien)", score: 2 },
      { text: "Pixelisé (Fatigue visuelle)", score: 1 },
      { text: "Blue Screen of Death (Je ne vois plus rien)", score: 0 },
    ],
  },
  // --- QUESTION 7 : OBJECTIF (CIBLE) ---
  {
    id: 7,
    question: "Quel correctif (Patch) veux-tu appliquer à ton corps ?",
    category: "goal",
    options: [
      { text: "Renforcer le Firewall (Gainage / Abdos)", value: "core" },
      { text: "Optimiser la bande passante (Souplesse / Yoga)", value: "flex" },
      { text: "Upgrade Hardware complet (Force / Jambes)", value: "strength" },
    ],
  },
];

// ==========================================================
// 2. LES BLAGUES (CAROUSEL PHASE 2)
// ==========================================================
export const jokes = [
  {
    id: 1,
    title: "Legacy Code",
    num: "01",
    text: "Ton projet a 4000 lignes et tourne parfaitement. Toi, tu ne peux pas courir 400 mètres sans surchauffer.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop" 
  },
  {
    id: 2,
    title: "Obsolescence",
    num: "02",
    text: "Tu dépoussières tes ventilateurs tous les mois... C'est quand la dernière fois que tu as décrassé tes artères ?",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=600&auto=format&fit=crop" 
  },
  {
    id: 3,
    title: "Uptime",
    num: "03",
    text: "Uptime serveur : 99.9%. Uptime de tes jambes aujourd'hui : 0.1%. Il est temps de changer de load balancer.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&fit=crop" 
  },
  {
    id: 4,
    title: "Durabilité NIRD",
    num: "04",
    text: "Un PC reconditionné dure 10 ans. Ton dos doit en durer 80. Traite-le mieux que ton environnement de test.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop" 
  },
  {
    id: 5,
    title: "Ctrl+C / Ctrl+V",
    num: "05",
    text: "Le Copier-Coller n'est pas considéré comme une activité physique olympique. Même si tu le fais très vite.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=600&auto=format&fit=crop" 
  }
];

// ==========================================================
// 3. LES RÉSULTATS (ROUTINES SPORTIVES PHASE 3)
// ==========================================================
export const results = {
  // --- CAS 1 : PLANCHE (Main) + YEUX (Bonus) ---
  back_core: {
    title: "Protocole : Hardening du Noyau",
    level: "Grade : SysAdmin Robuste",
    description: "Ton Kernel est vulnérable. On renforce le pare-feu abdominal et on nettoie les logs visuels.",
    exercises: [
      {
        id: 1,
        name: "1. La Planche (Firewall Config)",
        instruction: "Mets-toi sur les avant-bras et orteils. Corps droit comme un câble RJ45 neuf. Contracte les abdos pour bloquer les intrusions. Tiens 30 secondes.",
        imageKey: "plank_img" // Utilise le GIF importé
      },
      {
        id: 2,
        name: "2. Reset Optique (Yeux)",
        instruction: "Détourne le regard de l'écran. Fixe un point au loin (le mur du fond) pendant 20s. Cligne des yeux pour réhydrater les capteurs.",
        imageKey: "eyes_img" // Pas de GIF, affichera le texte placeholder
      }
    ],
    product: {
      name: "Tapis de Sol Confort 15mm",
      link: "https://www.decathlon.fr/p/tapis-pilates-taille-m-15-mm-confort-gris/_/R-p-324637",
      reason: "Une couche d'abstraction matérielle indispensable entre tes coudes et le sol dur."
    }
  },

  // --- CAS 2 : ÉTIREMENTS (Main) + NUQUE (Bonus) ---
  upper_body: {
    title: "Protocole : Débuggage Périphérique",
    level: "Grade : Codeur Zen",
    description: "Surcharge des inputs (mains). On libère la RAM musculaire avant le crash système.",
    exercises: [
      {
        id: 1,
        name: "1. Étirement 'Stop' (Poignets)",
        instruction: "Bras tendu devant, paume vers l'extérieur (le geste 'Stop'). Tire doucement tes doigts vers toi avec l'autre main. 15s par main.",
        imageKey: "stretch_img" 
      },
      {
        id: 2,
        name: "2. Rotation Cervicale (Nuque)",
        instruction: "Fais des cercles lents avec la tête. Imagine que tu scannes tes 3 écrans au ralenti. Ne force jamais sur les butées.",
        imageKey: "neck_img"
      }
    ],
    product: {
      name: "Balle de Massage Double",
      link: "https://www.decathlon.fr/p/balle-de-massage-500-double-vibrante/_/R-p-324240",
      reason: "L'outil parfait pour rouler sur tes bugs musculaires et détendre les avant-bras."
    }
  },

  // --- CAS 3 : SQUATS (Main) + ÉTIREMENT DOS (Bonus) ---
  legs_strength: {
    title: "Protocole : Git Push --Force",
    level: "Grade : Fullstack Power",
    description: "Tu es trop statique. Il faut réactiver les moteurs hydrauliques inférieurs pour supporter la charge serveur.",
    exercises: [
      {
        id: 1,
        name: "1. Le Squat (Reboot Système)",
        instruction: "Pieds largeur épaules. Descends les fesses comme pour t'asseoir sur un serveur lame invisible. Garde le dos droit. Remonte en poussant sur les talons.",
        imageKey: "squat_img"
      },
      {
        id: 2,
        name: "2. La Pince (Dos)",
        instruction: "Debout, penche-toi en avant jambes tendues pour essayer de toucher tes pieds (ou tes genoux). Relâche la tête. Laisse la gravité faire le travail.",
        imageKey: "yoga_img" // On réutilise le GIF yoga qui s'en rapproche
      }
    ],
    product: {
      name: "Elastique Training 15kg",
      link: "https://www.decathlon.fr/p/elastique-musculation-training-band-15-kg/_/R-p-324263",
      reason: "Ajoute de la résistance à tes tests unitaires musculaires. Léger et open-source (c'est du caoutchouc)."
    }
  },

  // --- CAS 4 : YOGA (Main) + TORSION (Bonus) ---
  yoga_flex: {
    title: "Protocole : Garbage Collection",
    level: "Grade : Maître Yoda (du code)",
    description: "Compression des données critique. Décompression totale requise pour retrouver de la fluidité.",
    exercises: [
      {
        id: 1,
        name: "1. Posture de l'Enfant (Child Process)",
        instruction: "À genoux, fesses sur les talons, allonge les bras loin devant au sol. Pose le front. Respire profondément pour vider le cache.",
        imageKey: "yoga_img"
      },
      {
        id: 2,
        name: "2. Torsion Assise (Refactoring)",
        instruction: "Assis, tourne le buste vers la droite, main gauche sur genou droit. Regarde derrière. Change de côté. Ça essore la colonne vertébrale.",
        imageKey: "twist_img"
      }
    ],
    product: {
      name: "Brique de Yoga en Liège",
      link: "https://www.decathlon.fr/p/brique-yoga-liege/_/R-p-170425",
      reason: "Un support stable, durable et éco-responsable (esprit NIRD) pour tes sessions."
    }
  }
};