<template>
  <div class="card bg-success text-white">
    <div class="card-header">{{successMessage}}</div>
  </div>
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
