<template>
  <AuthLayout>
    <div class="content-wrapper">
      <!-- Alert Section -->
      <div v-if="message" :class="`alert ${messageType}`" role="alert">
        {{ message }}
      </div>
      <h5 class="d-flex justify-content-center mb-5">Reset Password</h5>
      <input
        v-model="newPassword"
        class="form-control"
        type="password"
        placeholder="Password"
      />
      <input
        v-model="confPassword"
        class="form-control mt-4"
        type="password"
        placeholder="Confirm Password"
      />
      <div class="font-size-small mt-1 my-3">
        Minimal 8 karakter dengan kombinasi huruf, angka, dan simbol
      </div>
      <button
        @click="resetPassword"
        type="button"
        class="mt-4 forgot-password-button"
      >
        Reset Password
      </button>
    </div>
  </AuthLayout>
</template>

<script>
import axios from "axios";
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "ResetPassword",
  components: {
    AuthLayout,
  },
  data() {
    return {
      newPassword: "",
      confPassword: "",
      message: "",
      messageType: "",
    };
  },
  methods: {
    async resetPassword() {
      const resetToken = this.$route.query.token; // Ambil token dari query params
      try {
        const response = await axios.post(
          "http://localhost:5000/reset-password",
          {
            resetToken,
            newPassword: this.newPassword,
            confPassword: this.confPassword,
          }
        );

        if (response.data.success) {
          this.showMessage("Password berhasil direset", "alert-success");
          // Redirect to login page after a successful password reset
          setTimeout(() => {
            this.$router.push({ name: "Login" });
          }, 2000); // Redirect after 2 seconds
        } else {
          this.showMessage(
            response.data.msg || "Gagal mereset password. Silakan coba lagi.",
            "alert-danger"
          );
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        this.showMessage(
          "Terjadi kesalahan. Silakan coba lagi.",
          "alert-danger"
        );
      }
    },
    showMessage(msg, type) {
      this.message = msg;
      this.messageType = type;
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
</style>
