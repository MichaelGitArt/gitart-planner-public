<template>
  <div class="home">
    <button @click="getToken">get</button>
    <button @click="getToken2">get2</button>
    <button @click="checkToken">check</button>

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  methods: {
    getToken() {
      fetch("/api/gettoken", {
        credentials: "include"
      })
        .then(res => res.json())
        .then(resData => {
          alert(resData.data);
        });
    },
    getToken2() {
      fetch("/api/gettoken2", {})
        .then(res => res.json())
        .then(resData => {
          alert(resData.data);
        });
    },
    checkToken() {
      fetch("/api/action", { method: "POST" })
        .then(res => res.json())
        .then(resData => {
          alert(resData.data);
        });
    }
  }
};
</script>
