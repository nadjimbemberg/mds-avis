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

const request = require('supertest');
const app     = require('./testApp');
const prisma  = require('../lib/prisma');

const MOCK_REVIEW = {
    id:          1,
    author:      'Alice',
    rating:      4,
    description: 'Un bon produit, je recommande.',
    authorized:  true,
    userId:      1,
    createdAt:   new Date(),
    updatedAt:   new Date(),
    user:        { id: 1, username: 'alice' },
};

describe('GET /avis', () => {
    it('retourne 200 avec la liste des avis', async () => {
        prisma.review.findMany.mockResolvedValue([MOCK_REVIEW]);
        prisma.review.count.mockResolvedValue(1);

        const res = await request(app).get('/avis');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('ne sélectionne pas le champ email dans la requête Prisma', async () => {
        prisma.review.findMany.mockResolvedValue([MOCK_REVIEW]);
        prisma.review.count.mockResolvedValue(1);

        await request(app).get('/avis');

        // Vérifier que le controller appelle Prisma avec un select qui exclut email
        expect(prisma.review.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                select: expect.not.objectContaining({ email: true }),
            })
        );
    });
});

describe('GET /avis/:id', () => {
    it('retourne 200 si l\'avis existe', async () => {
        prisma.review.findUnique.mockResolvedValue(MOCK_REVIEW);

        const res = await request(app).get('/avis/1');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    it('retourne 404 si l\'avis n\'existe pas', async () => {
        prisma.review.findUnique.mockResolvedValue(null);

        const res = await request(app).get('/avis/9999');

        expect(res.status).toBe(404);
    });

    it('retourne 400 si l\'id est invalide', async () => {
        const res = await request(app).get('/avis/abc');
        expect(res.status).toBe(400);
    });
});

describe('POST /avis', () => {
    it('retourne 201 si les champs sont valides', async () => {
        prisma.review.create.mockResolvedValue({ ...MOCK_REVIEW, id: 2, authorized: false });

        const res = await request(app)
            .post('/avis')
            .send({
                author:      'Bob',
                email:       'bob@example.com',
                rating:      5,
                description: 'Excellent produit, très satisfait !',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('review');
    });

    it('retourne 400 si des champs sont manquants', async () => {
        const res = await request(app)
            .post('/avis')
            .send({ author: 'Bob', rating: 5 }); // email et description manquants

        expect(res.status).toBe(400);
    });

    it('retourne 400 si la description est trop courte', async () => {
        const res = await request(app)
            .post('/avis')
            .send({ author: 'Bob', email: 'bob@example.com', rating: 3, description: 'Trop ct' });

        expect(res.status).toBe(400);
    });

    it('retourne 400 si la note est hors limites', async () => {
        const res = await request(app)
            .post('/avis')
            .send({ author: 'Bob', email: 'bob@example.com', rating: 6, description: 'Description suffisamment longue.' });

        expect(res.status).toBe(400);
    });
});
