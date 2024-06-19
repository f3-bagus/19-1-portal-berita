import express from 'express';
import { saveNews, getSavedNews, getSavedNewsAdmin } from '../controllers/SavedNews.js';
import { verifyToken, isUser, isAdmin } from "../middleware/Auth.js";

const router = express.Router();


router.post('/saved-news', verifyToken, isUser, saveNews);
router.get('/saved-news', verifyToken, isUser, getSavedNews);
router.get('/saved/admin/:user_id', verifyToken, isAdmin, getSavedNewsAdmin);

export default router;
