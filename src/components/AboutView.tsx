import React from 'react';
import { MOCK_TESTIMONIALS } from '../data/mockData';
import { ShieldCheck, Award, HeartHandshake, Sparkles, Star, Quote } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-16">
      
      {/* Brand Hero Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tentang Stitch Supply</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pelopor Heavywear & Streetwear Premium dengan Material Standar Ekspor
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Stitch Supply adalah brand independen yang berdedikasi menciptakan pakaian dengan kualitas konstruksi terbaik. Kami merancang lini spesialisasi Hoodie Fleece 330 GSM, serta Kaos Heavy 16's, Ultra 20's, dan Eco 24's.
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Tersedia dalam pilihan Lengan Pendek dan Lengan Panjang, setiap karya dibuat dari kain gramasi tebal yang presisi, leher rib anti-kendur, dan rajutan katun murni yang adem di iklim tropis.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-blue-600">85K+</p>
              <p className="text-xs font-bold text-slate-500">Produk Terjual</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-blue-600">99.2%</p>
              <p className="text-xs font-bold text-slate-500">Ulasan Bintang 5</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-blue-600">24/7</p>
              <p className="text-xs font-bold text-slate-500">Dukungan Pelanggan</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop"
              alt="Stitch Supply Workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">Keunggulan Material</span>
          <h2 className="text-2xl sm:text-3xl font-black mt-1">Mengapa Memilih Stitch Supply?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-white">Spesialis Heavyweight Fabric</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kapasitas kain tebal terukur: Heavy 16's (230 GSM), Ultra 20's (200 GSM), dan Fleece 330 GSM yang kokoh & tahan cuci berulang.
            </p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-white">Garansi Tukar Size 7 Hari</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Garansi kepuasan penuh. Jika ukuran kurang pas, tukar size dapat dilakukan dengan cepat & mudah dalam 7 hari.
            </p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3">
            <div className="p-3 bg-blue-600 text-white rounded-xl w-fit">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-white">Jahitan Presisi Rantai</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Jahitan pundak rantai ganda dan rib leher tebal anti-kendur yang tahan digunakan bertahun-tahun.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Testimonials Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Testimoni Komunitas</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Ulasan Asli Komunitas Stitch Supply
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div key={t.id} className="p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4 relative">
              <Quote className="w-8 h-8 text-blue-100 absolute top-4 right-4" />
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{t.comment}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-extrabold text-xs text-slate-900">{t.name}</p>
                  <p className="text-[10px] text-slate-500">{t.role} • {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
