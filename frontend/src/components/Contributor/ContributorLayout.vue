<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <span class="text-light">Contributor</span>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto navbar-top">
          <li class="nav-item">
            <router-link
              to="/contributor"
              class="nav-link"
              aria-current="page"
              exact
            >
              My Post
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/add-news"
              class="nav-link"
              aria-current="page"
              exact
            >
              Add News
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/author-profile"
              class="nav-link profile-icon"
              aria-current="page"
              exact
            >
              <i class="bi bi-person-circle"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <slot />
</template>

<script>
export default {
  name: "ContributorLayout",
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

.profile-icon .bi-person-circle {
  font-size: 1.5rem;
  color: #90b2c9 !important;
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
</style>
