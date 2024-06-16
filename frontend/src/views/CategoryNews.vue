<template>
  <div class="saved-news-container">
    <h1 class="saved-news-heading">{{ categoryTitle }}</h1>
    <hr class="saved-news-divider" />
    <div v-for="news in filteredNewsList" :key="news.id" class="saved-wrap">
      <div class="saved-container">
        <div class="image-container">
          <img :src="news.image_url" alt="News Image" />
        </div>
        <div class="saved-news-text">
          <div class="row">
            <p class="saved-news">{{ news.title }}</p>
            <p class="time-news">{{ news.timeAgo }}</p>
            <div class="button-more">
              <button class="more-button" @click="toggleDropdown(news.id)">
                <i class="bi bi-three-dots button-icon"></i>
              </button>
              <div v-if="dropdownOpenId === news.id" class="dropdown-menu">
                <button @click="shareNews" class="dropdown-item">
                  <i class="bi bi-share-fill"></i> Bagikan Berita
                </button>
                <button @click="deleteNews(news.id)" class="dropdown-item">
                  <i class="bi bi-trash-fill"></i> Hapus Berita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="saved-news-divider-bottom" />
    </div>
  </div>
</template>

<script>
import axios from "../../services/axios";

export default {
  name: "CategoryNews",
  data() {
    return {
      dropdownOpenId: null,
      newsList: [],
      categoryTitle: "",
    };
  },
  computed: {
    filteredNewsList() {
      if (!this.newsList || this.newsList.length === 0) return [];

      // Filter news based on the current route param id
      const categoryId = parseInt(this.$route.params.id);
      return this.newsList.filter((news) => news.categories_id === categoryId);
    },
  },
  methods: {
    toggleDropdown(newsId) {
      this.dropdownOpenId = this.dropdownOpenId === newsId ? null : newsId;
    },
    shareNews() {
      alert("Berita akan dibagikan!");
      this.dropdownOpenId = null;
    },
    async deleteNews(newsId) {
      try {
        await axios.delete(`/news/${newsId}`);
        alert("Berita telah dihapus!");
        this.fetchNews(); // Refresh news list after deletion
      } catch (error) {
        console.error("Error deleting news:", error);
      } finally {
        this.dropdownOpenId = null;
      }
    },
    async fetchNews() {
      try {
        const response = await axios.get("/news");
        this.newsList = response.data;
        this.categoryTitle = `Category ${this.$route.params.id}`; // You can set this to a meaningful title
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownOpenId = null;
      }
    },
  },
  watch: {
    "$route.params.id": "fetchNews",
  },
  mounted() {
    this.fetchNews();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style scoped>
/* Add your styles here */
.saved-news-container {
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 100px;
}

.saved-news-heading {
  color: #ab533c;
  font-weight: 700;
}

.saved-news-divider {
  border: 1px solid #ccc;
  margin-top: 2rem;
  margin-bottom: 40px;
}

.saved-news-divider-bottom {
  border: 1px solid #ccc;
}

.saved-container {
  max-width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  gap: 30px;
}

.saved-wrap {
  margin-bottom: 40px;
}

.saved-news-text {
  display: flex;
  align-items: center;
}

.image-container img {
  max-width: 295px;
  height: auto;
  border-radius: 10px;
}

.saved-news {
  font-weight: 700;
  font-size: 20px;
}

.time-news {
  font-size: 12px;
}

.button-more {
  display: flex;
  justify-content: end;
  position: relative;
}

.more-button {
  border: none;
  background-color: transparent;
  transition: color 0.3s;
  width: 40px;
  height: 40px;
}

.button-icon {
  font-size: 1.2rem;
  color: #000;
}

.button-icon:hover {
  color: #023362;
}

.dropdown-menu {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: flex;
  flex-direction: column;
}

.dropdown-item {
  padding: 10px 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  text-align: left;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.dropdown-item i {
  font-size: 1.2rem;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

@media (max-width: 426px) {
  .saved-container {
    flex-direction: column;
    gap: 5px;
  }

  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
}

@media (max-width: 768px) {
  .image-container img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
  }
}
</style>
