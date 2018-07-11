<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <auth-success-card
          v-if="zyToken"
          success-message="Zybooks Token Received"
        ></auth-success-card>
        <zybooks-auth-card
          v-else
          :zyReqErr="zyReqErr"
          :loading="zyAuthPending"
          @get-zybooks-token="getZybooksToken"
        ></zybooks-auth-card>
      </v-flex>
      <v-flex xs12 sm6>
        <auth-success-card
          success-message="Zybooks Token Received"
        ></auth-success-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

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
    AuthSuccessCard
  }
}
</script>
