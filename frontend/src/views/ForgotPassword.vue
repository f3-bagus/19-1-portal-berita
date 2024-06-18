<template>
  <AuthLayout>
    <div class="content-wrapper">
      <!-- Alert Section -->
      <div v-if="message" :class="`alert ${messageType}`" role="alert">
        {{ message }}
      </div>
      <h6 class="justify-content-center mb-5">
        Lupa Password? Kirim Link Melalui email
      </h6>
      <div class="mb-3 d-flex justify-content-center">
        Masukkan Email Terdaftar Anda
      </div>
      <input
        v-model="email"
        class="form-control"
        type="text"
        placeholder="Email"
      />
      <button @click="sendResetEmail" class="mt-4 forgot-password-button">
        Kirim
      </button>
      <div class="d-flex justify-content-center mt-3">
        <span class="me-1"> Kembali ke</span
        ><span class="text-danger" @click="login">Login</span>
        <span class="ms-1">Page</span>
      </div>
    </div>
  </AuthLayout>
</template>

<script>
import axios from "axios";
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "ForgotPassword",
  components: {
    AuthLayout,
  },
  data() {
    return {
      email: "",
      message: "", // Message to show success or error
      messageType: "", // Type of message (success or error)
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    async sendResetEmail() {
      try {
        const response = await axios.post(
          "http://localhost:5000/forget-password",
          { email: this.email }
        );

        if (response.data.success) {
          this.showMessage(
            "Silakan reset password Anda melalui halaman reset password.",
            "alert-success"
          );
          // Redirect to reset password page with token
          this.$router.push({
            name: "ResetPassword",
            query: { token: response.data.resetToken },
          });
        } else {
          this.showMessage(
            "Gagal mengirim permintaan reset password. Silakan coba lagi.",
            "alert-danger"
          );
        }
      } catch (error) {
        console.error("Error sending reset password request:", error);
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

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 400px; /* Limit width for larger screens */
  margin: auto; /* Center align content */
  padding: 20px; /* Add padding around content */
}

.forgot-password-button {
  min-width: 300px;
  background-color: #085487;
  color: white;
  border: 0;
  border-radius: 8px;
  padding: 10px;
  margin: 10px auto;
  transition: background-color 0.3s;
  cursor: pointer;
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

.form-control {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

@media (max-width: 767px) {
  .content-wrapper {
    padding: 12px; /* Adjust padding for smaller screens */
  }

  .forgot-password-button {
    min-width: auto; /* Allow button to shrink on smaller screens */
    width: 100%;
    padding: 10px;
  }
}
</style>
