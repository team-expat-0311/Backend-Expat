const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  return knex('users')
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'tokyoMan123',
          password: bcrypt.hashSync('password', 8),
          name: 'dan',
          role: 'expat',
          age: 31,
          location: 'tokyo'
        },
        {
          username: 'tahoeGal123',
          password: bcrypt.hashSync('password', 8),
          name: 'marissa',
          role: 'expat',
          age: 28,
          location: 'tahoe'
        },
      ]);
    });
};