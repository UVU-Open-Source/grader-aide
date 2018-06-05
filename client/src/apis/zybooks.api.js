import axios from 'axios'
import moment from 'moment'

import { pluckData } from './utils.api'
import baseUrl from '../utils/baseURL'

const base = axios.create({
  baseURL: `${baseUrl}/api/v1/authenticate/zybooks`
})

export function signin(email, password) {
  return base
    .post('/', { email, password })
    .then(pluckData)
    .then(addAuthDataToLocalStorage)
    .then(returnAuthTokenOrErrorMessage)
}

export function getStoredZybooksAuthToken() {
  return Promise
    .resolve()
    .then(() => JSON.parse(window.localStorage.getItem('zybooks')))
    .then(data => {
      if(!data) return Promise.reject(new Error(NO_TOKEN_STORED))

      const { session } = data
      if(tokenIsExpired(session.expiry_date)) return renewAuth(session.refresh_token)

      return returnAuthTokenOrErrorMessage(data)
    })
}

export const NO_TOKEN_STORED = 'no zybooks data available'

// ==================================================
// helper functions
// ==================================================
function addAuthDataToLocalStorage(data) {
  if(data.success) window.localStorage.setItem('zybooks', JSON.stringify(data))

  return data
}

function returnAuthTokenOrErrorMessage(data) {
  if(data.success) return { token: data.session.auth_token, data, error: ''}

  return { token: '', error: data.error.message }
}

function tokenIsExpired(expiry_date) {
  const now = moment()

  return now.isAfter(expiry_date)
}

function renewAuth(refresh_token) {
  return base.post('/renew', { refresh_token })
    .then(pluckData)
    .then(addAuthDataToLocalStorage)
    .then(returnAuthTokenOrErrorMessage)
}
