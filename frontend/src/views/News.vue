<template>
    <div id="app">
      <News />
    </div>
  </template>
  
  <script>
  import News from '../components/News.vue';
  
  export default {
    name: 'App',
    components: {
      News
    }
  }
  </script>
  
  <style>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  </style>
  