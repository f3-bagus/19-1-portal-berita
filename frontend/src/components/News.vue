<template>
  <div class="container margin-top">
    <div class="breadcrumbs">
      <span>News > Nasional</span>
    </div>
    <div class="author">Author Name</div>
    <div class="metadata">
      <div class="date">Senin, 1 Mei 2024</div>
      <div class="time">10.34 WIB</div>
    </div>
    <img
      class="image-news"
      src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
      alt=""
    />
    <h1 class="title-news">
      Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotmani
    </h1>
    <div class="content">
      <p>
        <strong>Jakarta, Berita.com</strong> - Paragraf 1 Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum.
      </p>
      <div class="image-container">
        <img
          src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
          alt="Image 1"
        />
        <img
          src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
          alt="Image 2"
        />
      </div>
      <p>
        Paragraf 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
        in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </div>
    <div class="button-container">
      <button class="circle-button">
        <i class="bi bi-share-fill button-icon"></i>
      </button>
      <button class="circle-button">
        <i class="bi bi-bookmark-fill button-icon"></i>
      </button>
    </div>
    <h4 class="heading">Comments</h4>
    <div class="container-comment">
      <div class="add-comment">
        <p class="title-comment">Tulis Komentar Anda</p>
        <textarea
          class="comment-textarea"
          placeholder="Add a comment..."
        ></textarea>
        <button class="send-button" @click="sendComment">Kirim</button>
      </div>
    </div>
    <div class="comments">
      <div>
        <img
          src="https://via.placeholder.com/125"
          size="10rem"
          class="profile-picture"
        />
      </div>
      <div class="content-comment">
        <div class="title-time">
          <p class="username-comment">Nama User</p>
          <p class="time-comment">48 Minutes Ago</p>
        </div>
        <p class="user-comment">
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You’ve nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
        <p class="text-right text-success">Reply</p>
      </div>
    </div>
    <div class="reply-section d-flex">
      <img
        src="../assets/icon/reply-arrow.svg"
        alt="Reply Logo"
        class="reply-logo mt-4 me-3"
      />
      <div class="comments">
        <div>
          <img
            src="https://via.placeholder.com/125"
            size="10rem"
            class="profile-picture"
          />
        </div>
        <div class="content-comment">
          <div class="title-time">
            <p class="username-comment">Nama User</p>
            <p class="time-comment">48 Minutes Ago</p>
          </div>
          <p class="user-comment">
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You’ve nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </div>
      </div>
    </div>
    <div class="reply-section d-flex">
      <img
        src="../assets/icon/reply-arrow.svg"
        alt="Reply Logo"
        class="reply-logo mt-4 me-3"
      />
      <div class="comments">
        <div>
          <img
            src="https://via.placeholder.com/125"
            size="10rem"
            class="profile-picture"
          />
        </div>
        <div class="content-comment">
          <div class="title-time">
            <p class="username-comment">Nama User</p>
            <p class="time-comment">48 Minutes Ago</p>
          </div>
          <p class="user-comment">
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You’ve nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </div>
      </div>
    </div>
    <div class="reply-section d-flex">
      <img
        src="../assets/icon/reply-arrow.svg"
        alt="Reply Logo"
        class="reply-logo mt-4 me-3"
      />
      <div class="comments">
        <div>
          <img
            src="https://via.placeholder.com/125"
            size="10rem"
            class="profile-picture"
          />
        </div>
        <div class="content-comment">
          <div class="title-time">
            <p class="username-comment">Nama User</p>
            <p class="time-comment">48 Minutes Ago</p>
          </div>
          <p class="user-comment">
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You’ve nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </div>
      </div>
    </div>
    <div class="comments">
      <div>
        <img
          src="https://via.placeholder.com/125"
          size="20rem"
          class="profile-picture"
        />
      </div>
      <div class="content-comment">
        <div class="title-time">
          <p class="username-comment">Nama User</p>
          <p class="time-comment">48 Minutes Ago</p>
        </div>
        <p class="user-comment">
          Impressive! Though it seems the drag feature could be improved. But
          overall it looks incredible. You’ve nailed the design and the
          responsiveness at various breakpoints works really well.
        </p>
        <p class="text-right text-success">Reply</p>
      </div>
    </div>
    <div class="reply-section d-flex">
      <img
        src="../assets/icon/reply-arrow.svg"
        alt="Reply Logo"
        class="reply-logo mt-4 me-3"
      />
      <div class="comments">
        <div>
          <img
            src="https://via.placeholder.com/125"
            size="10rem"
            class="profile-picture"
          />
        </div>
        <div class="content-comment">
          <div class="title-time">
            <p class="username-comment">Nama User</p>
            <p class="time-comment">48 Minutes Ago</p>
          </div>
          <p class="user-comment">
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You’ve nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </div>
      </div>
    </div>
    <div class="reply-section d-flex">
      <img
        src="../assets/icon/reply-arrow.svg"
        alt="Reply Logo"
        class="reply-logo mt-4 me-3"
      />
      <div class="comments">
        <div>
          <img
            src="https://via.placeholder.com/125"
            size="10rem"
            class="profile-picture"
          />
        </div>
        <div class="content-comment">
          <div class="title-time">
            <p class="username-comment">Nama User</p>
            <p class="time-comment">48 Minutes Ago</p>
          </div>
          <p class="user-comment">
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You’ve nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  methods: {
    sendComment() {
      alert("Comment sent!");
    },
  },
};
</script>

<style scoped>
.reply-logo {
  width: 40px;
  height: 40px;
}

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

.image-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
}

.image-container img {
  width: 49%;
  border-radius: 10px;
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
</style>
