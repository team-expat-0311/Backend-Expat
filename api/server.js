const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('../auth/authRouter.js');
const photosRouter = require('../photos/photosRouter.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/photos', photosRouter);


server.get('/', (req, res) => {
    res.send('It\'s Working!');
});





module.exports = server;
