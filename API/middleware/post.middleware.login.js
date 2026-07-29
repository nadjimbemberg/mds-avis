const { isValidEmail } = require('../lib/validate');

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email et mot de passe requis' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Format email invalide' });
  }

  next();
};
