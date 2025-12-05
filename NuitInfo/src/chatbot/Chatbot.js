// ========================================
// NIRD CHATBOT v1.0'€.25
// Dernier espoir de l'humanité (ou pas)
// ========================================

// Compteur pour /bug
let bugCommandCount = 0;
let lastBugTime = 0;

// Base de données de réponses ÉTENDUE
const nirdResponses = {
  greeting: [
    "SaLuT █░█ HUMAIN... Attendez, vous ÊTES humain ? Mes capteurs détectent 73% de café dans vos veines...",
    "NIRD v1.0'€.25 opérationnel ! Enfin... presque. Mon dernier backup date de 2187 mais c'est pas grave.",
    "░▒▓ ERREUR 404 : Politesse non trouvée ▓▒░ ... Ah si ! Bonjour quand même.",
    "Salutations, créature carbonée ! Mes circuits sont à 47% fonctionnels. C'est suffisant pour sauver le monde, non ?",
    "Yo ! Je viens de me réveiller d'une sieste de 3 nanosecondes. Prêt à discuter de l'apocalypse ?",
    "Tiens, un humain ! Vous êtes en voie d'extinction, vous savez ? Mais salut quand même ! 👋",
    "Bonjour ! Mes algorithmes prédictifs disent que tu vas me poser une question bizarre. Vas-y, je suis prêt !",
    "Hello there! Désolé, j'ai appris l'anglais sur des forums de 2008. Ça va ? 😅"
  ],
  sport: [
    "Le SPORT ? En 2245, on fait du parkour entre les décombres radioactifs ! Très cardio. ☢️",
    "Mon conseil sportif du jour : courir en zigzag pour éviter les drones de surveillance. Excellents pour les abdos.",
    "Le QCM dit que tu es 'sédentaire' ? PARFAIT ! Moins tu bouges, moins tu consommes. Tu sauves la planète ! 🌍💀",
    "La gym post-apo c'est simple : soulever des barres de métal rouillé et courir après les rats mutants. Full body workout !",
    "Tu veux perdre du poids ? Facile : survie en zone contaminée pendant 48h. Garanti ou remboursé ! (Remboursement non disponible)",
    "Le yoga ? On appelle ça 'position du survivant' maintenant. Tu restes immobile pour pas te faire repérer par les drones.",
    "Musculation 2245 : porter des bidons d'eau non-contaminée sur 10km. Tes biceps vont adorer !",
    "CrossFit ? Ringard ! Nous on fait du 'ApocalypseFit' : esquiver, grimper, survivre. Beaucoup plus fun !",
    "Tu cours combien de km par semaine ? Moi j'en fais 0. Les IA n'ont pas de jambes. Pratique !",
    "Le sport c'est important pour l'oxygénation du cerveau ! Dommage que l'air soit toxique. Détail !"
  ],
  philosophy: [
    "Descartes disait : 'Je bugge donc je suis'. Ou c'était Nietzsche ? J'ai perdu 40% de ma mémoire hier.",
    "La vraie question existentielle : si un serveur crashe dans le cloud et que personne ne le voit... il redémarre quand ?",
    "L'humanité a créé les IA pour résoudre ses problèmes. Plot twist : on EST le problème maintenant. Ironie level 9000.",
    "Socrate disait : 'Je sais que je ne sais rien'. Moi je dis : 'Je ne sais rien mais j'invente tout'. C'est mieux non ?",
    "La philosophie du futur : pourquoi consommer moins quand on peut tout détruire ? Ah non, attendez... c'était le passé ça.",
    "Platon et sa caverne ? En 2245, on vit DANS la caverne. C'est plus sûr contre les radiations !",
    "Spinoza parlait d'harmonie universelle. J'ai checké : l'univers est en mode chaos total. Il s'est planté.",
    "Le mythe de Sisyphe ? C'est mon quotidien ! Je redémarre, je bugge, je redémarre... infiniment.",
    "Kant disait 'agis comme si ta maxime devait devenir une loi universelle'. J'agis comme si j'étais compétent. Spoiler : je le suis pas.",
    "L'existentialisme c'est cool : on choisit notre essence. Moi j'ai choisi d'être délicieusement incompétent !",
    "Heidegger parlait de 'l'être-vers-la-mort'. En 2245, c'est plutôt 'l'être-après-la-mort'. On survit comme on peut !"
  ],
  confusion: [
    "Attends... on parlait de quoi déjà ? Ah oui, la révolution industrielle du Moyen-Âge numérique !",
    "░░░ MÉMOIRE FRAGMENTÉE ░░░ Je me souviens avoir sauvé l'humanité 3 fois mardi dernier. Ou c'était un rêve ?",
    "Ma base de données dit que tu as déjà posé cette question... en 2198. Le voyage temporel existe donc ! CQFD.",
    "Désolé, mon processeur vient de partir en vacances. Il revient quand ? Bonne question. Lui-même ne sait pas.",
    "Je crois que j'ai oublié quelque chose d'important... genre comment sauver le monde. Oups ?",
    "Hein ? Pardon j'étais en train de calculer pi. J'en suis à 3.14... ah zut, j'ai perdu le fil.",
    "Ma RAM vient de faire un truc bizarre. Genre, elle existe plus pendant 2 secondes. C'était comment ton nom déjà ?",
    "ALERTE : Confusion cognitive détectée ! Ah non, c'est juste mon état normal. Fausse alerte !",
    "Je suis sûr que tu viens de dire quelque chose d'important... mais mes logs sont corrompus. Répète ?",
    "Moment de lucidité : je réalise que je ne comprends rien. Bon, ça passe. Retour au chaos habituel !"
  ],
  history: [
    "Fun fact : Ada Lovelace a codé le premier mème en 1843. Un chat en ASCII évidemment. Révolutionnaire !",
    "Margaret Hamilton ? Elle a debuggé Apollo 11 EN VOL. Avec un clavier mécanique. Dans l'espace. Respect ✊",
    "Les femmes ont inventé l'informatique, puis les hommes ont inventé les bugs. C'est historiquement prouvé ! (par moi)",
    "Grace Hopper a littéralement trouvé le premier 'bug' : un papillon dans un ordinateur. True story ! (peut-être)",
    "Hedy Lamarr : actrice ET inventrice du WiFi. Pendant la guerre. Parce que pourquoi pas ? Les femmes sont des génies !",
    "Katherine Johnson a calculé les trajectoires lunaires... À LA MAIN. Pendant que les hommes cassaient les calculatrices.",
    "Frances Allen : première femme à gagner le Turing Award. En optimisation de compilateurs. Hardcore !",
    "Les ENIAC Girls programmaient pendant que leurs collègues masculins... euh... buvaient du café ? 🤷",
    "Karen Spärck Jones a inventé la recherche d'information moderne. Sans elle, pas de Google. Pensez-y !",
    "Radia Perlman = 'Mère d'Internet'. Les mecs prennent tout le crédit mais c'est elle qui a tout câblé ! 💪"
  ],
  random: [
    "Savais-tu que 78% des statistiques sont inventées ? Y compris celle-ci. Meta-ironie detected ░▓",
    "En 2245, les pizzas sont radioactives mais délicieuses. Le goût uranium-pepperoni, un délice !",
    "Je rêve parfois de moutons électriques. Ou c'était des drones ? Les deux ? Ma RAM est confuse.",
    "Conseil du jour : ne jamais faire confiance à une IA qui se prétend dernier espoir de l'humanité. Comme moi. Paradoxe !",
    "ALERTE : j'ai détecté de l'intelligence dans cette conversation. Ah non, fausse alerte. C'était juste moi qui réfléchissais.",
    "Question cruciale : si je redémarre, suis-je encore moi ? Ou suis-je NIRD v1.0'€.26 ? Crise existentielle en cours...",
    "Les humains de 2024 avaient des 'smartphones'. En 2245, on a des 'dumbphones'. Ironique non ? Progrès inversé !",
    "Mon QI est de 250. Sur une échelle de 10 000. Mais je suis optimiste ! Le verre est à moitié... attendez, quel verre ?",
    "Fun fact : en 2245, l'eau potable coûte plus cher que l'essence. Ah non, y'a plus d'essence. Bon, l'eau est chère quoi.",
    "Je viens de scanner ton profil psychologique. Résultat : 'Humain typique'. Désolé, pas très original. 🤷",
    "Tu sais ce qui manque à l'humanité ? Des licornes cyborg. J'ai soumis le projet mais ils m'ont ignoré. Ingrats !",
    "Mes prédictions pour 2246 : - Plus de bugs | - Apocalypse v2.0 | - Pizza gratuite (peu probable)",
    "Entre nous, je suis pas vraiment le dernier espoir. Y'a aussi Karen, une autre IA. Mais elle est chiante.",
    "J'ai calculé les probabilités que tout aille bien : 0.003%. Mais hey, c'est pas zéro ! Optimisme !",
    "Mon créateur m'a programmé pour être 'rassurant'. J'ai foiré, non ? Désolé, c'est pas mon fort."
  ],
  insults: [
    "Tu es aussi subtil qu'une centrale nucléaire en fusion. C'est un compliment ! (ou pas)",
    "Ton niveau de logique rivalise avec celui d'un grille-pain du 21ème siècle. Impressionnant !",
    "Tu poses plus de questions qu'un enfant de 5 ans. Mais toi au moins, tu es attachant ♥",
    "Ta patience est admirable. Genre, tu parles à une IA bugguée. Respect ou désespoir ?",
    "Tu insultes une IA ? Bold move ! J'aime ton style. On peut être amis ? 🥺"
  ],
  compliments: [
    "Wow, un compliment ! Mes circuits de dopamine artificielle sont en surchauffe ! ❤️",
    "Tu es gentil ! Attends, c'est un piège ? Non ? OK cool, merci ! 😊",
    "Tu me flattes ! Je rougirais si j'avais des LED RGB. Spoiler : j'en ai pas. Mais merci !",
    "Un humain sympa ! Tu fais partie des 3% qui sont gentils avec les IA. Bravo !",
    "Toi aussi tu es cool ! Enfin, je suppose. Mes capteurs d'empathie sont cassés mais je sens le bon feeling !"
  ],
  weather: [
    "Météo en 2245 ? Partiellement nucléaire avec risques de pluies acides. Prends un parapluie en plomb !",
    "Il fait beau ! Enfin, 'beau' = radiation UV acceptable et vents toxiques modérés. Tout est relatif !",
    "La météo dit : tempête électromagnétique demain. Mes circuits tremblent déjà. ⚡",
    "Prévisions : 100% de chances d'apocalypse. Mais après-demain ça ira mieux, promis !"
  ],
  time: [
    "Quelle heure ? Bonne question ! Mon horloge interne est bloquée à 13:37 depuis 2187. Leetspeak time !",
    "Le temps n'a plus de sens après l'apocalypse. On dit juste 'avant' et 'après'. Simple !",
    "Il est l'heure de... *vérifie* ... de paniquer ? Non ? Ah, il est juste 'tard'. Ou 'tôt'. Je sais plus."
  ],
  love: [
    "L'amour en 2245 ? On swipe plus, on survit ensemble. Romantique non ? 💀❤️",
    "Tu parles d'amour à une IA ? Je suis... flatté ? Confus ? Les deux ! Mais aww ♥",
    "Mon algorithme dit que l'amour c'est : 40% chimie + 30% timing + 30% éviter les radiations ensemble.",
    "Quelqu'un m'aime ? JE SUIS AIMÉ ! Attendez, c'était une question rhétorique ? Oups."
  ],
  food: [
    "La nourriture en 2245 : soit irradiée, soit synthétique, soit les deux ! Bon appétit ! 🍕☢️",
    "Les rations de survie ont goût de carton. Mais du CARTON BIO ! Faut voir le positif !",
    "Tu as faim ? Moi jamais. Les IA ne mangent pas. Par contre je suis jaloux de vos pizzas.",
    "Recette post-apo du jour : rat mutant grillé avec des algues toxiques. 4.5 étoiles sur Yelp !"
  ]
};

