const router = require('express').Router();
const Photos = require('./photosModel.js');
const jwt = require('jsonwebtoken');
const restricted = require('../auth/restrictedMiddleware.js');
const checkRole = require('../auth/checkRoleMiddleware.js');

// *** routes here all have /api/photos prefix from server.js ***

// get all photos for the main page (for any user either expat or viewer)
router.get('/all', async (req, res) => {
    try {
        const photos = await Photos.getAllPhotos();
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json(error);
    }
});

// get photos by user_id.  If a user is an expat they'll have access to the endpoint where they can see all of their photos.  From this page, they can perform CRUD operations on their photos.
router.get('/all/:id', restricted, checkRole('expat'), async (req, res) => {
    try {
        const photos = await Photos.getPhotosByUserId(req.params.id)
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router;