const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const logger = require('morgan')

// utils
const addZybooksGradesToStudentWithToken = require('./utils/addZybooksGradesToStudent')
const canvasApi = require('./utils/canvasApi')

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

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})

