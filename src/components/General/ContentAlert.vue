<template>
  <transition name="fade" mode="out-in">
    <v-alert
      class="mt-3 body-2"
      border="bottom"
      colored-border
      type="warning"
      :icon="false"
      dense
      elevation="2"
      v-if="message"
    >{{message}}</v-alert>
  </transition>
</template>

<script>
export default {
  props: {
    message: [String, null],
    type: {
      type: String,
      default: "warning"
    }
  }
};
</script>
