<template>
  <v-container>
    <v-layout justify-space-between align-center>
      <h1 class="font-weight-bold display-1 mb-4">Gitart групи</h1>

      <v-btn :to="{name: 'GroupCreate'}" fab color="success">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {};
</script>