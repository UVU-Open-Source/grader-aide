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
            <v-btn flat color="green lighten-1" @click="onGrade(course)">
              <v-icon class="mr-2">list</v-icon>
              Grade Assignments
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
      pageLoadErr: ''
    }
  },
  methods: {
    onGrade(course) {
      // todo view needs to be made for this still but its ready when the view is
      console.log('would navigate if I could')
      // this.$router.push({ name: 'grade-course', params: { canvasCourseId: course.id } })
    }
  },
  created() {
    this.authAxios.get('/api/v1/courses/registered')
      .then(response => response.data)
      .then(courses => this.courses = courses)
      .catch(err => this.pageLoadErr = 'Unable to load courses')
  }
}
</script>
