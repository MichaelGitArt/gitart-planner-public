<template>
  <transition name="fade" mode="out-in">
    <v-alert
      class="mt-3 body-2"
      colored-border
      :type="type"
      :icon="false"
      dense
      border="left"
      elevation="2"
      v-if="value"
    >
      <v-row align="center" no-gutters>
        <v-col class="grow">{{value}}</v-col>
        <v-spacer></v-spacer>
        <v-col class="shrink">
          <v-btn @click="reset" color="success" outlined>OK</v-btn>
        </v-col>
      </v-row>
    </v-alert>
  </transition>
</template>

<script>
export default {
  props: {
    value: [String, null],
    type: {
      type: String,
      default: "warning"
    }
  },
  methods: {
    reset() {
      console.log("rest");
      this.$emit("input", "");
    }
  }
};
</script>
