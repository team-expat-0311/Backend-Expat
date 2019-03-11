module.exports = role => {
    return function (req, res, next) {
        if (req.decodedJwt.roles && req.docudedJwt.roles.includes(role)) {
            next();
        } else {
            res.status(403).json({ message: 'You do not have the right type of role to access this resource' });
        }
    }
}