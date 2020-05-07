<template>
  <v-app>
    <the-drawer v-if="$vuetify.breakpoint.smAndDown" v-model="drawer"></the-drawer>

    <the-menu v-model="drawer"></the-menu>

    <v-content>
      <transition name="fade-slide" mode="out-in" appear>
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import TheMenu from "@/components/Interface/TheMenu";
import TheDrawer from "@/components/Interface/TheDrawer";

import authService from "@/services/authService";

export default {
  name: "App",
  components: {
    TheMenu,
    TheDrawer
  },
  data: () => ({
    drawer: false,
    navLinks: [{ to: { name: "GroupMain" }, text: "Групи" }]
  }),
  beforeCreate() {
    authService.check().then(({ data }) => {
      if (data.auth) {
        return this.$store.commit("setUser", data.user);
      }
      this.$store.commit("setUser", null);
    });
  }
};
</script>