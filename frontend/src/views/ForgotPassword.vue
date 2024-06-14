<template>
  <AuthLayout>
    <div class="content-wrapper">
      <!-- Alert Section -->
      <div v-if="message" :class="`alert ${messageType}`" role="alert">
        {{ message }}
      </div>
      <h6 class="justify-content-center mb-4">
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
          {
            email: this.email,
          }
        );

        if (response.data.success) {
          this.showMessage(
            "Email reset password telah dikirim.",
            "alert-success"
          );
        } else {
          this.showMessage(
            "Gagal mengirim email reset password. Silakan coba lagi.",
            "alert-danger"
          );
        }
      } catch (error) {
        console.error("Error sending reset password email:", error);
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
