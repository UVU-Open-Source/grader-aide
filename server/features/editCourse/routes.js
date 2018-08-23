const router = require('express').Router()

const queries = require('./queries')
const canvasApi = require('../../utils/canvas.api')

// query canvas for a course
router.get('/canvas/course/:courseId', (req, res) => {
  const cToken = req.get('cToken')
  const { courseId } = req.params

  canvasApi.findCourseById(cToken, courseId)
    .then(res.json.bind(res))
    .catch(e => {
      res.status(500).end()
    })
})

router.post('/course/register', (req, res) => {
  const { students, ...course } = req.body

  // zyLink required to before you can register class
  if (!course.zyLink) res.status(400).json({ error: `zybooks is required to register a class` })

  queries.addCourse(course).then(res.json.bind(res))
})

module.exports = router
