<template>
  <div class="container margin-top">
    <div class="row">
      <div class="col-lg-12 col-12">
        <h5 class="title mb-4">Headline News</h5>
        <div class="image-news">
          <img :src="latestHeadline.image_url" alt="ImageNews">
          <div class="image-caption">
            <b>
              <div class="title-caption">{{ latestHeadline.title }}</div>
            </b>
            <div class="news-container mt-3">
              <h5 class="sub-caption">Berita.news</h5>
              <h6 class="time-news">{{ formatDate(latestHeadline.createdAt) }}</h6>
              <button variant="primary" class="detail-button" @click="handleNewsClick(latestHeadline.news_id)">
                Selengkapnya
              </button>
            </div>
          </div>
        </div>

        <div class="news-feed mt-5">
          <div class="news-feed-title d-flex justify-content-between">
            <h5 class="title">News Feed</h5>
          </div>
          <div class="news-feeds-list mt-4">
            <div class="card-news-feed hover-pointer" v-for="news in latestNews" :key="news.id"
              @click="handleNewsClick(news.news_id)">
              <img :src="news.image_url" class="image-news-feed" :alt="news.title">
              <div class="title-terpopuler mt-2">
                <h5>{{ news.title }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="category-news mt-5">
      <div class="category-content" v-for="category in newsByCategory" :key="category.id">
        <div class="title-content d-flex justify-content-between mt-5">
          <h5 class="title">{{ category.categories_name }}</h5>
          <i class="bi bi-arrow-right-circle-fill"></i>
        </div>
        <hr class="divider">
        <div class="news d-flex" v-for="news in category.news" :key="news.id">
          <img :src="news.image_url" class="image-news-feed" alt="ImageNews">
          <div class="news-title">
            <h2>{{ news.title }}</h2>
            <h6 class="news-time text-secondary">{{ formatDate(news.createdAt) }}</h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../services/axios";
import moment from "moment";

export default {
  name: "LandingPage",
  data() {
    return {
      latestHeadline: {},
      latestNews: [],
      categories: [],
      newsByCategory: [],
      isLoggedIn: false, // Assuming you have a mechanism to check user login status
    };
  },
  methods: {
     async fetchNews() {
      try {
        const response = await axios.get("/news");
        this.newsList = response.data;
        // Urutkan berita berdasarkan createdAt dari yang terbaru ke terlama
        this.newsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Filter berita yang harus ditampilkan sesuai statusnya
        this.latestHeadline = this.newsList.find(news => news.status === 'published');
        this.latestNews = this.newsList.filter(news => news.status === 'published').slice(1, 13);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    async fetchNewsUser() { //get news user yang blm login jadi dilandingpage bisa menampilan news bagi user yang blm login
      try {
        const response = await axios.get("/news/user");
        this.newsList = response.data;
        // Urutkan berita berdasarkan createdAt dari yang terbaru ke terlama
        this.newsList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        this.latestHeadline = this.newsList[0];
        this.latestNews = this.newsList.slice(1, 13);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("/categories");
        this.categories = response.data;
        await this.fetchNewsByCategory();
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
    async fetchNewsByCategory() {
      try {
        const categoryPromises = this.categories.map(async (category) => {
          const response = await axios.get(`/news?category=${category.id}`);
          // category.news = response.data.slice(0, 1);
          return { ...category, news: response.data.filter(news => news.categories_id === category.categories_id).slice(0, 1) }; // Returning the full category with news
        });
        this.newsByCategory = await Promise.all(categoryPromises);
        console.log(this.newsByCategory)// Storing categorized news in the new variable
      } catch (error) {
        console.error("Error fetching news by category:", error);
      }
    },


    handleNewsClick(newsId) {
      this.$router.push({ path: `/news/${newsId}` });
    },
    formatDate(dateString) {
      const date = moment(dateString);
      const now = moment();
      const diffMinutes = now.diff(date, 'minutes');
      const diffHours = now.diff(date, 'hours');

      if (diffMinutes < 60) {
        return `${diffMinutes} menit yang lalu`;
      } else if (diffHours < 24) {
        return `${diffHours} jam yang lalu`;
      } else {
        return date.format('dddd, D MMMM YYYY HH.mm [WIB]');
      }
    },
  },
  mounted() {
    this.fetchNews();
    this.fetchCategories();
  },
};
</script>



<style>
.card-news-feed {
  border: none;
  flex: 0 0 calc(25% - 10px);
  box-sizing: border-box;
  transition: transform 0.3s ease-in-out;
}

.card-news-feed:hover {
  transform: translateY(-5px);
  cursor: pointer;
}

.hover-pointer {
  cursor: pointer;
}

.card-news-feed img {
  width: 100%;
  height: 70%;
}

.vertical-divider {
  border-left: 1px solid #000;
  height: 100%;
  max-width: 0;
}

.side-right {
  padding: 0;
  display: flex;
  justify-content: end;
}

.gap-divider {
  gap: 15px;
}

.margin-top {
  margin-top: 100px;
}

.detail-button {
  background-color: #085487;
  color: white;
  border: 0;
  border-radius: 8px;
  padding: 8px 20px;
  transition: background-color 0.3s;
}

.detail-button:hover {
  background-color: #023362;
}

.title {
  color: #AB533C;
  font-size: 25px;
}

.image-news {
  position: relative;
}

.image-news img {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.image-caption {
  position: absolute;
  bottom: 40px;
  padding: 0 40px 0;
  color: #ffffff;
}

.title-caption {
  font-size: 36px;
  line-height: 45px;
  padding-bottom: 10px;
}

.sub-caption {
  color: #AB533C;
  margin-right: 20px;
}

.image-news-feed {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 0;
}

.news-feeds-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 20px;
  column-gap: 10px;
}

.card-news-feed {
  border: none;
  flex: 0 0 calc(25% - 10px);
  box-sizing: border-box;
}

.card-terpopuler {
  width: 100%;
  border: none;
}

.time-news {
  margin-right: 20px;
}

.news-container {
  display: flex;
  align-items: center;
}

.list-terpopuler {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.title-terpopuler h5 {
  font-size: 14px;
}

.news-feed-title {
  align-items: center;
}

.category-content hr {
  width: 25%;
}

.title-content {
  width: 25%;
  align-items: center;
}

.news-time {
  margin-top: 20px;
}

.title-content i {
  font-size: 25px;
}

.news {
  align-items: center;
  gap: 40px;
}

.news img {
  width: 35%;
}

.divider {
  margin: 5px 0 20px 0;
}

@media only screen and (min-width: 1024px) {
  .custom-video-width {
    width: 700px;
    height: 400px;
    margin: 0 auto;
    border-radius: 10px;
  }
}

@media only screen and (max-width: 1024px) {
  .vertical-divider {
    display: none;
  }

  .list-terpopuler {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 25px;
  }

  .side-right {
    padding-top: 40px;
    display: flex;
    justify-content: start;
  }

  .gap-divider {
    gap: 0;
  }

  .custom-video-width {
    border-radius: 10px;
  }

  .category-content hr {
    width: 50%;
  }

  .title-content {
    width: 50%;
    align-items: center;
  }
}

@media only screen and (max-width: 767px) {
  .image-caption {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
  }

  .title-caption {
    display: none;
  }

  .sub-caption {
    display: none;
  }

  .time-news {
    display: none;
  }

  .news-feeds-list {
    flex-direction: column;
    row-gap: 25px;
  }

  .card-terpopuler {
    width: 100%;
  }

  .vertical-divider {
    display: none;
  }

  .side-right {
    padding-top: 40px;
    display: flex;
    justify-content: start;
  }

  .list-terpopuler {
    gap: 25px;
  }

  .gap-divider {
    gap: 0;
  }

  .news {
    flex-direction: column;
    gap: 15px;
  }

  .news-time {
    margin-top: 10px;
  }

  .title-content {
    width: 100%;
    align-items: center;
  }

  .category-content hr {
    width: 100%;
  }

  .news img {
    width: 100%;
  }

  .custom-video-width {
    border-radius: 10px;
  }
}
</style>
