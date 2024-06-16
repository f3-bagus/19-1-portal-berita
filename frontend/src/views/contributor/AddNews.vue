<template>
  <ContributorLayout>
    <div class="container margin-top mb-5">
      <h2>Create New Post</h2>
      <form @submit.prevent="submitPost">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Enter title here"
            v-model="title"
            required
          />
        </div>
        <div class="mb-3">
          <label for="media" class="form-label">Post Content</label>
          <textarea
            class="form-control"
            rows="5"
            v-model="content"
            required
          ></textarea>
        </div>
        <div class="mb-3">
          <label for="image-url" class="form-label">Image URL</label>
          <input
            type="text"
            class="form-control"
            id="image-url"
            v-model="imageUrl"
            @input="updateImagePreview"
            placeholder="Enter image URL"
          />
          <div v-if="imageUrl && isValidUrl(imageUrl)" class="mt-3">
            <img
              ref="imagePreview"
              :src="imageUrl"
              alt="Image Preview"
              class="img-thumbnail"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="primaryCategory" class="form-label">Category</label>
          <select class="form-control" v-model="primaryCategory" required>
            <option disabled value="">Choose Category</option>
            <option
              v-for="category in categories"
              :key="category.categories_id"
              :value="category.categories_id"
            >
              {{ category.categories_name }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-danger" :disabled="!isFormValid">
          Submit News
        </button>
      </form>
    </div>
  </ContributorLayout>
</template>

<script>
import axios from "../../../services/axios";
import ContributorLayout from "../../components/Contributor/ContributorLayout.vue";

export default {
  name: "AddNews",
  components: {
    ContributorLayout,
  },
  data() {
    return {
      title: "",
      content: "",
      primaryCategory: "",
      imageUrl: "",
      categories: [],
    };
  },
  computed: {
    isFormValid() {
      return (
        this.title && this.content && this.primaryCategory && this.imageUrl
      );
    },
  },
  methods: {
    isValidUrl(url) {
      try {
        new URL(url);
        return true;
      } catch (_) {
        return false;
      }
    },
    updateImagePreview() {
      if (this.isValidUrl(this.imageUrl)) {
        this.$refs.imagePreview.src = this.imageUrl;
      } else {
        this.$refs.imagePreview.src = "";
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        this.errorMessage = "An error occurred while fetching categories.";
      }
    },
    async submitPost() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found, please login again");
        }

        const postData = {
          title: this.title,
          content: this.content,
          categories_id: this.primaryCategory,
          image_url: this.imageUrl,
        };

        const response = await axios.post("/news", postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("News submitted successfully:", response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access - redirecting to login");
          this.$router.push("/login");
        } else {
          console.error("Error submitting news:", error);
        }
      }
    },
  },
  created() {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "author") {
      this.$router.push({ name: "LandingPage" });
    }
    this.fetchCategories();
  },
};
</script>

<style>
.margin-top {
  margin-top: 100px;
}

.img-thumbnail {
  width: 100%;
  max-width: 200px;
  height: auto;
}
</style>
