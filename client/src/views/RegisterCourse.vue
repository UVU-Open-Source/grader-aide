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
export default {
  data() {
    return {
      // persistent data
      course: null,
      // gui data
      formIsValid: false,
      zyLinkFormInput: '',
      formFieldHasText: [ data => !!data || 'come on. just copy paste' ],
      pageLoadErr: ''
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

