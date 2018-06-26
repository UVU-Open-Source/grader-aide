<template>
  <v-card color="green" dark>
    <v-card-title>
      {{successMessage}}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  props: {
    successMessage: {
      type: String,
      default: ''
    }
  }
}
</script>
