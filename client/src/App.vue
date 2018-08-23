<template>
  <v-app>
    <router-view v-if="initAuthIsFullyResolved" :key="$route.path"/>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapActions, mapGetters } = createNamespacedHelpers('auth')

export default {
  name: 'App',
  methods: mapActions([ 'initAuth' ]),
  computed: mapGetters([ 'initAuthIsFullyResolved' ]),
  created() {
    this.initAuth()
  }
}
</script>
