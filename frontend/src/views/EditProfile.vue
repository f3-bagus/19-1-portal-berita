<template>
    <div id="app">
        <EditProfile />
    </div>
</template>

<script>
import EditProfile from '../components/Account/EditProfile.vue';

export default {
    name: 'App',
    components: {
        EditProfile
    }
}
</script>

<style>
body {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>