<template>
  <div id="app">
    <EditProfile :id="$route.params.id" />
  </div>
</template>

<script>
import EditProfile from "../components/Account/EditProfile.vue";

export default {
  name: "EditProfilePage",
  components: {
    EditProfile,
  },
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
