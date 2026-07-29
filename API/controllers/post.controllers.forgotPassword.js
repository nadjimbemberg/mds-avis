const prisma = require('../lib/prisma');
const { hashPassword } = require('../lib/argon2');
const { sendResetPasswordEmail } = require('../lib/mailer');
const { isValidEmail } = require('../lib/validate');
const crypto = require('node:crypto');

module.exports = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: 'Email requis' });
  if (!isValidEmail(email)) return res.status(400).json({ error: 'Format email invalide' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    // Réponse identique qu'il existe ou non (anti-énumération)
    if (!user) {
      return res.json({ message: "Si cet email existe, un lien de réinitialisation vous a été envoyé" });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = await hashPassword(resetToken);
    const resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { resetTokenHash, resetTokenExpiry },
    });

    await sendResetPasswordEmail(email, resetToken);

    res.json({ message: "Si cet email existe, un lien de réinitialisation vous a été envoyé" });
  } catch (error) {
    console.error('Erreur POST /forgot-password :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
