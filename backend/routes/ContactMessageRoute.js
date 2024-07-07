import express from 'express';
import { sendMessage, getAllMessages, replyMessage, deleteMessage, getMessagesByMessageId } from '../controllers/ContactMessage.js';
import { verifyToken, isUser, isAdmin } from '../middleware/Auth.js';

const router = express.Router();


router.post('/contact', verifyToken, isUser, sendMessage);
router.get('/admin/contact', verifyToken, isAdmin, getAllMessages);
router.get('/admin/contact/:message_id', verifyToken, isAdmin, getMessagesByMessageId);
router.post('/admin/contact/reply/:message_id', verifyToken, isAdmin, replyMessage);
router.delete('/admin/contact/:message_id', verifyToken, isAdmin, deleteMessage);
export default router;
