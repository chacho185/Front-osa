<template>
<div id="app">
    <Navigation />
    <router-view></router-view>
  
  </div>

</template>

<script>

import Navigation from './components/navigation/TheNavigation.vue';
export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
