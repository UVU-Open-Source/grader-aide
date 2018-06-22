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
          :cReqErr="cReqErr"
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
// todo reload with auth tokens causes input boxes to show up while auth is happening. see if we can fix this

import axios from 'axios'
import BASE_URL from '@/utils/baseURL'

// apis
import * as zybooksApi from '@/apis/zybooks.api'
import * as canvasApi from '@/apis/canvas.api'

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
      cReqErr: '',
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
      // todo needs real error handling done in some capacity
      const { zyEmail, zyPassword } = credentials

      zybooksApi
        .signin(zyEmail, zyPassword)
        .then(this.handleUpdateZybooksAuthValues)
    },
    handleUpdateZybooksAuthValues({ token, error }) {
      if(error) return this.zyReqErr = error

      this.zyToken = token
      this.zyReqErr = ''
    },
    handleUpdateCanvasAuthValues({ token, error }) {
      if(error) return this.cReqErr = error

      this.cToken = token
      this.cReqErr = ''
    },
    saveCanvasToken(token) {
      // todo add error modal or somethign?
      canvasApi
        .saveToken(token)
        .then(this.handleUpdateCanvasAuthValues)
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
  created() {
    const component = this

    zybooksApi
      .getStoredZybooksAuthToken()
      .then(this.handleUpdateZybooksAuthValues)
      .catch(err => {
        // todo needs full error handling implemented for now just console logging unhandled error
        if(err.message !== zybooksApi.NO_TOKEN_STORED) console.log(err)

        // failing gracefully because if NO_TOKEN_STORED user needs to authenticate with zybooks
      })

    canvasApi
      .getStoredCanvasAuthToken()
      .then(this.handleUpdateCanvasAuthValues)
      .catch(err => {
        // todo needs full error handling implemented for now just console logging unhandled error
        if(err.message !== canvasApi.NO_TOKEN_STORED) console.log(err)

        // failing gracefully because if NO_TOKEN_STORED user needs to authenticate with zybooks
      })
  },
  components: {
    ZybooksAuthCard,
    CanvasAuthCard,
    AuthSuccessCard,
    ButtonWithSpinner
  }
}
</script>
