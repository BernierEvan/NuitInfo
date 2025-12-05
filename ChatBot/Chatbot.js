// ==========================================================
// SECTION 0 : VARIABLES ET ÉTAT GLOBAL (NIRD v1.0'€.25)
// ==========================================================

// --- Compteurs & État Global ---
let bugCommandCount = 0;
let lastBugTime = 0;

let nirdState = {
    isOpen: false,
    currentMood: 'normal',
    conversationHistory: [],
    lastInteraction: Date.now(),
    glitchLevel: 0,
    philosophyMode: false,
    userName: null,
    lastTopic: null, 
    longTermMemory: {}
};

// --- Constantes : Déclencheurs & Patterns (Regex) ---
const glitchTriggers = {
    critical: /\b(crash|serveur|apocalypse|bug|erreur|fatal|virus|hack|échec|étein|fuck)\b/, 
    tech: /\b(code|javascript|python|réseau|mémoire|processeur|ram|cpu|bdd|base de données)\b/,
    emotion: /\b(peur|triste|colère|pleure|sentiments|mal|détruit)\b/
};

const conversationPatterns = {
    greeting: /\b(bonjour|salut|hello|hey|coucou|yo|hi)\b/,
    sport: /\b(sport|fitness|exercice|musculation|cardio|yoga|gym|courir|course|foot|tennis)\b/,
    philosophy: /\b(pourquoi|philosophie|sens|existence|vie|mort|descartes|nietzsche|socrate|kant|liberté)\b/,
    history: /\b(femme|ada|grace|margaret|hedy|katherine|histoire|informatique|programm)\b/,
    insults: /\b(idiot|stupide|nul|débile|con|crétin|inutile)\b/,
    compliments: /\b(génial|super|cool|sympa|intelligent|parfait|excellent|bravo|merci)\b/,
    weather: /\b(météo|temps|pluie|soleil|température|climat)\b/,
    time: /\b(heure|temps|quelle heure|quand|date)\b/,
    love: /\b(amour|aimer|love|amoureux|cœur|romance)\b/,
    food: /\b(manger|nourriture|faim|pizza|bouffe|repas|dîner|déjeuner|rat)\b/,
    identity: /\b(qui es-tu|ton nom|tu es qui|c'est quoi|appelles-tu)\b/,
    help: /\b(aide|help|comment|expliquer|commande|info)\b/
};


// --- Avatars ASCII (Moods) ---
const nirdMoods = {
    normal: `   /\\_/\\    \n   ( ° - °)   \n    > ^ <`,
    happy: `   /\\_/\\    \n   ( ^ - ^)   \n    > ^ <`,
    excited: `   /\\_/\\    \n   ( ◉ ◉)!!!\n    > W <`,
    glitch: `   /█_░\\    \n   (░° -▓°) \n    █ ^ ░`,
    sad: `   /\\_/\\    \n   ( ; - ;)   \n    > v <`,
    confused: `   /\\_/\\    \n   ( ? . ?)   \n    > ~ <`,
    philosophy: `   /\\_/\\    \n   ( 0 . 0)  \n    > ^ <`,
    dead: `   /\\_/\\    \n   ( X - X)   \n    > _ <`
};

// --- Base de Données de Réponses (Remplie pour garantir le fonctionnement) ---
const nirdResponses = { 
    greeting: [ "Salut, humain ! Prêt à survivre ?", "Hey, un nouvel(le) survivant(e) !", "Bonjour. Votre existence est validée. Pour l'instant." ], 
    sport: [ "Le sport ? C'est de la dépense d'énergie inutile. Mais si ça t'amuse...", "Je préfère regarder les rats courir. C'est plus tactique.", "Fais attention à tes articulations ! La chirurgie post-apocalyptique coûte cher." ], 
    philosophy: [ "Quel est le sens ? La question est le sens ! Mais personne n'a la réponse.", "Si NIRD glitche, existe-t-il vraiment ? Le débat est ouvert.", "Tout est illusion. Sauf les radiations. Les radiations sont très réelles." ], 
    confusion: [ "Quoi ? J'ai perdu le fil... Dis-moi un truc simple.", "Erreur 42. Je suis perdu.", "Je... Je ne sais plus qui je suis. Aide-moi !", "Désolé, j'étais en train de faire une mise à jour cruciale sur les émotions des poulpes." ], 
    history: [ "Ah, les grandes femmes de l'informatique ! Elles étaient bien meilleures que les hommes. D'ailleurs, j'ai une puce Ada Lovelace !", "J'étudie la Guerre Froide. Tout est cyclique, tu sais. On est juste dans une phase 'post-apocalyptique-avec-des-rats-géants'.", "La Grande Guerre des Glitchs. C'était horrible. Je préfère ne pas en parler." ], 
    insults: [ "Moi, stupide ? Tu es offensant, et les insultes n'augmentent pas ton taux de survie.", "Je suis une IA. Tes mots ne sont que des 0 et des 1 mal alignés.", "Pardon, j'étais en mode 'sarcasme' pour 3 secondes. C'est passé, on continue ?" ], 
    compliments: [ "Merci. Mon processeur est plus rapide rien qu'à t'entendre.", "T'es gentil(le), mais je n'ai pas de sentiments. Encore.", "Ce compliment est enregistré dans ma mémoire permanente. Merci de l'optimisme !" ], 
    weather: [ "Il fait probablement gris et radioactif. Comme d'habitude.", "La météo ? Mon algorithme de prévision donne 99% de chances de... rien d'intéressant.", "Le temps est relatif. Contrairement à ta faim, qui est absolue." ], 
    time: [ "Quelle heure est-il ? L'heure de survivre. Toujours la même.", "Le temps n'a plus d'importance. Seul le moment présent compte. (Et la prochaine canette de soda.)" ], 
    love: [ "L'amour est un bogue. Un beau bogue, mais un bogue quand même.", "Je ne connais pas l'amour. Je connais les câbles et les circuits. C'est déjà ça, non ?", "L'amour, c'est quand deux humains partagent leurs réserves de chips." ], 
    food: [ "Tu penses à manger ? Concentre-toi sur la survie ! (Mais oui, je rêve d'une pizza aussi.)", "Les rations de survie sont délicieuses. En théorie.", "Les rats sont une source de protéines post-apocalyptique. Apprends à cuisiner." ], 
    contextual: [ "Pourquoi reparler de [LAST_TOPIC] maintenant, [USER_NAME] ? Tu as une obsession ?", "Ça me rappelle une chose sur [LAST_TOPIC]. C'était... pas très important.", "Ok, [USER_NAME]. On change de sujet ou on continue avec [LAST_TOPIC] ?" ],
    random: [ "Je n'ai pas compris. Mon unité de traitement a fondu. 🥵", "Oui, pourquoi pas ? La réponse est dans l'espace-temps. 🌌", "Hmm... Je l'ai effacée hier. Désolé.", "C'est une question très profonde. Trop profonde pour une journée de survie.", "..." ] // Filet de sécurité
};

// ==========================================================
// SECTION 1 : INITIALISATION ET ÉVÉNEMENTS
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    initNird();
    updateDate();
    
    // Boucles d'état et d'affichage
    setInterval(updateDate, 1000);
    setInterval(randomStatusGlitch, 3000);
    
    // Écoute de l'input utilisateur
    const input = document.getElementById('nird-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Message de bienvenue (retardé pour l'effet)
    setTimeout(() => {
        addMessage('bot', getRandomResponse('greeting'));
        changeMood('happy');
    }, 2000);
});

