<template>
  <div class="saved-news-container">
    <h1 class="saved-news-heading">{{ categoryTitle }}</h1>
    <hr class="saved-news-divider" />
    <div
      v-for="news in filteredNewsList"
      :key="news.news_id"
      class="saved-wrap"
    >
      <div class="saved-container">
        <div class="image-container">
          <img :src="news.image_url" alt="News Image" />
        </div>
        <div class="saved-news-text">
          <div class="row">
            <p class="saved-news" @click="handleNewsClick(news.news_id)">
              {{ news.title }}
            </p>
            <p class="time-news">{{ news.timeAgo }}</p>
            <p class="news-description">
              {{ news.content.slice(0, 150)
              }}{{ news.content.length > 150 ? "..." : "" }}
            </p>
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
      newsList: [],
      categoryTitle: "",
    };
  },
  computed: {
  filteredNewsList() {
    if (!this.newsList || this.newsList.length === 0) return [];
    const categoryId = parseInt(this.$route.params.id);
    return this.newsList.filter((news) => news.categories_id === categoryId);
  },
},
  methods: {
    async fetchNews() {
  try {
    const response = await axios.get("/news");
    this.newsList = response.data;
    // Urutkan berita berdasarkan createdAt dari yang terbaru ke terlama
    this.newsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    this.fetchCategoryTitle();
  } catch (error) {
    console.error("Error fetching news:", error);
  }
},

    async fetchCategoryTitle() {
      try {
        const categoryId = this.$route.params.id;
        const response = await axios.get(`/categories/${categoryId}`);
        this.categoryTitle = response.data.categories_name;
      } catch (error) {
        console.error("Error fetching category title:", error);
        this.categoryTitle = "Category Not Found";
      }
    },
    handleNewsClick(newsId) {
      // Navigate to news detail page
      this.$router.push({ name: "News", params: { id: newsId } });
    },
  },
  watch: {
    "$route.params.id": "fetchNews",
  },
  mounted() {
    this.fetchNews();
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
  flex-grow: 1; /* Ensures news text takes remaining space */
}

.image-container img {
  max-width: 295px;
  height: auto;
  border-radius: 10px;
}

.saved-news {
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
}

.time-news {
  font-size: 12px;
}

.news-description {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
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
//category news