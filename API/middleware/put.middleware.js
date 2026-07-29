const { isValidRating } = require('../lib/validate');
const { censurer } = require('../lib/moderation');

module.exports = (req, res, next) => {
    const { rating, description } = req.body;

    if (!rating && !description) {
        return res.status(400).json({ error: 'Au moins un champ requis : rating ou description' });
    }

    if (rating && !isValidRating(rating)) {
        return res.status(400).json({ error: 'La note doit être entre 1 et 5' });
    }

    if (description && description.trim().length < 10) {
        return res.status(400).json({ error: 'La description doit faire au moins 10 caractères' });
    }

    if (description) {
        req.body.description = censurer(description.trim());
    }

    next();
};
