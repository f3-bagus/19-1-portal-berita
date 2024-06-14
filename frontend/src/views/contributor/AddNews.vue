<template>
  <ContributorLayout>
    <div class="container margin-top mb-5">
      <h2>Create New Post</h2>
      <form @submit.prevent="submitPost">
        <div class="mb-3">
          <input type="text" class="form-control" placeholder="Enter title here" v-model="title" required>
        </div>
        <div class="mb-3">
          <label for="media" class="form-label">Post Content</label>
          <textarea class="form-control" rows="5" v-model="content" required></textarea>
        </div>
        <div class="mb-3">
          <label for="media" class="form-label">Add Media</label>
          <input type="file" class="form-control" id="media" @change="handleFileUpload" required>
        </div>
        <div class="mb-3">
          <select class="form-control" v-model="primaryCategory" required>
            <option disabled value="">Choose Category</option>
            <option v-for="category in categories" :key="category">{{ category }}</option>
          </select>
        </div>
        <div class="mb-3">
          <b><input type="text" class="form-control" placeholder="Enter an address" v-model="address"
              @blur="formatAddress" required></b>
        </div>
        <button type="submit" class="btn btn-danger" :disabled="!isFormValid" data-bs-toggle="modal"
          data-bs-target="#staticBackdrop">Submit News</button>
      </form>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="confirmModalLabel">Konfirmasi Validasi Data</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Apakah data atau berita yang dimasukkan valid? Setelah ini berita tidak bisa diedit dan bersifat
              permanen.</p>
            <div class="form-check mt-5">
              <input class="form-check-input" type="checkbox" id="dataValidCheckbox">
              <label class="form-check-label" for="dataValidCheckbox">
                Saya telah memastikan bahwa data atau berita yang dimasukkan valid.
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
            <button variant="primary" class="detail-button">Ya, Saya Mengerti</button>
          </div>
        </div>
      </div>
    </div>

  </ContributorLayout>
</template>

<script>
import ContributorLayout from "../../components/Contributor/ContributorLayout.vue";

export default {
  name: "AddNews",
  components: {
    ContributorLayout,
  },
  created() {
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'author') {
      this.$router.push({ name: 'LandingPage' });
    }
  },
  data() {
    return {
      title: '',
      content: '',
      category: '',
      primaryCategory: '',
      address: '',
      categories: ['Category 1', 'Category 2', 'Category 3']
    };
  },
  computed: {
    isFormValid() {
      return this.title && this.content && this.primaryCategory && this.address;
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      console.log(file);
    },
    formatAddress() {
      if (this.address && !this.address.includes('berita.com')) {
        this.address = `${this.address}, Berita.com`;
      }
    },
    submitPost() {
      // Tambahkan alamat di awal konten pos
      const formattedContent = `${this.address} ${this.content}`;

      const postData = {
        title: this.title,
        content: formattedContent,
        category: this.category,
        primaryCategory: this.primaryCategory
      };
      console.log(postData);
      // Di sini Anda bisa menambahkan kode untuk menangani pengiriman formulir, seperti melakukan panggilan API.
    }
  },
};
</script>

<style>
.margin-top {
  margin-top: 100px;
}

.news-post img {
  width: 25%;
  margin-right: 20px;
}

.title-mypost {
  align-items: center;
}
</style>