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
      <v-menu
        v-if="userChecked && user"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        left
      >
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-list-item-avatar class="mr-0">
              <img src="@/assets/images/general/profile-placeholder.png" :alt="user.name" />
            </v-list-item-avatar>
          </div>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img src="@/assets/images/general/profile-placeholder.png" :alt="user.name" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{user.name}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              @click="menu = false"
              link
              color="success"
              :to="'/profile/' + user.slug"
            >Профіль</v-list-item>
            <v-list-item class="red" dense dark link @click="logout">Вийти</v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["value"],
  data: () => ({
    menu: false
  }),
  methods: {
    ...mapActions(["logout"])
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style>
.app-bar .loader {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>