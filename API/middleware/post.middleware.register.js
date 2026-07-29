const { isValidEmail, isStrongPassword } = require('../lib/validate');

module.exports = (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Champs requis : email, password, username' });
  }

  if (typeof username !== 'string' || username.trim().length < 2) {
    return res.status(400).json({ error: "Le nom d'utilisateur doit faire au moins 2 caractères" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Format email invalide' });
  }

  if (!isStrongPassword(password)) {
    return res.status(400).json({
      error: 'Mot de passe trop faible : minimum 8 caractères, 1 majuscule et 1 chiffre requis',
    });
  }

  next();
};
