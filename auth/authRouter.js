const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenService = require('./token-service.js');
const Users = require('../users/usersModel.js');

// routes here all have /api/auth prefix from server.js

router.post('/register', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password || !req.body.role || !req.body.name) {
            res.status(404).json({ message: 'Please provide at least username, password, role, name for a new user' });
        } else {
            let user = req.body;
            // generate hashed pw with 8 rounds
            const hash = bcrypt.hashSync(user.password, 8);
            // override the pw with the hashed pw
            user.password = hash;
            // add user to the db
            const newUser = await Users.add(user)
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({ error, message: `The username ${req.body.username} already exists, please choose another username` });
    }
});

router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;

        const user = await Users.findBy({ username }).first();
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = tokenService.generateToken(user);
            // return the token to be saved in front-end for future requests
            res.status(200).json({
                message: `Welcome ${user.username}!, here's your token`,
                token,
                role: token.role
            })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router;