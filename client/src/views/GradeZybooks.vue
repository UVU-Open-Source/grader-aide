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
          v-else
          @save-canvas-token="saveCanvasToken"
        ></canvas-auth-card>
      </div>
    </div>

    <div class="row" v-if="authTokensReceived">
      <div class="col-sm-2 mt-5" v-for="chapter of chapters" :key="chapter.value">
        <button-with-spinner
          :isLoading="chapter.loading"
          :isLoaded="chapter.loaded"
          @click="SubmitGradesFor(chapter)"
        >
          Grade Chapter {{ chapter.value }}

          <template slot="success" v-if="chapter.loaded">
            <span>Grade Submitted</span>
          </template>
        </button-with-spinner>
      </div>
    </div>
  </div>
</template>

<script>
// @ts-nocheck
import axios from 'axios'
import BASE_URL from '@/utils/baseURL'

// components
import ZybooksAuthCard from '@/components/ZybooksAuthCard'
import CanvasAuthCard from '@/components/CanvasAuthCard'
import AuthSuccessCard from '@/components/AuthSuccessCard'
import ButtonWithSpinner from '@/components/ButtonWithSpinner'

export default {
  data() {
    return {
      // persistent
      zyToken: '',
      cToken: '',
      // gui state
      zyReqErr: '',
      // todo hard coded for now. should be dynamic in the future for use in multiple classes
      chapters: [
        {
          value: 1,
          loading: false,
          loaded: false
        },
        {
          value: 2,
          loading: false,
          loaded: false
        },
        {
          value: 3,
          loading: false,
          loaded: false
        },
        {
          value: 4,
          loading: false,
          loaded: false
        },
        {
          value: 5,
          loading: false,
          loaded: false
        },
        {
          value: 6,
          loading: false,
          loaded: false
        },
        {
          value: 7,
          loading: false,
          loaded: false
        },
        {
          value: 8,
          loading: false,
          loaded: false
        },
        {
          value: 9,
          loading: false,
          loaded: false
        },
        {
          value: 10,
          loading: false,
          loaded: false
        }
      ]
    }
  },
  computed: {
    authTokensReceived() {
      return this.zyToken && this.cToken
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
    },
    SubmitGradesFor(chapter) {
      chapter.loading = true

      const config = {
        headers: {
          zyToken: this.zyToken,
          cToken: this.cToken
        }
      }

      axios
        .get(`${BASE_URL}/api/v1/grade/zybooks/chapter/${chapter.value}`, config)
        .then(response => {
          chapter.loading = false
          if(response.data.success) chapter.loaded = true
        })
        .catch(e => chapter.loading = false)
    }
  },
  components: {
    ZybooksAuthCard,
    CanvasAuthCard,
    AuthSuccessCard,
    ButtonWithSpinner
  }
}
</script>
