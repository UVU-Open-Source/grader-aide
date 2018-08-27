const R = require('ramda')

const knex = require('../../db/knex')

module.exports = {
  addCourse(course) {
    return knex('courses')
      .insert(course)
      .returning('*')
      .then(R.head)
  },

  findRegisteredCourses(cIds) {
    return knex('courses')
      .select()
      .whereIn('canvasId', cIds)
  }
}