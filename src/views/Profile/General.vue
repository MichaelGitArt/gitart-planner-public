<template>
  <profile-layout :profile="profile"></profile-layout>
</template>

<script>
import store from "@/store";
import ProfileLayout from "@/components/Pages/Profile/Layout";

function getProfile(to, next) {
  if (to.params.slug === store.getters.user.slug) {
    return next({ name: "MyProfile" });
  }
  store.dispatch("getProfile", to.params.slug).then(profile => {
    to.params.profile = profile;
    next();
  });
}

export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  components: {
    ProfileLayout
  },
  beforeRouteEnter(to, from, next) {
    getProfile.call(this, to, next);
  },
  beforeRouteUpdate(to, from, next) {
    getProfile.call(this, to, next);
  }
};
</script>
