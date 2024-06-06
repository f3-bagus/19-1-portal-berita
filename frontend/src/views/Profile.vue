<template>
    <div id="app">
      <Profile />
    </div>
  </template>
  
  <script>
  import Profile from '../components/Account/Profile.vue';
  
  export default {
    name: 'App',
    components: {
      Profile
    }
  }
  </script>
  
  <style>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  </style>
  