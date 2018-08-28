<template>
  <v-app>
    <!-- navigation -->
    <v-toolbar color="green" height="58" fixed dark>
      <v-toolbar-title>
        <router-link :to="{ name: 'registered-courses' }" tag="div" class="clickable"> GraderAide</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="isFullyAuthenticated">
        <v-btn flat :to="{ name: 'registered-courses' }">Registered Courses</v-btn>
        <v-btn flat :to="{ name: 'unregistered-courses' }">Unregistered Courses</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <router-view style="padding-top: 80px" v-if="initAuthIsFullyResolved" :key="$route.path"/>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapState } = createNamespacedHelpers('auth')

export default {
  name: 'App',
  computed: mapGetters([ 'initAuthIsFullyResolved', 'isFullyAuthenticated' ])
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
