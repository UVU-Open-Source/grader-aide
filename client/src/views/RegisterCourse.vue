<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <h3 class="headline mb-0">{{course.name}}</h3>

            <v-form @submit.prevent="handleRegisterCourse" v-model="formIsValid">
              <v-card-text>
                <v-text-field
                  v-model="course.zyLink"
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
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      // persistent data
      course: {
        id: '466507',
        name: 'CS-2550-001 | Summer 2018 B1',
        zyLink: '',
        students: [
          {
            name: 'john doe',
            id: '1',
            canvasId: '',
            zybooksId: ''
          }
        ]
      },
      // gui data
      formIsValid: false,
      formFieldHasText: [ data => !!data || 'come on. just copy paste' ]
    }
  },
  methods: {
    handleRegisterCourse(e) {
      console.log(this.formIsValid);
      console.log(e);
      this.$router.push({ name: 'edit-course', params: { courseId: this.course.id } })
      // todo send request to server to save zybooks link and then on success reroute to edit course hopefully with autofilled students with zybooks and canvas ids
    }
  }
}
// todo example zybooks request for data
// https://zyserver.zybooks.com/v1/zybook/UVUCS2550WagstaffSummer2018/roster?zybook_roles=[%22Student%22,%22Temporary%22,%22Dropped%22]&auth_token=eyJhbGciOiJIUzI1NiIsImV4cCI6MTUzNDI4ODE1MCwiaWF0IjoxNTM0MTE1MzUwfQ.eyJ1c2VyX2lkIjozMTczMDZ9.jFc5jtwMw1j7NhD9xnJUk0SO_ZPXwwaiisOSjjwYi4k
</script>

