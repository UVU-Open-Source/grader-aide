import store from '../store'

export default {
  isAuthenticated(to, from, next) {
    if(store.getters['auth/isFullyAuthenticated']) return next()

    next({ name: 'auth' })
  },

  needsAuthentication(to, from, next) {
    if(store.getters['auth/isFullyAuthenticated']) return next({ name: 'root' })

    next()
  }
}
