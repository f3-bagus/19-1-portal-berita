<template>
    <div class="container margin-top">
      <div class="container-notification">
        <h1>Notifikasi</h1>
        <hr>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Berita!</strong> Pasar saham mengalami perubahan signifikan hari ini. Cek update terbaru pada investasi Anda.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Pembaruan!</strong> Fitur baru telah ditambahkan ke aplikasi. Jelajahi sekarang!
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Peringatan!</strong> Akan ada pemeliharaan terjadwal besok dari jam 2 pagi sampai 4 pagi. Harap rencanakan dengan baik.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Info!</strong> Promo besar-besaran untuk produk terbaru! Jangan lewatkan kesempatan ini.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Cuaca!</strong> Prakiraan cuaca hari ini menunjukkan kemungkinan hujan deras di sore hari.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Kesehatan!</strong> Jaga kesehatan dengan melakukan pemeriksaan rutin. Kesehatan Anda adalah prioritas kami.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Teknologi!</strong> Gadget terbaru telah dirilis hari ini. Lihat ulasan dan fitur canggihnya sekarang.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Transportasi!</strong> Jalan tol utama akan ditutup sementara untuk perbaikan. Cari rute alternatif.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Keamanan!</strong> Selalu waspada terhadap penipuan online. Jangan bagikan informasi pribadi sembarangan.
        </div>
        <div class="notification">
          <span class="closebtn" @click="closeNotification">&times;</span>
          <strong>Acara!</strong> Acara musik besar akan diadakan akhir pekan ini. Dapatkan tiket Anda sebelum kehabisan!
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Notification',
    methods: {
      closeNotification(event) {
        const notification = event.target.parentElement;
        if (notification) {
          notification.style.display = 'none';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .container-notification h1 {
    color: #ab533c;
    font-weight: 700;
  }
  
  .notification {
    background-color: #d3d3d3; /* Warna abu-abu */
    color: black;
    padding: 20px;
    margin: 15px 0;
    border-radius: 4px;
    position: relative;
  }
  
  .closebtn {
    position: absolute;
    top: 10px;
    right: 15px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
  
  .closebtn:hover {
    color: red;
  }
  </style>
  