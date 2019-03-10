const db = require('../data/dbConfig.js')

module.exports = {
    getAllPhotos
}

function getAllPhotos() {
    return db('photos')
}