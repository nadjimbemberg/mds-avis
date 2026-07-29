const { isValidEmail, isValidRating } = require('../lib/validate');
const { censurer } = require('../lib/moderation');

module.exports = (req, res, next) => {
  const { author, email, rating, description } = req.body;

  if (!author || !email || !rating || !description) {
    return res.status(400).json({ error: 'Champs requis : author, email, rating, description' });
  }

  if (typeof author !== 'string' || author.trim().length < 2) {
    return res.status(400).json({ error: "Le nom de l'auteur doit faire au moins 2 caractères" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Format email invalide' });
  }

  if (!isValidRating(rating)) {
    return res.status(400).json({ error: 'La note (rating) doit être un entier entre 1 et 5' });
  }

  if (typeof description !== 'string' || description.trim().length < 10) {
    return res.status(400).json({ error: 'La description doit faire au moins 10 caractères' });
  }

  req.body.author      = censurer(author.trim());
  req.body.description = censurer(description.trim());

  next();
};
