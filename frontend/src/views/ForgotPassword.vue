<template>
  <AuthLayout>
    <div class="content-wrapper">
      <h6 class="justify-content-center mb-5">
        Lupa Password? Kirim Link Melalui email
      </h6>
      <div class="mb-3 d-flex justify-content-center">
        Masukkan Email Terdaftar Anda
      </div>
      <input class="form-control" type="text" placeholder="Email" />
      <button
        type="button"
        variant="primary"
        class="mt-4 forgot-password-button"
      >
        Kirim
      </button>
      <div class="d-flex justify-content-center mt-3">
        <span class="me-1"> Kembali ke</span
        ><span class="text-danger" type="button" @click="login">Login</span>
        <span class="ms-1">Page</span>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "ForgotPassword",
  components: {
    AuthLayout,
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style>
.content-wrapper {
  display: flex;
  flex-direction: column;
}

.forgot-password-button {
  min-width: 300px;
  background-color: #085487;
  color: white;
  border: 0;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 5px auto;
  transition: background-color 0.3s;
}

.forgot-password-button:hover {
  background-color: #023362;
}
</style>
