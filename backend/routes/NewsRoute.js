import express from "express";
import {
  createNewsController,
  addNews,
  verifyNews,
  getNews,
  getNewsById,
  getNewsByAuthor,
  updateNews,
  deleteNews,
} from "../controllers/News.js";
import { verifyToken, isAdmin, isAuthor } from "../middleware/Auth.js";

const router = express.Router();

router.post("/news", verifyToken, isAuthor, addNews); // Hanya author yang sudah login yang bisa menambahkan berita
router.post("/news/verify", verifyToken, isAdmin, verifyNews); // Hanya admin yang bisa memverifikasi berita
<<<<<<< HEAD
router.get("/news", verifyToken, getNews);
=======
router.get("/news", verifyToken,  getNews);
>>>>>>> 67bd6376193fe55df149ed85d46662252f42148a
router.get("/news/:id", getNewsById);
router.post("/news/create", verifyToken, isAdmin, createNewsController); // Hanya admin yang bisa membuat berita langsung dipublish
// Rute untuk memperbarui berita (hanya admin yang bisa mengakses)
router.patch("/news/:id", verifyToken, isAdmin, updateNews);
// Rute untuk menghapus berita (hanya admin yang bisa mengakses)
router.delete("/news/:id", verifyToken, isAdmin, deleteNews);

export default router;
