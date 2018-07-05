<template>
  <v-container>
    <auth-success-card
      v-if="zyToken"
      success-message="Zybooks Token Received"
    ></auth-success-card>
    <zybooks-auth-card
      v-else
      :zyReqErr="zyReqErr"
      @get-zybooks-token="getZybooksToken"
    ></zybooks-auth-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
// apis
import * as zybooksApi from '@/apis/zybooks.api'
import * as canvasApi from '@/apis/canvas.api'

// components
import ZybooksAuthCard from '@/components/ZybooksAuthCard'
import CanvasAuthCard from '@/components/CanvasAuthCard'
import AuthSuccessCard from '@/components/AuthSuccessCard'

export default {
  data() {
    return {
      // persistent
      // fixme not used yet, these tokens
      cToken: '',
      // gui state
      // fixme handle inside vuex?
      cReqErr: ''
    }
  },
  computed: mapState('auth', [
    'zyToken',
    'zyReqErr',
    'zyAuthPending'
  ]),
  methods: {
    getZybooksToken(authPayload) {
      this.$store.dispatch('auth/loginZybooks', authPayload)
    }
  },
  components: {
    ZybooksAuthCard,
    CanvasAuthCard,
    AuthSuccessCard,
  }
}
</script>
