const axios = require('axios')
const R = require('ramda')

const { pluckData } = require('./core.api')

// NOTE courseID is hardcoded for now but using a global variable to make refactoring more clear in the future
const COURSE_ID = '10120000000466507'
const BASE_URL = 'https://uvu.instructure.com/api/v1'

module.exports = {
  // returns a course formatted to be added to our database
  findCourseById(authToken, courseId) {
    const config = {
      headers: {
        Accept: 'application/json+canvas-string-ids',
        Authorization: `Bearer ${authToken}`
      }
    }

    return axios.default
      .get(`${BASE_URL}/courses/${courseId}`, config)
      .then(pluckData)
      .then(({ id: canvasId, name }) => ({ canvasId, name, zyLink: '' }))
  },

  getStudentsInCourse(authToken, courseId) {
    const http = createAxiosInstance(authToken)

    return http.get(`/courses/${courseId}/users?enrollment_type=student&per_page=100`)
      .then(pluckData)
  },

  getActiveCourses(authToken) {
    const http = createAxiosInstance(authToken)

    return http.get('/courses?enrollment_state=active&enrollment_type=teacher')
      .then(pluckData)
  },

  getCourseAssignments(authToken, courseId) {
    const http = createAxiosInstance(authToken)

    return http.get(`/courses/${courseId}/assignments?per_page=100`)
      .then(pluckData)
  },

  submitZybooksGradesToCanvas(authToken, assignmentId, chapterNum, students) {
    const chapterIndex = chapterNum - 1

    const http = createAxiosInstance(authToken)

    const data = createStudentGradeDict(chapterIndex, students)
return data
    // return http
    //   .post(`/courses/${COURSE_ID}/assignments/${assignmentId}/submissions/update_grades`, data)
    //   .then(response => {
    //     if(response.data.errors) throw new Error('unable to fulfill request')
    //   })
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

function createAxiosInstance(authToken) {
  return axios.default.create({
    baseURL: BASE_URL,
    headers: {
      Accept: 'application/json+canvas-string-ids',
      Authorization: `Bearer ${authToken}`
    }
  })
}