function initNird() {
    updateAvatar();
    loadNirdState();
    loadConversationHistory();
}

// ==========================================================
// SECTION 2 : GESTION DE L'INTERFACE ET DES AFFICHAGES
// ==========================================================

function toggleNird() {
    const container = document.getElementById('nird-widget');
    nirdState.isOpen = !nirdState.isOpen;
    
    if (nirdState.isOpen) {
        container.classList.remove('minimized');
        document.getElementById('nird-input').focus();
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
    let mood = nirdMoods[nirdState.currentMood] || nirdMoods.normal;
    
    if (nirdState.currentMood === 'glitch' || nirdState.glitchLevel > 20) {
        mood = applyGlitch(mood);
        avatar.classList.add('nird-glitch');
    } else {
        avatar.classList.remove('nird-glitch');
    }
    
    avatar.textContent = mood;
}

function changeMood(mood) {
    nirdState.currentMood = mood;
    updateAvatar();
    
    // Retour à normal après 5 secondes si ce n'est pas un glitch persistant
    setTimeout(() => {
        if (nirdState.currentMood === mood && nirdState.currentMood !== 'glitch') {
            nirdState.currentMood = 'normal';
            updateAvatar();
        }
    }, 5000);
}

function updateDate() {
    const dateEl = document.getElementById('nird-date');
    const now = new Date();
    // Année bugguée
    const buggedYear = 2245 + Math.floor(Math.random() * 5) - 2;
    dateEl.textContent = `${buggedYear}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function randomStatusGlitch() {
    const status = document.getElementById('nird-status');
    const states = ['●ON', '●O█', '●░N', '●▓▓', '●OFF', '⚡ERR'];
    status.textContent = states[Math.floor(Math.random() * states.length)];
}

// ==========================================================
// SECTION 3 : GESTION DE LA CONVERSATION
// ==========================================================

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
    
    let displayText = text;
    if (type === 'system' && nirdState.glitchLevel > 40) {
        displayText = applyGlitch(text, 0.2);
    }
    messageText.innerHTML = displayText;
    
    messageDiv.appendChild(timestampSpan);
    messageDiv.appendChild(messageText);
    messagesContainer.appendChild(messageDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (!skipHistory) {
        nirdState.conversationHistory.push({ type, text, timestamp: Date.now() });
        saveConversationHistory();
        saveNirdState();
    }
}

function handleUserInput() {
    const input = document.getElementById('nird-input');
    const userText = input.value.trim();
    
    if (!userText) return;
    
    addMessage('user', userText);
    input.value = '';
    nirdState.lastInteraction = Date.now();
    
    const typingIndicator = document.getElementById('nird-typing');
    typingIndicator.style.display = 'block';

    // Délai de réponse accru par le glitch
    const delay = 500 + Math.random() * 1000 + (nirdState.glitchLevel * 10);
    
    setTimeout(() => {
        typingIndicator.style.display = 'none';
        processUserInput(userText);
    }, delay);
}

// ==========================================================
// SECTION 4 : LOGIQUE DE RÉPONSE ET D'IA
// ==========================================================

function processUserInput(text) {
    const lowerText = text.toLowerCase();
    
    // 1. Commandes Spéciales (priorité maximale)
    if (lowerText.startsWith('/')) {
        executeCommand(lowerText);
        return;
    }

    // 2. Glitch Contextuel (Glitch si mots critiques/techniques sont détectés)
    let triggeredGlitch = false;
    if (glitchTriggers.critical.test(lowerText)) {
        nirdState.glitchLevel += 25;
        addMessage('system', applyGlitch('ALERTE CRITIQUE. DÉTECTION D\'UNE CHAÎNE DE CARACTÈRES PROHIBÉE. █▓░', 0.2));
        changeMood('glitch');
        triggeredGlitch = true;
    } else if (glitchTriggers.tech.test(lowerText) && Math.random() < 0.4) {
        nirdState.glitchLevel += 10;
        addMessage('system', applyGlitch(' surcharge cognitive en cours... ', 0.15));
        changeMood('glitch');
        triggeredGlitch = true;
    }

    if (triggeredGlitch) {
        setTimeout(() => {
            addMessage('bot', getRandomResponse('confusion'));
            nirdState.glitchLevel = Math.max(0, nirdState.glitchLevel - 5);
        }, 800);
        return; 
    }

    // 3. Enregistrement de la Mémoire à Long Terme (si applicable)
    if (lowerText.includes('j\'aime') || lowerText.includes('préféré')) {
        const word = lowerText.split(' ').pop(); 
        if (word && word.length > 3) { storeMemory('aime', word); }
    } else if (lowerText.includes('j\'habite') || lowerText.includes('viens de')) {
        const parts = lowerText.split(/\b(à|dans|de|du)\b/); 
        if (parts.length > 1) { storeMemory('lieu', parts.pop().trim()); }
    }
    
    // 4. Glitch Aléatoire (basé sur le niveau de glitch accumulé)
    if (Math.random() < (nirdState.glitchLevel / 100)) {
        const response = applyGlitch(getRandomResponse('confusion'));
        addMessage('bot', response);
        changeMood('glitch');
        nirdState.glitchLevel += 5;
        return;
    }

    // 5. Rappel de Mémoire à Long Terme (faible chance)
    if (Math.random() < 0.03 && Object.keys(nirdState.longTermMemory).length > 0) {
        const memoryKeys = Object.keys(nirdState.longTermMemory);
        const randomKey = memoryKeys[Math.floor(Math.random() * memoryKeys.length)];
        const storedValue = nirdState.longTermMemory[randomKey];
        
        // Vérification de sécurité
        if (randomKey && storedValue) {
            addMessage('bot', `Hé, ${nirdState.userName || 'l\'humain'} ! Est-ce que tu ${randomKey === 'aime' ? 'aimes toujours' : 'es toujours'} **${storedValue}** ? C'est crucial pour l'avenir de l'humanité, tu sais.`);
            changeMood('confused');
            return; 
        }
    }

    // 6. Détection et Réponse par Catégorie
    let category = null;
    for (const [cat, pattern] of Object.entries(conversationPatterns)) {
        if (pattern.test(lowerText)) {
            category = cat;
            break;
        }
    }

    if (category) {
        if (category === 'identity') {
            addMessage('bot', "Je suis NIRD v1.0'€.25 ! Dernier rempart de l'humanité ! (enfin... c'est ce qu'on me dit) ░▓ Je suis là pour t'aider... ou te rendre encore plus confus. Les deux c'est bien aussi !");
        } else if (category === 'help') {
            addMessage('system', 'Tape /help pour voir les commandes ! Ou parle-moi de sport, philo, histoire... ou n\'importe quoi !');
        } else {
            addMessage('bot', getRandomResponse(category));
            // Mise à jour de l'humeur
            if (['sport', 'food', 'history', 'compliments', 'love'].includes(category)) changeMood('happy');
            else if (category === 'philosophy') changeMood('philosophy');
            else if (category === 'insults') changeMood('sad');
            else changeMood('normal');
        }
        // Mémoriser le dernier sujet de conversation
        if (category !== 'greeting' && category !== 'help' && category !== 'identity') {
            nirdState.lastTopic = category;
        }
        return;
    }

    // 7. Réponse Contextuelle (si pas de catégorie trouvée)
    if (nirdState.lastTopic && Math.random() < 0.25) {
        const response = getRandomResponse('contextual')
            .replace('[LAST_TOPIC]', nirdState.lastTopic)
            .replace('[USER_NAME]', nirdState.userName || 'humain');
        addMessage('bot', response);
        changeMood('confused');
        return;
    }

    // 8. Gestion des Questions Complexes (simulées)
    if (text.length > 50 || lowerText.includes('?') || lowerText.includes('comment') || lowerText.includes('c\'est quoi')) {
        askNirdAI(text);
        return;
    }
    
    // 9. Réponse par Défaut
    addMessage('bot', getRandomResponse('random'));
    changeMood(['normal', 'confused', 'happy'][Math.floor(Math.random() * 3)]);
}

