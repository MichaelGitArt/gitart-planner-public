<template>
  <v-app-bar app dark color="green">
    <v-container d-flex align-center>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="$emit('input', !value)"
      />

      <router-link tag="div" to="/">
        <v-toolbar-title>
          <span class="font-weight-bold">Gitart</span> Planner
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-btn color="warning" tag="button" to="/auth">Увійти</v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  props: ["value"]
};
</script>