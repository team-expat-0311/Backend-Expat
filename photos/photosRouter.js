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

// *** THESE ROUTES ARE PROTECTED AND REQUIRE A JWT AND THE CORRECT ROLE TO ACCESS/MODIFY THE PHOTOS

// get photos by user_id.  If a user is an expat they'll have access to the endpoint where they can see all of their photos.  From this page, they can perform CRUD operations on their photos.
router.get('/all/:id', restricted, checkRole('expat'), async (req, res) => {
    try {
        const photos = await Photos.getPhotosByUserId(req.params.id)
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json(error);
    }
})

// add a photo to the db

router.post('/all/:id', restricted, checkRole('expat'), async (req, res) => {
    try {
        const { location, img_url } = req.body;
        req.body.user_id = req.params.id;
        if (!req.body.user_id || !location || !img_url) {
            res.status(400).json({ message: 'Please provide the user_id, location, and img_url for this photo' });
        } else {
            const photo = req.body
            const newPhoto = await Photos.addPhoto(photo);
            res.status(201).json(newPhoto);
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete('/all/:photoId', restricted, checkRole('expat'), async (req, res) => {
    try {
        const count = await Photos.removePhotoById(req.params.photoId);
        console.log(count);
        if (count > 0) {
            res.status(204).end()
        } else {
            res.status(404).json({ message: `A photo with id ${req.params.photoId} could not be found.` });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put('/all/:photoId', async (req, res) => {
    const photoId = req.params.photoId;
    const updatedPhoto = req.body;

    if (!updatedPhoto.location || !updatedPhoto.img_url) {
        res.status(400).json({ message: 'Please provide a location and img_url for the photo' });
    } else {
        try {
            const count = await Photos.updatePhoto(photoId, updatedPhoto)
            console.log(count);
            if (count) {
                const photo = await Photos.findPhotoById(photoId)
                res.status(200).json(photo)
            } else {
                res.status(404).json({ message: `The photo with id of ${photoId} does not exist.` });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
});



module.exports = router;