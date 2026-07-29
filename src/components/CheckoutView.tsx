import React, { useState } from 'react';
import { CartItem, CheckoutForm, Order } from '../types';
import { formatRupiah } from './ProductCard';
import { COURIER_OPTIONS, Voucher } from '../data/mockData';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  User, 
  MapPin, 
  CheckCircle2, 
  ArrowLeft,
  Receipt,
  Download,
  ShoppingBag,
  Building2,
  QrCode
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedVoucher: Voucher | null;
  onBackToCart: () => void;
  onCompleteOrder: (newOrder: Order) => void;
}

const INDONESIAN_PROVINCES = [
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'Jawa Timur',
  'Banten',
  'DI Yogyakarta',
  'Bali',
  'Sumatera Utara',
  'Sulawesi Selatan'
];

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  appliedVoucher,
  onBackToCart,
  onCompleteOrder
}) => {
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    province: 'DKI Jakarta',
    city: 'Jakarta Selatan',
    district: 'Kebayoran Baru',
    postalCode: '12110',
    addressDetail: '',
    courier: COURIER_OPTIONS[0].name,
    courierCost: COURIER_OPTIONS[0].cost,
    paymentMethod: 'BCA Transfer',
    orderNotes: ''
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const calculateDiscount = () => {
    if (!appliedVoucher) return 0;
    if (appliedVoucher.discountType === 'percentage') {
      return (subtotal * appliedVoucher.discountValue) / 100;
    }
    return appliedVoucher.discountValue;
  };

  const discountAmount = calculateDiscount();
  const courierCost = subtotal > 200000 ? 0 : form.courierCost;
  const grandTotal = Math.max(0, subtotal - discountAmount + courierCost);

  const handleCourierSelect = (courierName: string, cost: number) => {
    setForm({ ...form, courier: courierName, courierCost: cost });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: cartItems,
      subtotal,
      discountAmount,
      shippingCost: courierCost,
      totalAmount: grandTotal,
      status: 'Diproses',
      customerInfo: form,
      voucherCode: appliedVoucher?.code
    };

    setCreatedOrder(newOrder);
    onCompleteOrder(newOrder);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Back Button & Title */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
        <button
          onClick={onBackToCart}
          className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Checkout Pesanan
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Lengkapi data pengiriman & pilih metode pembayaran Anda
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form Column */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Section 1: Customer Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              <User className="w-5 h-5 text-blue-600" />
              <span>1. Data Pembeli</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Setya Pratama"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="nama@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp / HP *</label>
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span>2. Alamat Pengiriman</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Provinsi *</label>
                <select
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {INDONESIAN_PROVINCES.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kota / Kabupaten *</label>
                <input
                  type="text"
                  required
                  placeholder="Jakarta Selatan / Bandung / Surabaya"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kecamatan *</label>
                <input
                  type="text"
                  required
                  placeholder="Kebayoran Baru"
                  value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kode Pos *</label>
                <input
                  type="text"
                  required
                  placeholder="12110"
                  value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap & Patokan *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Nama Jalan, No. Rumah, RT/RW, Patokan dekat pos satpam..."
                  value={form.addressDetail}
                  onChange={(e) => setForm({ ...form, addressDetail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Courier Choice */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>3. Pilihan Ekspedisi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COURIER_OPTIONS.map((c) => {
                const isSelected = form.courier === c.name;
                const costDisplay = subtotal > 200000 ? 'GRATIS' : formatRupiah(c.cost);
                return (
                  <div
                    key={c.id}
                    onClick={() => handleCourierSelect(c.name, c.cost)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-xs text-slate-900">{c.name}</span>
                      <span className="font-black text-xs text-blue-600">{costDisplay}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.service}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Payment Method */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span>4. Metode Pembayaran</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: 'bca', name: 'BCA Virtual Account', icon: Building2 },
                { id: 'mandiri', name: 'Mandiri VA', icon: Building2 },
                { id: 'gopay', name: 'GoPay / OVO', icon: QrCode },
                { id: 'qris', name: 'QRIS Instant', icon: QrCode },
                { id: 'cc', name: 'Kartu Kredit', icon: CreditCard },
                { id: 'cod', name: 'COD (Bayar di Tempat)', icon: ShieldCheck }
              ].map((pm) => {
                const isSelected = form.paymentMethod === pm.name;
                const IconComp = pm.icon;
                return (
                  <div
                    key={pm.id}
                    onClick={() => setForm({ ...form, paymentMethod: pm.name })}
                    className={`p-3.5 rounded-2xl border cursor-pointer text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold ring-2 ring-blue-600/20'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <IconComp className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-semibold leading-tight">{pm.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Order Summary Column */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl sticky top-24 space-y-5">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <span>Ringkasan Pesanan</span>
            </h3>

            {/* Selected Items */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {item.selectedSize} | {item.selectedColor} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-xs text-slate-900 shrink-0">
                    {formatRupiah(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Produk</span>
                <span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Diskon Voucher ({appliedVoucher?.code})</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Ongkos Kirim ({form.courier})</span>
                <span>{courierCost === 0 ? <strong className="text-emerald-600">GRATIS</strong> : formatRupiah(courierCost)}</span>
              </div>

              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Total Bayar</span>
                <span className="text-blue-600 text-lg">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Buat Pesanan Sekarang</span>
            </button>

            <p className="text-[11px] text-slate-400 text-center leading-tight">
              🔒 Transaksi aman & terenkripsi. Garansi uang kembali jika produk tidak sesuai.
            </p>
          </div>
        </div>

      </form>

      {/* Order Receipt Modal */}
      {createdOrder && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl space-y-5 border border-slate-200"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold uppercase">
                  Pesanan Berhasil Disimpan!
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  Terima Kasih, {createdOrder.customerInfo.fullName}!
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Nomor Pesanan Anda: <strong className="text-blue-600 font-extrabold">{createdOrder.id}</strong>
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Tanggal:</span>
                  <span className="font-bold text-slate-900">{createdOrder.date}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Ekspedisi:</span>
                  <span className="font-bold text-slate-900">{createdOrder.customerInfo.courier}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Metode Pembayaran:</span>
                  <span className="font-bold text-slate-900">{createdOrder.customerInfo.paymentMethod}</span>
                </div>
                <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-1">
                  <span>Total Pembayaran:</span>
                  <span className="text-blue-600">{formatRupiah(createdOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Cetak Struk</span>
                </button>

                <button
                  onClick={() => {
                    setCreatedOrder(null);
                    window.location.reload();
                  }}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}

    </div>
  );
};
