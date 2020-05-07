<template>
  <v-navigation-drawer :value="value" @input="$emit('input', $event)" absolute clipped app></v-navigation-drawer>
</template>

<script>
export default {
  props: ["value"]
};
</script>