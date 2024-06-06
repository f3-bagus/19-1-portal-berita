<template>
  <div class="row">
    <div
      class="vh-100 col bg-auth d-flex justify-content-center align-items-center"
    >
      <div>
        <span class="text-danger title-font">BERITA</span
        ><span class="text-light title-font">.com</span>
      </div>
    </div>
    <div class="mx-5 col d-flex justify-content-center align-items-center">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
};
</script>

<style>
body,
html {
  overflow-x: hidden;
  height: 100%;
}

.bg-auth {
  background-image: url("../../assets/AuthBlueBg.svg");
  background-size: cover;
  background-repeat: no-repeat;
}

.title-font {
  font-size: 3rem;
}
</style>
