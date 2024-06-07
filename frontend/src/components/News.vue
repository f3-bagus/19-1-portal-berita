<template>
  <div class="container margin-top">
    <div class="breadcrumbs">
      <span>News > Nasional</span>
    </div>
    <div class="author">
      Author Name
    </div>
    <div class="metadata">
      <div class="date">Senin, 1 Mei 2024</div>
      <div class="time">10.34 WIB</div>
    </div>
    <img class="image-news"
      src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200" alt="">
    <h1 class="title-news">Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotmani</h1>
    <div class="content">
      <p>
        <strong>Jakarta, Berita.com</strong> - Paragraf 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div class="image-container">
        <img src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200" alt="Image 1">
        <img src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200" alt="Image 2">
      </div>
      <p>
       Paragraf 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
    </div>
</template>

<script>
export default {
  name: 'News',
}
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
  color: #A6A6A6;
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
  color: #A6A6A6;
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
