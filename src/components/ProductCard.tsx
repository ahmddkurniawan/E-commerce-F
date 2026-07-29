import React from 'react';
import { Product } from '../types';
import { Heart, Star, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  isInCart: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  isInCart,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Alternate Image on Hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.discountPercent && (
            <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              -{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              NEW
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all shadow-md z-10 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-600 text-white'
              : 'bg-white/90 text-slate-700 hover:text-rose-600 hover:bg-white'
          }`}
          title={isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
          aria-label="Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 bg-slate-900/90 hover:bg-slate-900 text-white rounded-xl text-xs font-bold backdrop-blur-md flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Detail</span>
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-1 justify-between text-left">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-blue-600 uppercase tracking-wider text-[10px]">{product.category}</span>
              {product.sleeveLength && (
                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-bold">
                  {product.sleeveLength}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full text-slate-700 text-[11px] font-bold">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
        </div>

        {/* Colors Available Swatch Indicator */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1 my-2">
            {product.colors.map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-slate-300"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[10px] text-slate-400 ml-1 font-medium">{product.colors.length} warna</span>
          </div>
        )}

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-2">
          <div>
            <p className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              {formatRupiah(product.price)}
            </p>
            {product.originalPrice && (
              <p className="text-xs text-slate-400 line-through">
                {formatRupiah(product.originalPrice)}
              </p>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`p-2.5 rounded-xl transition-all cursor-pointer ${
              isInCart
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
            title="Tambah ke Keranjang"
            aria-label="Tambah ke Keranjang"
          >
            {isInCart ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>

    </div>
  );
};
