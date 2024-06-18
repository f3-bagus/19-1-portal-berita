<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <span class="text-danger">BERITA</span>
        <span class="text-light">.com</span>
      </a>
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
                <a class="dropdown-item" :href="`/category/${category.categories_id}`">
                  {{ category.categories_name }}
                </a>
              </li>
              <li v-if="errorMessage">
                <hr class="dropdown-divider" />
              </li>
              <li v-if="errorMessage">
                <a class="dropdown-item text-danger">{{ errorMessage }}</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link to="/contact-us" class="nav-link" aria-current="page" exact>
              Contact Us
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link profile-icon" aria-current="page" exact>
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
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:5000/categories");
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
  color: #90B2C9 !important;
}

.nav-link.profile-icon.router-link-active .bi-person-circle {
  color: #ffffff !important;
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
