import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCardsProps {
  onSelectCategory: (category: string) => void;
}

export const CATEGORIES_DATA = [
  {
    id: 'hoodie',
    name: 'Hoodie',
    count: 'Katalog Khusus Fleece 330 GSM',
    image: 'https://down-id.img.susercontent.com/file/20b459684613b00bea776953f23c915f@resize_w900_nl.webp',
    color: 'from-blue-950/85 to-slate-900/90'
  },
  {
    id: 'heavy16s',
    name: "Heavy 16's",
    count: 'Heavyweight Cotton (230 GSM)',
    image: 'https://down-id.img.susercontent.com/file/0a000f915fc61b81ce0497e3c806b599@resize_w900_nl.webp',
    color: 'from-slate-900/85 to-slate-950/90'
  },
  {
    id: 'ultra20s',
    name: "Ultra 20's",
    count: 'Ultra Cotton (200 GSM)',
    image: 'https://down-id.img.susercontent.com/file/0a000f915fc61b81ce0497e3c806b599@resize_w900_nl.webp',
    color: 'from-indigo-950/85 to-slate-900/90'
  },
  {
    id: 'eco24s',
    name: "Eco 24's",
    count: 'Organic Cotton (175 GSM)',
    image: 'https://down-id.img.susercontent.com/file/0a000f915fc61b81ce0497e3c806b599@resize_w900_nl.webp',
    color: 'from-emerald-950/85 to-slate-900/90'
  },
  {
    id: 'short-sleeve',
    name: 'Lengan Pendek',
    count: 'Bahan Premium Short Sleeve',
    image: 'https://down-id.img.susercontent.com/file/7282633663c845ee63205f69d4c55ea5@resize_w900_nl.webp',
    color: 'from-amber-950/85 to-slate-900/90'
  },
  {
    id: 'long-sleeve',
    name: 'Lengan Panjang',
    count: 'Bahan Premium Long Sleeve',
    image: 'https://down-id.img.susercontent.com/file/e626e1ad9ea0ebd52bf195599ed6d479@resize_w900_nl.webp',
    color: 'from-purple-950/85 to-slate-900/90'
  }
];

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  return (
    <section id="kategori" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Katalog Utama Stitch Supply</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Pilih Berdasarkan Jenis Kaos, Hoodie, & Lengan
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md">
          Spesialisasi bahan kaos Heavy 16's, Ultra 20's, Eco 24's, Hoodie Fleece, serta variasi Lengan Pendek dan Lengan Panjang.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 text-left cursor-pointer border border-slate-200/60"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
              <div className="flex justify-end">
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black tracking-tight leading-tight">{cat.name}</h3>
                <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">{cat.count}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
