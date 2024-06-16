<template>
  <div id="app">
    <Navbar v-if="showNavbar" />
    <router-view />
    <Footer v-if="showFooter" />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
    // AdminLayout,
  },
  setup() {
    const route = useRoute();
    const showNavbar = computed(
      () =>
        ![
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/contributor",
          "/add-news",
          "/admin",
          "/manage-user",
          "/manage-author",
          "/manage-category",
          "/manage-news",
          "/manage-messages",
        ].includes(route.path)
    );
    const showFooter = computed(
      () =>
        ![
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/contributor",
          "/add-news",
          "/admin",
          "/manage-user",
          "/manage-author",
          "/manage-category",
          "/manage-news",
          "/manage-messages",
        ].includes(route.path)
    );

    return {
      showNavbar,
      showFooter,
    };
  },
};
</script>
