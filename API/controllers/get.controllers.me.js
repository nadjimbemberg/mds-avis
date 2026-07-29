const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, email: true, username: true, isVerified: true, createdAt: true },
    });

    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    res.json(user);
  } catch (error) {
    console.error('Erreur GET /me :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
