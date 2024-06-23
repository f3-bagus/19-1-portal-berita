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
          @click="loginWithGoogle"
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
import axios from "../../services/axios";
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
    validateEmail(email) {
      const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return re.test(email);
    },
    async login() {
  // Validasi email sebelum melakukan permintaan login
  if (!this.validateEmail(this.email)) {
    this.errorMessage = "Email tidak valid";
    return;
  }

  try {
    // Melakukan permintaan login ke server
    const response = await axios.post("https://api-msib-6-portal-berita-01.educalab.id/api/auth/login", {
      email: this.email,
      password: this.password
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Log respons dari server untuk tujuan debugging
    console.log(response.data);

    // Memeriksa apakah respons dari server sukses
    if (response.data.success) {
      const userRole = response.data.role;
      const token = response.data.token;

      // Menyimpan peran pengguna dan token ke local storage
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("token", token);

      // Log untuk memeriksa apakah token disimpan dengan benar
      console.log("Stored token:", localStorage.getItem("token"));

      // Mengarahkan pengguna berdasarkan peran mereka
      if (userRole === "admin") {
        this.$router.push({ name: "Admin" });
      } else if (userRole === "author") {
        this.$router.push({ name: "Contributor" });
      } else {
        this.$router.push({ name: "LandingPage" });
      }
    } else {
      // Menangani pesan kesalahan jika login tidak berhasil
      this.errorMessage = response.data.msg || "Unknown error";
    }
  } catch (error) {
    // Menangani kesalahan yang terjadi selama permintaan login
    console.error("There was an error logging in:", error);

    // Menampilkan pesan kesalahan yang relevan kepada pengguna
    if (error.response && error.response.data && error.response.data.msg) {
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
    loginWithGoogle() {
      // Redirect to Google OAuth URL
      window.location.href = "http://localhost:5000/auth/google/callback";
    },
  },
};
</script>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 500px; /* Limit width for larger screens */
  margin: auto; /* Center align content */
  padding: 20px; /* Add padding around content */
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.alert {
  padding: 10px;
  border-radius: 5px;
}

.form-check-input {
  margin-right: 5px;
}

.google-logo {
  width: 30px;
  height: 30px;
  cursor: pointer; /* Add cursor pointer to indicate it's clickable */
}

.btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  font-size: 1rem;
}

@media (max-width: 767px) {
  .form-control,
  .btn {
    padding: 8px;
    font-size: 0.9rem;
  }

  .btn {
    padding: 8px 40%;
  }
}
</style>