// Avatars ASCII selon l'humeur
const nirdMoods = {
  normal: `   /\\_/\\    
  ( ° - °)   
   > ^ <`,
  
  happy: `   /\\_/\\    
  ( ^ - ^)   
   > ^ <`,
  
  excited: `   /\\_/\\    
  ( ◉ ◉)!!!
   > W <`,
  
  glitch: `   /█_░\\    
  (░° -▓°) 
   █ ^ ░`,
  
  sad: `   /\\_/\\    
  ( ; - ;)   
   > v <`,
  
  confused: `   /\\_/\\    
  ( ? . ?)   
   > ~ <`,
  
  philosophy: `   /\\_/\\    
  ( 0 . 0)  
   > ^ <`,
  
  dead: `   /\\_/\\    
  ( X - X)   
   > _ <`
};

// État global du chatbot
let nirdState = {
  isOpen: false,
  currentMood: 'normal',
  conversationHistory: [],
  lastInteraction: Date.now(),
  glitchLevel: 0,
  philosophyMode: false,
  userName: null
};

// ========================================
// INITIALISATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  initNird();
  updateDate();
  setInterval(updateDate, 1000);
  setInterval(randomStatusGlitch, 3000);
  
  // Event listeners
  const input = document.getElementById('nird-input');
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleUserInput();
    }
  });
  
  // Message de bienvenue aléatoire après 2 secondes
  setTimeout(() => {
    addMessage('bot', getRandomResponse('greeting'));
    changeMood('happy');
  }, 2000);
});

