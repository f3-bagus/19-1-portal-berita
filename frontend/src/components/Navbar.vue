<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <span class="text-danger">BERITA</span>
        <span class="text-light">.com</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <form class="d-flex mx-auto search-bar d-none d-lg-flex">
          <div class="input-container">
            <input class="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button class="btn search-button" type="submit">
              <i class="bi bi-search search-icon"></i>
            </button>
          </div>
        </form>
        <ul class="navbar-nav ms-auto navbar-top">
          <li class="nav-item">
            <router-link to="/" class="nav-link" aria-current="page" exact>
              Home
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false">
              Category
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li v-for="category in categories" :key="category.categories_id">
                <router-link class="dropdown-item" :to="`/category/${category.categories_id}`">
                  {{ category.categories_name }}
                </router-link>
              </li>
              <li v-if="errorMessage">
                <hr class="dropdown-divider" />
                <span class="dropdown-item text-danger">{{
                  errorMessage
                }}</span>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/contact-us" class="nav-link" exact>
              Contact Us
            </router-link>
          </li>
          <ul class="navbar-nav">
            <li v-if="isLoggedIn && onNotif" class="nav-item">
              <router-link class="nav-link notif-icon" to="/notification">
                <i class="bi bi-bell"></i>
                <span class="badge bg-danger">{{ notifications.length }}</span>
              </router-link>
            </li>
          </ul>
          <!-- <li v-if="isLoggedIn" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownNotification"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-bell"></i>
              <span class="badge bg-danger">{{ this.notifications.length }}</span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdownNotification"
            >
              <li><a class="dropdown-item" href="#">Notification 1</a></li>
              <li><a class="dropdown-item" href="#">Notification 2</a></li>
              <hr />
              <li>
                <a class="dropdown-item" :href="`/notification`">See more...</a>
              </li>
            </ul>
          </li> -->
          <li class="nav-item">
            <router-link to="/profile" class="nav-link profile-icon" exact>
              <i class="bi bi-person-circle"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "../../services/axios";

export default {
  name: "Navbar",
  data() {
    return {
      categories: [],
      errorMessage: "",
      isLoggedIn: false,
      notifications: [],
      isNotif: true,
    };
  },
  created() {
    this.fetchCategories();
    this.checkLoginStatus();
    this.fetchNotifications();
    this.checkNotif();
  },
  computed: {
    onNotif() {
      return localStorage.getItem('notif') ? true : false;
    },
  },
  methods: {
    async fetchNotifications() {
        
      try {
        if (localStorage.getItem('userRole')!=='author') {
        const response = await axios.get('/notifications');
        this.notifications = response.data;
      } else {
        this.notifications = [];
      }
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        if (error.response && error.response.status === 401) {
          this.errorMessage = "You are not authorized to fetch categories.";
        } else {
          this.errorMessage = "An error occurred while fetching categories.";
        }
      }
    },
    async checkLoginStatus() {
      try {
        const response = await axios.get("/me");
        this.isLoggedIn = true; // Set isLoggedIn to true if user is authenticated
      } catch (error) {
        console.error("Error checking login status:", error);
        this.isLoggedIn = false; // Set isLoggedIn to false if error or not logged in
      }
    },
    async checkNotif() {
      try {
        if (localStorage.getItem("notif")) {
          this.isNotif = true;
        }
      } catch (error) {
        console.error("Error checking :", error);
        this.isNotif = false;
      }
    }
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1030;
}

.navbar-top {
  align-items: center;
}

.container {
  display: flex;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
}

.input-container {
  position: relative;
}

.input-container .form-control {
  padding-right: 2.5rem;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}

.profile-icon .bi-person-circle {
  font-size: 1.5rem;
  color: #90b2c9 !important;
}

.nav-link.profile-icon.router-link-active .bi-person-circle {
  color: #ffffff !important;
}

.icon-bell {
  font-size: 1.5rem; 
}

.search-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #000;
  cursor: pointer;
}

.search-button:hover .search-icon {
  color: #9d9d9d;
}

.search-button:focus {
  outline: none;
}

.router-link-active {
  color: #ffffff !important;
}

.router-link-exact-active {
  font-weight: bold;
}

@media (max-width: 768px) {
  .navbar-collapse {
    text-align: left;
  }

  .navbar-nav {
    width: 100%;
  }

  .navbar-nav .nav-item {
    width: 100%;
    text-align: left;
  }

  .navbar-nav .nav-link {
    padding-left: 15px;
  }

  .navbar-nav .profile-icon {
    text-align: left;
  }
}
</style>
//navbar vue