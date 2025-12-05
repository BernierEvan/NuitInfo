# 🏋️ CTO Health Monitor - Nuit de l'Info 2024

> **"Devenez le CTO de votre Santé Posturale"** - Défi Decathlon Digital

![Status](https://img.shields.io/badge/status-en%20développement-yellow)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)

## 🎯 Description du Projet

Application web interactive de **diagnostic postural** pour les développeurs et travailleurs sédentaires. Le projet utilise une métaphore informatique ludique pour sensibiliser à l'importance de la posture et proposer des exercices adaptés.

### 📋 Objectifs du Défi

| Niveau | Fonctionnalité | Statut |
|--------|---------------|--------|
| **1** | QCM de profilage sportif | ✅ Terminé |
| **2** | Instructions personnalisées | ✅ Terminé |
| **3** | Illustrations / Animations | ✅ Terminé |
| **4** | Recommandations produits Decathlon | ✅ Terminé |

---

## 🚀 Installation & Lancement

### Prérequis
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/NuitInfo.git
cd NuitInfo/NuitInfo

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build Production

```bash
npm run build
npm run preview
```

---

## 🏗️ Architecture Technique

```
NuitInfo/
├── public/
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── Decathlon/
│   │   │   │   ├── DecathlonManager.jsx   # Zone principale Decathlon
│   │   │   │   ├── JokesCarousel.jsx      # Carousel interactif
│   │   │   │   └── Carousel.css
│   │   │   ├── Quiz.jsx                   # Composant de diagnostic
│   │   │   ├── ExerciseGuide.jsx          # Page des exercices
│   │   │   ├── ExerciseDetails.jsx        # Modal détaillée
│   │   │   └── ProductRecommender.jsx     # Recommandations produits
│   │   ├── data/
│   │   │   ├── questions.json             # Questions du QCM
│   │   │   ├── exercices.json             # Base d'exercices
│   │   │   ├── products.json              # Catalogue Decathlon
│   │   │   └── decathlonData.js           # Données blagues/résultats
│   │   └── gifs/                          # Animations des exercices
│   ├── context/
│   │   └── UserContext.jsx                # État global utilisateur
│   ├── App.jsx                            # Composant principal
│   ├── main.jsx                           # Point d'entrée
│   └── index.css                          # Styles globaux + Tailwind
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## 🎨 Choix Technologiques

| Technologie | Justification |
|------------|---------------|
| **React 19** | Framework moderne, composants réutilisables |
| **Vite** | Build ultra-rapide, HMR instantané |
| **Tailwind CSS** | Design system cohérent, utilitaires rapides |
| **Context API** | Gestion d'état simple, sans overhead Redux |
| **JSON Data** | Données externalisées, faciles à modifier |

### Pourquoi ces choix ?

1. **Rapidité** : Nuit de l'Info = 24h → Vite + Tailwind = productivité maximale
2. **Maintenabilité** : Données séparées du code → facilite les mises à jour
3. **Performance** : React 19 + Vite = bundle optimisé
4. **UX Premium** : Animations CSS, transitions fluides

---

## 🧠 Logique de Personnalisation

### Algorithme de Profil

```javascript
// Extrait de UserContext.jsx
const generateProfile = () => {
  return {
    level: answers['level'],           // beginner | intermediate | expert
    pain: answers['pain'],             // back_pain | wrist_pain | neck_pain | no_pain
    goal: answers['goal'],             // core | flexibility | strength | posture
    riskScore: calculateRiskScore(),   // 0-10
    priorities: getPriorities(),       // ['core', 'flex', ...]
  };
};
```

### Instructions Dynamiques

Chaque exercice contient des instructions conditionnelles :

```json
{
  "instructions": {
    "general": "Instructions de base...",
    "beginner": "Version simplifiée pour débutants...",
    "back_pain": "⚠️ Attention au dos : adaptation spécifique..."
  }
}
```

Le composant sélectionne automatiquement l'instruction pertinente selon le profil.

---

## 🛍️ Intégration Decathlon

Les produits sont recommandés selon :
- **Le type d'exercice** (tapis pour gainage, élastique pour jambes)
- **La douleur détectée** (genouillère si douleur genou)
- **L'objectif** (brique de yoga pour souplesse)

Chaque produit contient un lien direct vers Decathlon.fr.

---

## 🎭 Difficultés Rencontrées

1. **Métaphore CTO** : Équilibrer humour geek et contenu pédagogique sérieux
2. **Personnalisation** : Créer un système de conseils qui reste pertinent pour tous les profils
3. **Animations** : Optimiser les GIFs pour ne pas alourdir le bundle
4. **Responsive** : Adapter l'interface du quiz pour mobile en temps limité

---

## 📸 Captures d'écran

### Étape 1 : Diagnostic
![Quiz](./docs/quiz-screenshot.png)

### Étape 2 : Prise de Conscience
![Carousel](./docs/carousel-screenshot.png)

### Étape 3 : Routine Personnalisée
![Guide](./docs/guide-screenshot.png)

---

## 🔗 Liens

- **Démo Live** : [À venir après déploiement]
- **Repository** : [GitHub](https://github.com/votre-username/NuitInfo)

---

## 👥 Équipe

Projet réalisé dans le cadre de la **Nuit de l'Info 2024** pour le défi **Decathlon Digital**.

---

## 📝 Licence

MIT © 2024
