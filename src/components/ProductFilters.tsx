import React from 'react';
import { FilterState, CategoryType, SizeType, SleeveType, FabricType } from '../types';
import { Filter, RotateCcw, Search, Check } from 'lucide-react';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const CATEGORIES: CategoryType[] = [
  'Semua', 
  'Hoodie', 
  'Heavy 16\'s', 
  'Ultra 20\'s', 
  'Eco 24\'s', 
  'Lengan Pendek', 
  'Lengan Panjang', 
  'Outerwear', 
  'Kemeja', 
  'Celana'
];

const SLEEVE_OPTIONS: Array<'Semua' | SleeveType> = [
  'Semua',
  'Lengan Pendek',
  'Lengan Panjang'
];

const FABRIC_OPTIONS: Array<'Semua' | FabricType> = [
  'Semua',
  'Heavy 16\'s',
  'Ultra 20\'s',
  'Eco 24\'s',
  'Cotton Fleece 330 GSM',
  'French Terry 350 GSM',
  'Linen Premium'
];

const SIZES: SizeType[] = ['S', 'M', 'L', 'XL', 'XXL'];

const COLORS = [
  { name: 'Putih', hex: '#FFFFFF' },
  { name: 'Hitam', hex: '#000000' },
  { name: 'Biru', hex: '#2563EB' },
  { name: 'Grey', hex: '#4B5563' },
  { name: 'Olive', hex: '#3F4E4F' },
  { name: 'Beige', hex: '#D2B48C' }
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults
}) => {

  const handleCategorySelect = (cat: CategoryType) => {
    onFilterChange({ ...filters, category: cat });
  };

  const handleSleeveSelect = (sleeve: 'Semua' | SleeveType) => {
    onFilterChange({ ...filters, sleeveLength: sleeve });
  };

  const handleFabricSelect = (fabric: 'Semua' | FabricType) => {
    onFilterChange({ ...filters, fabricType: fabric });
  };

  const handleSizeToggle = (size: SizeType) => {
    const updatedSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onFilterChange({ ...filters, sizes: updatedSizes });
  };

  const handleColorToggle = (colorName: string) => {
    const updatedColors = filters.colors.includes(colorName)
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];
    onFilterChange({ ...filters, colors: updatedColors });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxVal = Number(e.target.value);
    onFilterChange({ ...filters, priceRange: [filters.priceRange[0], maxVal] });
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-6 text-left">
      
      {/* Header & Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-blue-600" />
          <h3 className="font-extrabold text-slate-900 text-base">Filter Produk</h3>
        </div>
        <button
          onClick={onResetFilters}
          className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Search Query Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Cari Kata Kunci / Jenis
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari hoodie, 16s, 20s, 24s, kemeja..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div>
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Kategori / Jenis Katalog
        </h4>
        <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                filters.category === cat
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{cat}</span>
              {filters.category === cat && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Sleeve Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Variasi Lengan
        </h4>
        <div className="flex flex-col gap-1.5">
          {SLEEVE_OPTIONS.map((sleeve) => (
            <button
              key={sleeve}
              onClick={() => handleSleeveSelect(sleeve)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                filters.sleeveLength === sleeve
                  ? 'bg-slate-900 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <span>{sleeve}</span>
              {filters.sleeveLength === sleeve && <Check className="w-3.5 h-3.5 text-blue-400" />}
            </button>
          ))}
        </div>
      </div>

      {/* Fabric Type Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Jenis Bahan Premium
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {FABRIC_OPTIONS.map((fabric) => (
            <button
              key={fabric}
              onClick={() => handleFabricSelect(fabric)}
              className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                filters.fabricType === fabric
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-300'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{fabric}</span>
              {filters.fabricType === fabric && <Check className="w-3.5 h-3.5 text-blue-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Ukuran (Size)
        </h4>
        <div className="grid grid-cols-5 gap-1.5">
          {SIZES.map((size) => {
            const isSelected = filters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeToggle(size)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
          Pilihan Warna
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => {
            const isSelected = filters.colors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => handleColorToggle(c.name)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-slate-300"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider Filter */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Rentang Harga Maks.
          </h4>
          <span className="text-xs font-extrabold text-blue-600">
            Rp {filters.priceRange[1].toLocaleString('id-ID')}
          </span>
        </div>
        <input
          type="range"
          min={80000}
          max={600000}
          step={20000}
          value={filters.priceRange[1]}
          onChange={handlePriceMaxChange}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
          <span>Rp 80.000</span>
          <span>Rp 600.000</span>
        </div>
      </div>

      <div className="pt-2 text-center text-xs text-slate-500 font-medium">
        Menampilkan <strong className="text-slate-900">{totalResults}</strong> produk
      </div>

    </div>
  );
};
