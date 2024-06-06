<template>
  <AuthLayout>
    <div class="content-wrapper">
      <h6 class="justify-content-center mb-5">
        Login ke Berita.com dengan email dan kata sandi anda!
      </h6>
      <form>
        <input class="form-control" type="text" placeholder="Email" />
        <input
          class="form-control mt-4"
          type="password"
          placeholder="Password"
        />
      </form>
      <div class="d-flex mt-3 justify-content-between">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="rememberMe"
          />
          <label class="form-check-label" for="rememberMe"> Remember me </label>
        </div>

        <div class="text-danger">Forget Password?</div>
      </div>
      <button type="button" class="btn btn-secondary mt-5">Masuk</button>
      <h6 class="d-flex justify-content-center my-3">atau</h6>
      <div class="d-flex justify-content-center">
        <img
          src="../assets/icon/google.svg"
          alt="Google Logo"
          class="google-logo"
        />
      </div>
      <div class="d-flex justify-content-center mt-3">
        <span class="me-2">Belum memiliki akun?</span
        ><span class="text-danger">Daftar!</span>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "Login",
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
</style>
