import Comments from "../models/CommentModels.js";
import Users from "../models/UserModels.js";
import News from "../models/NewsModels.js";

//AKSES USER
// Menambahkan komentar
export const addComment = async (req, res) => {
  const { news_id, comment_text } = req.body;
  const user_id = req.user.user_id;

  if (!comment_text) {
    return res.status(400).json({ msg: "Teks harus diisi" });
  }

  try {
    const news = await News.findByPk(news_id);
    if (!news) {
      return res.status(404).json({
        msg: "News tidak ditemukan",
      });
    }

    // Simpan komentar dalam database
    const comment = await Comments.create({
      comment_text,
      user_id,
      news_id,
    });

    // Kirim respons berhasil
    res.status(201).json({
      msg: "Comment berhasil dikirim",
      comment: {
        comment_id: comment.comment_id,
        user_id: comment.user_id,
        news_id: comment.news_id,
        comment_text: comment.comment_text,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Mengedit komentar
export const editComment = async (req, res) => {
  const { comment_id, comment_text } = req.body;
  const user_id = req.user.user_id;

  if (!comment_text) {
    return res.status(400).json({ msg: "Teks harus diisi" });
  }

  try {
    const comment = await Comments.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ msg: "Komentar tidak ditemukan" });
    }

    if (comment.user_id !== user_id) {
      return res
        .status(403)
        .json({ msg: "Anda tidak diizinkan untuk mengedit komentar ini" });
    }

    comment.comment_text = comment_text;
    await comment.save();

    res.status(200).json({ msg: "komentar berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Menghapus komentar
export const deleteComment = async (req, res) => {
  const { comment_id } = req.body;
  const user_id = req.user.user_id;

  try {
    const comment = await Comments.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ msg: "Komentar tidak ditemukan" });
    }

    if (comment.user_id !== user_id) {
      return res
        .status(403)
        .json({ msg: "Anda tidak diizinkan untuk menghapus komentar ini" });
    }

    await comment.destroy();

    res.status(200).json({ msg: "Komentar berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//AKSES ADMIN
// Fungsi untuk melihat semua komentar
export const viewComments = async (req, res) => {
  try {
    const response = await Comments.findAll({
      attributes: ["comment_id", "comment_text", "user_id", "news_id"],
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });

    const formattedResponse = response.map((comment) => ({
      comment_id: comment.comment_id,
      comment_text: comment.comment_text,
      username: comment.User.username,
      news_id: comment.news_id,
    }));

    res.status(200).json(formattedResponse);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk mencari komentar berdasarkan news_id
export const viewcommentId = async (req, res) => {
  try {
    const { news_id } = req.params;
    const comments = await Comments.findAll({
      where: { news_id: news_id },
      attributes: ["comment_id", "comment_text", "user_id", "news_id"],
      include: [
        {
          model: Users,
          attributes: ["username"],
        },
      ],
    });

    const formattedComments = comments.map((comment) => ({
      comment_id: comment.comment_id,
      comment_text: comment.comment_text,
      username: comment.User.username,
      news_id: comment.news_id,
    }));

    res.status(200).json(formattedComments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Fungsi untuk menghapus komentar oleh admin
export const deleteCommentbyadmin = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const comment = await Comments.findByPk(comment_id);
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    await comment.destroy();
    res.status(200).json({ msg: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
