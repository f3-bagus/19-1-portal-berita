import Notifications from '../models/NotificationModel.js';
import News from '../models/NewsModels.js';


// Dapatkan notifikasi untuk pengguna
export const getNotifications = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const notifications = await Notifications.findAll({
            where: { user_id: userId },
            attributes: ['notification_id', 'notification_text', 'is_read']
        });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Tandai notifikasi sebagai dibaca
export const markNotificationAsRead = async (req, res) => {
    try {
        const { notification_id } = req.params;
        const notification = await Notifications.findByPk(notification_id);

        if (!notification || notification.user_id !== req.user.user_id) {
            return res.status(404).json({ msg: "Notifikasi tidak ditemukan" });
        }

        notification.is_read = true;
        await notification.save();

        res.status(200).json({ msg: "Notifikasi berhasil ditandai sebagai dibaca" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


// Admin melihat semua notifikasi
export const getAllNotifications = async (req, res) => {
    try {
        // Temukan semua notifikasi
        const notifications = await Notifications.findAll();

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
