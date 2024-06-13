<template>
  <AuthLayout>
    <div class="content-wrapper">
      <h6 class="justify-content-center mb-5">
        Login ke Berita.com dengan email dan kata sandi anda!
      </h6>
      <form @submit.prevent="login">
        <input
          class="form-control"
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="form-control mt-4"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
        <div class="d-flex mt-3 justify-content-between">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="rememberMe"
            />
            <label class="form-check-label" for="rememberMe">
              Remember me
            </label>
          </div>
          <div class="text-danger" type="button" @click="forgotPassword">
            Forgot Password?
          </div>
        </div>
        <button type="submit" class="btn btn-secondary mt-5">Masuk</button>
      </form>
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
        ><span class="text-danger" type="button" @click="register"
          >Daftar!</span
        >
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import axios from "axios";
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "Login",
  components: {
    AuthLayout,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/Auth/Login",
          {
            email: this.email,
            password: this.password,
          }
        );

        console.log(response.data); // Log the response data

        if (response.data.success) {
          this.$router.push({ name: "LandingPage" });
        } else {
          // Set errorMessage berdasarkan pesan dari server
          this.errorMessage = response.data.msg || "Unknown error";
        }
      } catch (error) {
        console.error("There was an error logging in:", error);
        if (error.response && error.response.data && error.response.data.msg) {
          // Set errorMessage berdasarkan pesan dari server
          this.errorMessage = error.response.data.msg;
        } else {
          this.errorMessage = "An error occurred. Please try again.";
        }
      }
    },
    forgotPassword() {
      this.$router.push({ name: "ForgotPassword" });
    },
    register() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style>
.content-wrapper form button {
  padding: 5px 44%;
}
@media (max-width: 767px) {
  .content-wrapper form button {
    padding: 5px 43%;
  }
}
.content-wrapper {
  display: flex;
  flex-direction: column;
}
.google-logo {
  width: 30px;
  height: 30px;
}
</style>
