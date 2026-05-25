const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const authheader = req.headers.authorization;

    if (!authheader || !authheader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const token = authheader.split(' ')[1];

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    }
    catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}

module.exports = authMiddleware;  