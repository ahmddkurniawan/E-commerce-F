import React, { useState } from 'react';
import { Product, SizeType, Review } from '../types';
import { formatRupiah } from './ProductCard';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Check, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCartWithSizeAndColor: (product: Product, size: SizeType, color: string, quantity: number) => void;
  onBuyNow: (product: Product, size: SizeType, color: string, quantity: number) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCartWithSizeAndColor,
  onBuyNow,
  allProducts,
  onSelectProduct
}) => {
  if (!isOpen || !product) return null;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<SizeType>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'fabric' | 'reviews'>('desc');

  // New review form states
  const [showAddReview, setShowAddReview] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<Review[]>(product.reviews || []);

  const handleAddReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userName: reviewerName,
      rating: reviewRating,
      date: 'Hari ini',
      comment: reviewComment
    };

    setLocalReviews([newRev, ...localReviews]);
    setReviewerName('');
    setReviewComment('');
    setShowAddReview(false);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 text-left"
        >
          {/* Close Modal Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            aria-label="Tutup Detail"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Image Gallery */}
            <div className="md:col-span-6 space-y-4">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner group">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {product.discountPercent && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-rose-600 text-white font-black text-xs rounded-lg shadow-sm">
                    -{product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImageIndex === idx
                          ? 'border-blue-600 ring-2 ring-blue-600/30'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Details */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5">
              <div>
                {/* Category, Fabric & Ratings */}
                <div className="flex items-center justify-between text-xs mb-2 flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-extrabold uppercase tracking-wider">
                      {product.category}
                    </span>
                    {product.sleeveLength && (
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold">
                        {product.sleeveLength}
                      </span>
                    )}
                    {product.fabricType && (
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                        {product.fabricType}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full text-amber-900 font-bold">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{product.rating}</span>
                    <span className="text-amber-700 font-normal">({localReviews.length} Ulasan)</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>

                {/* Pricing & Stock */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">
                    {formatRupiah(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatRupiah(product.originalPrice)}
                    </span>
                  )}
                  <span className="ml-auto text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    Stok Tersedia ({product.stock} pcs)
                  </span>
                </div>

                {/* Color Selector */}
                <div className="mt-6">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Pilih Warna: <span className="text-blue-600">{selectedColor}</span>
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-blue-600 bg-blue-50/80 text-blue-700 ring-2 ring-blue-600/20'
                            : 'border-slate-200 text-slate-700 hover:border-slate-400'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-xs"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mt-5">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Pilih Ukuran (Size):
                    </label>
                    <span className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">
                      Panduan Ukuran
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`py-2.5 text-xs font-black rounded-xl border transition-all cursor-pointer ${
                          selectedSize === s
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="mt-5 flex items-center gap-4">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Jumlah:
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-xs font-extrabold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="p-2 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 space-y-2.5 border-t border-slate-100">
                <div className="flex gap-3">
                  <button
                    onClick={() => onAddToCartWithSizeAndColor(product, selectedSize, selectedColor, quantity)}
                    className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>+ Keranjang ({formatRupiah(product.price * quantity)})</span>
                  </button>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isWishlisted
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50 hover:text-rose-600'
                    }`}
                    title="Simpan ke Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={() => onBuyNow(product, selectedSize, selectedColor, quantity)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Beli Sekarang
                </button>
              </div>

              {/* Badges Info */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Pengiriman Kilat 1-2 Hari</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Garansi Retur Ukuran 7 Hari</span>
                </div>
              </div>

            </div>
          </div>

          {/* Description & Reviews Tabs Section */}
          <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
              <button
                onClick={() => setActiveTab('desc')}
                className={`text-xs font-extrabold pb-1 transition-all cursor-pointer border-b-2 ${
                  activeTab === 'desc'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Deskripsi Produk
              </button>
              <button
                onClick={() => setActiveTab('fabric')}
                className={`text-xs font-extrabold pb-1 transition-all cursor-pointer border-b-2 ${
                  activeTab === 'fabric'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Bahan & Perawatan
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs font-extrabold pb-1 transition-all cursor-pointer border-b-2 ${
                  activeTab === 'reviews'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Ulasan Pembeli ({localReviews.length})
              </button>
            </div>

            <div className="py-4 text-xs text-slate-700 leading-relaxed">
              {activeTab === 'desc' && (
                <div className="space-y-2">
                  <p className="whitespace-pre-line">{product.description}</p>
                  <p className="text-slate-500">
                    Kombinasikan dengan celana chino atau denim dari koleksi Stitch Supply untuk penampilan harian yang sempurna.
                  </p>
                </div>
              )}

              {activeTab === 'fabric' && (
                <div>
                  <p className="font-bold text-slate-900 mb-1">Spesifikasi Material:</p>
                  <p>{product.fabricDetails || '100% Cotton Premium. Bahan dingin dan menyerap keringat.'}</p>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-extrabold text-sm text-slate-900">Ulasan Pelanggan</p>
                      <p className="text-slate-500 text-[11px]">Didasarkan pada ulasan terverifikasi</p>
                    </div>
                    <button
                      onClick={() => setShowAddReview(!showAddReview)}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Tulis Ulasan</span>
                    </button>
                  </div>

                  {/* Add Review Form */}
                  {showAddReview && (
                    <form onSubmit={handleAddReviewSubmit} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Nama Anda</label>
                        <input
                          type="text"
                          required
                          placeholder="Masukkan nama"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Rating</label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setReviewRating(star)}
                              className="text-amber-400 p-1 cursor-pointer"
                            >
                              <Star className={`w-5 h-5 ${star <= reviewRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Komentar / Ulasan</label>
                        <textarea
                          required
                          rows={2}
                          placeholder="Tuliskan ulasan mengenai kenyamanan, bahan, dan ukuran..."
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowAddReview(false)}
                          className="px-3 py-1.5 text-slate-600 font-semibold"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-blue-600 text-white font-bold rounded-xl"
                        >
                          Kirim Ulasan
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Reviews List */}
                  <div className="space-y-3">
                    {localReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900">{rev.userName}</span>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < rev.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-slate-600 mt-1">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="px-6 sm:px-8 pb-8 pt-4 border-t border-slate-200 bg-slate-50/50 rounded-b-3xl">
              <h3 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Produk Terkait Lainnya</span>
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      onSelectProduct(rel);
                      setSelectedImageIndex(0);
                    }}
                    className="p-2 bg-white rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer flex gap-2 items-center transition-all"
                  >
                    <img src={rel.images[0]} alt={rel.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="overflow-hidden">
                      <p className="font-bold text-xs text-slate-900 truncate">{rel.name}</p>
                      <p className="text-blue-600 font-extrabold text-xs">{formatRupiah(rel.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
