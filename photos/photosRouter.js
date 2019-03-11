const router = require('express').Router();
const Photos = require('./photosModel.js');
const jwt = require('jsonwebtoken');
const restricted = require('../auth/restrictedMiddleware.js');
const checkRole = require('../auth/checkRoleMiddleware.js');

// *** routes here all have /api/photos prefix from server.js ***

router.get('/all', async (req, res) => {
    try {
        const photos = await Photos.getAllPhotos();
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/all/:id', restricted, async (req, res) => {
    try {
        const photos = await Photos.getPhotosByUserId(req.params.id)
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;