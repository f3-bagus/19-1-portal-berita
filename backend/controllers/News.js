import News from "../models/NewsModels.js";
import Users from "../models/UserModels.js";
import Notifications from "../models/NotificationModel.js";

//Permintaan Author untuk menambahkan berita
export const addNews = async (req, res) => {
  const { title, content, categories_id, image_url } = req.body;
  const authorId = req.user.user_id;

  try {
    const author = await Users.findByPk(authorId);

    if (!author || author.role !== "author") {
      return res
        .status(403)
        .json({ msg: "Hanya author yang dapat menambahkan berita" });
    }

    const news = await News.create({
      title,
      content,
      author_id: authorId, // Gunakan authorId dari req.user
      categories_id,
      image_url,
      status: "draft", // Set status sebagai draft sampai diverifikasi oleh admin
    });

    // const admins = await Users.findAll({ where: { role: 'admin' } });
    // for (const admin of admins) {
    //     await Notifications.create({
    //         user_id: admin.user_id,
    //         notification_text: `Author ${author.username} telah menambahkan berita baru ${news.title} yang menunggu verifikasi`
    //     });
    // }

    res
      .status(201)
      .json({ msg: "Berita berhasil ditambahkan, menunggu verifikasi admin" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const verifyNews = async (req, res) => {
  const { news_id } = req.body;

  try {
    const news = await News.findByPk(news_id);

    if (!news) {
      return res.status(404).json({ msg: "Berita tidak ditemukan" });
    }

    if (news.status !== "draft") {
      return res.status(400).json({ msg: "Berita sudah diverifikasi" });
    }

    news.status = "published";
    await news.save();

    // Kirim notifikasi kepada semua pengguna
    const users = await Users.findAll({ where: { role: "user" } });
    for (const user of users) {
      await Notifications.create({
        user_id: user.user_id,
        notification_text: `Ada berita terbaru ${news.title}`,
      });
    }

    //  const author = await Users.findByPk(news.author_id);
    //  if (author) {
    //      await Notifications.create({
    //          user_id: author.user_id,
    //          notification_text: `Berita Anda "${news.title}" telah diverifikasi dan dipublikasikan oleh admin`
    //      });
    //  }

    res
      .status(200)
      .json({ msg: "Berita berhasil diverifikasi dan dipublikasikan" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createNewsController = async (req, res) => {
  try {
    const { title, content, categories_id, image_url } = req.body;

    // Verifikasi bahwa pengguna adalah admin
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({
          msg: "Hanya admin yang dapat menambahkan berita secara langsung",
        });
    }

    // Buat berita baru dengan status "published"
    const newNews = await News.create({
      title,
      content,
      categories_id,
      image_url,
      author_id: req.user.user_id,
      status: "published", // Set status sebagai published untuk admin
    });

    res.status(201).json({ msg: "News Create succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNews = async (req, res) => {
  try {
      let news;

      if (req.user && req.user.role === 'admin') {
          // Admin bisa melihat semua berita
          news = await News.findAll({
              attributes: ['news_id', 'title', 'content', 'categories_id', 'author_id', 'image_url', 'status', 'createdAt'],
              include: [{
                  model: Users,
                  attributes: ['user_id', 'username'],
                  as: 'author'
              }]
          });
      } else if (req.user) {
          // Pengguna biasa hanya bisa melihat berita yang statusnya 'published'
          news = await News.findAll({
              attributes: ['news_id', 'title', 'content', 'categories_id', 'author_id', 'image_url', 'status', 'createdAt'],
              include: [{
                  model: Users,
                  attributes: ['user_id', 'username'],
                  as: 'author'
              }],
              where: {
                  status: 'published'
              }
          });
      } else {
          // Tamu hanya bisa melihat berita yang statusnya 'published' tanpa informasi penulis
          news = await News.findAll({
              attributes: ['news_id', 'title', 'content', 'categories_id', 'image_url', 'createdAt'],
              where: {
                  status: 'published'
              }
          });
      }

      res.status(200).json(news);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Get published news for guests (tamu)
export const getPublishedNewsForGuest = async (req, res) => {
  try {
    if (req.user === null) {// User not found
      return next();   // Allow guest access
  }
    const news = await News.findAll({
      attributes: ['news_id', 'title', 'content', 'categories_id', 'image_url', 'createdAt'],
      where: {
        status: 'published'
      }
    });

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const response = await News.findOne({
      attributes: [
        "news_id",
        "title",
        "content",
        "categories_id",
        "author_id",
        "image_url",
        "createdAt",
      ],
      include: [{ model: Users, attributes: ["username"], as: "author" }],
      where: {
        news_id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Update berita
export const updateNews = async (req, res) => {
  try {
    const { title, content, categories_id, image_url } = req.body;
    const news_id = req.params.id;

    const news = await News.findByPk(news_id);
    if (!news) {
      return res.status(404).json({ msg: "Berita tidak ditemukan" });
    }

    news.title = title;
    news.content = content;
    news.categories_id = categories_id;
    news.image_url = image_url;
    await news.save();

    res.status(200).json({ msg: "Berita berhasil diperbarui" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Hapus berita
export const deleteNews = async (req, res) => {
  try {
    const news_id = req.params.id;

    const news = await News.findByPk(news_id);
    if (!news) {
      return res.status(404).json({ msg: "Berita tidak ditemukan" });
    }

    await news.destroy();
    res.status(200).json({ msg: "Berita berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get news by author
export const getNewsByAuthor = async (req, res) => {
  const { authorId } = req.params;

  try {
    const news = await News.findAll({
      where: {
        author_id: authorId,
        status: "published",
      },
      attributes: [
        "news_id",
        "title",
        "content",
        "categories_id",
        "image_url",
        "createdAt",
      ],
      include: [
        {
          model: Users,
          attributes: ["username"],
          as: "author",
        },
      ],
    });

    if (news.length === 0) {
      return res
        .status(404)
        .json({ msg: "Berita tidak ditemukan untuk author ini" });
    }

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
