<template>
  <div id="app">
    <News :id="$route.params.id" />
  </div>
</template>

<script>
import News from '../components/News.vue';

export default {
  name: 'NewsPage',
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
