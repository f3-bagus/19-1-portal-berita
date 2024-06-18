import express from 'express';
import { sendMessage, getAllMessages, replyMessage, deleteMessage, getMessagesByMessageId } from '../controllers/ContactMessage.js';
import { verifyToken, isUser, isAdmin } from '../middleware/Auth.js';

const router = express.Router();

// User mengirim pesan
router.post('/contact', verifyToken, isUser, sendMessage);
// Admin melihat user yang mengirim pesan
router.get('/admin/contact', verifyToken, isAdmin, getAllMessages);
// Admin melihat pesan berdasarkan user_id
router.get('/admin/contact/:message_id', verifyToken, isAdmin, getMessagesByMessageId);
// Admin membalas pesan
router.post('/admin/contact/reply/:message_id', verifyToken, isAdmin, replyMessage);

// Admin menghapus pesan user berdasarkan message_id
router.delete('/admin/contact/:message_id', verifyToken, isAdmin, deleteMessage);
export default router;
