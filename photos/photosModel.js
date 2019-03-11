const db = require('../data/dbConfig.js')

module.exports = {
    getAllPhotos,
    getPhotosByUserId
}

function getAllPhotos() {
    return db('photos')
}

function getPhotosByUserId(id) {
    return db('photos')
        .where({ user_id: id })
}