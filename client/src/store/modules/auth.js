// apis
import * as zybooksApi from '@/apis/zybooks.api'
import * as canvasApi from '@/apis/canvas.api'


// ================================================================================
// initial state
// ================================================================================
const state = {
  zyToken: '',
  zyAuthPending: false,
  zyReqErr: '',
  cToken: '',
  cReqErr: ''
}

// ================================================================================
// getters
// ================================================================================
const getters = {

}

// ================================================================================
// actions
// ================================================================================
const actions = {
  // used to check auth status of zybooks when app is loaded initially
  initZybooksAuth({ dispatch, commit }) {
    zybooksApi
      .getStoredZybooksAuthToken() // playload shape { token: string, error: string }
      .then(response => dispatch('handleZybooksAuthResponse', response))
      .catch(err => dispatch('handleZybooksAuthError', err))
  },
  // playload shape { zyEmail: string, zyPassword: string }
  loginZybooks({ dispatch, commit }, { zyEmail, zyPassword }) {
    commit('zybooksLogin')

    zybooksApi
      .signin(zyEmail, zyPassword) // playload shape { token: string, error: string }
      .then(response => dispatch('handleZybooksAuthResponse', response))
      .catch(err => dispatch('handleZybooksAuthError', err))
  },
  // playload shape { token: string, error: string }
  handleZybooksAuthResponse({ commit }, { token, error }) {
    if(error) return commit('zybooksLoginFailed', error)

    commit('zybooksLoginSuccess', token)
  },
  // payload expects an error object
  handleZybooksAuthError({ commit }, err) {
    // failing gracefully because if NO_TOKEN_STORED user needs to authenticate with zybooks
    if(err.message === zybooksApi.NO_TOKEN_STORED) return commit('zybooksLoginFailed', '')

    commit('zybooksLoginFailed', 'zybooks authentication failed due to internal bug')
  }
}

// ================================================================================
// mutations
// ================================================================================
const mutations = {
  zybooksLogin() {
    state.zyAuthPending = true
  },
  zybooksLoginSuccess(state, token) {
    state.zyToken = token
    state.zyReqErr = ''
    state.zyAuthPending = false
  },
  zybooksLoginFailed(state, error) {
    state.zyToken = ''
    state.zyReqErr = error
    state.zyAuthPending = false
  }
}

// ================================================================================
// exports
// ================================================================================
export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
