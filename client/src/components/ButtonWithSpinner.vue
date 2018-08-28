<template>
  <div>
    <v-btn disabled v-if="isLoaded">
      <slot name="success"></slot>
    </v-btn>
    <v-btn
      :disabled="isLoading || disabled"
      color="success"
      @click="handleClick"
      v-else
    >
      <v-progress-circular
        v-if="isLoading"
        class="mr-2"
        :width="2"
        :size="20"
        indeterminate
        color="success"
      ></v-progress-circular>
      <slot></slot>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'vue-button-spinner',
    props: {
      isLoading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      isLoaded: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleClick() {
        this.$emit('click')
      }
    }
  }
</script>
