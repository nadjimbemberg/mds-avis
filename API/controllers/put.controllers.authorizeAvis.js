const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

  try {
    const review = await prisma.review.findUnique({ where: { id } });
    if (!review) return res.status(404).json({ error: 'Avis non trouvé' });

    if (review.authorized) {
      return res.status(400).json({ error: 'Cet avis est déjà autorisé' });
    }

    const updated = await prisma.review.update({
      where: { id },
      data: { authorized: true },
    });

    res.json({ message: 'Avis autorisé avec succès', review: updated });
  } catch (error) {
    console.error('Erreur PUT /authorize/avis/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
