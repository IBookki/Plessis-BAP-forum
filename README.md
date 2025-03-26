# Forum Parentalité

Un forum de discussion moderne spécialisé pour les parents, offrant un espace d'échange et de soutien sur des sujets liés à la parentalité.

![Forum Parentalité](.github/screenshot.png)

## 📋 Fonctionnalités

- **Authentification** - Inscription et connexion des utilisateurs
- **Publications** - Création, consultation, et interaction avec des publications
- **Commentaires** - Possibilité de discuter sous chaque publication
- **Likes** - Système d'appréciation des publications
- **Recherche** - Recherche de publications par mots-clés
- **Tendances** - Affichage des publications les plus populaires
- **Interface responsive** - Conception adaptée aux mobiles et ordinateurs

## 🛠️ Technologies Utilisées

- **Frontend**:

  - [Next.js](https://nextjs.org/) - Framework React avec rendu côté serveur
  - [React](https://reactjs.org/) - Bibliothèque UI
  - [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire

- **Backend**:
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - Server Actions
  - [MongoDB](https://www.mongodb.com/) - Base de données NoSQL
  - [JWT](https://jwt.io/) - Authentification par tokens

## 🚀 Installation et Démarrage

### Prérequis

- [Node.js](https://nodejs.org/) (v18 ou supérieur)
- [npm](https://www.npmjs.com/) (v8 ou supérieur)
- [MongoDB](https://www.mongodb.com/) (local ou atlas)

### Configuration

1. **Cloner le dépôt**

```bash
git clone https://github.com/votre-nom/forum-parentalite.git
cd forum-parentalite
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configurer les variables d'environnement**

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
MONGODB_URI=votre_uri_mongodb
JWTSECRET=votre_secret_jwt_aléatoire
```

4. **Lancer le serveur de développement**

```bash
npm run dev
```

5. **Accéder à l'application**

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
forum-parentalite/
├── app/                    # Pages et routes de l'application
│   ├── home/               # Page d'accueil
│   ├── search/             # Recherche de publications
│   ├── trending/           # Publications populaires
│   └── account/            # Profil utilisateur
├── actions/                # Actions côté serveur (Server Actions)
│   ├── postController.js   # Gestion des publications
│   └── userController.js   # Gestion des utilisateurs
├── components/             # Composants réutilisables
│   ├── Header.tsx          # En-tête de l'application
│   ├── Leftbar.tsx         # Barre latérale gauche
│   └── Rightbar.tsx        # Barre latérale droite
├── lib/                    # Utilitaires et configuration
│   └── db.js               # Connexion à la base de données
├── public/                 # Fichiers statiques
│   ├── icons/              # Icônes de l'application
│   └── logo.png            # Logo du forum
└── ...
```

## 🖥️ API Côté Serveur

### Utilisateurs

- `register` - Inscription d'un nouvel utilisateur
- `login` - Connexion d'un utilisateur existant

### Publications

- `create` - Création d'une nouvelle publication
- `read` - Lecture de toutes les publications
- `readTrending` - Lecture des publications les plus populaires
- `readOne` - Lecture d'une publication spécifique
- `remove` - Suppression d'une publication
- `like` - Ajout d'un like à une publication
- `comment` - Ajout d'un commentaire à une publication
- `searchPosts` - Recherche de publications par mots-clés

## 📱 Fonctionnalités à venir

- [ ] Système de modération de contenu
- [ ] Catégorisation des publications
- [ ] Notifications
- [ ] Messages privés entre utilisateurs
- [ ] Support multimédia (images, vidéos)
