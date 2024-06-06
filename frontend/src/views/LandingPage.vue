<template>
    <div class="container margin-top">
      <div class="row">
        <div class="col-9">
          <h5 class="title">Headline News</h5>
          <div class="image-news">
            <img src="https://awsimages.detik.net.id/community/media/visual/2024/03/29/vina-sebelum-7-hari_169.jpeg?w=1200" alt="">
            <b><div class="image-caption">Fakta Terkini Kasus Vina Cirebon, Polemik Pegi hingga Langkah Hotmani</div></b>

          </div>
        </div>
        <div class="col-2">
          <h5 class="title">Headline News</h5>
        </div>
      </div>
    </div>
  </template>
  
  <style>
  .margin-top {
    margin-top: 100px;
  }

  .title{
      color: #AB533C;
  }
  .image-news {
    position: relative;
  }

  .image-news img {
    width: 100%;
    height: 576px;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 15px;
  }

  .image-caption {
    position: absolute;
    font-size: 36px;
    bottom: 150px;
    padding: 0 40px 0;
    color: #ffffff;
  }

  .image-news::after {
    content: "";
    position: absolute;
    top: 0;
    right: -15px;
    height: 100%;
    width: 1px;
    background-color: #000000; 
    opacity: 50%;
  }
  </style>
