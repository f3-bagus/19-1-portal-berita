<template>
  <ContributorLayout>
    <div class="container margin-top mb-5">
      <div class="title-mypost d-flex justify-content-between">
        <h4>My Post</h4>
        <button class="btn btn-primary" @click="addNews">Add News</button>
      </div>
      <hr />
      <div class="contributor-news mt-5" v-if="newsList.length">
        <div
          class="news-post d-flex"
          v-for="news in newsList"
          :key="news.news_id"
        >
          <img :src="news.image_url" alt="" />
          <div class="news-title">
            <h5>{{ news.title }}</h5>
            <span class="text-secondary mt-4"
              >Published -
              <span>{{ formatDate(news.createdAt) }}</span>
            </span>
            <div>
              <button variant="primary" class="detail-button mt-2">
                View Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No posts available.</p>
      </div>
    </div>
  </ContributorLayout>
</template>

<script>
import ContributorLayout from "../../components/Contributor/ContributorLayout.vue";
import axios from "axios";

export default {
  name: "Contributor",
  components: {
    ContributorLayout,
  },
  data() {
    return {
      newsList: [],
    };
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.patch(
          `news/author/${this.$route.params.authorId}`
        );
        console.log("API Response:", response.data); // Tambahkan log untuk memeriksa respons API
        this.newsList = response.data;
      } catch (error) {
        console.error("Error fetching news:", error); // Log kesalahan
        this.newsList = []; // Kosongkan daftar berita jika terjadi kesalahan
      }
    },
    addNews() {
      this.$router.push({ name: "AddNews" });
    },
    formatDate(dateString) {
      try {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          throw new Error("Invalid date");
        }
        return date.toLocaleDateString(undefined, options);
      } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
      }
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>

<style>
.margin-top {
  margin-top: 100px;
}

.title-mypost button {
  --bs-btn-bg: #ff3300 !important;
  --bs-btn-hover-bg: #c24121 !important;
  --bs-btn-active-bg: #c2412;
  border: 0 !important;
  color: white;
}

.news-post img {
  width: 25%;
  margin-right: 20px;
  border-radius: 10px;
}

.title-mypost {
  align-items: center;
}
</style>
