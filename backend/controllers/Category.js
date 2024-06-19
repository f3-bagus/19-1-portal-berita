import Category from "../models/CategoryModels.js";

// Mendapatkan semua kategori
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ["categories_id", "categories_name"],
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mendapatkan kategori berdasarkan ID
export const getCategoriesById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { categories_id: id },
      attributes: ["categories_id", "categories_name"],
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error); // Tambahkan log untuk debug
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Membuat kategori baru
export const createCategories = async (req, res) => {
  try {
    const { categories_name } = req.body;

    // Buat kategori baru
    const newCategory = await Category.create({
      categories_name: categories_name,
    });

    res.status(201).json({ msg: "Category create successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mengupdate kategori berdasarkan ID
export const updateCategories = async (req, res) => {
  try {
      const { id } = req.params;
      const { categories_name } = req.body;

      // Cari kategori yang akan diupdate
      const category = await Category.findByPk(id);

      if (!category) {
          return res.status(404).json({ error: "Category not found" });
      }

      // Lakukan update nama kategori
      category.categories_name = categories_name;
      await category.save();

      res.status(200).json({
          msg: "Kategori berhasil diupdate",
          category: {
              categories_id: category.categories_id,
              categories_name: category.categories_name
          }
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Menghapus kategori berdasarkan ID
export const deleteCategories = async (req, res) => {
  try {
    const { id } = req.params;

    // Cari kategori yang akan dihapus
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Hapus kategori
    await category.destroy();

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//category controllers
