const prisma = require('../lib/prisma');
const { verifyPassword, hashPassword } = require('../lib/argon2');
const { isStrongPassword } = require('../lib/validate');

module.exports = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ error: 'Ancien et nouveau mot de passe requis' });
  }

  if (!isStrongPassword(newPassword)) {
    return res.status(400).json({
      error: 'Nouveau mot de passe trop faible : minimum 8 caractères, 1 majuscule et 1 chiffre',
    });
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({ error: "Le nouveau mot de passe doit être différent de l'ancien" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    if (!(await verifyPassword(user.passwordHash, oldPassword))) {
      return res.status(401).json({ error: 'Ancien mot de passe incorrect' });
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({ where: { id: req.user.id }, data: { passwordHash } });

    res.json({ message: 'Mot de passe modifié avec succès' });
  } catch (error) {
    console.error('Erreur POST /change-password :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
