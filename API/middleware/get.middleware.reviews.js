// Validation des paramètres de requête pour GET /avis
module.exports = (req, res, next) => {
    const { page, limit, rating, sortBy, sortOrder } = req.query;

    if (page !== undefined) {
        const p = parseInt(page);
        if (isNaN(p) || p < 1) {
            return res.status(400).json({ error: 'Le paramètre page doit être un entier supérieur ou égal à 1' });
        }
    }

    if (limit !== undefined) {
        const l = parseInt(limit);
        if (isNaN(l) || l < 1 || l > 50) {
            return res.status(400).json({ error: 'Le paramètre limit doit être compris entre 1 et 50' });
        }
    }

    if (rating !== undefined) {
        const r = parseInt(rating);
        if (isNaN(r) || r < 1 || r > 5) {
            return res.status(400).json({ error: 'Le paramètre rating doit être compris entre 1 et 5' });
        }
    }

    const VALID_SORT_BY = ['date', 'rating', 'createdAt'];
    if (sortBy !== undefined && !VALID_SORT_BY.includes(sortBy)) {
        return res.status(400).json({ error: `Le paramètre sortBy accepte : ${VALID_SORT_BY.join(', ')}` });
    }

    if (sortOrder !== undefined && !['asc', 'desc'].includes(sortOrder)) {
        return res.status(400).json({ error: 'Le paramètre sortOrder doit être asc ou desc' });
    }

    next();
};
