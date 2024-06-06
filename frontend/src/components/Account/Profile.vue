<template>
  <div class="profile-container">
    <h1 class="profile-heading">My Profile</h1>
    <hr class="profile-divider"/>
    <div class="profile-content">
      <img src="https://via.placeholder.com/150" size="10rem" class="profile-picture" />
      <div class="profile-details">
        <h3 class="profile-name">Nama User</h3>
        <p class="profile-email">user@mail.com</p>
        <div>
          <button variant="primary" class="profile-button" @click="editProfile">Edit Profile</button>
        </div>
        <div class="margin-b">
          <button variant="primary" class="profile-button" @click="changePassword">Change Password</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  methods: {
    editProfile() {
      alert('Edit Profile clicked');
    },
    changePassword() {
      alert('Change Password clicked');
    }
  }
}
</script>

<style scoped>
.profile-container {
  text-align: center;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 100px;
}

.profile-heading {
  color: #AB533C;
  font-weight: 700;
}

.profile-divider {
  border: 1px solid #ccc;
  margin-top: 2rem;
  margin-bottom: 2rem;
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

.margin-b {
  margin-bottom: 50px;
}

.profile-details {
  text-align: center;
}

.profile-name {
  font-weight: bold;
}

.profile-email {
  color: #6c757d;
  margin-bottom: 30px;
}

.profile-button {
  min-width: 150px;
  background-color: #085487;
  color: white;
  border: 0;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 5px auto;
  transition: background-color 0.3s;
}

.profile-button:hover {
  background-color: #023362;
}
</style>
