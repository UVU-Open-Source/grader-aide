const axios = require('axios')

const { pluckData } = require('./core.api')

// NOTE courseID is hardcoded for now but using a global variable to make refactoring more clear in the future
const BASE_URL = 'https://uvu.instructure.com/api/v1'

module.exports = {
  // returns a course formatted to be added to our database
  findCourseById(authToken, courseId) {
    const http = createAxiosInstance(authToken)

    return http
      .get(`/courses/${courseId}`)
      .then(pluckData)
      .then(({ id: canvasId, name }) => ({ canvasId, name, zyLink: '' }))
  },

  getStudentsInCourse(authToken, courseId) {
    const http = createAxiosInstance(authToken)

    return http
      .get(`/courses/${courseId}/users?enrollment_type=student&per_page=100`)
      .then(pluckData)
  },

  getActiveCourses(authToken) {
    const http = createAxiosInstance(authToken)

    return http
      .get('/courses?enrollment_state=active&enrollment_type=teacher')
      .then(pluckData)
  },

  getCourseAssignments(authToken, courseId) {
    const http = createAxiosInstance(authToken)

    return http
      .get(`/courses/${courseId}/assignments?per_page=100`)
      .then(pluckData)
  },

  submitZybooksGradesToCanvas(authToken, courseId, assignmentId, chapterNum, students) {
    const chapterIndex = chapterNum - 1

    const http = createAxiosInstance(authToken)

    return http
      .get(`/courses/${courseId}/assignments/${assignmentId}`)
      .then(({ data: { points_possible } }) => createStudentGradeDict(chapterIndex, points_possible, students))
      .then(dict => (
        http.post(`/courses/${courseId}/assignments/${assignmentId}/submissions/update_grades`, dict)
      ))
      .then(response => {
        if(response.data.errors) throw new Error('unable to fulfill request')
      })
  },

  checkIfTokenIsValid(token) {
    if(!token) return Promise.resolve({ token: '', error: '' }) // no token exists

    const http = createAxiosInstance(token)

    return http
      .get('/courses')
      .then(pluckData)
      .then(data => ({ token, error: '' }))
  }
}

// ==================================================
// helper functions
// ==================================================
// mult/divide by 10 gives 1 decimal. Makes lower point value assignments more accurate
const formatScoresForCanvas = (rawScore, ptsPossible) => Math.round(rawScore * ptsPossible * 10) / 10

// this formats the data in a way that the canvas api expects
function createStudentGradeDict(chapterIndex, ptsPossible, students) {
  return students.reduce((dict, student) => {
    dict.grade_data[student.canvasId] = {
      posted_grade: formatScoresForCanvas(student.zybooksGrades[chapterIndex], ptsPossible)
    }

    return dict
  }, { grade_data: {} })
}

function createAxiosInstance(authToken) {
  return axios.default.create({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json+canvas-string-ids',
      Authorization: `Bearer ${authToken}`
    }
  })
}
