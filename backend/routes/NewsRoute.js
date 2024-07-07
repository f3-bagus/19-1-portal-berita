import express from "express";
import {
  createNewsController,
  addNews,
  verifyNews,
  getNews,
  getPublishedNewsForGuest,
  getNewsById,
  // getNewsByAuthor,
  updateNews,
  deleteNews,
} from "../controllers/News.js";
import { verifyToken, isAdmin, isAuthor, } from "../middleware/Auth.js";

const router = express.Router();

router.post("/news", verifyToken, isAuthor, addNews); // Hanya author yang sudah login yang bisa menambahkan berita
router.post("/news/verify", verifyToken, isAdmin, verifyNews); // Hanya admin yang bisa memverifikasi berita
router.get("/news", verifyToken, getNews);
router.get("/news", verifyToken, getPublishedNewsForGuest);
router.get("/news/:id", getNewsById);
router.post("/news/create", verifyToken, isAdmin, createNewsController); 
router.patch("/news/:id", verifyToken, isAdmin, updateNews);
router.delete("/news/:id", verifyToken, isAdmin, deleteNews);

export default router;
