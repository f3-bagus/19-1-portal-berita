<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <span class="text-danger">BERITA</span>
        <span class="text-light">.com</span>
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
        <form class="d-flex mx-auto search-bar">
          <div class="input-container">
            <input
              class="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn search-button" type="submit">
              <i class="bi bi-search search-icon"></i>
            </button>
          </div>
        </form>
        <ul class="navbar-nav ms-auto navbar-top">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page">
              Home
            </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contact Us</a>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link active profile-icon" aria-current="page">
              <i class="bi bi-person-circle"></i>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
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
</style>
