<template>
  <v-app-bar app dark color="green">
    <v-app-bar-nav-icon v-if="$vuetify.breakpoint.smAndDown" @click.stop="$emit('input', !value)" />

    <router-link tag="div" to="/">
      <v-toolbar-title>Gitart Planner</v-toolbar-title>
    </router-link>
  </v-app-bar>
</template>

<script>
export default {
  props: ["value"]
};
</script>