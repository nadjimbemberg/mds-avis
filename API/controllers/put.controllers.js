const prisma = require('../lib/prisma');
const { isValidRating } = require('../lib/validate');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

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

  try {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ error: 'Avis non trouvé' });

    if (review.userId !== req.user.id) {
      return res.status(403).json({ error: 'Vous ne pouvez modifier que vos propres avis' });
    }

    const data = { authorized: false }; // repasse en attente de validation
    if (rating)      data.rating      = parseInt(rating);
    if (description) data.description = description.trim();

    const updated = await prisma.review.update({ where: { id }, data });
    res.json({ message: 'Avis modifié, en attente de re-validation', review: updated });
  } catch (error) {
    console.error('Erreur PUT /avis/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
