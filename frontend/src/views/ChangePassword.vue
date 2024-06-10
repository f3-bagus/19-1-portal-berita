<template>
  <div class="row">
    <div
      class="vh-100 col bg-auth d-flex justify-content-center align-items-center"
    >
      <div class="profile-content">
        <img
          src="https://via.placeholder.com/150"
          size="10rem"
          class="profile-picture"
        />
        <div class="profile-details">
          <h3 class="profile-name">Username</h3>
          <p class="profile-email">user@mail.com</p>
        </div>
      </div>
    </div>
    <div class="mx-5 col d-flex justify-content-center align-items-center">
      <div class="content-wrapper">
        <h5 class="d-flex justify-content-center mb-5">Change Password</h5>
        <p class="mb-1">Masukkan Password Lama Anda</p>
        <input
          class="form-control mb-4"
          type="password"
          placeholder="Password"
        />
        <p class="mb-1">Masukkan Password Baru Anda</p>
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
          class="mt-3 forgot-password-button"
        >
          Ubah
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePassword",
};
</script>

<style>
body,
html {
  overflow-x: hidden;
  height: 100%;
}

.bg-auth {
  background-image: url("../assets/AuthBlueBg.svg");
  background-size: cover;
  background-repeat: no-repeat;
}

.title-font {
  font-size: 3rem;
}
.profile-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.profile-details {
  text-align: center;
}

.profile-name {
  font-weight: bold;
  color: #ffffff;
}

.profile-email {
  color: #ffffff;
  margin-bottom: 30px;
}

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
