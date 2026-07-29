import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Sparkles,
  LayoutDashboard,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  currentUser: UserType | null;
  onLogout: () => void;
  onSelectCategory: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenSearch,
  currentUser,
  onLogout,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Produk' },
    { id: 'categories', label: 'Kategori' },
    { id: 'about', label: 'Tentang Kami' },
    { id: 'contact', label: 'Kontak' }
  ];

  const categories = ['Semua', 'Hoodie', 'Heavy 16\'s', 'Ultra 20\'s', 'Eco 24\'s', 'Lengan Pendek', 'Lengan Panjang', 'Kemeja', 'Outerwear'];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Top Banner Announcement */}
      <div className="bg-slate-900 text-slate-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
        <span>Gratis Ongkir Min. Belanja Rp 200.000 | Gunakan Kode Voucher: <strong className="text-blue-400 underline font-semibold">STITCH10</strong></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <img 
                src="https://down-bs-id.img.susercontent.com/1cb9d5ea57a82ef2db742d380620872e_tn.webp" 
                alt="Logo" 
                className="w-9 h-9 rounded-xl object-cover shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 leading-none">
                  Stitch <span className="text-blue-600">Supply</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-500 uppercase font-bold mt-0.5">
                  Heavywear & Streetwear
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    activeTab === link.id
                      ? 'text-blue-600 bg-blue-50/80 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              {/* Admin Dashboard shortcut — only for admin */}
              {currentUser?.role === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`px-3 py-1.5 ml-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    activeTab === 'admin'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-blue-500" />
                  <span>Dashboard Admin</span>
                </button>
              )}
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Cari Produk"
              aria-label="Cari Produk"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors cursor-pointer"
              title="Keranjang Belanja"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-blue-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            <div className="h-5 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            {/* User Account / Auth Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop'}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-600/30"
                  />
                  <span className="text-xs font-semibold text-slate-800 hidden sm:inline-block max-w-[100px] truncate">
                    {currentUser.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-[9px] font-bold uppercase rounded bg-blue-100 text-blue-700">
                        {currentUser.role}
                      </span>
                    </div>

                    {currentUser.role === 'admin' && (
                      <button
                        onClick={() => {
                          handleNavClick('admin');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                        Dashboard Admin
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Masuk</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                  activeTab === link.id
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            ))}

            {/* Admin shortcut in mobile menu — only for admin */}
            {currentUser?.role === 'admin' && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                  activeTab === 'admin'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-blue-500" />
                  <span>Dashboard Admin</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-40" />
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Kategori Populer</p>
            <div className="flex flex-wrap gap-1.5 px-4">
              {categories.slice(1).map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    handleNavClick('products');
                  }}
                  className="px-3 py-1 bg-slate-100 hover:bg-blue-100 hover:text-blue-700 text-slate-700 text-xs rounded-lg font-medium transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