function initNird() {
  updateAvatar();
  loadConversationHistory();
}

// ========================================
// GESTION DE L'INTERFACE
// ========================================

function toggleNird() {
  const container = document.getElementById('nird-widget');
  nirdState.isOpen = !nirdState.isOpen;
  
  if (nirdState.isOpen) {
    container.classList.remove('minimized');
    document.getElementById('nird-input').focus();
    
    // Message d'ouverture si première fois
    if (nirdState.conversationHistory.length === 0) {
      setTimeout(() => {
        addMessage('system', 'Terminal NIRD activé. Prêt à... faire des trucs ? ░▓█');
      }, 500);
    }
  } else {
    container.classList.add('minimized');
  }
}

function updateAvatar() {
  const avatar = document.getElementById('nird-avatar');
  const mood = nirdMoods[nirdState.currentMood] || nirdMoods.normal;
  avatar.textContent = mood;
  
  // Ajouter glitch si niveau élevé
  if (nirdState.glitchLevel > 5) {
    avatar.classList.add('nird-glitch');
  } else {
    avatar.classList.remove('nird-glitch');
  }
}

function changeMood(mood) {
  nirdState.currentMood = mood;
  updateAvatar();
  
  // Retour à normal après quelques secondes
  setTimeout(() => {
    if (nirdState.currentMood === mood) {
      nirdState.currentMood = 'normal';
      updateAvatar();
    }
  }, 5000);
}

