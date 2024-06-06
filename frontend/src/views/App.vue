<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const showNavbar = computed(
      () => !["/login", "/register"].includes(route.path)
    );

    return {
      showNavbar,
    };
  },
};
</script>
