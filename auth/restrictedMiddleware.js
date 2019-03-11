const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'the secret is out'

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        // is it valid
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                // record the event
                res.status(401).json({ message: 'Modifying my token are you? '})
            } else {
                req.decodedJwt = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'You need a token to acccess this resource' });
    }
}