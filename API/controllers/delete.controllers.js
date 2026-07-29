const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

  try {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ error: 'Avis non trouvé' });

    if (review.userId !== req.user.id) {
      return res.status(403).json({ error: 'Vous ne pouvez supprimer que vos propres avis' });
    }

    await prisma.review.delete({ where: { id } });
    res.status(204).end();
  } catch (error) {
    console.error('Erreur DELETE /avis/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
