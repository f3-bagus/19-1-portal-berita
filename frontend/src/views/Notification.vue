<template>
  <div class="container margin-top">
    <div class="container-notification">
      <h1>Notifikasi</h1>
      <hr>
      <div v-for="notification in notifications" :key="notification.notification_id" class="notification">
        <span class="closebtn" @click="closeNotification(notification.notification_id)">&times;</span>
        <strong>Berita!</strong> {{ notification.notification_text }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../../services/axios';

export default {
  name: 'Notification',
  data() {
    return {
      notifications: []
    };
  },
  methods: {
    async fetchNotifications() {
      try {
        const response = await axios.get('/notifications');
        this.notifications = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async closeNotification(notificationId) {
      try {
        // Panggil endpoint PATCH untuk menandai notifikasi sebagai dibaca
        await axios.patch(`/notifications/${notificationId}/read`);

        // Hapus notifikasi dari daftar di front-end
        this.notifications = this.notifications.filter(
          notification => notification.notification_id !== notificationId
        );

        // Simpan notifikasi yang tersisa ke LocalStorage
        localStorage.setItem('readNotifications', JSON.stringify(this.notifications));
      } catch (error) {
        console.error(error);
      }
    }
  },
  mounted() {
    // Muat notifikasi dari LocalStorage saat komponen di-mount
    const savedNotifications = localStorage.getItem('readNotifications');
    if (savedNotifications) {
      this.notifications = JSON.parse(savedNotifications);
    } else {
      this.fetchNotifications(); // Ambil notifikasi dari backend jika tidak ada yang tersimpan di LocalStorage
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
  background-color: #d3d3d3;
  /* Warna abu-abu */
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