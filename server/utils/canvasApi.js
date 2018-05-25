const axios = require('axios')
const https = require('https')

// NOTE courseID is hardcoded for now but using a global variable to make refactoring more clear in the future
const COURSE_ID = '10120000000466507'
const BASE_URL = 'https://canvas.instructure.com/api/v1'
module.exports = {
  // fixme BROKEN sometimes returns wrong id for an assignment when querying canvas.
  findAssignmentId(authToken, searchTerm) {
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    }

    return axios.default
      .get(`${BASE_URL}/courses/${COURSE_ID}/assignments?search_term=${searchTerm}`, config)
      .then(response => {
        if(response.data.errors) throw new Error('unable to fulfill findAssignmentId request')
        if(!response.data.length) throw new Error(`assignment ${searchTerm} was not found`)

        return response.data[0].id
      })
  },

  // fixme assignmentId needs to be used instead of hardcoded once findAssignmentId func is fixed
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
      .post(`${BASE_URL}/courses/${COURSE_ID}/assignments/10120000003858835/submissions/update_grades`, data, config)
      .then(response => {
        if(response.data.errors) throw new Error('unable to fulfill findAssignmentId request')

        return
      })
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