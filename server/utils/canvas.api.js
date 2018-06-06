const axios = require('axios')

const { pluckData } = require('./core.api')

// NOTE courseID is hardcoded for now but using a global variable to make refactoring more clear in the future
const COURSE_ID = '10120000000466507'
const BASE_URL = 'https://canvas.instructure.com/api/v1'
module.exports = {
  findAssignmentId(authToken, searchTerm) {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      },
      // custom transformer was used because of number errors that occur with canvas id's
      // this transformer function maintains the response as a string unless there was an error
      // no results. If results were found, they first id is returned as a string
      transformResponse: res => {
        const idField = res.match(/"id":\d*/g) // '"id":123456'

        if(idField) return idField[0].split(':')[1] // ['"id"', '123456']

        return {
          ...res,
          data: JSON.parse(res)
        }
      }
    }

    return axios.default
      .get(`${BASE_URL}/courses/${COURSE_ID}/assignments?search_term=${searchTerm}`, config)
      .then(response => {
        if(response.data.errors) throw new Error('unable to fulfill findAssignmentId request')
        if(!response.data.length) throw new Error(`assignment ${searchTerm} was not found`)

        return response.data
      })
  },

  submitZybooksGradesToCanvas(authToken, assignmentId, chapterNum, students) {
    const chapterIndex = chapterNum - 1
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }

    const data = createStudentGradeDict(chapterIndex, students)

    // return {data, assignmentId}
    return axios.default
      .post(`${BASE_URL}/courses/${COURSE_ID}/assignments/${assignmentId}/submissions/update_grades`, data, config)
      .then(response => {
        if(response.data.errors) throw new Error('unable to fulfill findAssignmentId request')
      })
  },

  checkIfTokenIsValid(token) {
    if(!token) return Promise.resolve({ token: '', error: '' }) // no token exists

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    return axios.default
      .get('https://uvu.instructure.com/api/v1/courses', config)
      .then(pluckData)
      .then(data => ({ token, error: '' }))
  }
}

// ==================================================
// helper functions
// ==================================================
// this formats the data in a way that the canvas api expects
function createStudentGradeDict(chapterIndex, students) {
  return students.reduce((dict, student) => {
    dict.grade_data[student.canvasId] = {
      posted_grade: student.zybooksGrades[chapterIndex]
    }

    return dict
  }, { grade_data: {} })
}
