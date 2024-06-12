<template>
  <div class="container margin-top">
    <div class="row">
      <div class="col-lg-9 col-12">
        <h5 class="title mb-4">Headline News</h5>
        <div class="image-news">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
            alt="ImageNews">
          <div class="image-caption">
            <b>
              <div class="title-caption">Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</div>
            </b>
            <div class="news-container mt-3">
              <h5 class="sub-caption">Berita.news</h5>
              <h6 class="time-news">4 jam yang lalu</h6>
              <button variant="primary" class="detail-button" @click="toNews">
                Selengkapnya
              </button>
            </div>
          </div>
        </div>

        <div class="news-feed mt-5">
          <div class="news-feed-title d-flex justify-content-between">
            <h5 class="title">News Feed</h5>
            <button variant="primary" class="detail-button" @click="toNews">
              See More
            </button>
          </div>
          <div class="news-feeds-list mt-4">
            <div class="card-news-feed">
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                class="image-news-feed" alt="ImageNews">
              <div class="title-terpopuler mt-2">
                <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
              </div>
            </div>
            <div class="card-news-feed">
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                class="image-news-feed" alt="ImageNews">
              <div class="title-terpopuler mt-2">
                <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
              </div>
            </div>
            <div class="card-news-feed">
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                class="image-news-feed" alt="ImageNews">
              <div class="title-terpopuler mt-2">
                <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
              </div>
            </div>
            <div class="card-news-feed">
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                class="image-news-feed" alt="ImageNews">
              <div class="title-terpopuler mt-2">
                <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
              </div>
            </div>
            <div class="card-news-feed">
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                class="image-news-feed" alt="ImageNews">
              <div class="title-terpopuler mt-2">
                <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
              </div>
            </div>
            <div class="card-news-feed">
              <img
                src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                class="image-news-feed" alt="ImageNews">
              <div class="title-terpopuler mt-2">
                <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-3 col-12 side-right">
        <div class="d-flex gap-divider">
          <div>
            <hr class="vertical-divider" />
          </div>
          <div>
            <h5 class="title mb-4">Terpopuler</h5>
            <div class="list-terpopuler">
              <div class="card-terpopuler">
                <img
                  src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                  class="image-news-feed" alt="ImageNews">
                <div class="title-terpopuler mt-2">
                  <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
                </div>
              </div>
              <div class="card-terpopuler">
                <img
                  src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                  class="image-news-feed" alt="ImageNews">
                <div class="title-terpopuler mt-2">
                  <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
                </div>
              </div>
              <div class="card-terpopuler">
                <img
                  src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                  class="image-news-feed" alt="ImageNews">
                <div class="title-terpopuler mt-2">
                  <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
                </div>
              </div>
              <div class="card-terpopuler">
                <img
                  src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                  class="image-news-feed" alt="ImageNews">
                <div class="title-terpopuler mt-2">
                  <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
                </div>
              </div>
              <div class="card-terpopuler">
                <img
                  src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
                  class="image-news-feed" alt="ImageNews">
                <div class="title-terpopuler mt-2">
                  <h5>Jakarta Masih Jadi Kota Terbaik Se-Indonesia</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="category-news mt-5">
      <div class="category-content">
        <div class="title-content d-flex justify-content-between">
          <h5 class="title">Sport News</h5>
          <i class="bi bi-arrow-right-circle-fill"></i>
        </div>
        <hr class="divider">
        <div class="news d-flex">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
            class="image-news-feed" alt="ImageNews">
          <div class="news-title">
            <h2>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h2>
            <h6 class="news-time text-secondary">10 menit yang lalu</h6>
          </div>
        </div>
      </div>
      <div class="category-content mt-5">
        <div class="title-content d-flex justify-content-between">
          <h5 class="title">Sport News</h5>
          <i class="bi bi-arrow-right-circle-fill"></i>
        </div>
        <hr class="divider">
        <div class="news d-flex">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
            class="image-news-feed" alt="ImageNews">
          <div class="news-title">
            <h2>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h2>
            <h6 class="news-time text-secondary">10 menit yang lalu</h6>
          </div>
        </div>
      </div>
      <div class="category-content mt-5">
        <div class="title-content d-flex justify-content-between">
          <h5 class="title">Sport News</h5>
          <i class="bi bi-arrow-right-circle-fill"></i>
        </div>
        <hr class="divider">
        <div class="news d-flex">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
            class="image-news-feed" alt="ImageNews">
          <div class="news-title">
            <h2>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h2>
            <h6 class="news-time text-secondary">10 menit yang lalu</h6>
          </div>
        </div>
      </div>
      <div class="category-content mt-5">
        <div class="title-content d-flex justify-content-between">
          <h5 class="title">Sport News</h5>
          <i class="bi bi-arrow-right-circle-fill"></i>
        </div>
        <hr class="divider">
        <div class="news d-flex">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
            class="image-news-feed" alt="ImageNews">
          <div class="news-title">
            <h2>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h2>
            <h6 class="news-time text-secondary">10 menit yang lalu</h6>
          </div>
        </div>
      </div>
      <div class="category-content mt-5">
        <div class="title-content d-flex justify-content-between">
          <h5 class="title">Sport News</h5>
          <i class="bi bi-arrow-right-circle-fill"></i>
        </div>
        <hr class="divider">
        <div class="news d-flex">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200"
            class="image-news-feed" alt="ImageNews">
          <div class="news-title">
            <h2>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h2>
            <h6 class="news-time text-secondary">10 menit yang lalu</h6>
          </div>
        </div>
      </div>
      <div class="category-content margin-top">
        <div class="title-content d-flex justify-content-between">
          <h5 class="title">Video 30 detik</h5>
          <i class="bi bi-arrow-right-circle-fill"></i>
        </div>
        <hr class="divider">
        <div class="news d-flex">
          <div class="news-title">
            <h2>Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotman</h2>
            <h6 class="news-time text-secondary">10 menit yang lalu</h6>
          </div>
          <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item custom-video-width" src="https://www.youtube.com/embed/mbJnAPBfH7I"
              allowfullscreen></iframe>
          </div>
          <!-- <video controls width="1000">
                <source src="https://youtu.be/mbJnAPBfH7I?si=E23sjStYkyjmvvDR" type="video/mp4">
                Your browser does not support the video tag.
            </video> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  methods: {
    toNews() {
      this.$router.push({ name: "News" });
    },
  },
};
</script>

<style>
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
  flex: 0 0 calc(33.33% - 10px);
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
  width: 50%;
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
