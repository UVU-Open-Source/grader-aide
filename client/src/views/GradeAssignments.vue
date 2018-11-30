<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 v-if="course && chapters.length">
        <v-card>
          <v-card-title primary-title class="ml-1">
            <h3 class="headline mb-0">{{course.name}}</h3>
          </v-card-title>

          <v-card-text>
            <!-- list zybooks chapter assignments -->
            <v-layout row wrap>
              <v-flex xs12 class="title ml-2">
                Grade Zybooks chapters
              </v-flex>

              <v-flex xs2 v-for="(chapter, index) of chapters" :key="`${chapter.value}.${index}`">
                <button-with-spinner
                  :isLoading="chapter.loading"
                  :isLoaded="chapter.loaded"
                  :disabled="!chapter.gradeable"
                  @click="SubmitGradesFor(chapter)"
                >
                  Grade Chapter {{ chapter.value }}

                  <template slot="success" v-if="chapter.loaded">
                    <span>Grade Submitted</span>
                  </template>
                </button-with-spinner>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- failed to load ajaxx data -->
      <v-flex xs4 offset-xs4 v-if="pageLoadErr">
        <v-card>
          <v-card-text>
            <p class="red--text text-sm-center">{{pageLoadErr}}</p>
          </v-card-text>
        </v-card>
      </v-flex>

      <!-- loading icon -->
      <v-flex xs2 offset-xs5 class="text-sm-center" v-if="loading">
        <v-progress-circular
          :size="75"
          color="success"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import * as moment from 'moment'

import axiosWithAuthHeaders from '../mixins/axiosWithAuthHeaders'
import apiUtils from '../utils/apiUtils'

// components
import ButtonWithSpinner from '@/components/ButtonWithSpinner'

export default {
  mixins: [ axiosWithAuthHeaders ],
  data() {
    return {
      // persistent
      course: null,
      // gui state
      chapters: [],
      pageLoadErr: '',
      loading: true
    }
  },
  methods: {
    SubmitGradesFor(chapter) {
      chapter.loading = true

      const data = {
        chapterNum: chapter.value
      }

      this.authAxios
        .put(`/api/v1/courses/${this.course.canvasId}/grade/zybooks/chapter/${chapter.cAssignmentId}`, data)
        .then(response => {
          chapter.loading = false
          if(response.data.success) chapter.loaded = true
        })
        .catch(e => chapter.loading = false)
    },
    createChapterStateObj(chapter) {
      return {
        value: parseInt(chapter.name.replace('ch', '')),
        loading: false,
        loaded: false,
        gradeable: moment().diff(chapter.due_at, 'seconds') > 0,
        cAssignmentId: chapter.id
      }
    }
  },
  created() {
    const canvasCourseId = this.$route.params.canvasCourseId
    Promise.all([
      this.authAxios.get(`/api/v1/canvas/courses/${canvasCourseId}`).then(apiUtils.pluckData),
      this.authAxios.get(`/api/v1/courses/${canvasCourseId}/assignments`).then(apiUtils.pluckData)
    ])
      .then(([course, assignments]) => {
        this.loading = false
        this.course = course
        this.chapters = assignments.map(this.createChapterStateObj)
      })
      .catch(err => {
        this.loading = false
        this.pageLoadErr = 'Unable to load course or assignments'
      })
  },
  components: {
    ButtonWithSpinner
  }
}
</script>
