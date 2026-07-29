const express    = require('express');
const rateLimit  = require('express-rate-limit');
const route = express.Router();

// ── Rate limiters ──────────────────────────────────────────────────────────────
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop de tentatives, réessayez dans 15 minutes' },
});

const forgotLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop de demandes, réessayez dans 1 heure' },
});

const createAvisLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Trop d\'avis soumis, réessayez dans 1 heure' },
});

// ── Middleware ─────────────────────────────────────────────────────────────────
const authMiddleware          = require('../middleware/auth.middleware');
const reviewMiddleware        = require('../middleware/review.middleware');
const registerMiddleware      = require('../middleware/post.middleware.register');
const loginMiddleware         = require('../middleware/post.middleware.login');
const resetPasswordMiddleware = require('../middleware/post.middleware.reset-password');
const postMiddleware          = require('../middleware/post.middleware');
const putMiddleware           = require('../middleware/put.middleware');
const deleteMiddleware        = require('../middleware/delete.middleware');
const getMiddleware           = require('../middleware/get.middleware');
const getReviewsMiddleware    = require('../middleware/get.middleware.reviews');
const getReviewsByIdMiddleware = require('../middleware/get.middleware.reviews.id');

// ── Controllers ────────────────────────────────────────────────────────────────
const getHome             = require('../controllers/get.controllers');
const getMe               = require('../controllers/get.controllers.me');
const getAvis             = require('../controllers/get.controllers.reviews');
const getAvisById         = require('../controllers/get.controllers.reviews.id');

const postAvis            = require('../controllers/post.controllers');
const postRegister        = require('../controllers/post.controllers.register');
const postLogin           = require('../controllers/post.controllers.login');
const postChangePassword  = require('../controllers/post.controllers.changePassword');
const postForgotPassword  = require('../controllers/post.controllers.forgotPassword');
const postResetPassword   = require('../controllers/post.controllers.resetPassword');

const putAvis             = require('../controllers/put.controllers');
const putAuthorizeAvis    = require('../controllers/put.controllers.authorizeAvis');
const deleteAvis          = require('../controllers/delete.controllers');

// ── Middleware auth optionnel ──────────────────────────────────────────────────
const authOptional = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authMiddleware(req, res, next);
    }
    next();
};

// ── Routes publiques ───────────────────────────────────────────────────────────
route.get('/', getMiddleware, getHome);

// Auth
route.post('/register',        postMiddleware, registerMiddleware,      postRegister);
route.post('/login',           loginLimiter,   loginMiddleware,         postLogin);
route.post('/forgot-password', forgotLimiter,  postMiddleware,          postForgotPassword);
route.post('/reset-password',  postMiddleware, resetPasswordMiddleware, postResetPassword);

// Avis — lecture publique
route.get('/avis',     getMiddleware, getReviewsMiddleware,    getAvis);
route.get('/avis/:id', getMiddleware, getReviewsByIdMiddleware, getAvisById);

// Avis — soumission (auth optionnelle, rate limitée)
route.post('/avis', createAvisLimiter, authOptional, reviewMiddleware, postAvis);

// ── Routes protégées (JWT obligatoire) ─────────────────────────────────────────
route.get('/me',                     authMiddleware, getMe);
route.post('/change-password',       authMiddleware, postChangePassword);
route.put('/avis/:id',               authMiddleware, putMiddleware,   putAvis);
route.put('/authorize/avis/:id',     authMiddleware, putAuthorizeAvis);
route.delete('/avis/:id',            authMiddleware, deleteMiddleware, deleteAvis);

module.exports = route;
