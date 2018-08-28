const router = require('express').Router()
const R = require('ramda')
var removeDiacritics = require('diacritics').remove;

const queries = require('./queries')
const canvasApi = require('../../utils/canvas.api')
const zybooksApi = require('../../utils/zybooks.api')

// query canvas for a course
router.get('/canvas/courses/:courseId', (req, res) => {
  const cToken = req.get('cToken')
  const { courseId } = req.params

  canvasApi.findCourseById(cToken, courseId)
    .then(res.json.bind(res))
    .catch(e => {
      res.status(500).end()
    })
})

router.post('/courses/register', (req, res) => {
  const { students, ...course } = req.body

  // zyLink required to before you can register class
  if (!course.zyLink) res.status(400).json({ error: `zybooks is required to register a class` })

  queries.addCourse(course)
    .then(res.json.bind(res))
    .catch(e => {
      res.status(500).end()
    })
})

router.get('/courses/unregistered', (req, res) => {
  const cToken = req.get('cToken')

  canvasApi.getActiveCourses(cToken)
    .then(courses => {
      const cIds = R.pluck('id', courses)

      return Promise.all([
        courses,
        queries.findRegisteredCourses(cIds)
      ])
    })
    .then(([active, registered]) => R.differenceWith((a, r) => a.id === r.canvasId, active, registered))
    .then(res.json.bind(res))
    .catch(e => {
      res.status(500).end()
    })
})

router.get('/courses/registered', (req, res) => {
  const cToken = req.get('cToken')

  canvasApi.getActiveCourses(cToken)
    .then(courses => {
      const cIds = R.pluck('id', courses)

      return queries.findRegisteredCourses(cIds)
    })
    .then(res.json.bind(res))
    .catch(e => {
      res.status(500).end()
    })
})

module.exports = router
