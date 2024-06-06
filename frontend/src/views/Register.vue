<template>
  <AuthLayout>
    <div class="content-wrapper">
      <h6 class="d-flex justify-content-center mb-5">
        Daftar ke Berita.com dan temukan berita terkini!
      </h6>
      <form>
        <input class="form-control" type="text" placeholder="Nama Lengkap" />
        <input class="form-control my-4" type="text" placeholder="Email" />
        <input class="form-control my-4" type="text" placeholder="Username" />
        <input
          class="form-control mt-4"
          type="password"
          placeholder="Kata Sandi"
        />
      </form>
      <div class="font-size-small mt-1 my-3">
        Minimal 8 kata dengan kombinasi huruf, angka dan simbol
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value=""
          id="rememberMe"
        />
        <label class="form-check-label" for="rememberMe"
          >Dengan mendaftar, saya menyetujui kebijakan dan privasi yang
          berlaku</label
        >
      </div>
      <button type="button" class="btn btn-secondary mt-4">Daftar</button>
      <h6 class="d-flex justify-content-center my-3">atau</h6>
      <div class="d-flex justify-content-center">
        <img
          src="../assets/icon/google.svg"
          alt="Google Logo"
          class="google-logo"
        />
      </div>
      <div class="d-flex justify-content-center mt-3">
        <span class="me-2">Sedah memiliki akun?</span
        ><span class="text-danger">Login!</span>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "Register",
  components: {
    AuthLayout,
  },
};
</script>

<style>
.content-wrapper {
  display: flex;
  flex-direction: column;
}

.google-logo {
  width: 30px;
  height: 30px;
}

.font-size-small {
  font-size: 0.8rem;
}
</style>
