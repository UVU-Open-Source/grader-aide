<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <!-- successfully pulled course -->
      <v-flex xs12 v-if="course">
        <v-card>
          <v-card-text>
            <h3 class="headline mb-0">{{course.name}}</h3>

            <v-form @submit.prevent="handleRegisterCourse" v-model="formIsValid">
              <v-card-text>
                <v-text-field
                  v-model="zyLinkFormInput"
                  label="Zybooks Class Link"
                  color="success"
                  required
                  :rules="formFieldHasText"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  type="submit"
                  color="success"
                  flat
                  :disabled="!formIsValid"
                >
                  Register
                </v-btn>
              </v-card-actions>
            </v-form>
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
    </v-layout>
  </v-container>
</template>

<script>
import axiosWithAuthHeaders from '../mixins/axiosWithAuthHeaders'

export default {
  mixins: [axiosWithAuthHeaders],
  data() {
    return {
      // persistent data
      course: null,
      // gui data
      formIsValid: false,
      zyLinkFormInput: '',
      formFieldHasText: [ data => !!data || 'just copy paste from course preview on zybooks for this course' ],
      pageLoadErr: ''
    }
  },
  methods: {
    handleRegisterCourse(e) {
      if(!this.formIsValid) return

      this.course.zyLink = this.zyLinkFormInput.replace('https://learn.zybooks.com/', '')

      this.authAxios.post('/api/v1/courses/register', this.course)
        .then(() => alert('Course was registered successfully'))
        .then(() => this.$router.push({ name: 'registered-course' }))
        .catch(err => {
          alert('Unable to register course')

          // after alert
          this.$router.push({ name: 'unregistered-courses' })
        })
    }
  },
  created() {
    this.authAxios.get(`/api/v1/canvas/courses/${this.$route.params.canvasCourseId}`)
      .then(response => this.course = response.data)
      .catch(err => this.pageLoadErr = 'Unable to load course')
  }
}
</script>
