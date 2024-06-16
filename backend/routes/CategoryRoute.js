import express from "express";
import {
  getCategories,
  getCategoriesById,
  createCategories,
  updateCategories,
  deleteCategories,
} from "../controllers/Category.js";
import { verifyToken, isAdmin } from "../middleware/Auth.js";
const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoriesById);
router.post("/categories", verifyToken, isAdmin, createCategories);
router.patch("/categories/:id", verifyToken, isAdmin, updateCategories);
router.delete("/categories/:id", verifyToken, isAdmin, deleteCategories);

export default router;
//category route
