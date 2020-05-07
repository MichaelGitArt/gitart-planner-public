<template>
  <div class="d-flex flex-wrap">
    <v-btn icon class="mr-3" color="warning" :to="route">
      <v-icon dark>mdi-arrow-left</v-icon>
    </v-btn>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    route: {
      type: [String, Object],
      required: true
    }
  }
};
</script>