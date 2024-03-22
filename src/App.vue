<template>
  <!-- <Login v-if="$route.name ==='login'"></Login>
  <Home v-else></Home> -->
  <router-view></router-view>
</template>
<script setup lang="ts">
  // import Home from './view/Home.vue'
  // import Login from './view/Login.vue'
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
  body{
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
