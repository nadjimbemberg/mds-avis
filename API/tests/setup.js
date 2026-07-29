// Variables d'environnement pour les tests (avant tout require)
process.env.JWT_SECRET  = 'test_jwt_secret_jest_only';
process.env.NODE_ENV    = 'test';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
