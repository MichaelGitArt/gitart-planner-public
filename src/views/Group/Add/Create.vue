<template>
  <div>
    <v-stepper vertical v-model="e1">
      <v-stepper-step :complete="e1 > 1" step="1">Назва групи</v-stepper-step>

      <v-stepper-content step="1">
        <validation-observer ref="observer">
          <v-form @submit.prevent="handleCreate" ref="form">
            <validation-provider name="Ім'я" rules="required" v-slot="{errors}">
              <v-text-field class="mb-2" v-model="name" label="Назва" :error-messages=" errors"></v-text-field>
            </validation-provider>
            <v-btn :loading="loading" type="submit" color="primary">Створити</v-btn>
          </v-form>
        </validation-observer>
      </v-stepper-content>

      <v-stepper-step :complete="e1 > 2" step="2">Твоя нова група</v-stepper-step>

      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

        <v-btn color="primary" @click="e1 = 3">Continue</v-btn>

        <v-btn text>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    e1: 1,
    name: "",
    loading: false,
    result: null
  }),
  methods: {
    handleCreate() {
      this.$refs.observer.validate().then(valid => {
        if (!valid) return;
        this.loading = true;
        this.$store
          .dispatch("createGroup", this.name)
          .then(result => {
            console.log(result);
          })
          .finally(() => {
            this.loading = false;
          });
      });
    }
  }
};
</script>

<style>
</style>