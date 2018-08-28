const R = require('ramda')

const knex = require('../../db/knex')

module.exports = {
  findCourseByCanvasId(canvasId) {
    return knex('courses')
      .select()
      .where('canvasId', canvasId)
      .then(R.head)
  }
}