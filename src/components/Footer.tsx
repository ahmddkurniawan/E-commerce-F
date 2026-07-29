import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onSelectCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onSelectCategory }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                S
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Stitch <span className="text-blue-500">Supply</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Brand spesialis Heavywear & Streetwear modern dengan katalog khusus Hoodie Fleece 330 GSM, serta Kaos Heavy 16's, Ultra 20's, dan Eco 24's. Tersedia variasi Lengan Pendek & Lengan Panjang bahan premium.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>Jakarta Selatan, DKI Jakarta 12190</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>+62 812-3456-7890</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span>support@stitchsupply.id</span>
              </p>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase text-white tracking-wider">Navigasi Utama</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavigateTab('home')} className="hover:text-white transition-colors cursor-pointer">Beranda</button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('products')} className="hover:text-white transition-colors cursor-pointer">Semua Katalog</button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('about')} className="hover:text-white transition-colors cursor-pointer">Tentang Kami</button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('contact')} className="hover:text-white transition-colors cursor-pointer">Kontak CS</button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('admin')} className="hover:text-white transition-colors text-blue-400 cursor-pointer">Dashboard Admin UI</button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase text-white tracking-wider">Katalog Spesialis</h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              {['Hoodie', 'Heavy 16\'s', 'Ultra 20\'s', 'Eco 24\'s', 'Lengan Pendek', 'Lengan Panjang', 'Kemeja', 'Outerwear'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(cat);
                      onNavigateTab('products');
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-xs uppercase text-white tracking-wider">Newsletter & Drop Info</h4>
            <p className="text-xs text-slate-400">
              Dapatkan info rilisan artikel terbaru & voucher diskon Stitch Supply langsung di email Anda.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Terima kasih telah berlangganan!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Masukkan email Anda"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Langganan</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar Payment Badges & Copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Stitch Supply. Hak Cipta Dilindungi Undang-Undang.</p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400">Metode Pembayaran:</span>
            <div className="flex gap-1.5 text-[10px] font-bold">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">BCA</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">Mandiri</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">GoPay</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">OVO</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">QRIS</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded text-slate-300">COD</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
