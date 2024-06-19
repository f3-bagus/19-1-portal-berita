<template>
  <div class="container margin-top">
    <div class="content-wrapper">
      <h1>{{ title }}</h1>
      <div class="metadata">
        <p class="author">Author: {{ author }}</p>
        <p class="date">{{ date }}</p>
      </div>
      <div v-if="imageUrl" class="image-news">
        <img :src="imageUrl" alt="News Image" />
      </div>
      <div class="content">
        <p>{{ content }}</p>
      </div>
    </div>

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
  </div>
</template>

<script>
import axios from "../../services/axios";
import moment from "moment";

export default {
  name: "News",
  data() {
    return {
      title: "",
      content: "",
      author: "",
      imageUrl: "",
      date: "",
      newComment: "",
      comments: [],
    };
  },
  created() {
    this.fetchNews();
    this.fetchComments();
  },
  methods: {
    async fetchNews() {
      try {
        const response = await axios.get(
          `http://localhost:5000/news/${this.$route.params.id}`
        );
        const data = response.data;
        this.title = data.title;
        this.content = data.content;
        this.imageUrl = data.image_url;
        this.date = this.formatDate(data.createdAt);
        this.author = data.author.username;
      } catch (error) {
        console.error("Error fetching news:", error);
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
      return moment(dateString).format("dddd, D MMMM YYYY HH.mm [WIB]");
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

.metadata {
  font-size: 16px;
  display: flex;
  justify-content: flex-start;
  gap: 15px;
}

.author {
  font-size: 16px;
  margin-top: 10px;
  color: #a6a6a6;
  font-weight: bold;
}

.date {
  color: #a6a6a6;
}

.content {
  margin-top: 25px;
  text-align: justify;
  line-height: 1.6;
}

.container-comment {
  background-color: #d9d9d9;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-top: 25px;
  padding: 20px;
}

.add-comment {
  padding: 20px;
}

.title-comment {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 10px;
}

.comment-textarea {
  width: 100%;
  height: 100px;
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
  width: 100%;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-top: 15px;
  padding: 10px 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.profile-picture {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 15px;
}

.content-comment {
  flex-grow: 1;
}

.title-time {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.username-comment {
  font-weight: 700;
  font-size: 16px;
  margin: 0;
}

.time-comment {
  font-size: 12px;
  color: #a6a6a6;
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
</style>
