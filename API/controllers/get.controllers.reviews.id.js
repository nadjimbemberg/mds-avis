const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) return res.status(400).json({ error: 'ID invalide' });

  try {
    const review = await prisma.review.findUnique({
      where: { id },
      select: {
        id: true, author: true, rating: true, description: true,
        authorized: true, userId: true, createdAt: true,
        user: { select: { id: true, username: true } },
      },
    });

    if (!review) return res.status(404).json({ error: 'Avis non trouvé' });

    res.json(review);
  } catch (error) {
    console.error('Erreur GET /avis/:id :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
