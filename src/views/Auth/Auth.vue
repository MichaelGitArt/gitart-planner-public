<template>
  <v-container>
    <v-row class="pt-4" justify="center">
      <v-col lg="4" sm="6" cols ="10">
        <google-auth></google-auth>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GoogleAuth from "@/components/Pages/Auth/GoogleAuth.vue";
export default {
  components: {
    GoogleAuth
  }
};
</script>

<style lang="scss">
.auth-heading {
  text-align: center;
  padding-top: 30px;
}

.auth-from-actions {
  display: flex;
  justify-content: center;
}

.auth-google {
  display: flex;
  align-items: center;
  flex-direction: column;
  &-action {
    border: 1px solid rgba(0, 0, 0, 0.1);
    .v-btn {
      height: 48px !important;
      min-width: 48px !important;
    }
  }
}
</style>