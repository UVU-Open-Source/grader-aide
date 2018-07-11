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
          @get-zybooks-token="loginZybooks"
        ></zybooks-auth-card>
      </v-flex>
      <v-flex xs12 sm6>
        <auth-success-card
          v-if="cToken"
          success-message="Canvas Token Received"
        ></auth-success-card>
        <canvas-auth-card
          v-else
          :cReqErr="cReqErr"
          :loading="cAuthPending"
          @save-canvas-token="loginCanvas"
        ></canvas-auth-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapState, mapGetters } = createNamespacedHelpers('auth')

// components
import ZybooksAuthCard from '@/components/ZybooksAuthCard'
import CanvasAuthCard from '@/components/CanvasAuthCard'
import AuthSuccessCard from '@/components/AuthSuccessCard'

export default {
  computed: {
    ...mapState([
      'zyToken',
      'zyReqErr',
      'zyAuthPending',
      'cToken',
      'cReqErr',
      'cAuthPending'
    ]),
    ...mapGetters(['isFullyAuthenticated'])
  },
  methods: mapActions(['loginZybooks', 'loginCanvas']),
  watch: {
    isFullyAuthenticated(isAuthenticated) {
      if(isAuthenticated) this.$router.push('/')
    }
  },
  components: {
    ZybooksAuthCard,
    CanvasAuthCard,
    AuthSuccessCard
  }
}
</script>
