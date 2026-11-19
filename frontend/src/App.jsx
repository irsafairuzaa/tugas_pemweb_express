import { useState } from 'react';
import './App.css';

// Data produk awal sesuai slide presentasi
const initialProducts = [
  { id: 1, name: 'Pulpen', price: 5000 },
  { id: 2, name: 'Buku Tulis', price: 12000 },
  { id: 3, name: 'Spidol', price: 8000 },
  { id: 4, name: 'Penggaris', price: 6000 },
  { id: 5, name: 'Penghapus', price: 3000 },
];

export default function App() {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState(initialProducts);
  // State untuk kata kunci pencarian
  const [searchTerm, setSearchTerm] = useState('');

  // Fungsi memformat harga menjadi format Rupiah (cth: Rp12.000)
  const formatRupiah = (number) => {
    return 'Rp' + number.toLocaleString('id-ID');
  };

  // Filter produk berdasarkan pencarian nama secara realtime
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* 1. Header Utama */}
      <div className="header-wrapper">
        <div className="header-title">
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn-primary" onClick={() => alert('Modal tambah produk akan kita buat di tahap selanjutnya!')}>
          + Tambah Produk
        </button>
      </div>

      {/* 2. Pencarian & Counter */}
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

      {/* 3. Grid Kartu Produk */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <span className="product-id">ID: {product.id}</span>
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{formatRupiah(product.price)}</p>
            <div className="card-actions">
              <button className="btn-edit" onClick={() => alert(`Edit ID: ${product.id}`)}>
                Edit
              </button>
              <button className="btn-delete" onClick={() => alert(`Hapus ID: ${product.id}`)}>
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Info Footer */}
      <p className="footer-info">
        Menampilkan {filteredProducts.length} dari {products.length} produk
      </p>
    </div>
  );
}