const express        = require('express');
const router         = express.Router();
const { apiFetch }   = require('../lib/api');
const { requireAuth } = require('../middleware/auth');

// GET / — accueil
router.get('/', async (req, res) => {
    try {
        const data = await apiFetch('/avis?authorized=true&limit=50&sortBy=createdAt&sortOrder=desc');
        res.render('home', { avis: data.data || [] });
    } catch {
        res.render('home', { avis: [] });
    }
});

// GET /avis/add — formulaire ajout (AVANT /avis/:id)
router.get('/avis/add', (req, res) => {
    const prefill = res.locals.user
        ? { author: res.locals.user.username || '', email: res.locals.user.email || '' }
        : { author: '', email: '' };
    res.render('avis-add', { error: null, prefill });
});

// POST /avis/add — traitement ajout
router.post('/avis/add', async (req, res) => {
    const { author, email, rating, description, _website } = req.body;

    // Anti-spam honeypot
    if (_website) return res.redirect('/');

    const headers = {};
    if (req.cookies.token) headers['Authorization'] = `Bearer ${req.cookies.token}`;

    try {
        const result = await apiFetch('/avis', {
            method: 'POST',
            body: JSON.stringify({ author, email, rating: parseInt(rating) || 0, description }),
            headers,
        });
        if (result.error) {
            return res.render('avis-add', {
                error: result.error,
                prefill: { author, email },
            });
        }
        res.redirect(`/avis/${result.review.id}?success=1`);
    } catch {
        res.render('avis-add', { error: 'Erreur serveur, réessayez.', prefill: { author, email } });
    }
});

// GET /avis/edit/:id — formulaire édition
router.get('/avis/edit/:id', requireAuth, async (req, res) => {
    try {
        const avis = await apiFetch(`/avis/${req.params.id}`);
        if (avis.error) return res.redirect('/');
        if (!res.locals.user || res.locals.user.id !== avis.userId) {
            return res.redirect(`/avis/${req.params.id}`);
        }
        res.render('avis-edit', { avis, error: null });
    } catch {
        res.redirect('/');
    }
});

// POST /avis/edit/:id — traitement édition
router.post('/avis/edit/:id', requireAuth, async (req, res) => {
    const { rating, description } = req.body;
    const token = req.cookies.token;
    try {
        const result = await apiFetch(`/avis/${req.params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ rating: parseInt(rating) || undefined, description }),
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (result.error) {
            const avis = await apiFetch(`/avis/${req.params.id}`);
            return res.render('avis-edit', {
                avis: { ...avis, rating: parseInt(rating), description },
                error: result.error,
            });
        }
        res.redirect(`/avis/${req.params.id}`);
    } catch {
        res.redirect(`/avis/${req.params.id}`);
    }
});

// POST /avis/delete/:id — suppression
router.post('/avis/delete/:id', requireAuth, async (req, res) => {
    const token = req.cookies.token;
    try {
        await apiFetch(`/avis/${req.params.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` },
        });
    } catch { /* ignore */ }
    res.redirect('/');
});

// GET /avis/:id — détail (APRÈS les routes statiques /avis/add et /avis/edit/:id)
router.get('/avis/:id', async (req, res) => {
    try {
        const avis = await apiFetch(`/avis/${req.params.id}`);
        if (avis.error) return res.status(404).render('404');
        const isOwner = res.locals.user && res.locals.user.id === avis.userId;
        const success = req.query.success === '1' ? 'Avis soumis avec succès, en attente de validation.' : null;
        res.render('avis-detail', { avis, isOwner, error: null, success });
    } catch {
        res.status(404).render('404');
    }
});

module.exports = router;
