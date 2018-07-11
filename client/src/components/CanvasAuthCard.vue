<template>
  <v-card>
    <v-form @submit.prevent="handleSaveCanvasToken">
      <v-card-text>
        <v-text-field
          v-model="cToken"
          label="Canvas Auth Token"
          color="success"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          type="submit"
          color="success"
          flat
          :disabled="loading"
        >
          Save Canvas Token
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    cReqErr: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
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

