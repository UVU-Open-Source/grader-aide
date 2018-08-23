const R = require('ramda')

const knex = require('../../db/knex')

module.exports = {
  addCourse(course) {
    return knex('courses')
      .insert(course)
      .returning('*')
      .then(R.head)
  }
}