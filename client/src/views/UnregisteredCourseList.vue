<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- list unregistered courses -->
      <v-flex xs12 sm6 v-for="course of courses" :key="course.id" v-if="courses.length">
        <v-card>
          <v-card-text>
            <h3 class="headline mb-0">{{course.name}}</h3>
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="orange lighten-2" @click="onRegister(course)">
              <v-icon class="mr-2">edit</v-icon>
              Register
            </v-btn>
          </v-card-actions>
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
import axiosWithAuthHeaders from '../mixins/axiosWithAuthHeaders'

export default {
  mixins: [ axiosWithAuthHeaders ],
  data() {
    return {
      // persistent
      courses: [],
      // gui
      pageLoadErr: '',
      loading: true
    }
  },
  methods: {
    onRegister(course) {
      this.$router.push({ name: 'register-course', params: { canvasCourseId: course.id } })
    }
  },
  created() {
    this.authAxios.get('/api/v1/courses/unregistered')
      .then(response => response.data)
      .then(courses => {
        this.courses = courses
        this.loading = false
      })
      .catch(err => {
        this.pageLoadErr = 'Unable to load courses'
        this.loading = false
      })
  }
}
</script>
