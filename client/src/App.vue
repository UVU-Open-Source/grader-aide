<template>
  <v-app>
    <router-view :key="$route.path"/>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  created() {
    this.$store.dispatch('auth/initZybooksAuth')
  }
}
</script>
