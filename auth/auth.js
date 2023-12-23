const jwt = require('jsonwebtoken');

function authToken(req, res, next) {
    try {
        let headerToken = req.headers['authorization'];
        let condition = headerToken && headerToken.split(' ')[1];
        if (!condition) {
            return res.status(401).json({ msg: "Access denied." })
        }
        const secret = process.env.SECRET;
        jwt.verify(headerToken.split(' ')[1], secret);
        next();
    } catch (err) {
        res.status(401).json({ msg: err })
    }

}

module.exports = { authToken };