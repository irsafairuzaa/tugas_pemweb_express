import { useState } from 'react';
import './App.css';

const initialProducts = [
  { id: 1, name: 'Pulpen', price: 5000 },
  { id: 2, name: 'Buku Tulis', price: 12000 },
  { id: 3, name: 'Spidol', price: 8000 },
  { id: 4, name: 'Penggaris', price: 6000 },
  { id: 5, name: 'Penghapus', price: 3000 },
];

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  // State Modal Tambah
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // State Modal Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  // State Modal Hapus
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const formatRupiah = (number) => {
    return 'Rp' + number.toLocaleString('id-ID');
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handler Tambah Produk
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice || Number(newPrice) <= 0) {
      alert('Nama produk dan harga yang valid wajib diisi!');
      return;
    }
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    setProducts([...products, { id: nextId, name: newName.trim(), price: Number(newPrice) }]);
    setNewName('');
    setNewPrice('');
    setIsAddOpen(false);
  };

  // Handler Buka Modal Edit
  const handleOpenEdit = (product) => {
    setEditProduct(product);
    setEditName(product.name);
    setEditPrice(String(product.price));
    setIsEditOpen(true);
  };

  // Handler Simpan Edit
  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editName.trim() || !editPrice || Number(editPrice) <= 0) {
      alert('Nama produk dan harga yang valid wajib diisi!');
      return;
    }
    setProducts(products.map((p) =>
      p.id === editProduct.id
        ? { ...p, name: editName.trim(), price: Number(editPrice) }
        : p
    ));
    setIsEditOpen(false);
    setEditProduct(null);
  };

  // Handler Buka Modal Hapus
  const handleOpenDelete = (product) => {
    setDeleteProduct(product);
    setIsDeleteOpen(true);
  };

  // Handler Konfirmasi Hapus
  const handleConfirmDelete = () => {
    setProducts(products.filter((p) => p.id !== deleteProduct.id));
    setIsDeleteOpen(false);
    setDeleteProduct(null);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header-wrapper">
        <div className="header-title">
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsAddOpen(true)}>
          + Tambah Produk
        </button>
      </div>

      {/* Search & Counter */}
      <div className="filter-wrapper">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Cari nama produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="counter-text">{filteredProducts.length} produk</span>
      </div>

      {/* Grid Kartu Produk */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <span className="product-id">ID: {product.id}</span>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{formatRupiah(product.price)}</p>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => handleOpenEdit(product)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => handleOpenDelete(product)}>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>

      {/* ===== MODAL TAMBAH PRODUK ===== */}
      {isAddOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h3>Tambah Produk</h3>
                <p>Masukkan informasi produk baru.</p>
              </div>
              <button className="btn-close" onClick={() => setIsAddOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Nama Produk</label>
                <input type="text" className="form-control" placeholder="Contoh: Pulpen"
                  value={newName} onChange={(e) => setNewName(e.target.value)} autoFocus />
              </div>
              <div className="form-group">
                <label>Harga (Rp)</label>
                <input type="number" className="form-control" placeholder="Contoh: 5000"
                  value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                <p className="form-helper">Harga harus lebih dari 0.</p>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsAddOpen(false)}>Batal</button>
                <button type="submit" className="btn-primary">Simpan Produk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL EDIT PRODUK ===== */}
      {isEditOpen && editProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <h3>Edit Produk</h3>
                <p>Perbarui informasi produk yang dipilih.</p>
                <p className="product-id" style={{ marginTop: '4px' }}>ID: {editProduct.id}</p>
              </div>
              <button className="btn-close" onClick={() => setIsEditOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label>Nama Produk</label>
                <input type="text" className="form-control" placeholder="Contoh: Pulpen"
                  value={editName} onChange={(e) => setEditName(e.target.value)} autoFocus />
              </div>
              <div className="form-group">
                <label>Harga (Rp)</label>
                <input type="number" className="form-control" placeholder="Contoh: 5000"
                  value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
                <p className="form-helper">Harga harus lebih dari 0.</p>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsEditOpen(false)}>Batal</button>
                <button type="submit" className="btn-primary">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== MODAL KONFIRMASI HAPUS ===== */}
      {isDeleteOpen && deleteProduct && (
        <div className="modal-overlay">
          <div className="modal-content modal-delete">
            <div className="modal-header">
              <div></div>
              <button className="btn-close" onClick={() => setIsDeleteOpen(false)}>✕</button>
            </div>
            <div className="delete-body">
              <div className="delete-icon">🗑️</div>
              <h3>Hapus Produk?</h3>
              <p>Produk yang dihapus tidak dapat dikembalikan.</p>
              <div className="delete-preview-card">
                <span className="product-id">ID: {deleteProduct.id}</span>
                <p className="product-name">{deleteProduct.name}</p>
                <p className="product-price">{formatRupiah(deleteProduct.price)}</p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setIsDeleteOpen(false)}>Batal</button>
              <button className="btn-danger" onClick={handleConfirmDelete}>Hapus Produk</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}