import express from "express";
import {
  addComment,
  viewComments,
  editComment,
  deleteComment,
  viewcommentId,
  deleteCommentbyadmin,
} from "../controllers/Comment.js";
import { verifyToken, isUser, isAdmin } from "../middleware/Auth.js";

const router = express.Router();

router.post("/comments", verifyToken, isUser, addComment);
router.patch("/comments", verifyToken, isUser, editComment); 
router.delete("/comments", verifyToken, isUser, deleteComment);
router.get("/comments", viewComments);
router.get("/comments/:news_id", viewcommentId);
router.delete( "/comments/:comment_id", verifyToken, isUser,deleteCommentbyadmin
);
export default router;
