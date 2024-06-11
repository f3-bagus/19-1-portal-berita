import express from 'express';
import { getNotifications, getAllNotifications, markNotificationAsRead } from '../controllers/Notification.js';
import { verifyToken, isAdmin, isUser } from '../middleware/Auth.js';


const router = express.Router();

router.get('/notifications', verifyToken,  isUser, getNotifications);
router.get('/notifications/all-notifications', verifyToken, isAdmin, getAllNotifications);
router.patch('/notifications/:notification_id/read', verifyToken, isUser, markNotificationAsRead);


export default router;




// import express from 'express';
// import { getUserNotifications, markNotificationAsRead, createNotificationForUploadedNews, getAllNotifications }
//     from '../controllers/Notification.js';
// import { verifyToken, isUser, isAdmin } from "../middleware/Auth.js";

// const router = express.Router();

// // Route untuk admin melihat semua notifikasis
// // Route untuk pengguna mendapatkan notifikasi mereka
// router.get('/notifications', verifyToken, isUser, getUserNotifications);
// // Route untuk pengguna menandai notifikasi sebagai telah dibaca
// router.put('/notifications/:notification_id', verifyToken, isUser, markNotificationAsRead);
// // Route untuk mendapatkan notifikasi setiap ada berita yang diunggah
// router.post('/notifications/uploaded-news', createNotificationForUploadedNews);
// export default router;
