const { isStrongPassword } = require('../lib/validate');

module.exports = (req, res, next) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token et nouveau mot de passe requis' });
    }

    if (!isStrongPassword(newPassword)) {
        return res.status(400).json({
            error: 'Mot de passe trop faible : minimum 8 caractères, 1 majuscule et 1 chiffre requis',
        });
    }

    next();
};