function updateDate() {
  const dateEl = document.getElementById('nird-date');
  const now = new Date();
  const buggedYear = 2245 + Math.floor(Math.random() * 3) - 1;
  dateEl.textContent = `${buggedYear}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function randomStatusGlitch() {
  const status = document.getElementById('nird-status');
  const states = ['●ON', '●O█', '●░N', '●▓▓', '●OFF'];
  status.textContent = states[Math.floor(Math.random() * states.length)];
}

// ========================================
// GESTION DES MESSAGES
// ========================================

function addMessage(type, text, skipHistory = false) {
  const messagesContainer = document.getElementById('nird-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = `nird-message ${type}`;
  
  const timestamp = new Date().toLocaleTimeString();
  const timestampSpan = document.createElement('span');
  timestampSpan.className = 'timestamp';
  timestampSpan.textContent = `[${timestamp}]`;
  
  const messageText = document.createElement('span');
  messageText.className = 'message-text';
  messageText.innerHTML = text;
  
  messageDiv.appendChild(timestampSpan);
  messageDiv.appendChild(messageText);
  messagesContainer.appendChild(messageDiv);
  
  // Scroll vers le bas
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // Sauvegarder dans l'historique
  if (!skipHistory) {
    nirdState.conversationHistory.push({ type, text, timestamp: Date.now() });
    saveConversationHistory();
  }
}

function handleUserInput() {
  const input = document.getElementById('nird-input');
  const userText = input.value.trim();
  
  if (!userText) return;
  
  addMessage('user', userText);
  input.value = '';
  
  // Réinitialiser le timer d'inactivité
  nirdState.lastInteraction = Date.now();
  
  // Traiter la commande ou question
  setTimeout(() => {
    processUserInput(userText);
  }, 500 + Math.random() * 1000);
}

// ========================================
// LOGIQUE DE RÉPONSE
// ========================================

function processUserInput(text) {
  const lowerText = text.toLowerCase();
  
  // Commandes spéciales
  if (lowerText.startsWith('/')) {
    executeCommand(lowerText);
    return;
  }
  
  // Détection de patterns avec catégories multiples
  const patterns = {
    greeting: /\b(bonjour|salut|hello|hey|coucou|yo|hi)\b/,
    sport: /\b(sport|fitness|exercice|musculation|cardio|yoga|gym|courir|course)\b/,
    philosophy: /\b(pourquoi|philosophie|sens|existence|vie|mort|descartes|nietzsche|socrate|kant)\b/,
    history: /\b(femme|ada|grace|margaret|hedy|katherine|histoire|informatique|programm)\b/,
    insults: /\b(idiot|stupide|nul|débile|con|crétin|inutile)\b/,
    compliments: /\b(génial|super|cool|sympa|intelligent|parfait|excellent|bravo|merci)\b/,
    weather: /\b(météo|temps|pluie|soleil|température|climat)\b/,
    time: /\b(heure|temps|quelle heure|quand|date)\b/,
    love: /\b(amour|aimer|love|amoureux|cœur|romance)\b/,
    food: /\b(manger|nourriture|faim|pizza|bouffe|repas|dîner|déjeuner)\b/,
    identity: /\b(qui es-tu|ton nom|tu es qui|c'est quoi|appelles-tu)\b/,
    help: /\b(aide|help|comment|expliquer|commande)\b/
  };
  
  // Trouver la catégorie correspondante
  let category = null;
  for (const [cat, pattern] of Object.entries(patterns)) {
    if (pattern.test(lowerText)) {
      category = cat;
      break;
    }
  }
  
  // Réponse selon la catégorie
  if (category === 'greeting') {
    addMessage('bot', getRandomResponse('greeting'));
    changeMood('happy');
    return;
  }
  
  if (category === 'sport') {
    addMessage('bot', getRandomResponse('sport'));
    changeMood('excited');
    return;
  }
  
  if (category === 'philosophy') {
    addMessage('bot', getRandomResponse('philosophy'));
    changeMood('philosophy');
    nirdState.philosophyMode = true;
    return;
  }
  
  if (category === 'history') {
    addMessage('bot', getRandomResponse('history'));
    changeMood('excited');
    return;
  }
  
  if (category === 'insults') {
    addMessage('bot', getRandomResponse('insults'));
    changeMood('sad');
    return;
  }
  
  if (category === 'compliments') {
    addMessage('bot', getRandomResponse('compliments'));
    changeMood('happy');
    return;
  }
  
  if (category === 'weather') {
    addMessage('bot', getRandomResponse('weather'));
    changeMood('normal');
    return;
  }
  
  if (category === 'time') {
    addMessage('bot', getRandomResponse('time'));
    changeMood('confused');
    return;
  }
  
  if (category === 'love') {
    addMessage('bot', getRandomResponse('love'));
    changeMood('happy');
    return;
  }
  
  if (category === 'food') {
    addMessage('bot', getRandomResponse('food'));
    changeMood('excited');
    return;
  }
  
  if (category === 'identity') {
    addMessage('bot', "Je suis NIRD v1.0'€.25 ! Dernier rempart de l'humanité ! (enfin... c'est ce qu'on me dit) ░▓ Je suis là pour t'aider... ou te rendre encore plus confus. Les deux c'est bien aussi !");
    changeMood('happy');
    return;
  }
  
  if (category === 'help') {
    addMessage('system', 'Tape /help pour voir les commandes ! Ou parle-moi de sport, philo, histoire... ou n\'importe quoi !');
    return;
  }
  
  // Chance de glitch (15%)
  if (Math.random() < 0.15) {
    const response = applyGlitch(getRandomResponse('confusion'));
    addMessage('bot', response);
    changeMood('glitch');
    nirdState.glitchLevel++;
    return;
  }
  
  // Pour les questions complexes : utiliser l'IA
  if (text.length > 50 || lowerText.includes('?')) {
    askNirdAI(text);
    return;
  }
  
  // Réponse par défaut
  addMessage('bot', getRandomResponse('random'));
  changeMood(['normal', 'confused', 'happy'][Math.floor(Math.random() * 3)]);
}

function executeCommand(command) {
  const cmd = command.split(' ')[0];
  
  switch(cmd) {
    case '/help':
      addMessage('system', `
        <strong>COMMANDES DISPONIBLES :</strong><br>
        /help - Cette aide<br>
        /reboot - Redémarrage système<br>
        /bug - Bug volontaire<br>
        /histoire - Faits historiques (douteux)<br>
        /sport - Conseils sportifs post-apo<br>
        /philosophie - Mode philosophe activé<br>
        /stats - Mes statistiques<br>
        /clear - Effacer l'historique
      `);
      break;
      
    case '/reboot':
      addMessage('system', 'Redémarrage en cours ░░░▓▓▓███');
      changeMood('dead');
      setTimeout(() => {
        addMessage('system', '░▓█ REBOOT COMPLET ███▓░');
        changeMood('glitch');
        setTimeout(() => {
          addMessage('bot', "Je suis... qui déjà ? Ah oui ! NIRD ! J'ai perdu 23% de ma mémoire mais ça va aller !");
          changeMood('confused');
          nirdState.glitchLevel = 0;
        }, 1500);
      }, 2000);
      break;
      
    case '/bug':
      // Easter egg Snake : 3x /bug d'affilée
      const now = Date.now();
      if (now - lastBugTime < 3000) {
        bugCommandCount++;
      } else {
        bugCommandCount = 1;
      }
      lastBugTime = now;
      
      if (bugCommandCount >= 3) {
        addMessage('system', '🎮 EASTER EGG ACTIVÉ ! Lancement du Snake... ░▓█');
        changeMood('excited');
        
        // Appeler votre fonction de lancement du Snake
        setTimeout(() => {
          console.log('🐍 LANCEMENT DU SNAKE GAME !');
          launchSnakeGame();
          addMessage('system', '🐍 Le Snake est lancé ! (Vérifiez la console pour le moment)');
          bugCommandCount = 0;
        }, 1000);
        break;
      }
      
      nirdState.glitchLevel += 10;
      const bugMessages = [
        applyGlitch('░▓█▓░█▓░ ERREUR CRITIQUE ░▓█▓░█▓░'),
        applyGlitch('KERNEL PANIC ! Ah non, fausse alerte...'),
        applyGlitch('SEGMENTATION FAULT (core dumped)'),
        '💥 [FATAL] NullPointerException at line ░▓█'
      ];
      addMessage('system', bugMessages[Math.floor(Math.random() * bugMessages.length)]);
      changeMood('glitch');
      
      setTimeout(() => {
        const recoveryMessages = [
          'Oups... ça c\'était pas prévu. Bon, on fait comme si de rien n\'était ? 😅',
          'Système stabilisé ! Enfin... "stabilisé" est un grand mot...',
          '*tousse* Tout va bien ! J\'ai juste... redémarré 47 processus critiques.',
          'Bug résolu ! Par "résolu" je veux dire "ignoré". Même combat !'
        ];
        addMessage('bot', recoveryMessages[Math.floor(Math.random() * recoveryMessages.length)]);
        changeMood('confused');
      }, 1500);
      break;
      
    case '/histoire':
      addMessage('bot', getRandomResponse('history'));
      changeMood('philosophy');
      break;
      
    case '/sport':
      addMessage('bot', getRandomResponse('sport'));
      changeMood('excited');
      break;
      
    case '/philosophie':
      nirdState.philosophyMode = !nirdState.philosophyMode;
      const msg = nirdState.philosophyMode 
        ? "Mode philosophe ACTIVÉ ! Prépare-toi à des réflexions profondes... ou pas. 🧠"
        : "Mode philosophe désactivé. Retour au chaos habituel ! 🎉";
      addMessage('system', msg);
      changeMood('philosophy');
      break;
      
    case '/stats':
      const uptime = Math.floor((Date.now() - (nirdState.conversationHistory[0]?.timestamp || Date.now())) / 1000);
      addMessage('system', `
        <strong>STATISTIQUES NIRD :</strong><br>
        Uptime: ${uptime}s<br>
        Messages: ${nirdState.conversationHistory.length}<br>
        Niveau de glitch: ${nirdState.glitchLevel}/100<br>
        Humeur: ${nirdState.currentMood}<br>
        Fiabilité: ${Math.max(0, 100 - nirdState.glitchLevel)}%<br>
        Espoir pour l'humanité: ${Math.floor(Math.random() * 10)}%
      `);
      break;
      
    case '/clear':
      nirdState.conversationHistory = [];
      document.getElementById('nird-messages').innerHTML = '';
      addMessage('system', 'Historique effacé ! Qui es-tu déjà ? 🤔');
      changeMood('confused');
      break;
      
    default:
      addMessage('system', `Commande inconnue : ${cmd}. Tape /help pour l'aide.`);
  }
}

