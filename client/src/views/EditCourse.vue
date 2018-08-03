<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <h3 class="headline mb-0">{{course.name}}</h3>

            <v-form @submit.prevent="handleSaveCanvasToken">
              <v-card-text>
                <v-text-field
                  v-model="course.zyLink"
                  label="Zybooks Class Link"
                  color="success"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn
                  type="submit"
                  color="success"
                  flat
                >
                  Save Canvas Token
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
      course: {
        id: '466507',
        name: 'CS-2550-001 | Summer 2018 B1',
        zyLink: ''
      }
    }
  }
}
</script>

