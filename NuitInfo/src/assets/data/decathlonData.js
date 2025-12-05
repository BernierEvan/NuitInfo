
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
      { text: "Serveur Rack Optimisé (Chaise ergo + écran réglé)", score: 2, value: "ergonomic" },
      { text: "Poste Mobile (Bureau / Table improvisée)", score: 1, value: "mobile" },
      { text: "Legacy Hardware (Chaise de cuisine + pc portable)", score: 0, value: "legacy" },
      { text: "Architecture Cloud Flottante (Allongé dans le lit/canapé)", score: 0, value: "sofa" },
    ],
  },
  // --- QUESTION 2 : SÉDENTARITÉ (UPTIME) ---
  {
    id: 2,
    question: "Quel est ton Uptime (temps sans bouger) depuis le dernier reboot ?",
    category: "uptime",
    options: [
      { text: "< 1h (Micro-services agiles)", score: 3, value: "short" },
      { text: "2h - 4h (Monolithe stable)", score: 1, value: "medium" },
      { text: "4h - 8h (On commence à swapper)", score: 1, value: "long" },
      { text: "8h+ (Infinite Loop, aidez-moi)", score: 0, value: "infinite" },
    ],
  },
  // --- QUESTION 3 : HYDRATATION (COOLING) ---
  {
    id: 3,
    question: "État de ton système de refroidissement (Hydratation) ?",
    category: "water",
    options: [
      { text: "Liquid Cooling actif (Je bois de l'eau)", score: 2, value: "hydrated" },
      { text: "Juste du Café (Java Runtime Environment)", score: 1, value: "coffee" },
      { text: "Boisson Énergétique (Overclocking temporaire)", score: 1, value: "energy" },
      { text: "Surchauffe critique (J'ai soif)", score: 0, value: "thirsty" },
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
      { text: "0 - 404 Muscle Not Found", score: 0, value: 0 },
      { text: "1 - Weekly Backup (Le dimanche)", score: 1, value: 1 },
      { text: "2 - Patch Tuesday (Occasionnel)", score: 2, value: 2 },
      { text: "3 - Release Candidate (Régulier)", score: 3, value: 3 },
      { text: "4 - High Availability (Sérieux)", score: 4, value: 4 },
      { text: "5 - Overclocking (Intense)", score: 5, value: 5 },
      { text: "6+ - DDoS Attack (Je vis à la salle)", score: 6, value: 6 },
    ],
  },
  // --- QUESTION 6 : YEUX (VISION) ---
  {
    id: 6,
    question: "État de tes capteurs optiques après cette Nuit de l'Info ?",
    category: "eyes",
    options: [
      { text: "4K HDR (Tout va bien)", score: 2, value: "good" },
      { text: "Pixelisé (Fatigue visuelle)", score: 1, value: "tired" },
      { text: "Blue Screen of Death (Je ne vois plus rien)", score: 0, value: "bad" },
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
      { text: "Maintenance douce (Mobilité / Étirements)", value: "relax" },
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
// Chaque protocole comprend 3 actions/exercices, un champ 'type' pour badge,
// et des détails complémentaires pour la popup (steps, benefits, duration, reps).
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
        name: "La Planche (Firewall Config)",
        instruction: "Mets-toi sur les avant-bras et orteils. Corps droit. Contracte les abdos. Tiens 30s.",
        imageKey: "plank_img",
        type: "sport",
        detail: "Augmente la stabilité du tronc et protège le bas du dos.",
        steps: ["Position sur avant-bras", "Aligner tête et bassin", "Contracter abdos", "Respirer calmement"],
        benefits: ["Stabilité lombaire", "Meilleure posture", "Réduction des douleurs dorsales"],
        duration: "30-60s", reps: "3 séries"
      },
      {
        id: 2,
        name: "Dead Bug (Core Release)",
        instruction: "Allongé dos au sol, bras vers le ciel, alterne jambe/bras opposés sans cambrer.",
        imageKey: "plank_img",
        type: "sport",
        detail: "Contrôle moteur profond du tronc, parfait avant les exercices plus lourds.",
        steps: ["Dos collé au sol", "Mouvement lent et contrôlé", "Ne pas cambrer le bas du dos"],
        benefits: ["Activation du transverse", "Prévention des douleurs lombaires"],
        duration: "8-12 reps", reps: "3 séries"
      },
      {
        id: 3,
        name: "Reset Optique (Yeux)",
        instruction: "Détourne le regard, fixe un point au loin 20s, cligne pour réhydrater.",
        imageKey: "eyes_img",
        type: "nird",
        detail: "Pause visuelle simple pour réduire la fatigue oculaire après coding marathon.",
        steps: ["Regarder au loin 20s", "Cligner plusieurs fois", "Faire des petits cercles oculaires"],
        benefits: ["Moins de fatigue", "Réduction des maux de tête"],
        duration: "20s", reps: "À répéter 3x/jour"
      }
    ],
    product: {
      name: "Tapis de Sol Confort 15mm",
      link: "https://www.decathlon.fr/p/tapis-pilates-taille-m-15-mm-confort-gris/_/R-p-324637",
      reason: "Une couche d'abstraction matérielle entre tes coudes et le sol dur."
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
        name: "Étirement 'Stop' (Poignets)",
        instruction: "Bras tendu, paume vers l'extérieur. Tire doucement les doigts vers toi 15s par main.",
        imageKey: "stretch_img",
        type: "sport",
        detail: "Étire les fléchisseurs du poignet, soulage après la session clavier.",
        steps: ["Bras tendu", "Paume vers l'extérieur", "Tirer doucement les doigts"],
        benefits: ["Moins de tensions", "Prévention du canal carpien"],
        duration: "15s", reps: "2-3 par main"
      },
      {
        id: 2,
        name: "Rotation Cervicale (Nuque)",
        instruction: "Fais des cercles lents avec la tête. Imagine scanner tes écrans au ralenti.",
        imageKey: "neck_img",
        type: "sport",
        detail: "Détend les muscles de la nuque et améliore la mobilité cervicale.",
        steps: ["Respirer profondément", "Faire de petits cercles contrôlés", "Ne pas forcer"],
        benefits: ["Moins de raideur", "Meilleure amplitude"],
        duration: "30s", reps: "2-3"
      },
      {
        id: 3,
        name: "Roller de Poignet (Self-Massage)",
        instruction: "Utilise une petite balle ou roule tes avant-bras sur une bouteille pour détendre.",
        imageKey: "wrist_img",
        type: "nird",
        detail: "Auto-massage ciblé pour relâcher les tensions après debugging intense.",
        steps: ["Rouler avant-bras", "Appuyer modérément", "Cibler zones douloureuses"],
        benefits: ["Améliore la circulation", "Réduit les points de tension"],
        duration: "2-3 min", reps: "1-2"
      }
    ],
    product: {
      name: "Balle de Massage Double",
      link: "https://www.decathlon.fr/p/balle-de-massage-500-double-vibrante/_/R-p-324240",
      reason: "Parfaite pour rouler sur tes bugs musculaires et détendre les avant-bras."
    }
  },

  // --- CAS 3 : SQUATS (Main) + ÉTIREMENT DOS (Bonus) ---
  legs_strength: {
    title: "Protocole : Git Push --Force",
    level: "Grade : Fullstack Power",
    description: "Tu es trop statique. Réactive les moteurs inférieurs pour supporter la charge serveur.",
    exercises: [
      {
        id: 1,
        name: "Le Squat (Reboot Système)",
        instruction: "Pieds largeur épaules. Descends comme pour t'asseoir. Remonte en poussant sur les talons.",
        imageKey: "squat_img",
        type: "sport",
        detail: "Renforce quadriceps, fessiers et stabilité globale.",
        steps: ["Pieds parallèles", "Descendre contrôle", "Remonter par les talons"],
        benefits: ["Force des jambes", "Meilleure posture"],
        duration: "8-12 reps", reps: "3 séries"
      },
      {
        id: 2,
        name: "La Pince (Dos)",
        instruction: "Debout, penche-toi en avant jambes tendues pour toucher les pieds ou genoux.",
        imageKey: "yoga_img",
        type: "sport",
        detail: "Étire les ischio-jambiers et le bas du dos, bon cooldown.",
        steps: ["Expirer en descendant", "Relâcher la nuque", "Respirer profondément"],
        benefits: ["Diminution de la tension dorsale", "Amplitude"],
        duration: "30s", reps: "2"
      },
      {
        id: 3,
        name: "Fentes Alternées (Load Balancer)",
        instruction: "Grand pas en avant, genou arrière proche du sol, pousser et revenir.",
        imageKey: "squat_img",
        type: "sport",
        detail: "Travaille l'équilibre et l'endurance des jambes.",
        steps: ["Pas en avant", "Baisser genou arrière", "Pousser pour revenir"],
        benefits: ["Équilibre", "Force unilatérale"],
        duration: "8-10 reps", reps: "3 séries par jambe"
      }
    ],
    product: {
      name: "Elastique Training 15kg",
      link: "https://www.decathlon.fr/p/elastique-musculation-training-band-15-kg/_/R-p-324263",
      reason: "Ajoute de la résistance à tes tests unitaires musculaires."
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
        name: "Posture de l'Enfant (Child Process)",
        instruction: "À genoux, fesses sur les talons, allonge les bras loin devant. Pose le front.",
        imageKey: "yoga_img",
        type: "nird",
        detail: "Repos et relâche du bas du dos, excellente pause pour reprendre le souffle.",
        steps: ["S'installer sur les talons", "Allonger les bras", "Respirer lentement"],
        benefits: ["Relaxation", "Relâchement lombaire"],
        duration: "1-2 min", reps: "1-2"
      },
      {
        id: 2,
        name: "Torsion Assise (Refactoring)",
        instruction: "Assis, tourne le buste vers la droite, main gauche sur genou droit. Change de côté.",
        imageKey: "twist_img",
        type: "sport",
        detail: "Mobilise la colonne en douceur et aide la digestion après la veille.",
        steps: ["Assis droit", "Tourner doucement", "Respirer et changer de côté"],
        benefits: ["Mobilité colonne", "Détente"],
        duration: "30s par côté", reps: "2"
      },
      {
        id: 3,
        name: "Chat / Vache (Version Debug)",
        instruction: "À quatre pattes, alterner dos rond et dos creux en respirant.",
        imageKey: "yoga_img",
        type: "nird",
        detail: "Mobilise toute la colonne et réchauffe les articulations.",
        steps: ["Position à 4 pattes", "Inhaler - creuser le dos", "Exhaler - arrondir le dos"],
        benefits: ["Mobilité générale", "Prépare aux postures prolongées"],
        duration: "1 min", reps: "Répetition fluide pendant 6-8 cycles"
      }
    ],
    product: {
      name: "Brique de Yoga en Liège",
      link: "https://www.decathlon.fr/p/brique-yoga-liege/_/R-p-170425",
      reason: "Support stable, durable et éco-responsable pour tes sessions."
    }
  }
};