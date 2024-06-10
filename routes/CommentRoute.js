import express from "express";
import {
    addComment, viewComments,
    editComment, deleteComment,
    viewcommentId, deleteCommentbyadmin
}
    from "../controllers/Comment.js";
import { verifyToken, isUser, isAdmin } from "../middleware/Auth.js";

const router = express.Router();

router.post("/comments", verifyToken, isUser, addComment);
router.patch("/comments", verifyToken, isUser, editComment,); // Mengedit komentar
router.delete("/comments", verifyToken, isUser, deleteComment);
router.get("/comments", verifyToken, isAdmin, viewComments)
router.get("/comments/:newsId", verifyToken, isAdmin, viewcommentId);
router.delete("/comments/:comment_id", verifyToken, isAdmin, deleteCommentbyadmin);
export default router;
