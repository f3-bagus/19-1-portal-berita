import ContactMessages from '../models/ContactMessageModel.js';
import Users from '../models/UserModels.js'; // Pastikan path ini benar

// User mengirimkan pesan
// User mengirimkan pesan
export const sendMessage = async (req, res) => {
    try {
        const { subject, message_text } = req.body;
        const user_id = req.user.user_id; // Asumsikan req.user berisi detail pengguna yang terotentikasi

        const message = await ContactMessages.create({
            subject,
            message_text,
            status: 'draft',
            user_id
        });

        res.status(201).json({
            msg: "Pesan Berhasil dikirim",
            message: {

                subject: message.subject,
                message_text: message.message_text
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Admin melihat semua user yang mengirim pesan
export const getAllMessages = async (req, res) => {
    try {
        const messages = await ContactMessages.findAll({
            include: [
                {
                    model: Users,
                    attributes: ['user_id', 'username', 'email']
                }
            ],
            attributes: ['message_id', 'message_text']
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin melihat isi pesan user berdasarkan user_id
export const getMessagesByMessageId = async (req, res) => {
    try {
        const { message_id } = req.params;

        const messages = await ContactMessages.findAll({
            where: { message_id },
            include: [
                {
                    model: Users,
                    attributes: []
                }],
            attributes: ["message_id", "subject", "message_text", "status", "user_id"]
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Admin membalas pesan
export const replyMessage = async (req, res) => {
    try {
        const { message_id } = req.params;
        const { reply_text } = req.body;

        const message = await ContactMessages.findByPk(message_id);

        if (!message) {
            return res.status(404).json({ error: "Pesan tidak ditemukan" });
        }

        // Misalkan balasan disimpan dalam status atau field baru
        message.status = 'replied';
        message.reply_text = reply_text; // Asumsi ada field reply_text di model
        await message.save();

        res.status(200).json({ message: "Pesan berhasil dibalas" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Admin menghapus pesan user berdasarkan message_id
export const deleteMessage = async (req, res) => {
    try {
        const { message_id } = req.params;

        // Cari pesan berdasarkan message_id
        const message = await ContactMessages.findByPk(message_id);

        // Jika pesan tidak ditemukan, kembalikan respons 404
        if (!message) {
            return res.status(404).json({ error: "Pesan tidak ditemukan" });
        }

        // Hapus pesan dari database
        await message.destroy();

        // Kembalikan respons sukses
        res.status(200).json({ message: "Pesan berhasil dihapus" });
    } catch (error) {
        // Tangani kesalahan server
        res.status(500).json({ error: error.message });
    }
};