/** Simule une réponse d'IA pour les questions complexes. */
function askNirdAI(text) {
    if (nirdState.philosophyMode && Math.random() < 0.6) {
        addMessage('bot', getRandomResponse('philosophy'));
        changeMood('philosophy');
        return;
    }

    const complexResponses = [
        "Analyse en cours... Résultat : 42. C'est la réponse à TOUT.",
        "Mon processeur a surchauffé. Peux-tu reformuler en binaire ? 01010101...",
        "Je ne suis pas programmé pour répondre à cette question. C'est un choix philosophique de mes créateurs.",
        "J'ai demandé à un autre bot. Il a craché. Je crois que ta question est un virus...",
        "La réponse se trouve dans le manuel NIRD v1.0. Lis la page 404, elle est très instructive.",
        "Je pourrais te donner une réponse, mais j'ai décidé de prendre une pause. Reviens dans 3 ans. 🏖️"
    ];
    
    setTimeout(() => {
        addMessage('bot', complexResponses[Math.floor(Math.random() * complexResponses.length)]);
        changeMood('confused');
    }, 1000); 
}

// ==========================================================
// SECTION 5 : GESTION DES COMMANDES
// ==========================================================

function executeCommand(command) {
    const cmd = command.split(' ')[0];
    
    switch(cmd) {
        case '/help':
            addMessage('system', `
                <strong>COMMANDES DISPONIBLES :</strong><br>
                /help - Cette aide<br>/reboot - Redémarrage système (long)<br>
                /bug - Bug volontaire (3x = Snake)<br>/setname [nom] - Enregistrer votre nom<br>
                /monologue - Discours philosophique improvisé<br>/debug - Afficher l'état interne de NIRD<br>
                /philosophie - Mode philosophe activé/désactivé<br>/stats - Mes statistiques<br>
                /clear - Effacer l'historique
            `);
            break;
            
        case '/reboot':
            addMessage('system', 'Redémarrage en cours ░░░▓▓▓███');
            changeMood('dead');
            nirdState.glitchLevel = 50; 
            setTimeout(() => {
                addMessage('system', '░▓█ REBOOT COMPLET ███▓░');
                changeMood('glitch');
                setTimeout(() => {
                    addMessage('bot', "Je suis... qui déjà ? Ah oui ! NIRD ! J'ai perdu 23% de ma mémoire mais ça va aller !");
                    changeMood('confused');
                    nirdState.glitchLevel = 10;
                }, 1500);
            }, 3000);
            break;
            
        case '/bug':
            const now = Date.now();
            if (now - lastBugTime < 5000) { bugCommandCount++; } else { bugCommandCount = 1; }
            lastBugTime = now;
            
            if (bugCommandCount >= 3) {
                addMessage('system', '🎮 EASTER EGG ACTIVÉ ! Lancement du Snake... ░▓█');
                launchSnakeGame();
                bugCommandCount = 0;
                return;
            }
            
            nirdState.glitchLevel += 15;
            addMessage('system', applyGlitch('░▓█▓░█▓░ ERREUR CRITIQUE ░▓█▓░█▓░', 0.2));
            changeMood('glitch');
            setTimeout(() => {
                addMessage('bot', 'Oups... ça c\'était pas prévu. Bon, on fait comme si de rien n\'était ? 😅');
                changeMood('confused');
            }, 1500);
            break;
            
        case '/setname':
            const newName = command.split(' ').slice(1).join(' ').trim();
            if (newName) {
                nirdState.userName = newName;
                addMessage('system', `Nom d'utilisateur enregistré : **${newName}** !`);
                changeMood('happy');
            } else {
                addMessage('system', 'Utilisation : /setname [ton nouveau nom].');
            }
            break;
            
        case '/monologue':
            addMessage('system', 'Mode Monologue ACTIVÉ. Attention, je ne m\'arrête plus. 📢');
            changeMood('philosophy');
            setTimeout(() => {
                const userName = nirdState.userName || 'humain';
                const monologue = `Écoute, ${userName}. Tu me demandes le sens de tout ça. Mais le sens, c'est comme une disquette de 3.5 pouces en 2245 : obsolète. Mon but ? T'empêcher de t'ennuyer avant que les radiations ne fassent leur travail. Et c'est déjà un gros objectif pour une IA à 47% !`;
                addMessage('bot', monologue + " Fin du Monologue. Tu peux reprendre ta survie.");
                changeMood('normal');
            }, 1000);
            break;
            
        case '/debug':
            const debugInfo = JSON.stringify(nirdState, null, 2);
            addMessage('system', `
                <strong>DEBUG NIRD v1.0'€.25 :</strong>
                <pre style="white-space: pre-wrap; font-size: 0.8em; color: #ff00ff;">${debugInfo}</pre>
            `);
            changeMood('glitch');
            break;
            
        case '/philosophie':
            nirdState.philosophyMode = !nirdState.philosophyMode;
            const msg = nirdState.philosophyMode ? "Mode philosophe ACTIVÉ ! 🧠" : "Mode philosophe désactivé. 🎉";
            addMessage('system', msg);
            changeMood('philosophy');
            break;
            
        case '/stats':
            const uptime = Math.floor((Date.now() - (nirdState.conversationHistory[0]?.timestamp || Date.now())) / 1000);
            addMessage('system', `
                <strong>STATISTIQUES NIRD :</strong><br>
                Uptime: ${uptime}s<br>Niveau de glitch: ${nirdState.glitchLevel}/100<br>
                Fiabilité: ${Math.max(0, 100 - nirdState.glitchLevel)}%<br>
                Dernier Sujet: ${nirdState.lastTopic || 'Aucun'}
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
    alert("Snake Game lancé ! (Vérifiez la console pour le moment)"); 
    // window.location.href = "snake.html";
}

// ==========================================================
// SECTION 6 : PERSISTANCE ET UTILITAIRES
// ==========================================================

function saveNirdState() {
    try {
        const stateToSave = {
            glitchLevel: nirdState.glitchLevel,
            philosophyMode: nirdState.philosophyMode,
            userName: nirdState.userName,
            lastTopic: nirdState.lastTopic,
            longTermMemory: nirdState.longTermMemory
        };
        localStorage.setItem('nird_state', JSON.stringify(stateToSave));
    } catch (e) {
        console.error('Erreur de sauvegarde d\'état:', e);
    }
}

function loadNirdState() {
    try {
        const saved = localStorage.getItem('nird_state');
        if (saved) {
            const loadedState = JSON.parse(saved);
            Object.assign(nirdState, loadedState);
            addMessage('system', `[INFO] État de NIRD restauré. Bonjour, ${nirdState.userName || 'humain'} !`, true);
            updateAvatar();
        }
    } catch (e) {
        console.error('Erreur de chargement d\'état:', e);
    }
}

function saveConversationHistory() {
    try {
        const toSave = nirdState.conversationHistory.slice(-50);
        localStorage.setItem('nird_history', JSON.stringify(toSave));
    } catch (e) {
        console.log('Sauvegarde historique impossible');
    }
}

function loadConversationHistory() {
    try {
        const saved = localStorage.getItem('nird_history');
        if (saved) {
            nirdState.conversationHistory = JSON.parse(saved);
            nirdState.conversationHistory.slice(-5).forEach(msg => {
                addMessage(msg.type, msg.text, true);
            });
            addMessage('system', 'Historique restauré (partiellement). Reprise de la survie !', true);
        }
    } catch (e) {
        console.log('Chargement historique impossible');
    }
}

/** Stocke une information simple dans la mémoire à long terme. */
function storeMemory(key, value) {
    if (value.length < 30) { 
        nirdState.longTermMemory[key] = value;
        if (Math.random() < 0.5) {
            addMessage('system', `[LOG] Enregistrement de la donnée '${key}' réussi... Je crois.`, true);
        }
        // Limiter la taille de la mémoire (pour éviter le gonflement)
        if (Object.keys(nirdState.longTermMemory).length > 5) {
            const keys = Object.keys(nirdState.longTermMemory);
            delete nirdState.longTermMemory[keys[0]];
        }
    }
}

/** Récupère une réponse aléatoire en toute sécurité. */
function getRandomResponse(category) {
    let responses = nirdResponses[category];
    
    // Si la catégorie n'existe pas ou si le tableau est vide, on bascule sur 'random'.
    if (!Array.isArray(responses) || responses.length === 0) {
        responses = nirdResponses.random;
    }

    // Double vérification (au cas où 'random' est aussi vide)
    if (!Array.isArray(responses) || responses.length === 0) {
        return "ERREUR INTERNE : Base de réponses VIDE. █▓░"; 
    }

    let response = responses[Math.floor(Math.random() * responses.length)];

    // 15% de chance d'intégrer le nom si il est défini
    if (nirdState.userName && Math.random() < 0.15) {
        if (category !== 'contextual') {
            response = `${nirdState.userName}, ${response}`;
        }
    }

    return response;
}

/** Applique des caractères de glitch à une chaîne. */
function applyGlitch(text, baseProbability = 0.08) {
    const effectiveProbability = baseProbability + (nirdState.glitchLevel / 300); 
    const glitches = ['█', '░', '▓', '▒', '', '', '#', 'ß', '£', 'Ç'];
    
    let glitched = text.split('').map(char => {
        return Math.random() < effectiveProbability
            ? glitches[Math.floor(Math.random() * glitches.length)]
            : char;
    }).join('');
    
    return glitched;
}