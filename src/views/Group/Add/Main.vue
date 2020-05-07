<template>
  <v-container>
    <base-page-back :route="{name: 'GroupMain'}" class="mb-5">
      <h1 class="font-weight-bold display-1 mb-4">Додати групу</h1>
    </base-page-back>

    <div class="d-flex flex-nowrap align-center">
      <v-btn-toggle borderless class="mb-5 group-tab-toggle elevation-3">
        <v-btn class="group-tab" text :to="{name: 'GroupCreate'}">Створити</v-btn>
        <v-btn class="group-tab" text :to="{name: 'GroupJoin'}">Приєднатися</v-btn>
      </v-btn-toggle>
    </div>

    <transition name="fade-slide" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_colors.scss";

.group-tab-toggle {
  .group-tab {
    &.v-item--active {
      background: map-get($green, "base");
      color: #fff;
    }
  }
}
</style>