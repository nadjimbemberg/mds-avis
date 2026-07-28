const requireAuth = (req, res, next) => {
    if (!req.cookies.token) {
        return res.redirect(`/login?returnTo=${encodeURIComponent(req.originalUrl)}`);
    }
    next();
};

module.exports = { requireAuth };
