module.exports = role => {
    return function (req, res, next) {
        console.log('decoded token', req.decodedJwt);
        if (req.decodedJwt.role && req.decodedJwt.role.includes(role)) {
            next();
        } else {
            res.status(403).json({ message: 'You do not have the right type of role to access this resource' });
        }
    }
}