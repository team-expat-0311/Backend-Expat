const db = require('../data/dbConfig.js')

module.exports = {
    getAllPhotos,
    getPhotosByUserId,
    addPhoto,
    findPhotoById,
    removePhotoById,
    updatePhoto
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

    return findPhotoById(id);
}

function findPhotoById(id) {
    return db('photos')
        .where({ id })
        .first();
}

function removePhotoById(id) {
    return db('photos')
        .where({ id })
        .del();
}

function updatePhoto(id, changes) {
    changes = {
        ...changes,
        updated_at: new Date(Date.now()).toISOString()
    }
    return db('photos')
        .where({ id })
        .update(changes, 'id');
}