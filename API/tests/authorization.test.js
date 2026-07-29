/**
 * Tests de contrôle d'accès horizontal (critère D6)
 * Vérifie qu'un utilisateur ne peut pas modifier/supprimer les avis d'un autre.
 */
jest.mock('express-rate-limit', () => () => (_req, _res, next) => next());

jest.mock('../lib/prisma', () => ({
    user: {
        findUnique: jest.fn(),
        create:     jest.fn(),
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

jest.mock('../lib/argon2', () => ({
    hashPassword:   jest.fn().mockResolvedValue('$argon2id$hashed'),
    verifyPassword: jest.fn().mockResolvedValue(true),
}));

const request   = require('supertest');
const app       = require('./testApp');
const prisma    = require('../lib/prisma');
const { signToken } = require('../lib/jwt');

// Tokens des deux utilisateurs
const tokenUser1 = signToken({ id: 1, email: 'user1@test.com', username: 'user1' });
const tokenUser2 = signToken({ id: 2, email: 'user2@test.com', username: 'user2' });

// Avis appartenant à user1
const avisUser1 = {
    id:          1,
    author:      'User1',
    email:       'user1@test.com',
    rating:      4,
    description: 'Avis de user1.',
    authorized:  true,
    userId:      1, // ← appartient à user1
    createdAt:   new Date(),
    updatedAt:   new Date(),
};

describe('Contrôle d\'accès — PUT /avis/:id', () => {
    it('✅ le propriétaire peut modifier son propre avis', async () => {
        prisma.review.findUnique.mockResolvedValue(avisUser1);
        prisma.review.update.mockResolvedValue({ ...avisUser1, rating: 5, authorized: false });

        const res = await request(app)
            .put('/avis/1')
            .set('Authorization', `Bearer ${tokenUser1}`) // user1 modifie son propre avis
            .send({ rating: 5, description: 'Description modifiée par le propriétaire.' });

        expect(res.status).toBe(200);
    });

    it('❌ un autre utilisateur ne peut pas modifier l\'avis d\'autrui (403)', async () => {
        prisma.review.findUnique.mockResolvedValue(avisUser1); // avis de user1

        const res = await request(app)
            .put('/avis/1')
            .set('Authorization', `Bearer ${tokenUser2}`) // user2 tente de modifier
            .send({ rating: 1, description: 'Tentative de modification non autorisée.' });

        expect(res.status).toBe(403);
    });

    it('❌ requête sans token → 401', async () => {
        const res = await request(app)
            .put('/avis/1')
            .send({ rating: 5, description: 'Modification sans authentification.' });

        expect(res.status).toBe(401);
    });
});

describe('Contrôle d\'accès — DELETE /avis/:id', () => {
    it('✅ le propriétaire peut supprimer son propre avis (204)', async () => {
        prisma.review.findUnique.mockResolvedValue(avisUser1);
        prisma.review.delete.mockResolvedValue(avisUser1);

        const res = await request(app)
            .delete('/avis/1')
            .set('Authorization', `Bearer ${tokenUser1}`); // user1 supprime son avis

        expect(res.status).toBe(204);
    });

    it('❌ un autre utilisateur ne peut pas supprimer l\'avis d\'autrui (403)', async () => {
        prisma.review.findUnique.mockResolvedValue(avisUser1); // avis de user1

        const res = await request(app)
            .delete('/avis/1')
            .set('Authorization', `Bearer ${tokenUser2}`); // user2 tente de supprimer

        expect(res.status).toBe(403);
    });

    it('❌ requête sans token → 401', async () => {
        const res = await request(app).delete('/avis/1');
        expect(res.status).toBe(401);
    });

    it('❌ avis inexistant → 404', async () => {
        prisma.review.findUnique.mockResolvedValue(null);

        const res = await request(app)
            .delete('/avis/9999')
            .set('Authorization', `Bearer ${tokenUser1}`);

        expect(res.status).toBe(404);
    });
});

describe('Contrôle d\'accès — PUT /authorize/avis/:id', () => {
    it('❌ requête sans token → 401', async () => {
        const res = await request(app).put('/authorize/avis/1');
        expect(res.status).toBe(401);
    });
});
