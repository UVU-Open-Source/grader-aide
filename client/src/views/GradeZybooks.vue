<template>
  <!-- // fixme needs to be refactored to use vuetify if this view continues to exist -->
  <div class="container">
    <div class="row">
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

// components
import ButtonWithSpinner from '@/components/ButtonWithSpinner'

export default {
  data() {
    return {
      // persistent
      // fixme needs tokens to be usable again.
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
  methods: {
    SubmitGradesFor(chapter) {
      // fixme disabled submitting grades for now since class is inactice. 
      chapter.loading = true
      setTimeout(() => {
        chapter.loading = false
        chapter.loaded = true
      }, 1000);

      // const config = {
      //   headers: {
      //     zyToken: this.zyToken,
      //     cToken: this.cToken
      //   }
      // }

      // axios
      //   .get(`${BASE_URL}/api/v1/grade/zybooks/chapter/${chapter.value}`, config)
      //   .then(response => {
      //     chapter.loading = false
      //     if(response.data.success) chapter.loaded = true
      //   })
      //   .catch(e => chapter.loading = false)
    }
  },
  components: {
    ButtonWithSpinner
  }
}
</script>
