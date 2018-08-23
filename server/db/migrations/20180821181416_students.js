
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', (table) => {
    table.increments()
    table.string('name').defaultTo('')
    table.string('canvasId').defaultTo('')
    table.string('zybooksd').defaultTo('')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('students')
};
