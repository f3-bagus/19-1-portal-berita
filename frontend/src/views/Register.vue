<template>
  <AuthLayout>
    <div class="content-wrapper">
      <h6 class="d-flex justify-content-center mb-4">
        Daftar ke Berita.com dan temukan berita terkini!
      </h6>
      <div v-if="message" :class="`alert ${messageType}`" role="alert">
        {{ message }}
      </div>
      <form @submit.prevent="registerUser">
        <input
          class="form-control"
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="form-control my-2"
          type="text"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="form-control mt-2"
          type="password"
          placeholder="Kata Sandi"
          v-model="password"
        />
        <input
          class="form-control mt-2"
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

        <button type="submit" class="btn btn-secondary mt-1">Daftar</button>
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
      message: "", // Message to show success or error
      messageType: "", // Type of message (success or error)
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
        this.showMessage("Semua bidang harus diisi", "alert-danger");
        return;
      }

      // Validasi konfirmasi password
      if (this.password !== this.confPassword) {
        this.showMessage("Konfirmasi kata sandi tidak sesuai", "alert-danger");
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
          this.showMessage(response.data.msg, "alert-success");
          setTimeout(() => {
            this.$router.push({ name: "Login" }); // Redirect to Login page
          }, 2000); // Wait for 2 seconds before redirecting
        } else {
          this.showMessage(
            "Registration failed: " + (response.data.msg || "Unknown error"),
            "alert-danger"
          );
        }
      } catch (error) {
        console.error("There was an error registering:", error);
        if (error.response && error.response.data && error.response.data.msg) {
          this.showMessage(
            "Registration failed: " + error.response.data.msg,
            "alert-danger"
          );
        } else {
          this.showMessage(
            "An error occurred. Please try again.",
            "alert-danger"
          );
        }
      }
    },
    showMessage(msg, type) {
      this.message = msg;
      this.messageType = type;
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    loginWithGoogle() {
      window.location.href = "http://localhost:5000/auth/google";
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

.google-logo {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.font-size-small {
  font-size: 0.8rem;
}

.alert {
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  text-align: center;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 1rem;
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
