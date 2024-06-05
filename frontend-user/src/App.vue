<template>
  <div id="app">
    <Navbar />
    <Headline />
    <!-- Your other components will go here -->
  </div>
</template>

<script>
import Navbar from './components/LandingPage/Navbar.vue';
import Headline from './components/LandingPage/Headline.vue';


export default {
  name: 'App',
  components: {
    Navbar,
    Headline,
  },
};
</script>
