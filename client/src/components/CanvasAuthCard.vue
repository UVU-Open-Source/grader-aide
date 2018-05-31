<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="handleSaveCanvasToken">
        <div class="form-group">
          <label>Canvas Auth Token</label>
          <input type="text" class="form-control" v-model="cToken">
          <small v-if="cReqErr" class="form-text text-danger">
            {{cReqErr}}
          </small>
        </div>

        <button type="submit" class="btn btn-primary">Save Canvas Token</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ts-nocheck
export default {
  props: {
    cReqErr: {
      type: String,
      default: ''
    }
  },
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

