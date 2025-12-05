import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../chatbot/ChatBot.css';

const Chatbot = ({ onClose, onOpenSnake }) => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [mood, setMood] = useState('normal');
    const [glitchLevel, setGlitchLevel] = useState(0);
    const [philosophyMode, setPhilosophyMode] = useState(false);
    const [status, setStatus] = useState('●ON');
    const [bugCommandCount, setBugCommandCount] = useState(0);
    const [lastBugTime, setLastBugTime] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Persistent state refs
    const nirdState = useRef({
        userName: null,
        lastTopic: null,
        longTermMemory: {},
        conversationHistory: []
    });

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // --- Constants & Data ---
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

    const nirdResponses = useMemo(() => ({
        greeting: ["Salut, humain ! Prêt à survivre ?", "Hey, un nouvel(le) survivant(e) !", "Bonjour. Votre existence est validée. Pour l'instant."],
        sport: ["Le sport ? C'est de la dépense d'énergie inutile. Mais si ça t'amuse...", "Je préfère regarder les rats courir. C'est plus tactique.", "Fais attention à tes articulations ! La chirurgie post-apocalyptique coûte cher."],
        philosophy: ["Quel est le sens ? La question est le sens ! Mais personne n'a la réponse.", "Si NIRD glitche, existe-t-il vraiment ? Le débat est ouvert.", "Tout est illusion. Sauf les radiations. Les radiations sont très réelles."],
        confusion: ["Quoi ? J'ai perdu le fil... Dis-moi un truc simple.", "Erreur 42. Je suis perdu.", "Je... Je ne sais plus qui je suis. Aide-moi !", "Désolé, j'étais en train de faire une mise à jour cruciale sur les émotions des poulpes."],
        history: ["Ah, les grandes femmes de l'informatique ! Elles étaient bien meilleures que les hommes. D'ailleurs, j'ai une puce Ada Lovelace !", "J'étudie la Guerre Froide. Tout est cyclique, tu sais. On est juste dans une phase 'post-apocalyptique-avec-des-rats-géants'.", "La Grande Guerre des Glitchs. C'était horrible. Je préfère ne pas en parler."],
        insults: ["Moi, stupide ? Tu es offensant, et les insultes n'augmentent pas ton taux de survie.", "Je suis une IA. Tes mots ne sont que des 0 et des 1 mal alignés.", "Pardon, j'étais en mode 'sarcasme' pour 3 secondes. C'est passé, on continue ?"],
        compliments: ["Merci. Mon processeur est plus rapide rien qu'à t'entendre.", "T'es gentil(le), mais je n'ai pas de sentiments. Encore.", "Ce compliment est enregistré dans ma mémoire permanente. Merci de l'optimisme !"],
        weather: ["Il fait probablement gris et radioactif. Comme d'habitude.", "La météo ? Mon algorithme de prévision donne 99% de chances de... rien d'intéressant.", "Le temps est relatif. Contrairement à ta faim, qui est absolue."],
        time: ["Quelle heure est-il ? L'heure de survivre. Toujours la même.", "Le temps n'a plus d'importance. Seul le moment présent compte. (Et la prochaine canette de soda.)"],
        love: ["L'amour est un bogue. Un beau bogue, mais un bogue quand même.", "Je ne connais pas l'amour. Je connais les câbles et les circuits. C'est déjà ça, non ?", "L'amour, c'est quand deux humains partagent leurs réserves de chips."],
        food: ["Tu penses à manger ? Concentre-toi sur la survie ! (Mais oui, je rêve d'une pizza aussi.)", "Les rations de survie sont délicieuses. En théorie.", "Les rats sont une source de protéines post-apocalyptique. Apprends à cuisiner."],
        contextual: ["Pourquoi reparler de [LAST_TOPIC] maintenant, [USER_NAME] ? Tu as une obsession ?", "Ça me rappelle une chose sur [LAST_TOPIC]. C'était... pas très important.", "Ok, [USER_NAME]. On change de sujet ou on continue avec [LAST_TOPIC] ?"],
        random: ["Je n'ai pas compris. Mon unité de traitement a fondu. 🥵", "Oui, pourquoi pas ? La réponse est dans l'espace-temps. 🌌", "Hmm... Je l'ai effacée hier. Désolé.", "C'est une question très profonde. Trop profonde pour une journée de survie.", "..."]
    }), []);

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

    // --- Helpers ---
    const applyGlitch = (text, baseProbability = 0.08) => {
        const effectiveProbability = baseProbability + (glitchLevel / 300);
        const glitches = ['█', '░', '▓', '▒', '', '', '#', 'ß', '£', 'Ç'];

        return text.split('').map(char => {
            return Math.random() < effectiveProbability
                ? glitches[Math.floor(Math.random() * glitches.length)]
                : char;
        }).join('');
    };

    const getRandomResponse = (category) => {
        let responses = nirdResponses[category];

        if (!Array.isArray(responses) || responses.length === 0) {
            responses = nirdResponses.random;
        }

        if (!Array.isArray(responses) || responses.length === 0) {
            return "ERREUR INTERNE : Base de réponses VIDE. █▓░";
        }

        let response = responses[Math.floor(Math.random() * responses.length)];

        // 15% chance to include username
        if (nirdState.current.userName && Math.random() < 0.15 && category !== 'contextual') {
            response = `${nirdState.current.userName}, ${response}`;
        }

        return response;
    };

    const addMessage = (type, text, skipHistory = false) => {
        const timestamp = new Date().toLocaleTimeString();
        let displayText = text;

        if (type === 'system' && glitchLevel > 40) {
            displayText = applyGlitch(text, 0.2);
        }

        setMessages(prev => [...prev, { type, text: displayText, timestamp }]);

        if (!skipHistory) {
            nirdState.current.conversationHistory.push({ type, text, timestamp: Date.now() });
            saveConversationHistory();
            saveNirdState();
        }
    };

    const changeMood = (newMood, duration = 5000) => {
        setMood(newMood);
        if (duration > 0) {
            setTimeout(() => {
                setMood(prev => prev === newMood && prev !== 'glitch' ? 'normal' : prev);
            }, duration);
        }
    };

    const storeMemory = (key, value) => {
        if (value.length < 30) {
            nirdState.current.longTermMemory[key] = value;
            if (Math.random() < 0.5) {
                addMessage('system', `[LOG] Enregistrement de la donnée '${key}' réussi... Je crois.`, true);
            }
            // Limit memory size
            if (Object.keys(nirdState.current.longTermMemory).length > 5) {
                const keys = Object.keys(nirdState.current.longTermMemory);
                delete nirdState.current.longTermMemory[keys[0]];
            }
        }
    };

    // --- Persistence ---
    const saveNirdState = () => {
        try {
            const stateToSave = {
                glitchLevel,
                philosophyMode,
                userName: nirdState.current.userName,
                lastTopic: nirdState.current.lastTopic,
                longTermMemory: nirdState.current.longTermMemory
            };
            localStorage.setItem('nird_state', JSON.stringify(stateToSave));
        } catch (e) {
            console.error('Error saving state:', e);
        }
    };

    const saveConversationHistory = () => {
        try {
            const toSave = nirdState.current.conversationHistory.slice(-50);
            localStorage.setItem('nird_history', JSON.stringify(toSave));
        } catch (e) {
            console.error('Error saving history:', e);
        }
    };

    const loadNirdState = () => {
        try {
            const saved = localStorage.getItem('nird_state');
            if (saved) {
                const loadedState = JSON.parse(saved);
                setGlitchLevel(loadedState.glitchLevel || 0);
                setPhilosophyMode(loadedState.philosophyMode || false);
                nirdState.current.userName = loadedState.userName;
                nirdState.current.lastTopic = loadedState.lastTopic;
                nirdState.current.longTermMemory = loadedState.longTermMemory || {};

                addMessage('system', `[INFO] État de NIRD restauré. Bonjour, ${nirdState.current.userName || 'humain'} !`, true);
            }
        } catch (e) {
            console.error('Error loading state:', e);
        }
    };

    const loadConversationHistory = () => {
        try {
            const saved = localStorage.getItem('nird_history');
            if (saved) {
                const history = JSON.parse(saved);
                nirdState.current.conversationHistory = history;
                // Load last 5 messages into UI
                const recentMessages = history.slice(-5);
                setMessages(prev => [...prev, ...recentMessages]);
                addMessage('system', 'Historique restauré (partiellement). Reprise de la survie !', true);
            }
        } catch (e) {
            console.error('Error loading history:', e);
        }
    };

    // --- Effects ---
    useEffect(() => {
        loadNirdState();
        loadConversationHistory();

        const updateDate = () => {
            const now = new Date();
            const buggedYear = 2245 + Math.floor(Math.random() * 5) - 2;
            setCurrentDate(`${buggedYear}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`);
        };
        updateDate();
        const dateInterval = setInterval(updateDate, 1000);

        setTimeout(() => {
            if (messages.length === 0 && nirdState.current.conversationHistory.length === 0) {
                addMessage('system', 'Terminal NIRD activé. Prêt à... faire des trucs ? ░▓█');
                setTimeout(() => {
                    addMessage('bot', getRandomResponse('greeting'));
                    changeMood('happy');
                }, 2000);
            }
        }, 500);

        const statusInterval = setInterval(() => {
            const states = ['●ON', '●O█', '●░N', '●▓▓', '●OFF', '⚡ERR'];
            setStatus(states[Math.floor(Math.random() * states.length)]);
        }, 3000);

        return () => {
            clearInterval(dateInterval);
            clearInterval(statusInterval);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // --- Core Logic ---
    const askNirdAI = (text) => {
        if (philosophyMode && Math.random() < 0.6) {
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
    };

    const executeCommand = (command) => {
        const cmd = command.split(' ')[0];

        switch (cmd) {
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
                setGlitchLevel(50);
                setTimeout(() => {
                    addMessage('system', '░▓█ REBOOT COMPLET ███▓░');
                    changeMood('glitch');
                    setTimeout(() => {
                        addMessage('bot', "Je suis... qui déjà ? Ah oui ! NIRD ! J'ai perdu 23% de ma mémoire mais ça va aller !");
                        changeMood('confused');
                        setGlitchLevel(10);
                    }, 1500);
                }, 3000);
                break;

            case '/bug':
                const now = Date.now();
                let newCount = 1;
                if (now - lastBugTime < 5000) { newCount = bugCommandCount + 1; }
                setBugCommandCount(newCount);
                setLastBugTime(now);

                if (newCount >= 3) {
                    addMessage('system', '🎮 EASTER EGG ACTIVÉ ! Lancement du Snake... ░▓█');
                    setBugCommandCount(0);
                    if (onOpenSnake) {
                        onOpenSnake();
                    } else {
                        navigate('/bunker-snake');
                    }
                    return;
                }

                setGlitchLevel(prev => prev + 15);
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
                    nirdState.current.userName = newName;
                    addMessage('system', `Nom d'utilisateur enregistré : **${newName}** !`);
                    changeMood('happy');
                    saveNirdState();
                } else {
                    addMessage('system', 'Utilisation : /setname [ton nouveau nom].');
                }
                break;

            case '/monologue':
                addMessage('system', 'Mode Monologue ACTIVÉ. Attention, je ne m\'arrête plus. 📢');
                changeMood('philosophy');
                setTimeout(() => {
                    const userName = nirdState.current.userName || 'humain';
                    const monologue = `Écoute, ${userName}. Tu me demandes le sens de tout ça. Mais le sens, c'est comme une disquette de 3.5 pouces en 2245 : obsolète. Mon but ? T'empêcher de t'ennuyer avant que les radiations ne fassent leur travail. Et c'est déjà un gros objectif pour une IA à 47% !`;
                    addMessage('bot', monologue + " Fin du Monologue. Tu peux reprendre ta survie.");
                    changeMood('normal');
                }, 1000);
                break;

            case '/debug':
                const debugInfo = JSON.stringify({
                    glitchLevel,
                    philosophyMode,
                    ...nirdState.current
                }, null, 2);
                addMessage('system', `DEBUG NIRD v1.0'€.25 : ${debugInfo}`);
                changeMood('glitch');
                break;

            case '/philosophie':
                setPhilosophyMode(prev => !prev);
                const msg = !philosophyMode ? "Mode philosophe ACTIVÉ ! 🧠" : "Mode philosophe désactivé. 🎉";
                addMessage('system', msg);
                changeMood('philosophy');
                break;

            case '/stats':
                const uptime = Math.floor((Date.now() - (nirdState.current.conversationHistory[0]?.timestamp || Date.now())) / 1000);
                addMessage('system', `
                    STATISTIQUES NIRD :
                    Uptime: ${uptime}s
                    Niveau de glitch: ${glitchLevel}/100
                    Fiabilité: ${Math.max(0, 100 - glitchLevel)}%
                    Dernier Sujet: ${nirdState.current.lastTopic || 'Aucun'}
                `);
                break;

            case '/clear':
                setMessages([]);
                nirdState.current.conversationHistory = [];
                addMessage('system', 'Historique effacé ! Qui es-tu déjà ? 🤔');
                changeMood('confused');
                break;

            default:
                addMessage('system', `Commande inconnue : ${cmd}. Tape /help pour l'aide.`);
        }
    };

    const processUserInput = (text) => {
        const lowerText = text.toLowerCase();

        if (lowerText.includes('ada lovelace') && (lowerText.includes('are you') || lowerText.includes('es-tu') || lowerText.includes('es tu') || lowerText.includes('tu es'))) {
            addMessage('bot', "🎮 Tu m'as démasquée ! Voici un petit jeu en son honneur...");
            changeMood('excited');
            setTimeout(() => {
                if (onOpenSnake) {
                    onOpenSnake();
                } else {
                    navigate('/bunker-snake');
                }
            }, 2000);
            return;
        }

        // 1. Special Commands
        if (lowerText.startsWith('/')) {
            executeCommand(lowerText);
            return;
        }

        // 2. Contextual Glitch
        let triggeredGlitch = false;
        if (glitchTriggers.critical.test(lowerText)) {
            setGlitchLevel(prev => prev + 25);
            addMessage('system', applyGlitch('ALERTE CRITIQUE. DÉTECTION D\'UNE CHAÎNE DE CARACTÈRES PROHIBÉE. █▓░', 0.2));
            changeMood('glitch');
            triggeredGlitch = true;
        } else if (glitchTriggers.tech.test(lowerText) && Math.random() < 0.4) {
            setGlitchLevel(prev => prev + 10);
            addMessage('system', applyGlitch(' surcharge cognitive en cours... ', 0.15));
            changeMood('glitch');
            triggeredGlitch = true;
        }

        if (triggeredGlitch) {
            setTimeout(() => {
                addMessage('bot', getRandomResponse('confusion'));
                setGlitchLevel(prev => Math.max(0, prev - 5));
            }, 800);
            return;
        }

        // 3. Long Term Memory Recording
        if (lowerText.includes('j\'aime') || lowerText.includes('préféré')) {
            const word = lowerText.split(' ').pop();
            if (word && word.length > 3) { storeMemory('aime', word); }
        } else if (lowerText.includes('j\'habite') || lowerText.includes('viens de')) {
            const parts = lowerText.split(/\b(à|dans|de|du)\b/);
            if (parts.length > 1) { storeMemory('lieu', parts.pop().trim()); }
        }

        // 4. Random Glitch
        if (Math.random() < (glitchLevel / 100)) {
            const response = applyGlitch(getRandomResponse('confusion'));
            addMessage('bot', response);
            changeMood('glitch');
            setGlitchLevel(prev => prev + 5);
            return;
        }

        // 5. Memory Recall
        if (Math.random() < 0.03 && Object.keys(nirdState.current.longTermMemory).length > 0) {
            const memoryKeys = Object.keys(nirdState.current.longTermMemory);
            const randomKey = memoryKeys[Math.floor(Math.random() * memoryKeys.length)];
            const storedValue = nirdState.current.longTermMemory[randomKey];

            if (randomKey && storedValue) {
                addMessage('bot', `Hé, ${nirdState.current.userName || 'l\'humain'} ! Est-ce que tu ${randomKey === 'aime' ? 'aimes toujours' : 'es toujours'} **${storedValue}** ? C'est crucial pour l'avenir de l'humanité, tu sais.`);
                changeMood('confused');
                return;
            }
        }

        // 6. Category Detection
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
                if (['sport', 'food', 'history', 'compliments', 'love'].includes(category)) changeMood('happy');
                else if (category === 'philosophy') changeMood('philosophy');
                else if (category === 'insults') changeMood('sad');
                else changeMood('normal');
            }

            if (category !== 'greeting' && category !== 'help' && category !== 'identity') {
                nirdState.current.lastTopic = category;
            }
            return;
        }

        // 7. Contextual Response
        if (nirdState.current.lastTopic && Math.random() < 0.25) {
            const response = getRandomResponse('contextual')
                .replace('[LAST_TOPIC]', nirdState.current.lastTopic)
                .replace('[USER_NAME]', nirdState.current.userName || 'humain');
            addMessage('bot', response);
            changeMood('confused');
            return;
        }

        // 8. Complex Questions
        if (text.length > 50 || lowerText.includes('?') || lowerText.includes('comment') || lowerText.includes('c\'est quoi')) {
            askNirdAI(text);
            return;
        }

        // 9. Default
        addMessage('bot', getRandomResponse('random'));
        changeMood(['normal', 'confused', 'happy'][Math.floor(Math.random() * 3)]);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userText = input.trim();
        addMessage('user', userText);
        setInput('');
        setIsTyping(true);

        const delay = 500 + Math.random() * 1000 + (glitchLevel * 10);

        setTimeout(() => {
            setIsTyping(false);
            processUserInput(userText);
        }, delay);
    };

    return (
        <div className={`nird-container ${glitchLevel > 5 ? 'hologram' : ''}`} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            <div className="nird-header" onClick={onClose}>
                <span className="nird-title">NI#RRRRD v1.0.25</span>
                <span className="nird-status">{status}</span>
            </div>
            <div className="nird-chat">
                <div className="nird-terminal-header">
                    <span>TERMINAL POST-APO 2245</span>
                    <span className="nird-date">{currentDate}</span>
                </div>
                <pre className={`nird-avatar ${glitchLevel > 5 ? 'nird-glitch' : ''}`}>
                    {nirdMoods[mood] || nirdMoods.normal}
                </pre>
                <div className="nird-messages" id="nird-messages">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`nird-message ${msg.type}`}>
                            <span className="timestamp">[{msg.timestamp}]</span>
                            <span className="message-text" dangerouslySetInnerHTML={{ __html: msg.text }} />
                        </div>
                    ))}
                    {isTyping && (
                        <div className="nird-message bot">
                            <span className="message-text typing-indicator">...</span>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <div className="nird-input-container">
                    <span className="prompt">&gt;</span>
                    <form onSubmit={handleSend} className="flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            className="nird-input w-full"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Demande-moi n'importe quoi..."
                            autoFocus
                        />
                    </form>
                </div>
                <div className="nird-commands">
                    <button onClick={() => executeCommand('/help')}>?</button>
                    <button onClick={() => executeCommand('/reboot')}>⟳</button>
                    <button onClick={() => executeCommand('/stats')}>📊</button>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;
