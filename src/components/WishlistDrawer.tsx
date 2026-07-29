import React from 'react';
import { Product } from '../types';
import { formatRupiah } from './ProductCard';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onMoveToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between text-left"
        >
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-rose-600 text-white rounded-xl shadow-xs">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">Wishlist Saya</h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {wishlistItems.length} produk tersimpan
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-3">
                  <Heart className="w-8 h-8" />
                </div>
                <p className="font-extrabold text-slate-700 text-sm">Wishlist Anda Masih Kosong</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Simpan baju impian Anda dengan menekan ikon hati di produk!
                </p>
              </div>
            ) : (
              wishlistItems.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 bg-white border border-slate-200/90 rounded-2xl flex gap-3 shadow-2xs items-center"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-blue-600 uppercase">{prod.category}</span>
                    <h4 className="font-bold text-xs text-slate-900 truncate">{prod.name}</h4>
                    <p className="text-xs font-black text-slate-900 mt-1">
                      {formatRupiah(prod.price)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onMoveToCart(prod);
                        }}
                        className="flex-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>+ Keranjang</span>
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(prod)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus dari Wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
