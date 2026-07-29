# MDS Avis — API

API REST Express.js avec Prisma (PostgreSQL) et authentification JWT.

## Stack

- **Runtime** : Node.js
- **Framework** : Express.js 5
- **ORM** : Prisma 5 (PostgreSQL / Neon)
- **Auth** : JWT + Argon2
- **Mail** : Nodemailer
- **Langage** : TypeScript (point d'entrée `src/index.ts`)

## Structure

```
API/
├── src/
│   ├── index.ts          # Point d'entrée TypeScript
│   └── prisma/
│       ├── schema.prisma # Schéma de la base de données
│       └── migrations/   # Historique des migrations
├── controllers/          # Logique métier par route
├── middleware/           # Validation et authentification
├── routes/
│   └── index.js          # Définition de toutes les routes
├── lib/                  # Utilitaires partagés
├── tsconfig.json
├── package.json
└── .env                  # Variables d'environnement (ne pas committer)
```

## Installation

```bash
npm install
```

## Variables d'environnement

Créer un fichier `.env` à la racine du dossier `API/` :

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="votre_secret"
MAIL_USER="votre@email.com"
MAIL_PASS="votre_mot_de_passe_app"
APP_URL="http://localhost:3001"
```

## Lancement

```bash
# Développement (rechargement automatique)
npm run dev

# Production (après build)
npm run build
npm start
```

## Routes disponibles

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

## Base de données

```bash
# Générer le client Prisma après modification du schéma
npx prisma generate

# Créer une migration
npx prisma migrate dev --name nom_de_la_migration

# Visualiser les données
npx prisma studio
```
