<template>
  <div class="container margin-top">
    <div class="breadcrumbs">
      <span>News > Nasional</span>
    </div>
    <div class="author">{{ author }}</div>
    <div class="metadata">
      <div class="date">{{ date }}</div>
    </div>
    <img :src="imageUrl" class="image-news" alt="News Image" />
    <h1 class="title-news">{{ title }}</h1>
    <div class="content">
      <p>{{ content }}</p>
    </div>
    <div class="button-container">
      <button class="circle-button" @click="showShareModal">
        <i class="bi bi-share-fill button-icon"></i>
      </button>
      <button class="circle-button" @click="saveToSavedNews">
        <i class="bi bi-bookmark-fill button-icon"></i>
      </button>
    </div>
    <h4 class="heading">Comments</h4>
    <div class="container-comment">
      <div class="add-comment">
        <p class="title-comment">Tulis Komentar Anda</p>
        <textarea
          v-model="newComment"
          class="comment-textarea"
          placeholder="Add a comment..."
        ></textarea>
        <button class="send-button" @click="sendComment">Kirim</button>
      </div>
    </div>
    <div v-for="comment in comments" :key="comment.comment_id" class="comments">
      <div>
        <img
          src="https://via.placeholder.com/125"
          class="profile-picture"
          alt="Profile Picture"
        />
      </div>
      <div class="content-comment">
        <div class="title-time">
          <p class="username-comment">{{ comment.user.username }}</p>
          <p class="time-comment">{{ formatDate(comment.createdAt) }}</p>
        </div>
        <p class="user-comment">{{ comment.comment_text }}</p>
      </div>
    </div>
    <!-- Share Modal -->
    <div v-if="isShareModalVisible" class="share-modal">
      <div class="share-modal-content">
        <button class="btn btn-danger mb-3 close-button" @click="hideShareModal">
          <i class="bi bi-x-lg"></i>
        </button>
        <div class="share-options">
          <button class="share-option" @click="shareToFacebook"><i class="bi bi-facebook"></i> Facebook</button>
          <button class="share-option" @click="shareToTwitter"><i class="bi bi-twitter"></i> Twitter</button>
          <button class="share-option" @click="shareToWhatsApp"><i class="bi bi-whatsapp"></i> WhatsApp</button>
          <button class="share-option" @click="shareToLine"><i class="bi bi-line"></i> Line</button>
          <button class="share-option" @click="shareToTelegram"><i class="bi bi-telegram"></i> Telegram</button>
          <button class="share-option" @click="copyLink"><i class="bi bi-link-45deg"></i> Copy Link</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../services/axios';
import moment from "moment";

export default {
  name: "News",
  data() {
    return {
      title: '',
      content: '',
      author: '',
      imageUrl: '',
      date: '',
      newComment: "",
      comments: [],
      isShareModalVisible: false,
    };
  },
  created() {
    this.fetchNews();
    this.fetchComments();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get(`http://localhost:5000/news/${this.$route.params.id}`);
        const data = response.data;
        this.title = data.title;
        this.content = data.content;
        this.imageUrl = data.image_url;
        this.date = this.formatDate(data.createdAt);
        this.author = data.author.username;
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    },
    async fetchComments() {
      try {
        const response = await axios.get(
          `http://localhost:5000/comments/${this.$route.params.id}`
        );
        this.comments = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async sendComment() {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await axios.post(
          "http://localhost:5000/comments",
          {
            news_id: this.$route.params.id,
            comment_text: this.newComment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        this.newComment = "";
        this.fetchComments();
      } catch (error) {
        console.error("Error sending comment:", error);
      }
    },
    formatDate(dateString) {
      return moment(dateString).format('dddd, D MMMM YYYY HH.mm [WIB]');
    },
    async saveToSavedNews() {
      try {
        const response = await axios.post('saved-news', {
          news_id: this.$route.params.id
        });

        // Handle response jika perlu
        console.log(response.data); // Misalnya, menampilkan pesan sukses

        alert('Berita berhasil disimpan!');
      } catch (error) {
        console.error('Error saving news:', error);
        alert('Gagal menyimpan berita. Silakan coba lagi.');
      }
    },
    showShareModal() {
      this.isShareModalVisible = true;
    },
    hideShareModal() {
      this.isShareModalVisible = false;
    },
    shareToFacebook() {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));
    },
    shareToTwitter() {
      window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href));
    },
    shareToWhatsApp() {
      window.open('https://api.whatsapp.com/send?text=' + encodeURIComponent(window.location.href));
    },
    shareToLine() {
      window.open('https://line.me/R/msg/text/?' + encodeURIComponent(window.location.href));
    },
    shareToTelegram() {
      window.open('https://telegram.me/share/url?url=' + encodeURIComponent(window.location.href));
    },
    copyLink() {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copied to clipboard!');
      }).catch((error) => {
        console.error('Failed to copy: ', error);
      });
    },
  },
};
</script>

<style scoped>
.margin-top {
  margin-top: 100px;
}

.image-news {
  margin-top: 20px;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.breadcrumbs {
  margin-top: 10px;
  color: #333;
  font-weight: 700;
  font-size: 16px;
}

.author {
  font-size: 16px;
  margin-top: 10px;
  color: #a6a6a6;
  font-weight: bold;
}

.metadata {
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}

.date,
.time {
  color: #a6a6a6;
}

.title-news {
  margin-top: 15px;
  font-weight: bold;
}

.content {
  margin-top: 25px;
  text-align: justify;
  line-height: 1.6;
}

.button-container {
  display: flex;
  justify-content: start;
  gap: 10px;
  margin-top: 30px;
  margin-bottom: 50px;
}

.circle-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #085487;
  transition: background-color 0.3s;
}

.button-icon {
  font-size: 1.2rem;
  color: white;
}

.circle-button:hover {
  background-color: #023362;
}

.heading {
  font-weight: bold;
}

.container-comment {
  background-color: #d9d9d9;
  width: full;
  height: 300px;
  border-radius: 10px;
  margin-top: 25px;
}

.add-comment {
  padding: 25px;
}

.title-comment {
  font-weight: 700;
  font-size: 18px;
}

.comment-textarea {
  width: 100%;
  height: 150px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  margin-bottom: 10px;
}

.send-button {
  background-color: #085487;
  color: white;
  border: 0;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
  float: right;
}

.send-button:hover {
  background-color: #023362;
}

.comments {
  width: full;
  height: 140px;
  border-radius: 10px;
  border: 20px;
  border: 1px solid #ccc;
  margin-top: 25px;
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
}

.content-comment {
  padding-left: 20px;
  padding-top: 15px;
}

.profile-picture {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.title-time {
  display: flex;
  justify-content: space-between;
}

.username-comment {
  font-weight: 700;
  font-size: 16px;
  margin: 0;
}

.time-comment {
  font-size: 12px;
  margin: 6px 0;
}

.user-comment {
  font-size: 14px;
  color: #67727e;
}

@media (max-width: 426px) {
  .image-container {
    flex-direction: column;
    align-items: center;
  }

  .image-container img {
    width: 100%;
    margin-bottom: 10px;
  }

  .image-container img:last-child {
    margin-bottom: 0;
  }
}

/* Share Modal Styles */
.share-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.share-modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  max-width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.close-button:hover {
  color: black;
}

.share-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.share-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.share-option:hover {
  background-color: #e0e0e0;
}
</style>
