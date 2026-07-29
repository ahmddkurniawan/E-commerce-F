import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatRupiah } from './ProductCard';
import { PROMO_VOUCHERS, Voucher } from '../data/mockData';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  Plus, 
  Minus,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: (voucher: Voucher | null) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [voucherCode, setVoucherCode] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [voucherError, setVoucherError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');

    const found = PROMO_VOUCHERS.find(
      (v) => v.code.toUpperCase() === voucherCode.trim().toUpperCase()
    );

    if (!found) {
      setVoucherError('Kode voucher tidak valid!');
      return;
    }

    if (subtotal < found.minPurchase) {
      setVoucherError(`Minimal belanja untuk voucher ini adalah ${formatRupiah(found.minPurchase)}`);
      return;
    }

    setAppliedVoucher(found);
    setVoucherCode('');
  };

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.discountType === 'percentage') {
      return (subtotal * appliedVoucher.discountValue) / 100;
    }
    return appliedVoucher.discountValue;
  };

  const discountAmount = calculateDiscount();
  const estimatedShipping = subtotal > 200000 ? 0 : 18000;
  const grandTotal = Math.max(0, subtotal - discountAmount + estimatedShipping);

  // Free shipping progress calculation (target Rp 200.000)
  const freeShippingTarget = 200000;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingTarget) * 100);

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
          {/* Cart Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-extrabold text-slate-900 text-base">Keranjang Belanja</h2>
                <p className="text-[11px] text-slate-500 font-medium">
                  {cartItems.length} jenis produk dipilih
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

          {/* Free Shipping Progress Indicator */}
          <div className="bg-blue-50/80 px-5 py-3 border-b border-blue-100 text-xs">
            <div className="flex items-center gap-2 mb-1.5 text-blue-900 font-bold">
              <Truck className="w-4 h-4 text-blue-600" />
              {subtotal >= freeShippingTarget ? (
                <span className="text-emerald-700 font-extrabold">Selamat! Anda mendapatkan Gratis Ongkir 🎉</span>
              ) : (
                <span>
                  Belanja <strong className="text-blue-600">{formatRupiah(freeShippingTarget - subtotal)}</strong> lagi untuk Gratis Ongkir!
                </span>
              )}
            </div>
            <div className="w-full bg-blue-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-extrabold text-slate-700 text-sm">Keranjang Anda Masih Kosong</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Yuk jelajahi koleksi baju modern VogueStore dan pilih outfit favoritmu!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white border border-slate-200/90 rounded-2xl flex gap-3 shadow-2xs items-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{item.product.name}</h4>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                      <span className="px-1.5 py-0.5 bg-slate-100 rounded font-semibold text-slate-700">
                        Size: {item.selectedSize}
                      </span>
                      <span className="truncate">Warna: {item.selectedColor}</span>
                    </div>

                    <p className="text-xs font-black text-slate-900 mt-1.5">
                      {formatRupiah(item.product.price)}
                    </p>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-extrabold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors cursor-pointer"
                        title="Hapus item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Voucher Input */}
              <form onSubmit={handleApplyVoucher} className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Voucher Diskon
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Masukkan kode: VOGUE10"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs uppercase font-bold text-slate-900 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    Gunakan
                  </button>
                </div>

                {voucherError && (
                  <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {voucherError}
                  </p>
                )}

                {appliedVoucher && (
                  <div className="flex items-center justify-between p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold mt-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Voucher <strong>{appliedVoucher.code}</strong> dipasang!</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAppliedVoucher(null)}
                      className="text-rose-600 text-[10px] underline font-bold"
                    >
                      Lepas
                    </button>
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs border-t border-slate-200 pt-3">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Diskon Voucher</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Estimasi Ongkir</span>
                  <span>{estimatedShipping === 0 ? <strong className="text-emerald-600">GRATIS</strong> : formatRupiah(estimatedShipping)}</span>
                </div>

                <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-200 pt-2">
                  <span>Total Pembayaran</span>
                  <span className="text-blue-600 text-base">{formatRupiah(grandTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(appliedVoucher);
                }}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
