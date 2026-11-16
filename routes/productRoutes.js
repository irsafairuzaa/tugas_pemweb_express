const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// GET semua produk
router.get('/', productController.getAllProducts);

// GET produk berdasarkan ID
router.get('/:id', productController.getProductById);

// POST produk baru
router.post('/', productController.createProduct);

// PUT update produk (karena di soal minta id ada di body, kita pasang rute '/')
router.put('/', productController.updateProduct);
// Opsi tambahan: jika ada yang akses via URL /products/:id juga tetap jalan
router.put('/:id', productController.updateProduct);

// DELETE produk berdasarkan ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;