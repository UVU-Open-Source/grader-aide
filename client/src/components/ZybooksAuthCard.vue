<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="handleGetZybooksToken">
        <div class="form-group">
          <label>Zybooks Email</label>
          <input type="email" class="form-control" v-model="zyEmail">
        </div>

        <div class="form-group">
          <label>Zybooks Password</label>
          <input type="password" class="form-control" v-model="zyPassword">
          <small v-if="zyReqErr" class="form-text text-danger">
            {{zyReqErr}}
          </small>
        </div>

        <button type="submit" class="btn btn-primary">Login to Zybooks</button>
      </form>
    </div>
  </div>
</template>

<script>
// @ts-nocheck
export default {
  props: {
    zyReqErr: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
       zyEmail: '',
      zyPassword: ''
    }
  },
  methods: {
    handleGetZybooksToken() {
      const { zyEmail, zyPassword } = this
      this.$emit('get-zybooks-token', { zyEmail, zyPassword })
    }
  }
}
</script>
