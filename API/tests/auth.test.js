// Bypass rate limiting pour les tests
jest.mock('express-rate-limit', () => () => (_req, _res, next) => next());

// Mock Prisma (pas de vraie base de données)
jest.mock('../lib/prisma', () => ({
    user: {
        findUnique: jest.fn(),
        create:     jest.fn(),
        update:     jest.fn(),
    },
    review: {
        findMany:   jest.fn(),
        findUnique: jest.fn(),
        create:     jest.fn(),
        update:     jest.fn(),
        delete:     jest.fn(),
        count:      jest.fn(),
    },
}));

// Mock argon2 (évite le hachage CPU en test)
jest.mock('../lib/argon2', () => ({
    hashPassword:   jest.fn().mockResolvedValue('$argon2id$hashed'),
    verifyPassword: jest.fn().mockResolvedValue(true),
}));

const request = require('supertest');
const app     = require('./testApp');
const prisma  = require('../lib/prisma');
const argon2  = require('../lib/argon2');

const MOCK_USER = {
    id:           1,
    email:        'alice@example.com',
    username:     'alice',
    passwordHash: '$argon2id$hashed',
    createdAt:    new Date(),
    updatedAt:    new Date(),
};

describe('POST /register', () => {
    it('crée un compte et retourne 201', async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        prisma.user.create.mockResolvedValue(MOCK_USER);

        const res = await request(app)
            .post('/register')
            .send({ username: 'alice', email: 'alice@example.com', password: 'Secret123' }); // mot de passe fort

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('message');
    });

    it('retourne 409 si email déjà utilisé (message générique)', async () => {
        prisma.user.findUnique.mockResolvedValue(MOCK_USER);

        const res = await request(app)
            .post('/register')
            .send({ username: 'alice', email: 'alice@example.com', password: 'Secret123' });

        expect(res.status).toBe(409);
        // Le message ne doit PAS révéler que l'email existe (anti-énumération)
        expect(res.body.error).not.toMatch(/email/i);
    });

    it('retourne 400 si champs manquants', async () => {
        const res = await request(app)
            .post('/register')
            .send({ email: 'alice@example.com' });

        expect(res.status).toBe(400);
    });
});

describe('POST /login', () => {
    it('retourne 200 avec un token JWT si identifiants corrects', async () => {
        prisma.user.findUnique.mockResolvedValue(MOCK_USER);
        argon2.verifyPassword.mockResolvedValue(true);

        const res = await request(app)
            .post('/login')
            .send({ email: 'alice@example.com', password: 'secret123' });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(typeof res.body.token).toBe('string');
    });

    it('retourne 401 si utilisateur inconnu', async () => {
        prisma.user.findUnique.mockResolvedValue(null);

        const res = await request(app)
            .post('/login')
            .send({ email: 'inconnu@example.com', password: 'mauvais' });

        expect(res.status).toBe(401);
    });

    it('retourne 401 si mot de passe incorrect', async () => {
        prisma.user.findUnique.mockResolvedValue(MOCK_USER);
        argon2.verifyPassword.mockResolvedValue(false);

        const res = await request(app)
            .post('/login')
            .send({ email: 'alice@example.com', password: 'mauvais' });

        expect(res.status).toBe(401);
    });
});

describe('GET /me', () => {
    it('retourne 401 sans token', async () => {
        const res = await request(app).get('/me');
        expect(res.status).toBe(401);
    });

    it('retourne 401 avec token invalide', async () => {
        const res = await request(app)
            .get('/me')
            .set('Authorization', 'Bearer token_invalide');
        expect(res.status).toBe(401);
    });

    it('retourne 200 avec un token valide', async () => {
        const { signToken } = require('../lib/jwt');
        const token = signToken({ id: 1, email: 'alice@example.com', username: 'alice' });

        prisma.user.findUnique.mockResolvedValue(MOCK_USER);

        const res = await request(app)
            .get('/me')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('email', 'alice@example.com');
    });
});
