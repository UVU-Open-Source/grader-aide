// sample request
/**
 * https://zyserver.zybooks.com/v1/zybook/UVUCS2550WagstaffSummer2018/activities/316123 <- user id
 *  ?auth_token=eyJhbGciOiJIUzI1NiIsImV4cCI6MTUyNjY4MDE3OSwiaWF0IjoxNTI2NTA3Mzc5fQ.eyJ1c2VyX2lkIjozMTczMDZ9.wtfo9bSg0kqxrGpOsD1JBRs9pVJUrFOCYyxtZj9htzs
 */
const axios = require('axios')
const axiosRetry = require('axios-retry')

const { pluckData } = require('./core.api')

const http = axios.default.create({
  baseURL: 'https://zyserver.zybooks.com/v1'
})

// @ts-ignore
axiosRetry(http, {
  retries: 6,
  retryDelay: exponentialBackoff,
  retryCondition: (error) =>{
    return (
      // @ts-ignore
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.response.status === 429
    )
  }
})

module.exports = {
  // there are two limitations to the currernt zybooks api.
  // 1) You can only an individual students grade for each chapter
  // 2) their api is now rate limited.
  // So this function and all it's helpers are a bit more complicated to try to correct for this problem.
  addZybooksGradesToStudentWithToken(authToken, zyLink) {
    return function(student, i) {
      const WAIT_AT_LEAST_HALF_A_SECOND = 500 * (i + 1)
      const ADD_UP_TO_TEN_SECOND_RANDOM_WAIT = Math.floor(Math.random() * 10000)

      const delayExecution = WAIT_AT_LEAST_HALF_A_SECOND + ADD_UP_TO_TEN_SECOND_RANDOM_WAIT

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          return http
            .get(`/${zyLink}/activities/${student.zybooksId}?auth_token=${authToken}`)
            .then(res => {
              if(res.data.error) throw new Error(res.data.error.message)

              return res.data.data
            }) // first data from axios, second from zybooks request
            .then(rawZybooksData => formatScores(student, rawZybooksData))
            .then(data => {
              return data
            })
            .then(resolve)
            .catch(reject)
        }, delayExecution)
      })
    }
  },

  getStudentsInCourse(authToken, courseLink) {
    return http
      .get(`/${courseLink}/roster?zybook_roles=["Student","Dropped"]&auth_token=${authToken}`)
      .then(pluckData)
      .then(data => data.roster.Student)
  },

  signin(email, password) {
    return http
      .post('/signin', { email, password })
      .then(pluckData)
  },

  renew(refresh_token) {
    return http
      .get(`/refresh?refresh_token=${refresh_token}`)
      .then(pluckData)
  }
}

// ==================================================
// helpers
// ==================================================
function formatScores(student, rawZybooksData) {
  student.zybooksGrades = []

  for(const chapter of rawZybooksData) {
    let totalActivities = 0
    let completedActivities = 0

    for(const section of chapter) {
      for(const activity in section) {
        for(const question of section[activity]) {
          totalActivities++
          if(question) completedActivities++
        }
      }
    }

    // will end up being a decimal between 0 and 1
    const rawTotal = completedActivities/totalActivities
    student.zybooksGrades.push(rawTotal)
  }

  return student
}

function exponentialBackoff(retryCount) {
  const WAIT_AT_LEAST_TWELVE_SECONDS = 12000
  const ADD_UP_TO_TEN_SECOND_RANDOM_WAIT = Math.floor(Math.random() * 10000)

  const randomDelay = WAIT_AT_LEAST_TWELVE_SECONDS + ADD_UP_TO_TEN_SECOND_RANDOM_WAIT

  return randomDelay
}
