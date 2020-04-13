<template>
  <v-app>
    <the-drawer v-if="$vuetify.breakpoint.smAndDown" v-model="drawer"></the-drawer>

    <the-menu v-model="drawer"></the-menu>

    <v-content>
      <transition name="fade" mode="out-in">
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
    drawer: false
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>