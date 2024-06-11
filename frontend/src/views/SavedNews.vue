<template>
    <div id="app">
      <SavedNews />
    </div>
  </template>
  
  <script>
  import SavedNews from '../components/SavedNews.vue'
  
  export default {
    name: 'App',
    components: {
      SavedNews
    }
  }
  </script>
  
  <style>
  body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  </style>
  