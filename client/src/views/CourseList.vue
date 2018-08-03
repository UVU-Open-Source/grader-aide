<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 sm6 v-for="course of courses" :key="course.id">
        <v-card>
          <v-card-text>
            <h3 class="headline mb-0">{{course.name}}</h3>
          </v-card-text>

          <v-card-actions>
            <v-btn flat color="green">
              Assignments
              <v-icon class="ml-2">list</v-icon>
            </v-btn>
            <v-btn flat color="orange lighten-2">
              Edit
              <v-icon class="ml-2">edit</v-icon>
            </v-btn>
            <v-btn flat color="red lighten-2" vif="!course.registered">
              Register
              <v-icon class="ml-2">edit</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      courses: [
        {
          "id": "466507",
          "name": "CS-2550-001 | Summer 2018 B1",
          registered: true
        },
        {
          "id": "466508",
          "name": "CS-2550-001 | Summer 2018 B1",
          registered: true
        },
        {
          "id": "466509",
          "name": "CS-2550-001 | Summer 2018 B1",
          registered: false
        }
      ]
    }
  }
}
</script>
