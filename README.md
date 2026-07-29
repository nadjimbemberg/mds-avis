# MDS Avis

Site d'avis noté selon la grille d'évaluation MDS.

Architecture : **API REST Express.js** (port 3000) + **Frontend Express.js / EJS** (port 3001).

## Stack

| Couche      | Technologie                               |
|-------------|-------------------------------------------|
| API         | Node.js · Express.js 5 · TypeScript       |
| Base de données | PostgreSQL via Prisma 5 (Neon)        |
| Auth        | JWT · Argon2id                            |
| Mail        | Nodemailer                                |
| Frontend    | Express.js · EJS · Tailwind CSS           |
| Tests       | Jest · Supertest                          |

## Structure du projet

```
mds-avis/
├── API/                    # Back-end (port 3000)
│   ├── controllers/        # Logique métier
│   ├── middleware/         # Validation et authentification
│   ├── routes/index.js     # Toutes les routes
│   ├── lib/                # JWT, argon2, Prisma, mail
│   ├── tests/              # Tests Jest + Supertest
│   ├── docs/               # Collection Postman
│   └── src/
│       ├── index.ts        # Point d'entrée
│       └── prisma/         # Schéma et migrations
└── frontend/               # Front-end (port 3001)
    ├── src/
    │   ├── index.js        # Serveur Express
    │   ├── routes/         # Pages (auth, avis, profil, admin)
    │   ├── middleware/     # Auth (cookie httpOnly) + locals
    │   └── lib/api.js      # Appels vers l'API
    └── views/              # Templates EJS + partials
```

## Prérequis

- Node.js 18+
- Une base PostgreSQL (ex. [Neon](https://neon.tech) — gratuit)
- Deux terminaux ouverts (un pour l'API, un pour le frontend)

## Installation

### 1. API

```bash
cd API
npm install
npx prisma generate
```

Créer `API/.env` d'après `API/.env.example` :

```env
DATABASE_URL="postgresql://USER:PASS@HOST/DB?sslmode=require"
JWT_SECRET="une_chaine_aleatoire_longue"
MAIL_HOST="smtp.example.com"
MAIL_PORT=587
MAIL_USER="votre@email.com"
MAIL_PASS="mot_de_passe_app"
APP_URL="http://localhost:3001"
PORT=3000
```

Appliquer les migrations :

```bash
npx prisma migrate deploy
```

### 2. Frontend

```bash
cd frontend
npm install
```

Créer `frontend/.env` d'après `frontend/.env.example` :

```env
API_URL=http://localhost:3000
PORT=3001
NODE_ENV=development
```

## Lancement

Ouvrir **deux terminaux** :

**Terminal 1 — API :**
```bash
cd API
npm run dev
# → http://localhost:3000
```

**Terminal 2 — Frontend :**
```bash
cd frontend
npm run dev
# → http://localhost:3001
```

Ouvrir [http://localhost:3001](http://localhost:3001) dans le navigateur.

## Tests (API)

```bash
cd API
npm test
```

Les tests utilisent des mocks — aucune connexion à la base de données n'est requise.

## Routes API

| Méthode | Route                   | Auth     | Description                        |
|---------|-------------------------|----------|------------------------------------|
| GET     | `/`                     | —        | Infos de l'API                     |
| POST    | `/register`             | —        | Créer un compte                    |
| POST    | `/login`                | —        | Se connecter (retourne un JWT)     |
| POST    | `/forgot-password`      | —        | Envoyer un lien de réinitialisation|
| POST    | `/reset-password`       | —        | Réinitialiser le mot de passe      |
| GET     | `/avis`                 | —        | Liste des avis (filtrables)        |
| GET     | `/avis/:id`             | —        | Détail d'un avis                   |
| POST    | `/avis`                 | Optionnel| Soumettre un avis                  |
| GET     | `/me`                   | JWT      | Profil de l'utilisateur connecté   |
| POST    | `/change-password`      | JWT      | Changer de mot de passe            |
| PUT     | `/avis/:id`             | JWT      | Modifier son avis                  |
| PUT     | `/authorize/avis/:id`   | JWT      | Valider un avis (admin)            |
| DELETE  | `/avis/:id`             | JWT      | Supprimer son avis                 |

## Collection Postman

Importer `API/docs/postman_collection.json` dans Postman.  
Définir la variable `{{baseUrl}}` à `http://localhost:3000`.