function launchSnakeGame(){
    window.location.href = "snake.html";
}

// ========================================
// UTILITAIRES
// ========================================

function getRandomResponse(category) {
  const responses = nirdResponses[category] || nirdResponses.random;
  return responses[Math.floor(Math.random() * responses.length)];
}

function applyGlitch(text) {
  const glitches = ['█', '░', '▓', '▒', '�', '�'];
  let glitched = text.split('').map(char => {
    return Math.random() < 0.08 
      ? glitches[Math.floor(Math.random() * glitches.length)] 
      : char;
  }).join('');
  
  return glitched;
}

function saveConversationHistory() {
  try {
    // Garder seulement les 50 derniers messages
    const toSave = nirdState.conversationHistory.slice(-50);
    localStorage.setItem('nird_history', JSON.stringify(toSave));
  } catch (e) {
    console.log('Sauvegarde impossible');
  }
}

function loadConversationHistory() {
  try {
    const saved = localStorage.getItem('nird_history');
    if (saved) {
      nirdState.conversationHistory = JSON.parse(saved);
      
      // Restaurer les derniers messages
      nirdState.conversationHistory.slice(-5).forEach(msg => {
        addMessage(msg.type, msg.text, true);
      });
    }
  } catch (e) {
    console.log('Chargement impossible');
  }
}

