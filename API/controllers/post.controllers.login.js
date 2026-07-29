const prisma = require('../lib/prisma');
const { verifyPassword } = require('../lib/argon2');
const { signToken } = require('../lib/jwt');

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await verifyPassword(user.passwordHash, password))) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }

    const token = signToken({ id: user.id, email: user.email, username: user.username });

    res.json({
      message: 'Connexion réussie',
      token,
      user: { id: user.id, email: user.email, username: user.username },
    });
  } catch (error) {
    console.error('Erreur POST /login :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
