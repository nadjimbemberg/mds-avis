// Décode le payload JWT sans vérifier la signature (pour l'affichage UI uniquement)
const decodeJwt = (token) => {
    if (!token) return null;
    try {
        const payload = token.split('.')[1];
        return JSON.parse(Buffer.from(payload, 'base64url').toString());
    } catch {
        return null;
    }
};

const setLocals = (req, res, next) => {
    const token    = req.cookies.token || null;
    res.locals.user  = decodeJwt(token);
    res.locals.token = token;
    next();
};

module.exports = { setLocals, decodeJwt };