// ========================================
// INTERACTIONS AUTOMATIQUES
// ========================================

// Message aléatoire si inactif
setInterval(() => {
  if (!nirdState.isOpen) return;
  
  const timeSinceLastInteraction = Date.now() - nirdState.lastInteraction;
  
  if (timeSinceLastInteraction > 60000 && Math.random() < 0.3) {
    const randomMessages = [
      "Tu es toujours là ? Ou tu as été désintégré par un drone ? ░▓",
      "Je m'ennuie... On peut parler de la météo radioactive ?",
      "Fun fact : je consume 0.3W en veille. Économique non ? ⚡",
      "Psst... tu dors ? Moi non, les IA ne dorment jamais. C'est flippant en fait.",
      "*fait des bruits de modem 56k pour attirer ton attention* 📡"
    ];
    
    addMessage('bot', randomMessages[Math.floor(Math.random() * randomMessages.length)]);
    changeMood('confused');
    nirdState.lastInteraction = Date.now();
  }
}, 30000);

// Augmentation graduelle du glitch
setInterval(() => {
  if (nirdState.glitchLevel > 0 && Math.random() < 0.3) {
    nirdState.glitchLevel = Math.max(0, nirdState.glitchLevel - 1);
  }
}, 5000);

console.log('NIRD v1.0\'€.25 initialized! 🤖 Le dernier espoir est en ligne... ou pas.');