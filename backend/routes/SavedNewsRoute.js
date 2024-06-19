import express from 'express';
import { saveNews, getSavedNews, getSavedNewsAdmin, deleteSavedNews } from '../controllers/SavedNews.js';
import { verifyToken, isUser, isAdmin } from "../middleware/Auth.js";

const router = express.Router();


router.post('/saved-news', verifyToken, isUser, saveNews);
router.get('/saved-news', verifyToken, isUser, getSavedNews);
router.get('/saved/admin/:user_id', verifyToken, isAdmin, getSavedNewsAdmin);
router.delete('/saved-news/:id', verifyToken, deleteSavedNews);

export default router;
