### Fonctionnalités Clés
1.  **Système d'Authentification** : Une interface de connexion simplifiée (par prénom) pour personnaliser l'expérience.
2.  **Diagnostic Système (Quiz)** : Un QCM technique qui analyse la "dette technique corporelle" (posture, hydratation, matériel).
3.  **Module de Sensibilisation** : Un carousel interactif comparant la maintenance informatique à la maintenance humaine.
4.  **Générateur de Routine (Patch)** : Un programme de 3 exercices sur-mesure (Physique + Détente + Action NIRD) avec instructions et GIFs.
5.  **Recommandations Hardware** : Suggestion de matériel Decathlon adapté au profil détecté.

---

## Instructions pour lancer le projet

Le projet a été développé avec **React** (Vite) et **Tailwind CSS**. Voici comment le lancer localement :

### Prérequis
* Node.js installé sur votre machine.

### Installation
1.  Clonez le dépôt :
    ```bash
    git clone [VOTRE_LIEN_GIT_ICI]
    cd [NOM_DU_DOSSIER]
    ```
2.  Installez les dépendances :
    ```bash
    npm install
    ```
3.  Lancez le serveur de développement :
    ```bash
    npm run dev
    ```

4.  Ouvrez votre navigateur sur l'URL indiquée (généralement `http://localhost:5173`).

---

## 💡 Commentaires sur la réalisation

### Choix Techniques

* **React & Vite (Le Pivot) :** Initialement, nous pensions partir sur une base **Symfony**. Cependant, poussés par l'envie de découvrir de nouveaux horizons et d'apprendre une technologie moderne pendant cette nuit, nous avons pivoté vers **React**. Un défi d'apprentissage en temps réel !
* **Tailwind CSS :** Pour un design responsive rapide ("Mobile First"), propre et moderne sans écrire des centaines de lignes de CSS classique.
* **Architecture de Données JSON (Low-Tech)** : Conformément au sujet **NIRD**, nous avons évité les appels API lourds ou les bases de données énergivores. Tout le contenu (questions, exercices, produits) est stocké dans des fichiers JSON locaux légers, garantissant la rapidité et la sobriété de l'application.

### Difficultés Rencontrées & Solutions

* **La Connexion JavaScript :** La mise en place de l'authentification a été un véritable casse-tête. Adapter la logique en pur JS pour gérer une connexion simple basée sur des prénoms a nécessité une adaptation longue et complexe. Nous avons finalement opté pour une gestion via Node.js simulant une base de données légère pour contourner le problème.
* **Le CSS :** L'intégration du design a été une épreuve d'une telle intensité que l'un des développeurs prévoit d'écrire ses mémoires sur le sujet. Entre les animations, le responsive et l'alignement des éléments, le CSS a été notre "boss final" de la nuit.
* **Structure des fichiers :** L'organisation des assets (GIFs, Composants, Data) a demandé une rigueur particulière pour gérer les chemins d'importation (`../../`) correctement. Nous avons restructuré le projet pour séparer clairement la logique (`context`), les données (`data`) et la vue (`components`).
* **L'Algorithme de recommandation :** Créer une logique pertinente qui croise à la fois le niveau sportif, la douleur ressentie et l'objectif n'était pas simple. Nous avons mis en place un système de priorités (Douleur > Niveau > Objectif) pour servir le contenu le plus sécurisé possible.
* **Le Ton :** Trouver le juste équilibre entre l'humour "Geek" (références Git, Server, etc.) et le sérieux médical des conseils sportifs Decathlon.

Lien vers notre site :
https://nuitinfo-pied.vercel.app
