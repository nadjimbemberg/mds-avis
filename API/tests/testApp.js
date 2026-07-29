/**
 * App Express sans app.listen() — utilisé uniquement par les tests
 */
const express = require('express');
const route   = require('../routes/index');

const app = express();
app.use(express.json());
app.use('/', route);

// Gestionnaire d'erreurs
app.use((err, _req, res, _next) => {
    res.status(500).json({ error: 'Erreur serveur interne' });
});

module.exports = app;
