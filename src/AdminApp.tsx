import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, Order } from './types';
import { api, CustomerProfile } from './services/api';
import { supabase } from './services/supabase';
import { AdminDashboard } from './components/AdminDashboard';
import { ToastContainer } from './components/Toast';
import { ToastMessage } from './types';
import { Lock, Sparkles, Eye, EyeOff } from 'lucide-react';

// ─── Admin Login Page ──────────────────────────────────────────
const AdminLoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      setError('ID Admin atau Kata Sandi salah. Coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold mb-3">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Dashboard Pengelola Store</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Admin Login</h1>
          <p className="text-xs text-slate-500 mt-1">Masukkan ID dan Kata Sandi Admin Anda</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ID Admin</label>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Masukkan ID Admin"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Kata Sandi</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-700"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-600 font-bold bg-rose-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer"
          >
            Masuk ke Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-xs text-slate-400 hover:text-blue-600 font-semibold transition-colors">
            ← Kembali ke Halaman Toko
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Admin App (with auth guard) ──────────────────────────────
export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem('admin_auth') === 'true'
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<CustomerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    if (!isAuthenticated) { setIsLoading(false); return; }
    const fetchData = async () => {
      setIsLoading(true);
      const [p, o, c] = await Promise.all([api.getProducts(), api.getOrders(), api.getCustomers()]);
      setProducts(p);
      setOrders(o);
      setCustomers(c);
      setIsLoading(false);
    };
    fetchData();
  }, [isAuthenticated]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}`;
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  };

  const handleAddProduct = async (newProduct: Product) => {
    try {
      const added = await api.addProduct(newProduct);
      setProducts([added, ...products]);
      addToast('Produk Ditambahkan', `${added.name} aktif di catalog.`);
    } catch { addToast('Error', 'Gagal menambah produk', 'error'); }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const updated = await api.updateProduct(updatedProduct);
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
      addToast('Produk Diperbarui', `${updated.name} berhasil disimpan.`);
    } catch { addToast('Error', 'Gagal mengubah produk', 'error'); }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await api.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      addToast('Produk Dihapus', 'SKU produk dihapus dari sistem.', 'info');
    } catch { addToast('Error', 'Gagal menghapus produk', 'error'); }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      addToast('Status Diubah', `${orderId} → ${newStatus}`);
    } catch { addToast('Error', 'Gagal mengubah status', 'error'); }
  };

  if (!isAuthenticated) {
    return <AdminLoginPage onLogin={() => {
      localStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    }} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-blue-600">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="font-bold text-sm tracking-widest uppercase">Memuat Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((p) => p.filter((t) => t.id !== id))} />

      {/* Admin Top Bar */}
      <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-white">Stitch Supply — Admin Panel</p>
            <p className="text-[10px] text-slate-400">Dashboard Pengelola Store</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs text-slate-400 hover:text-white transition-colors font-semibold">
            ← Lihat Toko
          </a>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              setIsAuthenticated(false);
            }}
            className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
          >
            Keluar
          </button>
        </div>
      </div>

      <AdminDashboard
        products={products}
        orders={orders}
        customers={customers}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateOrderStatus={handleUpdateOrderStatus}
      />
    </div>
  );
}
