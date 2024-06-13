<template>
  <AuthLayout>
    <div class="content-wrapper">
      <h6 class="d-flex justify-content-center mb-5">
        Daftar ke Berita.com dan temukan berita terkini!
      </h6>
      <form @submit.prevent="registerUser">
        <input
          class="form-control"
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="form-control my-4"
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="form-control mt-4"
          type="password"
          placeholder="Kata Sandi"
          v-model="password"
        />
        <input
          class="form-control mt-4"
          type="password"
          placeholder="Konfirmasi Kata Sandi"
          v-model="confPassword"
        />
        <div class="font-size-small mt-1 my-3">
          Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol
        </div>
        <div class="form-group mt-3">
          <label for="roleSelect">Role:</label>
          <select class="form-control mt-2" id="roleSelect" v-model="role">
            <option value="user">User</option>
            <option value="author">Author</option>
          </select>
        </div>

        <button type="submit" class="btn btn-secondary mt-4">Daftar</button>
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
        <span class="me-2">Sudah memiliki akun?</span
        ><span class="text-danger" type="button" @click="login">Login!</span>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import axios from "axios";
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "Register",
  components: {
    AuthLayout,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confPassword: "",
      role: "user", // Default role is "user"
    };
  },
  methods: {
    async registerUser() {
      // Validasi bidang form
      if (
        !this.username ||
        !this.email ||
        !this.password ||
        !this.confPassword
      ) {
        alert("Semua bidang harus diisi");
        return;
      }

      // Validasi konfirmasi password
      if (this.password !== this.confPassword) {
        alert("Konfirmasi kata sandi tidak sesuai");
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/Register", {
          username: this.username,
          email: this.email,
          password: this.password,
          confPassword: this.confPassword,
          role: this.role,
        });

        console.log(response.data); // Log the response data

        if (response.data.success) {
          alert(response.data.msg);
          this.$router.push({ name: "Login" }); // Redirect to Login page
        } else {
          alert(
            "Registration failed: " + (response.data.msg || "Unknown error")
          );
        }
      } catch (error) {
        console.error("There was an error registering:", error);
        if (error.response && error.response.data && error.response.data.msg) {
          alert("Registration failed: " + error.response.data.msg);
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    },
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

.google-logo {
  width: 30px;
  height: 30px;
}

.font-size-small {
  font-size: 0.8rem;
}
</style>
