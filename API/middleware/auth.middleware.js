const { verifyToken } = require('../lib/jwt');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token manquant ou mal formé (format attendu : Bearer <token>)' });
  }

  const token = authHeader.split(' ')[1];

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré, veuillez vous reconnecter' });
    }
    return res.status(401).json({ error: 'Token invalide' });
  }
};
