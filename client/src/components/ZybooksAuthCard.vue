<template>
  <v-card>
    <v-form @submit.prevent="handleGetZybooksToken">
      <v-card-text>
        <v-text-field
          v-model="zyEmail"
          label="Zybooks Email"
          color="success"
        ></v-text-field>

        <v-text-field
          v-model="zyPassword"
          label="Zybooks Password"
          type="password"
          color="success"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          type="submit"
          color="success"
          flat
        >
          Login To Zybooks
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
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
