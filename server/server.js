const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

// utils
const addZybooksGradesToStudentWithToken = require('./utils/addZybooksGradesToStudent')
const canvasApi = require('./utils/canvas.api')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(logger('dev'))

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/api/v1/grade/zybooks/chapter/:chapterNum', (req, res) => {
  // @ts-ignore
  const students = require('./students.json')

  const { chapterNum } = req.params
  const cToken = req.get('cToken')
  const zyToken = req.get('zyToken')

  const addZybooksGradesToStudent = addZybooksGradesToStudentWithToken(zyToken)
  const PromiseGradesForStudents = students.map(addZybooksGradesToStudent)

  let gradedStudents
  Promise.all(PromiseGradesForStudents)
    .then(modifiedStudents => gradedStudents = modifiedStudents)
    .then(() => canvasApi.findAssignmentId(cToken, `ch${chapterNum}`))
    .then(assignmentId => canvasApi.submitZybooksGradesToCanvas(cToken, assignmentId, chapterNum, gradedStudents))
    .then(() => res.json({ success: true }))
    .catch(e => {
      res.status(500).end()
    })
})

app.post('/api/v1/authenticate/zybooks', () => {
  
})

app.post('/api/v1/authenticate/canvas', (req, res) => {
  canvasApi
    .checkIfTokenIsValid(req.body.token)
    .then(res.json.bind(res))
    .catch(e => {
      if(e.response && e.response.status === 401) return res.json({ token: '', error: 'Invalid or expired Canvas Token'})

      res.status(500).end()
    })
})

app.get('*', express.static(`${__dirname}/../client/dist`))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
