const jwt = require('jsonwebtoken');

module.exports = {
    generateToken
}

const secret = process.JWT_SECRET || 'the secret it out';

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
    }

    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(payload, secret, options);
}