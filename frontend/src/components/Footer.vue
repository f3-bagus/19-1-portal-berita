<template>
  <footer class="bg-primary text-white py-4">
    <div class="container">
      <div class="row">
        <div class="col-6 mb-3 mb-md-0">
          <h2 class="text-uppercase font-weight-bold"><span style="color: #AB533C;">BERITA</span>.com</h2>
          <div class="d-flex justify-content-center justify-content-md-start mb-2">
            <div class="icon bg-light rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-instagram text-dark"></i>
            </div>
            <div class="icon bg-light rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-whatsapp text-dark"></i>
            </div>
            <div class="icon bg-light rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-linkedin text-dark"></i>

            </div>
            <div class="icon bg-light rounded-circle d-flex align-items-center justify-content-center">
              <i class="bi bi-twitter-x text-dark"></i>

            </div>
          </div>
          <p class="footer-desc mt-5">Berita terkini, <br>terpercaya, terHot sepanjang masa</p>
        </div>
        <div class="col-md-6">
          <h5 class="font-weight-bold">Category</h5>
          <div class="row mt-4">
            <div class="col-4" v-for="(categoryGroup, index) in chunkedCategories" :key="index">
              <ul class="list-unstyled">
                <li v-for="category in categoryGroup" :key="category.categories_id">
                  <a :href="`/category/${category.categories_id}`">{{ category.categories_name }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-5">
        <p>Copyright @ 2024 beritakom. All right reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import axios from '../../services/axios'; 

export default {
  name: 'Footer',
  data() {
    return {
      categories: [],
      errorMessage: '',
    };
  },
  computed: {
    chunkedCategories() {
      const chunkSize = 3;
      const chunks = [];
      for (let i = 0; i < this.categories.length; i += chunkSize) {
        chunks.push(this.categories.slice(i, i + chunkSize));
      }
      return chunks;
    },
  },
  async created() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('categories');
        this.categories = response.data; 
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.errorMessage = 'Failed to load categories';
      }
    },
  },
};
</script>

<style scoped>
footer {
  margin-top: 100px;
}

.bg-primary {
  background-color: #003d6b !important;
}

.text-danger {
  color: #dc3545 !important;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.icon {
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-dark {
  color: #000 !important;
  font-size: 20px;
}

.footer-desc {
  font-size: 20px;
}

.list-unstyled a {
  color: white;
  color: inherit;
  text-decoration: none;
}

.list-unstyled a:hover {
  text-decoration: underline;
}

ul.list-unstyled li {
  margin-bottom: 20px;
}
</style>
