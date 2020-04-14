<template>
  <v-app-bar class="app-bar" app dark color="green">
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
      <v-btn v-if="userChecked && !user" color="warning" tag="button" to="/auth">Увійти</v-btn>
      <v-btn v-if="userChecked && user" color="warning" tag="button" @click="logout">Вийти</v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["value"],
  methods: {
    ...mapActions(["logout"])
  },
  computed: {}
};
</script>

<style>
.app-bar .loader {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>