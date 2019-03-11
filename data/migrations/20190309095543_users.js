exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl
            .string('username', 128)
            .notNullable()
            .unique();
        tbl.string('password', 128).notNullable();
        tbl.string('name', 128).notNullable();
        tbl.string('role', 128).notNullable();
        tbl.integer('age').unsigned()
        tbl.string('location', 256)
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
        tbl.timestamp('updated_at').defaultTo(knex.fn.now())
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
