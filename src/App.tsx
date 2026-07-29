import React, { useState, useMemo, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  FilterState, 
  User, 
  Order, 
  ToastMessage, 
  SizeType, 
  CategoryType 
} from './types';
import { INITIAL_PRODUCTS } from './data/mockProducts';
import { INITIAL_ORDERS, Voucher } from './data/mockData';
import { api } from './services/api';
import { supabase } from './services/supabase';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryCards } from './components/CategoryCards';
import { ProductCard, formatRupiah } from './components/ProductCard';
import { ProductFilters } from './components/ProductFilters';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutView } from './components/CheckoutView';
import { AuthModal } from './components/AuthModal';
import { AboutView } from './components/AboutView';
import { ContactView } from './components/ContactView';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { Search, X, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [activeTab, setActiveTab] = useState<string>('home');

  // Core Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        const [fetchedProducts, fetchedOrders] = await Promise.all([
          api.getProducts(),
          api.getOrders()
        ]);
        setProducts(fetchedProducts);
        setOrders(fetchedOrders);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // Listen for Google OAuth login/logout from Supabase
  useEffect(() => {
    // 1. Initial check when app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const supaUser = session.user;
        setCurrentUser({
          id: supaUser.id,
          name: supaUser.user_metadata?.full_name || supaUser.email?.split('@')[0] || 'User',
          email: supaUser.email || '',
          avatar: supaUser.user_metadata?.avatar_url || '',
          role: 'customer'
        });
      }
    });

    // 2. Listen for future changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const supaUser = session.user;
        setCurrentUser({
          id: supaUser.id,
          name: supaUser.user_metadata?.full_name || supaUser.email?.split('@')[0] || 'User',
          email: supaUser.email || '',
          avatar: supaUser.user_metadata?.avatar_url || '',
          role: 'customer'
        });
      } else {
        setCurrentUser(null);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // Modals & Drawers
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Active Voucher for Checkout
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { id, title, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    category: 'Semua',
    sleeveLength: 'Semua',
    fabricType: 'Semua',
    sizes: [],
    colors: [],
    priceRange: [80000, 600000],
    sortBy: 'terpopuler',
    searchQuery: ''
  });

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category Filter
      if (filters.category !== 'Semua') {
        if (filters.category === 'Lengan Pendek' || filters.category === 'Lengan Panjang') {
          if (p.sleeveLength !== filters.category && p.category !== filters.category) return false;
        } else if (
          filters.category === "Heavy 16's" || 
          filters.category === "Ultra 20's" || 
          filters.category === "Eco 24's"
        ) {
          if (p.fabricType !== filters.category && p.category !== filters.category) return false;
        } else if (p.category !== filters.category) {
          return false;
        }
      }

      // Sleeve Length Specific Filter
      if (filters.sleeveLength !== 'Semua' && p.sleeveLength !== filters.sleeveLength) {
        return false;
      }

      // Fabric Type Specific Filter
      if (filters.fabricType !== 'Semua' && p.fabricType !== filters.fabricType) {
        return false;
      }

      // Search Query
      if (
        filters.searchQuery &&
        !p.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !(p.fabricType && p.fabricType.toLowerCase().includes(filters.searchQuery.toLowerCase()))
      ) {
        return false;
      }

      // Size
      if (filters.sizes.length > 0) {
        const hasSize = p.sizes.some((s) => filters.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Color
      if (filters.colors.length > 0) {
        const hasColor = p.colors.some((c) => filters.colors.includes(c.name));
        if (!hasColor) return false;
      }

      // Price
      if (p.price > filters.priceRange[1]) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'harga-rendah') return a.price - b.price;
      if (filters.sortBy === 'harga-tinggi') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'terbaru') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return b.reviewCount - a.reviewCount; // terpopuler
    });
  }, [products, filters]);

  // Reset Filters
  const handleResetFilters = () => {
    setFilters({
      category: 'Semua',
      sleeveLength: 'Semua',
      fabricType: 'Semua',
      sizes: [],
      colors: [],
      priceRange: [80000, 600000],
      sortBy: 'terpopuler',
      searchQuery: ''
    });
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
      addToast('Diperbarui', `${product.name} dihapus dari Wishlist.`, 'info');
    } else {
      setWishlist([...wishlist, product]);
      addToast('Tersimpan! ❤️', `${product.name} berhasil ditambahkan ke Wishlist.`);
    }
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, size?: SizeType, color?: string, qty = 1) => {
    const selectedSize = size || product.sizes[0] || 'M';
    const selectedColor = color || product.colors[0]?.name || 'Hitam';

    const existingIndex = cart.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += qty;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random()}`,
        product,
        selectedSize,
        selectedColor,
        quantity: qty
      };
      setCart([...cart, newItem]);
    }

    addToast('Masuk Keranjang 🛒', `${product.name} (${selectedSize}, ${selectedColor}) ditambahkan.`);
  };

  const handleUpdateCartQty = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCart(cart.filter((item) => item.id !== cartItemId));
    } else {
      setCart(
        cart.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart(cart.filter((item) => item.id !== cartItemId));
    addToast('Dihapus', 'Produk dikeluarkan dari keranjang.', 'info');
  };

  // Direct Buy Now
  const handleBuyNow = (product: Product, size: SizeType, color: string, qty: number) => {
    handleAddToCart(product, size, color, qty);
    setSelectedProductDetail(null);
    setActiveTab('checkout');
  };

  // Move from wishlist to cart
  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product);
    setWishlist(wishlist.filter((p) => p.id !== product.id));
  };

  // Checkout Done
  const handleCompleteOrder = async (newOrder: Order) => {
    try {
      const addedOrder = await api.addOrder(newOrder);
      setOrders([addedOrder, ...orders]);
      setCart([]);
      setAppliedVoucher(null);
      addToast('Pesanan Berhasil! 🎉', `Nomor Resi: ${addedOrder.id}`);
    } catch (e) {
      addToast('Gagal', 'Pesanan gagal diproses', 'error');
    }
  };

  // Admin Handlers
  const handleAddProduct = async (newProduct: Product) => {
    try {
      const added = await api.addProduct(newProduct);
      setProducts([added, ...products]);
      addToast('Produk Ditambahkan', `${added.name} sekarang aktif di catalog.`);
    } catch (e) {
      addToast('Error', 'Gagal menambah produk', 'error');
    }
  };

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      const updated = await api.updateProduct(updatedProduct);
      setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
      addToast('Produk Diperbarui', `Perubahan pada ${updated.name} disimpan.`);
    } catch (e) {
      addToast('Error', 'Gagal mengubah produk', 'error');
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await api.deleteProduct(productId);
      setProducts(products.filter((p) => p.id !== productId));
      addToast('Produk Dihapus', 'SKU produk telah dihapus dari sistem.', 'info');
    } catch (e) {
      addToast('Error', 'Gagal menghapus produk', 'error');
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      addToast('Status Pesanan Diubah', `${orderId} diperbarui menjadi: ${newStatus}`);
    } catch (e) {
      addToast('Error', 'Gagal mengubah status', 'error');
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-slate-50/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center justify-center text-blue-600 gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-sm tracking-widest uppercase">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentUser={currentUser}
        onLogout={async () => {
          await supabase.auth.signOut(); // Hapus sesi Supabase dari localStorage
          setCurrentUser(null);
          setActiveTab('home');
          addToast('Sampai Jumpa', 'Anda telah keluar dari akun.');
        }}
        onSelectCategory={(cat) => {
          setFilters({ ...filters, category: cat as CategoryType });
          setActiveTab('products');
        }}
      />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        
        {/* HOME VIEW */}
        {activeTab === 'home' && (
          <div>
            <HeroBanner
              onShopNow={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <CategoryCards
              onSelectCategory={(cat) => {
                setFilters({ ...filters, category: cat as CategoryType });
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Products Section */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Rekomendasi Utama</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                    Produk Unggulan Pilihan Minggu Ini
                  </h2>
                </div>
                <button
                  onClick={() => setActiveTab('products')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors cursor-pointer w-fit"
                >
                  Lihat Semua Catalog ({products.length})
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter((p) => p.isFeatured || p.isBestseller).slice(0, 4).map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    isWishlisted={wishlist.some((w) => w.id === prod.id)}
                    isInCart={cart.some((c) => c.product.id === prod.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onQuickView={(p) => setSelectedProductDetail(p)}
                    onAddToCart={(p) => handleAddToCart(p)}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* PRODUCTS & CATALOG VIEW */}
        {activeTab === 'products' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
            <div className="mb-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Koleksi Baju Modern</span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-0.5">
                Catalog Produk Stitch Supply
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Filters Sidebar */}
              <div className="lg:col-span-3 lg:sticky lg:top-24">
                <ProductFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  onResetFilters={handleResetFilters}
                  totalResults={filteredProducts.length}
                />
              </div>

              {/* Right Product Grid */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Sorting Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
                  <span>Menampilkan <strong>{filteredProducts.length}</strong> dari {products.length} produk</span>

                  <div className="flex items-center gap-2 ml-auto">
                    <span>Urutkan:</span>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="terpopuler">Terpopuler</option>
                      <option value="terbaru">Terbaru & New Arrival</option>
                      <option value="harga-rendah">Harga Terendah</option>
                      <option value="harga-tinggi">Harga Tertinggi</option>
                      <option value="rating">Rating Tertinggi</option>
                    </select>
                  </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
                    <p className="font-extrabold text-slate-800 text-base">Tidak Ada Produk yang Cocok</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Coba ubah kata kunci pencarian atau reset filter kategori, warna, dan ukuran Anda.
                    </p>
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
                    >
                      Reset Filter
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        isWishlisted={wishlist.some((w) => w.id === prod.id)}
                        isInCart={cart.some((c) => c.product.id === prod.id)}
                        onToggleWishlist={handleToggleWishlist}
                        onQuickView={(p) => setSelectedProductDetail(p)}
                        onAddToCart={(p) => handleAddToCart(p)}
                      />
                    ))}
                  </div>
                )}

              </div>

            </div>
          </div>
        )}

        {/* CATEGORIES VIEW */}
        {activeTab === 'categories' && (
          <div className="py-8">
            <CategoryCards
              onSelectCategory={(cat) => {
                setFilters({ ...filters, category: cat as CategoryType });
                setActiveTab('products');
              }}
            />
          </div>
        )}

        {/* ABOUT VIEW */}
        {activeTab === 'about' && <AboutView />}

        {/* CONTACT VIEW */}
        {activeTab === 'contact' && <ContactView onShowToast={addToast} />}

        {/* CHECKOUT VIEW */}
        {activeTab === 'checkout' && (
          <CheckoutView
            cartItems={cart}
            appliedVoucher={appliedVoucher}
            currentUser={currentUser}
            onBackToCart={() => setIsCartOpen(true)}
            onCompleteOrder={handleCompleteOrder}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

      </main>

      {/* QUICK SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 shadow-2xl space-y-4 border border-slate-200 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="relative flex-1 mr-3">
                <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Ketik kemeja, blazer, denim, atau gaun..."
                  value={filters.searchQuery}
                  onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-slate-800">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Quick Results */}
            <div className="max-h-80 overflow-y-auto space-y-2">
              {filteredProducts.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProductDetail(p);
                    setIsSearchOpen(false);
                  }}
                  className="p-3 bg-slate-50 hover:bg-blue-50/80 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <p className="font-extrabold text-xs text-slate-900">{p.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase">{p.category}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-blue-600">{formatRupiah(p.price)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setActiveTab('products');
                }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Lihat Semua Hasil Pencarian →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRODUCT DETAIL MODAL */}
      <ProductDetailModal
        product={selectedProductDetail}
        isOpen={Boolean(selectedProductDetail)}
        onClose={() => setSelectedProductDetail(null)}
        isWishlisted={Boolean(selectedProductDetail && wishlist.some((w) => w.id === selectedProductDetail.id))}
        onToggleWishlist={handleToggleWishlist}
        onAddToCartWithSizeAndColor={(p, size, color, qty) => handleAddToCart(p, size, color, qty)}
        onBuyNow={handleBuyNow}
        allProducts={products}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
      />

      {/* SHOPPING CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(v) => {
          setAppliedVoucher(v);
          setActiveTab('checkout');
        }}
      />

      {/* WISHLIST DRAWER */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={handleMoveWishlistToCart}
      />

      {/* AUTH MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(u) => {
          setCurrentUser(u);
          if (u.role === 'admin') {
            setActiveTab('admin');
            addToast('Selamat Datang Admin', `Login berhasil sebagai ${u.name} 🛡️`);
          } else {
            addToast('Berhasil Masuk', `Selamat datang kembali, ${u.name}! 👋`);
          }
        }}
      />

      {/* FOOTER */}
      <Footer
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCategory={(cat) => {
          setFilters({ ...filters, category: cat as CategoryType });
        }}
      />

    </div>
  );
}
