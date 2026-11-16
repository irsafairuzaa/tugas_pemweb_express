const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET semua produk

const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data", error: error.message });
  }
};

// GET produk berdasarkan ID
// GET produk berdasarkan ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: Number(id) }
    });

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil produk", error: error.message });
  }
};

// CREATE produk baru
// POST produk baru
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    // Validasi: pastikan name dan price dikirim
    if (!name || price === undefined || price === null) {
      return res.status(400).json({ message: "Name dan price wajib diisi!" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: Number(price)
      }
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat produk", error: error.message });
  }
};

// POST produk baru
const updateProduct = async (req, res) => {
  try {
    const id = req.body.id || req.params.id;
    const { name, price } = req.body;

    // Validasi input
    if (!id || !name || price === undefined) {
      return res.status(400).json({ message: "ID, name, dan price wajib diisi!" });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name: name,
        price: Number(price)
      }
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate produk", error: error.message });
  }
};

// DELETE produk berdasarkan ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({ message: `Produk dengan ID ${id} berhasil dihapus` });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus produk", error: error.message });
  }
};

// Ekspor
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};