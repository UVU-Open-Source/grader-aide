
// todo this file needs error handling
import axios from 'axios'

import baseUrl from '../utils/baseURL'

import { pluckData } from './utils.api'

export function getStoredCanvasAuthToken() {
  return Promise
    .resolve()
    .then(() => window.localStorage.getItem('canvas'))
    .then(token => {
      if(!token) return Promise.reject(new Error(NO_TOKEN_STORED))

      return checkIfTokenIsValid(token)
    })
    .then(addTokenToLocalStorageIfValid)
    .then(removeTokenFromLocalStorageIfInvalid)
}

export function saveToken(token) {
  return checkIfTokenIsValid(token)
    .then(addTokenToLocalStorageIfValid)
    .then(removeTokenFromLocalStorageIfInvalid)
    .catch(err => console.log('err', err.message))
}

export const NO_TOKEN_STORED = 'no canvas data available'

// ==================================================
// helper functions
// ==================================================
function checkIfTokenIsValid(token) {
  if(!token) return null // no token exists

  return axios
    .post(`${baseUrl}/api/v1/authenticate/canvas`, { token })
    .then(pluckData)
}

function addTokenToLocalStorageIfValid(data) {
  if(data.token) window.localStorage.setItem('canvas', data.token)

  return data
}

function removeTokenFromLocalStorageIfInvalid(data) {
  if(data.error) window.localStorage.removeItem('canvas')

  return data
}
