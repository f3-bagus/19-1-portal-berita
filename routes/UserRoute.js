import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUsers
} from "../controllers/Users.js";
import { verifyToken, isAdmin } from "../middleware/Auth.js";


const router = express.Router();

router.get('/users', verifyToken, isAdmin, getUsers);
router.get('/users/:id', verifyToken, isAdmin, getUserById);
router.post('/users', verifyToken, isAdmin, createUser);
router.patch('/users/:id', verifyToken, isAdmin, updateUser);
router.delete('/users/:id', verifyToken, isAdmin, deleteUsers);
export default router;