// Middleware commun aux routes GET publiques
// Ajoute les en-têtes API et désactive le cache navigateur
module.exports = (req, res, next) => {
    res.set('X-Api-Version', '1.0.0');
    res.set('Cache-Control', 'no-store');
    next();
};
