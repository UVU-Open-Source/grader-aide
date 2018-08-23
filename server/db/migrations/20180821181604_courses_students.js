
exports.up = function(knex, Promise) {
  return knex.schema.createTable('courses_students', (table) => {
    table.increments()
    table.integer('courseId').unsigned()
    table.foreign('courseId').references('courses.id')
    table.integer('studentId').unsigned()
    table.foreign('studentId').references('students.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('courses_students')
};
