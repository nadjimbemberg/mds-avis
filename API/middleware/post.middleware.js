// Validation du Content-Type pour toutes les routes POST/PUT
// Refuse les requêtes dont le corps n'est pas du JSON
module.exports = (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    if (!contentType.includes('application/json')) {
        return res.status(415).json({
            error: 'Content-Type non supporté — utilisez application/json',
        });
    }
    next();
};
