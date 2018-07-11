<template>
  <v-app>
    <router-view :key="$route.path"/>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('auth')

export default {
  name: 'App',
  methods: mapActions([ 'initAuth' ]),
  created() {
    this.initAuth()
  }
}
</script>
