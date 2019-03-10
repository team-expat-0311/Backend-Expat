const db = require('../data/dbConfig.js');

module.exports = {
    add,
    findById,
    findBy,
}

async function add(user) {
    const [id] = await db('users').insert(user);

    return findById(id);
}

function findById(id) {
    return db('users')
        .select('id', 'username', 'name', 'role', 'age', 'location')
        .where({ id } ).first();
}

function findBy(filter) {
    return db('users').where(filter)
}