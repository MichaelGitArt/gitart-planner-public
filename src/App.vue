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
    fetch(`${process.env.VUE_APP_URL}/api/auth/check`, {
      method: "POST"
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.auth) {
          return this.$store.commit("setUser", resData.user);
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