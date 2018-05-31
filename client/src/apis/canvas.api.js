
import axios from 'axios'

import { pluckData } from './utils.api'

export function getStoredCanvasAuthToken() {
  return Promise
    .resolve()
    .then(() => window.localStorage.getItem('canvas'))
    .then(token => {
      if(!token) return Promise.reject(new Error(NO_TOKEN_STORED))

      return checkIfTokenIsValid(token)
    })
}

export function saveToken(token) {
  return checkIfTokenIsValid(token)
    .then(addTokenToLocalStorage)
    .catch(err => console.log('err', err.message))
}

export const NO_TOKEN_STORED = 'no canvas data available'

// ==================================================
// helper functions
// ==================================================
function checkIfTokenIsValid(token) {
  if(!token) return null // no token exists

  return axios
    .get(`https://uvu.instructure.com/api/v1/courses?access_token=${token}`)
    .then(pluckData)
    .then(returnAuthTokenOrErrorMessage(token))
}

// api returns an errors array if token is invalid we dont care about the data othewrwise
function returnAuthTokenOrErrorMessage(token) {
  return function(data) {
    // if invalid remove old bad id from local storage
    if(data.errors) window.localStorage.removeItem('canvas')

    return data.errors
      ? { token: '', error: 'Invalid or expired Canvas Token'}
      : { token, error: '' }
  }
}

function addTokenToLocalStorage(data) {
  if(data.token) window.localStorage.setItem('canvas', data.token)

  return data
}
