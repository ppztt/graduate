<template>
  <Login v-if="$route.name ==='login'"></Login>
  <Home v-else></Home>
</template>
<script setup lang="ts">
  import Home from './view/Home.vue'
  import Login from './view/Login.vue'
</script>
<style scoped>

</style>
