<template>
  <profile-layout :profile="user">
    <template #header>
      <v-btn :to="{name: 'MyProfileEdit'}" icon class="profile-header__settings-icon">
        <img src="@/assets/images/icons/ic_work_tool.svg" alt="Налаштування" />
      </v-btn>
    </template>
    <router-view></router-view>
  </profile-layout>
</template>

<script>
import ProfileLayout from "@/components/Pages/Profile/Layout";

export default {
  components: {
    ProfileLayout
  }
};
</script>