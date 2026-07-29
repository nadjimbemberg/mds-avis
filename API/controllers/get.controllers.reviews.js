const prisma = require('../lib/prisma');

module.exports = async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page)  || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const skip  = (page - 1) * limit;

    const where = {};

    if (req.query.authorized === 'true')  where.authorized = true;
    if (req.query.authorized === 'false') where.authorized = false;

    if (req.query.rating) {
      const r = parseInt(req.query.rating);
      if (!isNaN(r) && r >= 1 && r <= 5) where.rating = r;
    }

    if (req.query.search) {
      where.OR = [
        { author:      { contains: req.query.search, mode: 'insensitive' } },
        { description: { contains: req.query.search, mode: 'insensitive' } },
      ];
    }

    const sortBy    = ['date', 'rating', 'createdAt'].includes(req.query.sortBy)
      ? req.query.sortBy : 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

    const publicFields = {
      id: true, author: true, rating: true, description: true,
      authorized: true, userId: true, createdAt: true, updatedAt: true,
      user: { select: { id: true, username: true } },
    };

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: publicFields,
      }),
      prisma.review.count({ where }),
    ]);

    res.json({
      data: reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Erreur GET /avis :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
