const express        = require('express');
const router         = express.Router();
const { apiFetch }   = require('../lib/api');
const { requireAuth } = require('../middleware/auth');

// GET /profile
router.get('/profile', requireAuth, async (req, res) => {
    const token = req.cookies.token;
    try {
        const profileUser = await apiFetch('/me', {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (profileUser.error) {
            res.clearCookie('token');
            return res.redirect('/login');
        }
        const success = req.query.success === '1' ? 'Mot de passe modifié avec succès !' : null;
        res.render('profile', { profileUser, error: null, success });
    } catch {
        res.redirect('/login');
    }
});

// POST /change-password
router.post('/change-password', requireAuth, async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const token = req.cookies.token;

    if (newPassword !== confirmPassword) {
        const profileUser = await apiFetch('/me', { headers: { 'Authorization': `Bearer ${token}` } });
        return res.render('profile', {
            profileUser,
            error: 'Les mots de passe ne correspondent pas',
            success: null,
        });
    }

    try {
        const result = await apiFetch('/change-password', {
            method: 'POST',
            body: JSON.stringify({ oldPassword, newPassword }),
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (result.error) {
            const profileUser = await apiFetch('/me', { headers: { 'Authorization': `Bearer ${token}` } });
            return res.render('profile', { profileUser, error: result.error, success: null });
        }
        res.redirect('/profile?success=1');
    } catch {
        res.redirect('/profile');
    }
});

module.exports = router;
