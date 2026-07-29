# MDS Avis — Frontend Next.js

Frontend Next.js 14 du projet MDS Avis.  
L'API REST est dans le repo séparé : [API-avis](https://github.com/nadjimbemberg/API-avis)

## Stack

| Couche      | Technologie                        |
|-------------|------------------------------------|
| Framework   | Next.js 14 (App Router)            |
| Langage     | TypeScript                         |
| Style       | Tailwind CSS                       |
| Auth        | Cookie httpOnly (géré côté serveur)|

## Structure

```
mds-avis/
├── app/
│   ├── layout.tsx              # Layout global + Navbar
│   ├── page.tsx                # Accueil — liste des avis
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── profile/page.tsx
│   ├── admin/page.tsx
│   ├── password-forgot/page.tsx
│   ├── password-reset/page.tsx
│   ├── avis/
│   │   ├── add/page.tsx
│   │   └── [id]/
│   │       ├── page.tsx        # Détail d'un avis
│   │       └── edit/page.tsx
│   └── api/                    # Route handlers (formulaires)
│       ├── auth/               # login, logout, register, reset...
│       └── avis/               # create, edit, delete, authorize
├── components/
│   ├── Navbar.tsx
│   └── StarRating.tsx
├── lib/
│   ├── api.ts                  # Appels vers l'API REST
│   ├── auth.ts                 # Lecture du cookie JWT
│   └── types.ts
└── middleware.ts               # Protection des routes authentifiées
```

## Prérequis

- Node.js 18+
- L'API doit être en cours d'exécution (voir [API-avis](https://github.com/nadjimbemberg/API-avis))

## Installation

```bash
npm install
```

Créer `.env.local` à la racine :

```env
API_URL=http://localhost:3000
```

## Lancement

```bash
npm run dev
# → http://localhost:3000 (Next.js)
```

L'API doit tourner sur `http://localhost:3000` (ou l'URL définie dans `API_URL`).

## Pages disponibles

| Route                  | Description                        | Auth |
|------------------------|------------------------------------|------|
| `/`                    | Liste des avis validés             | —    |
| `/login`               | Connexion                          | —    |
| `/register`            | Inscription                        | —    |
| `/password-forgot`     | Mot de passe oublié                | —    |
| `/password-reset`      | Réinitialisation                   | —    |
| `/avis/add`            | Soumettre un avis                  | —    |
| `/avis/[id]`           | Détail d'un avis                   | —    |
| `/avis/[id]/edit`      | Modifier son avis                  | ✓    |
| `/profile`             | Profil utilisateur                 | ✓    |
| `/admin`               | Valider les avis en attente        | ✓ (rôle `admin`) |

`/admin` est réservé aux comptes avec `role = "admin"` côté API (l'accès est vérifié par le backend ; un utilisateur normal est redirigé). Pour obtenir un compte admin, voir le script `npm run db:seed` du dépôt [API-avis](https://github.com/nadjimbemberg/API-avis).
