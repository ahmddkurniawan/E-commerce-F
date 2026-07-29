import React, { useState } from 'react';
import { Product, Order, CategoryType } from '../types';
import { formatRupiah } from './ProductCard';
import { CustomerProfile } from '../services/api';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Package, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  X,
  Sparkles,
  BarChart3,
  ListOrdered
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  customers: CustomerProfile[];
  onAddProduct: (newProduct: Product) => void;
  onUpdateProduct: (updatedProduct: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  customers,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus
}) => {
  const [adminTab, setAdminTab] = useState<'overview' | 'products' | 'orders' | 'customers'>('overview');
  const [productSearch, setProductSearch] = useState('');
  
  // Add/Edit Product Modal state
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('Kemeja');
  const [formPrice, setFormPrice] = useState(250000);
  const [formStock, setFormStock] = useState(20);
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop');

  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('Kemeja');
    setFormPrice(249000);
    setFormStock(20);
    setFormDesc('Bahan berkualitas halus dan breathable untuk penggunaan harian.');
    setFormImage('https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop');
    setShowProductModal(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setFormName(p.name);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormStock(p.stock);
    setFormDesc(p.description);
    setFormImage(p.images[0] || '');
    setShowProductModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formName,
        category: formCategory,
        price: formPrice,
        stock: formStock,
        description: formDesc,
        images: [formImage, ...editingProduct.images.slice(1)]
      };
      onUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: `prod-${Date.now()}`,
        name: formName,
        category: formCategory,
        price: formPrice,
        originalPrice: Math.round(formPrice * 1.2),
        rating: 5.0,
        reviewCount: 1,
        isNew: true,
        description: formDesc,
        images: [formImage],
        colors: [{ name: 'Hitam', hex: '#000000' }, { name: 'Putih', hex: '#FFFFFF' }],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: formStock,
        reviews: []
      };
      onAddProduct(newProd);
    }

    setShowProductModal(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Dashboard Pengelola Store</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin Panel Stitch Supply
          </h1>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              adminTab === 'overview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Statistik
          </button>
          <button
            onClick={() => setAdminTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              adminTab === 'products' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kelola Produk
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              adminTab === 'orders' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pesanan
          </button>
          <button
            onClick={() => setAdminTab('customers')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              adminTab === 'customers' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Pelanggan
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Penjualan</span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{formatRupiah(totalSales)}</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">↑ +18.4% dari bulan lalu</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Pesanan</span>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{orders.length} Pesanan</p>
              <p className="text-[11px] text-slate-400 font-bold mt-1">0% Selesai Tepat Waktu</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Total Produk</span>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">{products.length} SKU Active</p>
              <p className="text-[11px] text-slate-400 mt-1">4 Kategori Utama</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
              <div className="flex items-center justify-between text-slate-500 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Pelanggan Aktif</span>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900">0 User</p>
              <p className="text-[11px] text-slate-400 font-bold mt-1">Belum ada data pelanggan</p>
            </div>
          </div>

          {/* Sales Chart Simulation */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base">Grafik Penjualan Bulanan 2026</h3>
                <p className="text-xs text-slate-500">Omset penjualan dalam jutaan Rupiah</p>
              </div>
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>

            {/* Simulated Bar Visual */}
            <div className="pt-6 pb-2 flex items-end justify-between gap-2 sm:gap-4 h-52">
              {[
                { month: 'Jan', val: 0, amount: 'Rp 0' },
                { month: 'Feb', val: 0, amount: 'Rp 0' },
                { month: 'Mar', val: 0, amount: 'Rp 0' },
                { month: 'Apr', val: 0, amount: 'Rp 0' },
                { month: 'Mei', val: 0, amount: 'Rp 0' },
                { month: 'Jun', val: 0, amount: 'Rp 0' },
                { month: 'Jul', val: 0, amount: 'Rp 0' }
              ].map((item) => (
                <div key={item.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.amount}
                  </div>
                  <div
                    className="w-full bg-blue-600 hover:bg-blue-500 rounded-t-xl transition-all duration-300 relative group"
                    style={{ height: item.val === 0 ? '4px' : `${item.val}%` }}
                  />
                  <span className="text-xs font-bold text-slate-700">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* PRODUCTS MANAGEMENT TAB */}
      {adminTab === 'products' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="relative max-w-sm w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Cari nama produk / kategori..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
              />
            </div>

            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-md shadow-blue-600/30"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3 px-3">Produk</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Harga</th>
                  <th className="py-3 px-3">Stok</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 flex items-center gap-3">
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold text-slate-900 max-w-xs truncate">{p.name}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-md font-semibold text-slate-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-extrabold text-slate-900">
                      {formatRupiah(p.price)}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded font-bold ${p.stock < 15 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {p.stock} pcs
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-amber-600">
                      ★ {p.rating}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Produk"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {adminTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Kelola Transaksi Pesanan</h3>
              <p className="text-xs text-slate-500">Update status pesanan pelanggan secara langsung</p>
            </div>
            <ListOrdered className="w-5 h-5 text-blue-600" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
                  <th className="py-3 px-3">ID Pesanan</th>
                  <th className="py-3 px-3">Pelanggan</th>
                  <th className="py-3 px-3">Tanggal</th>
                  <th className="py-3 px-3">Total</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Ubah Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-extrabold text-blue-600">{o.id}</td>
                    <td className="py-3 px-3">
                      <p className="font-bold text-slate-900">{o.customerInfo.fullName}</p>
                      <p className="text-[10px] text-slate-400">{o.customerInfo.city}</p>
                    </td>
                    <td className="py-3 px-3 text-slate-500">{o.date}</td>
                    <td className="py-3 px-3 font-black text-slate-900">{formatRupiah(o.totalAmount)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        o.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : o.status === 'Dikirim'
                          ? 'bg-blue-100 text-blue-800'
                          : o.status === 'Diproses'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={o.status}
                        onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as Order['status'])}
                        className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Dikirim">Dikirim</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Dibatalkan">Dibatalkan</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CUSTOMERS TAB */}
      {adminTab === 'customers' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Daftar Pelanggan Terdaftar</h3>
              <p className="text-xs text-slate-500 mt-0.5">{customers.length} akun terdaftar via Supabase Auth</p>
            </div>
            <Users className="w-5 h-5 text-blue-600" />
          </div>

          {customers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-3xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-slate-400" />
              </div>
              <p className="font-bold text-slate-500">Belum ada pelanggan terdaftar</p>
              <p className="text-xs text-slate-400 mt-1">Pelanggan akan muncul di sini setelah mendaftar/login ke toko</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((cust) => (
                <div key={cust.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center gap-3">
                    {cust.avatar_url ? (
                      <img
                        src={cust.avatar_url}
                        alt={cust.full_name || 'User'}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
                        {(cust.full_name || cust.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-900 truncate">{cust.full_name || '(Tanpa Nama)'}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{cust.email}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex justify-between text-slate-600 gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-bold capitalize">
                      {cust.provider || 'email'}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      {new Date(cust.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ADD / EDIT PRODUCT MODAL */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  >
                    {['Hoodie', 'Heavy 16\'s', 'Ultra 20\'s', 'Eco 24\'s', 'Lengan Pendek', 'Lengan Panjang', 'Kemeja', 'Outerwear', 'Celana'].map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Harga (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Jumlah Stok</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">URL Gambar Produk</label>
                  <input
                    type="url"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Deskripsi Lengkap</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 font-bold text-slate-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-extrabold rounded-xl"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
