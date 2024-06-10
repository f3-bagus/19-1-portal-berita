<template>
  <AuthLayout>
    <div class="content-wrapper">
      <h5 class="d-flex justify-content-center mb-5">Reset Password</h5>
      <input class="form-control" type="password" placeholder="Password" />
      <input
        class="form-control mt-4"
        type="password"
        placeholder="Confirm Password"
      />
      <div class="font-size-small mt-1 my-3">
        Minimal 8 kata dengan kombinasi huruf, angka dan simbol
      </div>
      <button
        type="button"
        variant="primary"
        class="mt-4 forgot-password-button"
      >
        Reset Password
      </button>
    </div>
  </AuthLayout>
</template>

<script>
import AuthLayout from "../components/Auth/AuthLayout.vue";

export default {
  name: "ResetPassword",
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
