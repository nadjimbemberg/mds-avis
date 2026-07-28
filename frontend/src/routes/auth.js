const express    = require('express');
const router     = express.Router();
const { apiFetch } = require('../lib/api');

// GET /login
router.get('/login', (req, res) => {
    if (res.locals.user) return res.redirect('/');
    const success = req.query.success === '1' ? 'Compte créé avec succès ! Connectez-vous.' :
                    req.query.success === 'reset' ? 'Mot de passe réinitialisé. Connectez-vous.' : null;
    res.render('login', { error: null, success, returnTo: req.query.returnTo || '/' });
});

// POST /login
router.post('/login', async (req, res) => {
    const { email, password, returnTo } = req.body;
    try {
        const result = await apiFetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        if (result.error) {
            return res.render('login', { error: result.error, success: null, returnTo: returnTo || '/' });
        }
        res.cookie('token', result.token, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.redirect(returnTo && returnTo.startsWith('/') ? returnTo : '/');
    } catch {
        res.render('login', { error: 'Impossible de contacter le serveur', success: null, returnTo: returnTo || '/' });
    }
});

// POST /logout
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
});

// GET /register
router.get('/register', (req, res) => {
    if (res.locals.user) return res.redirect('/');
    res.render('register', { error: null, values: {} });
});

// POST /register
router.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
        return res.render('register', { error: 'Les mots de passe ne correspondent pas', values: { username, email } });
    }
    try {
        const result = await apiFetch('/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
        });
        if (result.error) {
            return res.render('register', { error: result.error, values: { username, email } });
        }
        res.redirect('/login?success=1');
    } catch {
        res.render('register', { error: 'Impossible de contacter le serveur', values: { username, email } });
    }
});

// GET /password-forgot
router.get('/password-forgot', (req, res) => {
    res.render('password-forgot', { error: null, success: null });
});

// POST /password-forgot
router.post('/password-forgot', async (req, res) => {
    const { email } = req.body;
    try {
        const result = await apiFetch('/forgot-password', {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
        if (result.error) {
            return res.render('password-forgot', { error: result.error, success: null });
        }
        res.render('password-forgot', { error: null, success: result.message || 'Email envoyé si le compte existe.' });
    } catch {
        res.render('password-forgot', { error: 'Impossible de contacter le serveur', success: null });
    }
});

// GET /password-reset
router.get('/password-reset', (req, res) => {
    res.render('password-reset', { error: null, token: req.query.token || '' });
});

// POST /password-reset
router.post('/password-reset', async (req, res) => {
    const { token, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        return res.render('password-reset', { error: 'Les mots de passe ne correspondent pas', token });
    }
    try {
        const result = await apiFetch('/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, newPassword }),
        });
        if (result.error) {
            return res.render('password-reset', { error: result.error, token });
        }
        res.redirect('/login?success=reset');
    } catch {
        res.render('password-reset', { error: 'Impossible de contacter le serveur', token });
    }
});

module.exports = router;
