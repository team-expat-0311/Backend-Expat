const router = require('express').Router();
const bcrypt = require('bcryptjs');
const tokenService = require('./token-service.js');
const Users = require('../users/usersModel.js');

// routes here all have /api/auth prefix from server.js

router.post('/register', async (req, res) => {
    try {
        let user = req.body;
        // generate hashed pw with 8 rounds
        const hash = bcrypt.hashSync(user.password, 8);
        // override the pw with the hashed pw
        user.password = hash;
        // add user to the db
        const newUser = await Users.add(user)
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json(error);
    }
});




module.exports = router;