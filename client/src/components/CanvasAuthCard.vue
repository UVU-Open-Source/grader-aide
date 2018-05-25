<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="handleSaveCanvasToken">
        <div class="form-group">
          <label>Canvas Auth Token</label>
          <input type="text" class="form-control" v-model="cToken">
        </div>

        <button type="submit" class="btn btn-primary">Save Canvas Token</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ts-nocheck
export default {
  data() {
    return {
      cToken: ''
    }
  },
  methods: {
    handleSaveCanvasToken() {
      this.$emit('save-canvas-token', this.cToken)
    }
  }
}
</script>

