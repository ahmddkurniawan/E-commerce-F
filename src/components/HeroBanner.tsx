import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroBannerProps {
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-6 shadow-2xl">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 space-y-6 text-left z-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>Stitch Supply • Heavywear & Streetwear Specialist</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] text-white">
            Katalog Hoodie & Kaos Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-white">Heavy 16's, Ultra 20's, Eco 24's</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Spesialis Hoodie Fleece 330 GSM, Kaos Boxy Heavy 16's, Ultra 20's, serta Eco 24's Organik. Tersedia opsi Lengan Pendek & Lengan Panjang bahan premium terbaik.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onShopNow}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base flex items-center gap-3 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Belanja Sekarang</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <a
              href="#kategori"
              className="px-7 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all cursor-pointer"
            >
              Lihat Kategori
            </a>
          </div>

          {/* Value Proposition Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800 text-slate-300 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Gratis Ongkir</p>
                <p className="text-[11px] text-slate-400">Min. Rp 200rb</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">100% Original</p>
                <p className="text-[11px] text-slate-400">Garansi Kualitas</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Retur 7 Hari</p>
                <p className="text-[11px] text-slate-400">Tukar Size Mudah</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-slate-800 text-blue-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white text-xs">Kain Premium</p>
                <p className="text-[11px] text-slate-400">Standard Ekspor</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Banner Image Showcase */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800/80 group">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
              alt="Fashion Collection Showcase"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

            {/* Floating Offer Badge */}
            <div className="absolute top-4 right-4 bg-blue-600 text-white font-extrabold text-xs px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-1.5 backdrop-blur-md">
              <span className="text-lg">🔥</span>
              <div>
                <p className="leading-tight text-[10px] text-blue-200">Diskon Hingga</p>
                <p className="text-sm font-black leading-none">25% OFF</p>
              </div>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Lookbook Streetwear 2026</p>
                  <p className="text-[11px] text-slate-300">Temukan kombinasi outfit kekinian Anda</p>
                </div>
                <button
                  onClick={onShopNow}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shrink-0"
                >
                  Lihat
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
