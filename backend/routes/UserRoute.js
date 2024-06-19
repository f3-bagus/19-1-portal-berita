import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUsers,
} from "../controllers/Users.js";
import { verifyToken, isAdmin } from "../middleware/Auth.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", verifyToken, isAdmin, createUser);
router.patch("/users/:id", verifyToken, updateUser);
router.delete("/users/:id", verifyToken, isAdmin, deleteUsers);
export default router;
