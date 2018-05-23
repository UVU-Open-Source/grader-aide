<template>
  <div class="container">
    <!-- zyboks auth -->
    <div class="row">
      <div class="col-sm">
        <auth-success-card
          v-if="zyToken"
          success-message="Zybooks Token Received"
        ></auth-success-card>
        <zybooks-auth-card
          v-else
          :zyReqErr="zyReqErr"
          @get-zybooks-token="getZybooksToken"
        ></zybooks-auth-card>
      </div>

      <!-- canvas auth -->
      <div class="col-sm">
          <auth-success-card
            v-if="cToken"
            success-message="Cavnas Token Received"
          ></auth-success-card>
          <canvas-auth-card
            @save-canvas-token="saveCanvasToken"
          ></canvas-auth-card>
        </div>
    </div>
  </div>
</template>

<script>
// @ts-nocheck
import axios from 'axios'

// components
import ZybooksAuthCard from '@/components/ZybooksAuthCard'
import CanvasAuthCard from '@/components/CanvasAuthCard'
import AuthSuccessCard from '@/components/AuthSuccessCard'

export default {
  data() {
    return {
      zyReqErr: '',
      zyToken: '',
      cToken: ''
    }
  },
  methods: {
    getZybooksToken(credentials) {
      // todo add error modal or somethign?
      // todo notification that zybooks auth worked
      const { zyEmail, zyPassword } = credentials
      const component = this
      axios
        .post('https://zyserver.zybooks.com/v1/signin', {
          email: zyEmail,
          password: zyPassword
        })
        .then(response => {
          if(response.data.error) return component.zyReqErr = response.data.error.message

          component.zyToken = response.data.session.auth_token
          component.zyReqErr = ''
        })
    },
    saveCanvasToken(token) {
      // todo its a jwt so verify its authenticity?
      // todo add error modal or somethign?
      this.cToken = token
    }
  },
  created() {
    axios.get('http://localhost:3000/ping').then(console.log)
  },
  components: {
    ZybooksAuthCard,
    CanvasAuthCard,
    AuthSuccessCard
  }
}
</script>
