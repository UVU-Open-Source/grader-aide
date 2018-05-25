<template>
  <div>
    <button class="btn btn-success" disabled v-if="isLoaded">
      <i class="fa fa-check"></i>
      <slot name="success"></slot>
    </button>
    <button
      class="btn btn-primary"
      :disabled="isLoading"
      @click="handleClick"
      v-else
    >
      <i v-if="isLoading" class="fa fa-circle-o-notch fa-spin"></i>
      <slot></slot>
    </button>

  </div>
</template>

<script>
// @ts-nocheck
// todo consider refactoring so that we don't need the whole font awesome library
  export default {
    name: 'vue-button-spinner',
    props: {
      isLoading: {
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
