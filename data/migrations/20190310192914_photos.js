exports.up = function(knex, Promise) {
    return knex.schema.createTable('photos', tbl => {
        tbl.increments();
        tbl
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.string('location', 128).notNullable()
        tbl.text('description')
        tbl.string('img_url', 256).notNullable()
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
		tbl.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('photos');
};
