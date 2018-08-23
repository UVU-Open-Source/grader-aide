import axios from 'axios'
import BASE_URL from '../utils/baseURL'

// import { createNamespacedHelpers } from 'vuex'

// const { mapState } = createNamespacedHelpers('auth')

export default {
  computed: {
    // fixme couldn't get namspaced helpers working in the mixin. google didnt help either.
    //       something id like to look into at some point but this other solution works for now
    // ...mapState(['cToken, zyToken']),
    authAxios() {
      return axios.create({
        baseURL: BASE_URL,
        headers: {
          cToken: this.$store.state.auth.cToken,
          zyToken: this.$store.state.auth.zyToken
        }
      })
    }
  }
}