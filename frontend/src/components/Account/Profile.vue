<template>
  <div class="profile-container">
    <h1 class="profile-heading">My Profile</h1>
    <hr class="profile-divider" />
    <div class="profile-content">
      <img src="../../assets/Profile.svg" size="10rem" class="profile-picture" />
      <div class="profile-details" v-if="isLoggedIn">
        <h3 class="profile-name">{{ username }}</h3>
        <p class="profile-email">{{ email }}</p>
        <div>
          <button variant="primary" class="profile-button" @click="editProfile">
            Edit Profile
          </button>
        </div>
        <div class="margin-b">
          <button variant="primary" class="profile-button" @click="logout">
            Logout
          </button>
        </div>
      </div>
      <div class="profile-details" v-else>
        <div class="margin-b">
          <button variant="primary" class="profile-button" @click="login">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-if="isLoggedIn">
    <h4 class="heading">Saved News</h4>
    <div class="saved-list">
      <div class="saved-news-wrapper">
        <div v-for="(news, index) in savedNews" :key="index" class="saved-container">
          <div class="image-container">
            <img :src="news.news.image_url" :alt="'Image ' + (index + 1)" />
          </div>
          <p class="saved-news">{{ news.news.title }}</p>
        </div>
      </div>
      <div class="button-more-saved">
        <div class="row button-more-content">
          <div class="button-more">
            <button class="show-more-button" @click="goToSavedNews">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
          <div>
            <p class="text-show">Show More</p>
          </div>
        </div>
      </div>
    </div>
    <h4 class="heading">Notification</h4>
    <div class="notif-container">
      <p>Notification for news</p>
      <div class="slider-container">
        <label class="switch">
          <input type="checkbox" v-model="onNotif" @change="toggleNotifications" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../../services/axios";

export default {
  name: "Profile",
  data() {
    return {
      isLoggedIn: false,
      notificationsEnabled: true,
      username: "",
      email: "",
      savedNews: [],
    };
  },
  computed: {
    onNotif() {
      return localStorage.getItem('notif') ? true : false;
    }
  },
  methods: {
    async fetchProfileData() {
      try {
        const response = await axios.get("me");
        if (response.data.success) {
          const { username, email } = response.data.user;
          this.username = username;
          this.email = email;
        } else {
          // Handle if success is false or other error cases
          console.error("Failed to fetch profile data:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Handle any network errors or other exceptions
      }
    },
    async fetchSavedNews() {
      try {
        const response = await axios.get("/saved-news");
        if (response.status === 200) {
          const savedNews = response.data;
          this.savedNews = savedNews.slice(0, 3);
        } else {
          console.error("Failed to fetch saved news:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching saved news:", error);
      }
    },
    async logout() {
      try {
        await axios.delete("http://localhost:5000/Logout");
        localStorage.removeItem("userRole");
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$router.push({ name: "Login" });
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    editProfile() {
      this.$router.push({ name: "EditProfile" });
    },
    goToSavedNews() {
      this.$router.push({ name: "SavedNews" });
    },
    toggleNotifications() {
      if (!localStorage.getItem("notif")) {
        localStorage.setItem("notif", 1);
        location.reload();
        this.notificationsEnabled = false;
      } else {
        localStorage.removeItem("notif");
        location.reload();
      }
      alert(
        `Notifications are now ${this.notificationsEnabled ? "enabled" : "disabled"
        }`
      );
    },
  },
  created() {
    // Check login status from local storage or another method
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      this.isLoggedIn = true;
      // Fetch profile data when component is created and user is logged in
      this.fetchProfileData();
      this.fetchSavedNews();
    }
  },
};
</script>

<style scoped>
.heading {
  font-weight: bold;
  margin-top: 70px;
}

.profile-container {
  text-align: center;
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 100px;
}

.profile-heading {
  color: #ab533c;
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
  margin-bottom: 20px;
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

.image-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-bottom: 10px;
}

.image-container img {
  max-width: 295px;
  height: auto;
  border-radius: 10px;
}

.saved-list {
  display: flex;
  justify-content: space-between;
}

.saved-news-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
}

.saved-news {
  font-weight: 600;
  font-size: 15px;
  margin: 0;
}

.saved-container {
  max-width: 295px;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

.text-show {
  font-size: 14px;
  padding-top: 10px;
  text-align: center;
}

.button-more {
  padding-left: 30px;
}

.button-more-saved {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-more-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.show-more-button {
  background-color: #085487;
  color: white;
  border: 0;
  border-radius: 100px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: auto;
}

.show-more-button:hover {
  background-color: #023362;
}

.notif-container {
  width: full;
  height: 110px;
  border-radius: 10px;
  border: 20px;
  border: 1px solid #ccc;
  margin-top: 25px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notif-container p {
  margin: 0;
  padding: 0;
}

.slider-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #0da13a;
}

input:checked+.slider:before {
  transform: translateX(26px);
}

@media (max-width: 426px) {
  .saved-list {
    flex-direction: column;
    align-items: center;
  }

  .saved-news-wrapper {
    flex-direction: column;
    gap: 5px;
  }

  .saved-container {
    max-width: 100%;
    margin: 0;
  }

  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .button-more-saved {
    margin-top: 20px;
  }
}

@media (max-width: 768px) {
  .saved-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .saved-news-wrapper {
    display: flex;
    flex-wrap: wrap;
  }

  .saved-container {
    flex-basis: 45%;
    max-width: 100%;
    margin: 0;
  }

  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .button-more-saved {
    flex-basis: 45%;
    margin-top: 20px;
  }
}
</style>
