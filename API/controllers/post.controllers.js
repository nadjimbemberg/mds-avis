const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
  const { author, email, rating, description } = req.body;

  try {
    const userId = req.user ? req.user.id : null;

    const newReview = await prisma.review.create({
      data: {
        author:      author.trim(),
        email:       email.trim().toLowerCase(),
        rating:      parseInt(rating),
        description: description.trim(),
        authorized:  false,
        ...(userId && { userId }),
      },
    });

    res.status(201).json({
      message: 'Avis soumis avec succès, en attente de validation',
      review: newReview,
    });
  } catch (error) {
    console.error('Erreur POST /add/avis :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
