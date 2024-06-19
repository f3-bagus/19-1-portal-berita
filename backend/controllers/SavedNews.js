import SavedNews from '../models/SavedNewsModel.js';
import News from '../models/NewsModels.js';

// User menyimpan berita
export const saveNews = async (req, res) => {
    try {
        const { news_id } = req.body;
        const user_id = req.user.user_id; // Mengambil user_id dari req.user

        const savedNews = await SavedNews.create({
            news_id,
            saved_at: new Date(),
            user_id // Pastikan user_id disimpan di sini
        });

        // Ambil data berita yang baru disimpan untuk respons
        res.status(201).json({
            msg: "Berita berhasil disimpan",
            SavedNews: {
                saved_id: saveNews.saved_id,
                saved_at: saveNews.saved_at,
                news_id: savedNews.news_id,
                user_id: savedNews.user_id
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// User melihat semua berita yang disimpan
export const getSavedNews = async (req, res) => {
    try {
        const user_id = req.user.user_id;
        const response = await SavedNews.findAll({
            where: { user_id },
            include: [{
                model: News,
                attributes: ['news_id', 'title', 'content', 'categories_id','author_id', 'image_url']
            }],
            attributes: ['saved_id', 'saved_at', 'user_id']
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin melihat berita yang disimpan oleh pengguna
export const getSavedNewsAdmin = async (req, res) => {
    try {
        const { user_id } = req.params;

        // Jika pengguna bukan admin, kembalikan respons status 403 (Forbidden)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ msg: 'Akses terlarang, hanya admin yang bisa mengakses.' });
        }

        const response = await SavedNews.findAll({
            where: { user_id },
            include: [
                {
                    model: News,
                    attributes: ['news_id', 'title', 'content', 'categories_name','author_id', 'image_url'] // Pilih atribut yang ingin ditampilkan dari News
                }],
            attributes: ['user_id', 'saved_id', 'saved_at']
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//delete berdasarkan ID
export const deleteSavedNews = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.user.role !== 'admin' && req.user.role !== 'user') {
            return res.status(403).json({ msg: 'Akses terlarang, hanya admin atau user yang bisa mengakses.' });
        }

        const saved_news = await SavedNews.findByPk(id);

        if (!saved_news) {
            return res.status(404).json({ error: "saved_news not found" });
        }

        await saved_news.destroy();

        res.status(200).json({ message: "saved_news deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


