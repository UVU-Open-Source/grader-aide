
exports.up = function(knex, Promise) {
  return knex.schema.createTable('courses', (table) => {
    table.increments()
    table.string('canvasId').notNullable()
    table.string('name').notNullable()
    table.string('zyLink').defaultTo('')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('courses')
};
