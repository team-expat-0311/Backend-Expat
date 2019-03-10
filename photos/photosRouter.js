const router = require('express').Router();
const Photos = require('./photosModel.js');
const jwt = require('jsonwebtoken');

// *** routes here all have /api/photos prefix from server.js ***

router.get('/all', async (req, res) => {
    try {
        const photos = await Photos.getAllPhotos();
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;