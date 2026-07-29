const prisma = require('../lib/prisma');
const { hashPassword } = require('../lib/argon2');

module.exports = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'Impossible de créer ce compte' });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email: email.trim().toLowerCase(), username: username.trim(), passwordHash },
      select: { id: true, email: true, username: true, createdAt: true },
    });

    res.status(201).json({ message: 'Compte créé avec succès', user });
  } catch (error) {
    console.error('Erreur POST /register :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
