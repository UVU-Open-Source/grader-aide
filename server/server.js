const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// utils
const addZybooksGradesToStudentWithToken = require('./utils/addZybooksGradeToStudent')

const app = express()

app.use(cors())
app.use(bodyParser.json())

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

  Promise.all(PromiseGradesForStudents)
    .then((gradedStudents) => {

      res.json({ gradedStudents, chapterNum, cToken, zyToken })
    })
    .catch(e => res.status(500))
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
