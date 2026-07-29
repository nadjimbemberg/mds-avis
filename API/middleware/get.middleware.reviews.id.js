// Validation de l'identifiant pour GET /avis/:id
module.exports = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'L\'identifiant doit être un entier positif' });
    }
    next();
};
