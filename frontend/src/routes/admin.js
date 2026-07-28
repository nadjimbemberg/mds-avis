const express        = require('express');
const router         = express.Router();
const { apiFetch }   = require('../lib/api');
const { requireAuth } = require('../middleware/auth');

// GET /admin
router.get('/admin', requireAuth, async (req, res) => {
    const token = req.cookies.token;
    try {
        const data = await apiFetch('/avis?authorized=false&limit=50', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        const avis = (data.data || []).filter(a => !a.authorized);
        res.render('admin', { avis, error: null });
    } catch {
        res.render('admin', { avis: [], error: 'Impossible de charger les avis en attente' });
    }
});

// POST /admin/authorize/:id
router.post('/admin/authorize/:id', requireAuth, async (req, res) => {
    const token = req.cookies.token;
    try {
        await apiFetch(`/authorize/avis/${req.params.id}`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}` },
        });
    } catch { /* ignore */ }
    res.redirect('/admin');
});

module.exports = router;
