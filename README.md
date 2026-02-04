# api-vald

API REST sur tout le contenu vidéo youtube de VALD !

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) (généralement inclus avec Node.js)
- [MongoDB](https://www.mongodb.com/) (pour la base de données)

## Installation

1. Cloner le dépôt :
   `git clone https://github.com/Skitch49/api-vald.git`

2. Installer les dépendances :
   `npm i`

3. Configurer les variables d'environnement :
   Créez un fichier .env à la racine du projet et ajoutez la variable suivante :

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
URL_API_BACKEND=your-url-api-backend
```

4. Lancer l'application
   `npm start`

## Utilisation

Une fois l'API démarrée, vous pouvez interagir avec les différentes ressources : **artistes**, **clips** et **vidéos**. Chaque ressource dispose de ses propres routes pour effectuer des opérations CRUD et d'autres fonctionnalités spécifiques.

### 🎬 Clips

| Méthode    | Endpoint                                | Description                                           |
| ---------- | --------------------------------------- | ----------------------------------------------------- |
| **GET**    | `/clips/`                               | Récupère la liste de tous les clips.                  |
| **GET**    | `/clips/last-clip`                      | Récupère le dernier clip ajouté.                      |
| **GET**    | `/clips/search/:query`                  | Recherche des clips en fonction d'un mot-clé.         |
| **GET**    | `/clips/:url`                           | Récupère un clip spécifique via son URL.              |
| **POST**   | `/clips/`                               | Ajoute un nouveau clip.                               |
| **PUT**    | `/clips/:id`                            | Modifie un clip existant.                             |
| **DELETE** | `/clips/:id`                            | Supprime un clip.                                     |
| **GET**    | `/clips/date-range/:startDate/:endDate` | Récupère les clips publiés dans une période donnée.   |
| **GET**    | `/clips/clip-liked/:userId`             | Récupère les clips aimés par un utilisateur.          |
| **PATCH**  | `/clips/like-clip/:id`                  | Ajoute un like à un clip.                             |
| **PATCH**  | `/clips/dislike-clip/:id`               | Retire un like d'un clip.                             |
| **GET**    | `/clips/all-video-liked/:userId`        | Récupère toutes les vidéos aimées par un utilisateur. |
| **GET**    | `/clips/categories/:categorie`          | Récupère les vidéos selon une catégorie donnée.       |

### 📺 Vidéos

| Méthode    | Endpoint                        | Description                                     |
| ---------- | ------------------------------- | ----------------------------------------------- |
| **GET**    | `/videos/`                      | Récupère toutes les vidéos.                     |
| **GET**    | `/videos/last-video`            | Récupère la dernière vidéo ajoutée.             |
| **GET**    | `/videos/:url`                  | Récupère une vidéo spécifique via son URL.      |
| **POST**   | `/videos/`                      | Ajoute une nouvelle vidéo.                      |
| **PUT**    | `/videos/:id`                   | Modifie une vidéo existante.                    |
| **DELETE** | `/videos/:id`                   | Supprime une vidéo.                             |
| **GET**    | `/videos/categories/:categorie` | Récupère les vidéos d’une catégorie spécifique. |
| **GET**    | `/videos/video-liked/:userId`   | Récupère les vidéos aimées par un utilisateur.  |
| **PATCH**  | `/videos/like-video/:id`        | Ajoute un like à une vidéo.                     |
| **PATCH**  | `/videos/dislike-video/:id`     | Retire un like d'une vidéo.                     |
| **GET**    | `/videos/all-videos-and-clips`  | Récupère tous les contenus (clips + vidéos).    |

---

### Artistes

| Méthode    | Endpoint          | Description                             |
| ---------- | ----------------- | --------------------------------------- |
| **GET**    | `/artistes/`      | Récupère la liste de tous les artistes. |
| **POST**   | `/artistes/`      | Ajoute un nouvel artiste.               |
| **PUT**    | `/artistes/:id`   | Modifie un artiste existant.            |
| **DELETE** | `/artistes/:id`   | Supprime un artiste.                    |
| **GET**    | `/artistes/:name` | Récupère un artiste via son nom.        |

## Lien utile

- Projet qui utilise l'API: [VALD-FC](http://vald-fc.netlify.app/)
- lien de l'API: [Railway](https://api-vald.up.railway.app)
