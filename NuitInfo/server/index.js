import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const app = express();
const PORT = 3001;
const JWT_SECRET = 'nird-health-monitor-secret-2024';
const USERS_FILE = './users.json';

// Middleware
app.use(cors());
app.use(express.json());

// Initialiser le fichier users.json s'il n'existe pas
if (!existsSync(USERS_FILE)) {
    writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

// Helpers
const getUsers = () => JSON.parse(readFileSync(USERS_FILE, 'utf-8'));
const saveUsers = (users) => writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token manquant' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalide' });
    }
};

// ========================
// ROUTES AUTH
// ========================

// Inscription
app.post('/api/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Tous les champs sont requis' });
        }

        const users = getUsers();

        // Vérifier si l'utilisateur existe déjà
        if (users.find(u => u.email === email)) {
            return res.status(400).json({ error: 'Cet email est déjà utilisé' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer le nouvel utilisateur
        const newUser = {
            id: Date.now().toString(),
            username,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            profile: null, // Sera rempli après le quiz
            routinesCompleted: 0
        };

        users.push(newUser);
        saveUsers(users);

        // Générer le token
        const token = jwt.sign({ id: newUser.id, username, email }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            message: 'Compte créé avec succès !',
            token,
            user: { id: newUser.id, username, email }
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Connexion
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' });
        }

        const users = getUsers();
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }

        const token = jwt.sign({ id: user.id, username: user.username, email }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            message: 'Connexion réussie !',
            token,
            user: { id: user.id, username: user.username, email, profile: user.profile }
        });
    } catch (err) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Récupérer le profil (protégé)
app.get('/api/me', authMiddleware, (req, res) => {
    const users = getUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        routinesCompleted: user.routinesCompleted
    });
});

// Sauvegarder le profil quiz (protégé)
app.post('/api/profile', authMiddleware, (req, res) => {
    const { profile } = req.body;
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    users[userIndex].profile = profile;
    saveUsers(users);

    res.json({ message: 'Profil sauvegardé', profile });
});

// Incrémenter les routines terminées
app.post('/api/routine-complete', authMiddleware, (req, res) => {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    users[userIndex].routinesCompleted += 1;
    saveUsers(users);

    res.json({
        message: 'Routine complétée !',
        routinesCompleted: users[userIndex].routinesCompleted
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🏋️ NIRD Health Server running on http://localhost:${PORT}`);
    console.log(`📦 Mode: Recyclage de ressources activé !`);
});
