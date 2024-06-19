<template>
  <div class="saved-news-container">
    <h1 class="saved-news-heading">Saved News</h1>
    <hr class="saved-news-divider" />
    <div class="saved-wrap">
      <div v-for="savedItem in savedNews" :key="savedItem.saved_id" class="saved-container">
        <div class="image-container">
          <img :src="savedItem.news.image_url" :alt="savedItem.news.title">
        </div>
        <div class="saved-news-text">
          <div class="row">
            <p class="saved-news">{{ savedItem.news.title }}</p>
            <p class="time-news">{{ formatDate(savedItem.savedAt) }}</p>
            <div class="button-more">
              <button class="more-button" @click="toggleDropdown(savedItem.saved_id)">
                <i class="bi bi-three-dots button-icon"></i>
              </button>
              <div v-if="dropdownOpen === savedItem.saved_id" class="dropdown-menu">
                <button @click="deleteNews(savedItem.saved_id)" class="dropdown-item">
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
import axios from '../../services/axios';
import moment from 'moment';

export default {
  name: 'SavedNews',
  data() {
    return {
      savedNews: [],
      dropdownOpen: null,
    };
  },
  methods: {
    async fetchSavedNews() {
      try {
        const response = await axios.get('saved-news');
        this.savedNews = response.data;
      } catch (error) {
        console.error('Error fetching saved news:', error);
      }
    },
    toggleDropdown(savedId) {
      this.dropdownOpen = this.dropdownOpen === savedId ? null : savedId;
    },
    formatDate(dateString) {
      return moment(dateString).format('dddd, D MMMM YYYY HH.mm [WIB]');
    },
    async deleteNews(savedId) {
      try {
        await axios.delete(`/saved-news/${savedId}`);
        this.savedNews = this.savedNews.filter(item => item.saved_id !== savedId);
        alert('Berita berhasil dihapus!');
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Gagal menghapus berita.');
      }
      this.dropdownOpen = null;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.dropdownOpen = null;
      }
    }
  },
  mounted() {
    this.fetchSavedNews();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>

<style scoped>
.saved-news-container {
  padding-left: 10%;
  padding-right: 10%;
  padding-top: 100px;
}

.saved-news-heading {
  color: #AB533C;
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
