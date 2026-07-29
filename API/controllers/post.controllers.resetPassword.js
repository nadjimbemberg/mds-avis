const prisma = require('../lib/prisma');
const { verifyPassword, hashPassword } = require('../lib/argon2');
const { sendPasswordChangedEmail } = require('../lib/mailer');
const { isStrongPassword } = require('../lib/validate');

module.exports = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token et nouveau mot de passe requis' });
  }

  if (!isStrongPassword(newPassword)) {
    return res.status(400).json({
      error: 'Mot de passe trop faible : minimum 8 caractères, 1 majuscule et 1 chiffre',
    });
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        resetTokenHash: { not: null },
        resetTokenExpiry: { gt: new Date() },
      },
    });

    let matchedUser = null;
    for (const u of users) {
      if (await verifyPassword(u.resetTokenHash, token)) {
        matchedUser = u;
        break;
      }
    }

    if (!matchedUser) return res.status(400).json({ error: 'Token invalide ou expiré' });

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: matchedUser.id },
      data: { passwordHash, resetTokenHash: null, resetTokenExpiry: null },
    });

    await sendPasswordChangedEmail(matchedUser.email);
    res.json({ message: 'Mot de passe réinitialisé avec succès' });
  } catch (error) {
    console.error('Erreur POST /reset-password :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
