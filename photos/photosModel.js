const db = require('../data/dbConfig.js')

module.exports = {
    getAllPhotos,
    getPhotosByUserId,
    addPhoto,
    findPhotoById
}

function getAllPhotos() {
    return db('photos')
}

function getPhotosByUserId(id) {
    return db('photos')
        .where({ user_id: id })
}

async function addPhoto(photo) {
    const [id] = await db('photos').insert(photo, 'id');
    console.log(id);

    return findPhotoById(id);
}

function findPhotoById(id) {
    return db('photos')
        .where({ id })
        .first();
}