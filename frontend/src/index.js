require('dotenv').config();
const express      = require('express');
const cookieParser = require('cookie-parser');
const path         = require('path');

const { setLocals } = require('./middleware/locals');
const authRoutes    = require('./routes/auth');
const avisRoutes    = require('./routes/avis');
const profileRoutes = require('./routes/profile');
const adminRoutes   = require('./routes/admin');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Moteur de templates ────────────────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// ── Middleware globaux ─────────────────────────────────────────────────────────
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Injecte user + token dans res.locals pour tous les templates
app.use(setLocals);

// ── Routes ────────────────────────────────────────────────────────────────────
app.use('/', authRoutes);
app.use('/', avisRoutes);
app.use('/', profileRoutes);
app.use('/', adminRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
    res.status(404).render('404');
});

// ── Démarrage ─────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Frontend lancé sur http://localhost:${PORT}`);
});
