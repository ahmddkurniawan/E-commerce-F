import React, { useState } from 'react';
import { CartItem, CheckoutForm, Order, User } from '../types';
import { formatRupiah } from './ProductCard';
import { COURIER_OPTIONS, Voucher } from '../data/mockData';
import { supabase } from '../services/supabase';
import {
  ShieldCheck, Truck, CreditCard, User as UserIcon, MapPin,
  CheckCircle2, ArrowLeft, ShoppingBag, Building2, QrCode,
  Copy, Clock, AlertCircle, Smartphone, Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutViewProps {
  cartItems: CartItem[];
  appliedVoucher: Voucher | null;
  currentUser: User | null;
  onBackToCart: () => void;
  onCompleteOrder: (newOrder: Order) => void;
  onOpenAuth: () => void;
}

const INDONESIAN_PROVINCES = [
  'DKI Jakarta', 'Jawa Barat', 'Jawa Tengah', 'Jawa Timur',
  'Banten', 'DI Yogyakarta', 'Bali', 'Sumatera Utara', 'Sulawesi Selatan',
  'Sumatera Selatan', 'Riau', 'Kalimantan Timur', 'Kalimantan Selatan',
  'Sulawesi Tengah', 'Sulawesi Utara', 'Nusa Tenggara Barat', 'Papua'
];

// ── Payment method definitions ──────────────────────────────────
const PAYMENT_METHODS = [
  {
    id: 'bca',
    name: 'BCA Transfer',
    icon: Building2,
    label: 'BCA Transfer',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    detail: {
      type: 'bank',
      bankName: 'Bank BCA',
      accountNumber: '1234567890',
      accountName: 'PT Stitch Supply Indonesia',
      logo: '🏦'
    }
  },
  {
    id: 'mandiri',
    name: 'Mandiri Transfer',
    icon: Building2,
    label: 'Mandiri Transfer',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50',
    detail: {
      type: 'bank',
      bankName: 'Bank Mandiri',
      accountNumber: '0987654321',
      accountName: 'PT Stitch Supply Indonesia',
      logo: '🏦'
    }
  },
  {
    id: 'qris',
    name: 'QRIS',
    icon: QrCode,
    label: 'QRIS',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    detail: {
      type: 'qris',
      qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020101021226580014ID.CO.BNI.WWW011893600009150001110215stitch-supply0303UMI51440014ID.CO.QRIS.WWW0215ID10201600234720303UMI5204579953033605802ID5914Stitch Supply6013Jakarta Pusat61051034062280824order-stitch-supply-indonesia630432BB',
      logo: '📱'
    }
  },
  {
    id: 'gopay',
    name: 'GoPay / OVO',
    icon: Smartphone,
    label: 'GoPay / OVO',
    color: 'text-green-700',
    bg: 'bg-green-50',
    detail: {
      type: 'ewallet',
      phone: '0812-3456-7890',
      accountName: 'Stitch Supply',
      logo: '💸'
    }
  },
  {
    id: 'cod',
    name: 'COD (Bayar di Tempat)',
    icon: ShieldCheck,
    label: 'COD',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    detail: { type: 'cod', logo: '🚚' }
  }
];

// ── Payment Instructions component ─────────────────────────────
const PaymentInstructions: React.FC<{
  order: Order;
  onBack: () => void;
  onGoHome: () => void;
}> = ({ order, onBack, onGoHome }) => {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hrs = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const pm = PAYMENT_METHODS.find(p => p.name === order.customerInfo.paymentMethod);
  const detail = pm?.detail;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Success Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4 shadow-lg">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">Pesanan Berhasil Dibuat!</h1>
        <p className="text-sm text-slate-500 mt-1">
          No. Pesanan: <span className="font-extrabold text-blue-600">{order.id}</span>
        </p>
      </motion.div>

      {/* COD Special Case */}
      {detail?.type === 'cod' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 text-center space-y-3 mb-6"
        >
          <div className="text-4xl">🚚</div>
          <h2 className="text-xl font-black text-emerald-800">Pesanan COD Dikonfirmasi!</h2>
          <p className="text-sm text-emerald-700">
            Bayar langsung kepada kurir <strong>{order.customerInfo.courier}</strong> saat paket tiba.
            Siapkan uang pas sebesar:
          </p>
          <p className="text-3xl font-black text-emerald-600">{formatRupiah(order.totalAmount)}</p>
        </motion.div>
      )}

      {/* Non-COD: Payment Instructions */}
      {detail?.type !== 'cod' && (
        <>
          {/* Countdown Timer */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-center gap-3 mb-6"
          >
            <Clock className="w-5 h-5 text-rose-600 shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-bold text-rose-700">Batas waktu pembayaran</p>
              <p className="text-xs text-rose-600">Bayar sebelum waktu habis agar pesanan tidak dibatalkan</p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-black text-rose-600 text-lg">
                {String(hrs).padStart(2, '0')}:{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </p>
              <p className="text-[10px] text-rose-400">JAM : MENIT : DETIK</p>
            </div>
          </motion.div>

          {/* Amount to Pay */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-600 rounded-3xl p-6 text-white text-center mb-6 shadow-xl shadow-blue-600/30"
          >
            <p className="text-sm font-semibold text-blue-200">Total yang harus dibayar</p>
            <p className="text-4xl font-black mt-1">{formatRupiah(order.totalAmount)}</p>
            <p className="text-xs text-blue-300 mt-2">Pastikan nominal transfer TEPAT untuk verifikasi otomatis</p>
          </motion.div>

          {/* Bank Transfer Instructions */}
          {(detail?.type === 'bank') && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 mb-6 space-y-4"
            >
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Instruksi Transfer {detail.bankName}
              </h3>

              <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500">Nama Bank</p>
                    <p className="font-extrabold text-slate-900">{detail.bankName}</p>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500">Nomor Rekening</p>
                    <p className="font-extrabold text-slate-900 text-xl tracking-wider">{detail.accountNumber}</p>
                    <p className="text-xs text-slate-500 mt-0.5">a.n. {detail.accountName}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(detail.accountNumber!)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Disalin!' : 'Salin'}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  'Buka aplikasi mobile banking / ATM Anda',
                  `Pilih Transfer ke ${detail.bankName}`,
                  `Masukkan nomor rekening: ${detail.accountNumber}`,
                  `Masukkan nominal: ${formatRupiah(order.totalAmount)}`,
                  'Simpan bukti transfer sebagai konfirmasi'
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-[11px]">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* QRIS Instructions */}
          {detail?.type === 'qris' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 mb-6 space-y-4 text-center"
            >
              <h3 className="font-extrabold text-slate-900 text-base flex items-center justify-center gap-2">
                <QrCode className="w-5 h-5 text-purple-600" />
                Scan QRIS untuk Bayar
              </h3>
              <img
                src={detail.qrImage}
                alt="QR Code Pembayaran"
                className="w-48 h-48 mx-auto rounded-2xl border-4 border-purple-100 shadow-lg"
              />
              <p className="text-xs text-slate-500">
                Buka GoPay / OVO / Dana / ShopeePay / m-Banking lalu pilih <strong>Scan QR</strong>
              </p>
            </motion.div>
          )}

          {/* E-Wallet Instructions */}
          {detail?.type === 'ewallet' && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl border border-slate-200 p-6 mb-6 space-y-4"
            >
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-green-600" />
                Transfer GoPay / OVO
              </h3>
              <div className="bg-slate-50 rounded-2xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-slate-500">Nomor HP / Akun</p>
                    <p className="font-extrabold text-slate-900 text-xl tracking-wider">{detail.phone}</p>
                    <p className="text-xs text-slate-500 mt-0.5">a.n. {detail.accountName}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(detail.phone!)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Disalin!' : 'Salin'}
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500">Buka GoPay/OVO → Transfer → Masukkan nomor di atas → Bayar</p>
            </motion.div>
          )}

          {/* Important Notice */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 mb-6"
          >
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              <strong>Penting:</strong> Setelah melakukan pembayaran, pesanan Anda akan diverifikasi oleh tim kami dalam <strong>1×24 jam kerja</strong>. Konfirmasi akan dikirim ke WhatsApp/email Anda.
            </p>
          </motion.div>
        </>
      )}

      {/* Order Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-3xl border border-slate-200 p-6 mb-6 space-y-3 text-xs"
      >
        <h3 className="font-extrabold text-slate-900 text-sm">Ringkasan Pesanan</h3>
        <div className="space-y-2 divide-y divide-slate-100">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center gap-3 pt-2">
              <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{item.product.name}</p>
                <p className="text-slate-400">{item.selectedSize} • {item.selectedColor} × {item.quantity}</p>
              </div>
              <span className="font-bold text-slate-900 shrink-0">{formatRupiah(item.product.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 pt-3 space-y-1">
          <div className="flex justify-between text-slate-600"><span>Subtotal</span><span>{formatRupiah(order.subtotal)}</span></div>
          {order.discountAmount > 0 && <div className="flex justify-between text-emerald-600 font-bold"><span>Diskon</span><span>-{formatRupiah(order.discountAmount)}</span></div>}
          <div className="flex justify-between text-slate-600"><span>Ongkir ({order.customerInfo.courier})</span><span>{order.shippingCost === 0 ? 'GRATIS' : formatRupiah(order.shippingCost)}</span></div>
          <div className="flex justify-between font-black text-base text-slate-900 border-t border-slate-200 pt-2 mt-2">
            <span>Total</span>
            <span className="text-blue-600">{formatRupiah(order.totalAmount)}</span>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm rounded-2xl transition-colors cursor-pointer"
        >
          Belanja Lagi
        </button>
        <button
          onClick={onGoHome}
          className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl transition-colors cursor-pointer"
        >
          Lihat Pesanan Saya
        </button>
      </div>
    </div>
  );
};


// ── Main CheckoutView ───────────────────────────────────────────
export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cartItems,
  appliedVoucher,
  currentUser,
  onBackToCart,
  onCompleteOrder,
  onOpenAuth,
}) => {
  const [form, setForm] = useState<CheckoutForm>({
    fullName: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    province: 'DKI Jakarta',
    city: '',
    district: '',
    postalCode: '',
    addressDetail: '',
    courier: COURIER_OPTIONS[0].name,
    courierCost: COURIER_OPTIONS[0].cost,
    paymentMethod: 'BCA Transfer',
    orderNotes: ''
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const discountAmount = (() => {
    if (!appliedVoucher) return 0;
    return appliedVoucher.discountType === 'percentage'
      ? (subtotal * appliedVoucher.discountValue) / 100
      : appliedVoucher.discountValue;
  })();

  const courierCost = subtotal > 200000 ? 0 : form.courierCost;
  const grandTotal = Math.max(0, subtotal - discountAmount + courierCost);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) { onOpenAuth(); return; }
    setIsSubmitting(true);

    const orderId = `ORD-${Date.now().toString().slice(-8)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      items: cartItems,
      subtotal,
      discountAmount,
      shippingCost: courierCost,
      totalAmount: grandTotal,
      status: form.paymentMethod === 'COD (Bayar di Tempat)' ? 'Diproses' : 'Menunggu Pembayaran',
      paymentStatus: form.paymentMethod === 'COD (Bayar di Tempat)' ? 'Dikonfirmasi' : 'Belum Bayar',
      customerInfo: form,
      voucherCode: appliedVoucher?.code,
      userId: currentUser.id
    };

    try {
      // Save to Supabase
      await supabase.from('orders').insert([{
        id: newOrder.id,
        date: newOrder.date,
        items: JSON.stringify(newOrder.items),
        subtotal: newOrder.subtotal,
        discountAmount: newOrder.discountAmount,
        shippingCost: newOrder.shippingCost,
        totalAmount: newOrder.totalAmount,
        status: newOrder.status,
        paymentStatus: newOrder.paymentStatus,
        customerInfo: JSON.stringify(newOrder.customerInfo),
        voucherCode: newOrder.voucherCode || null,
        userId: currentUser.id
      }]);
    } catch (err) {
      console.error('Failed to save order to Supabase:', err);
    }

    setCreatedOrder(newOrder);
    onCompleteOrder(newOrder);
    setIsSubmitting(false);
  };

  // ── If not logged in — show gate ─────────────────────────────
  if (!currentUser) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-10 h-10 text-blue-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Login Dulu Yuk!</h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          Kamu perlu login untuk bisa checkout dan melacak pesananmu.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-lg transition-colors cursor-pointer"
        >
          Masuk / Daftar Sekarang
        </button>
        <button onClick={onBackToCart} className="block mx-auto mt-4 text-xs text-slate-400 hover:text-slate-600 underline cursor-pointer">
          Kembali ke Keranjang
        </button>
      </div>
    );
  }

  // ── Show payment instructions after order is created ─────────
  if (createdOrder) {
    return (
      <PaymentInstructions
        order={createdOrder}
        onBack={() => { setCreatedOrder(null); onBackToCart(); }}
        onGoHome={() => { setCreatedOrder(null); window.location.reload(); }}
      />
    );
  }

  // ── Main Checkout Form ────────────────────────────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">

      {/* Back Button & Title */}
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200">
        <button onClick={onBackToCart} className="p-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Checkout Pesanan</h1>
          <p className="text-xs text-slate-500 font-medium">Lengkapi data pengiriman & pilih metode pembayaran Anda</p>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-7 space-y-6">

          {/* Section 1: Customer Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              <UserIcon className="w-5 h-5 text-blue-600" />
              <span>1. Data Pembeli</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap *</label>
                <input type="text" required placeholder="Nama lengkap penerima" value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                <input type="email" required placeholder="nama@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">No. WhatsApp / HP *</label>
                <input type="tel" required placeholder="08xxxxxxxxxx" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
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
                <select value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 font-medium focus:outline-none">
                  {INDONESIAN_PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kota / Kabupaten *</label>
                <input type="text" required placeholder="Contoh: Makassar" value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kecamatan *</label>
                <input type="text" required placeholder="Contoh: Rappocini" value={form.district}
                  onChange={(e) => setForm({ ...form, district: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kode Pos *</label>
                <input type="text" required placeholder="Contoh: 90222" value={form.postalCode}
                  onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Alamat Lengkap *</label>
                <textarea required rows={2} placeholder="Nama jalan, no. rumah, RT/RW, patokan..."
                  value={form.addressDetail} onChange={(e) => setForm({ ...form, addressDetail: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
            </div>
          </div>

          {/* Section 3: Courier */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              <Truck className="w-5 h-5 text-blue-600" />
              <span>3. Pilihan Ekspedisi</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COURIER_OPTIONS.map(c => {
                const isSelected = form.courier === c.name;
                return (
                  <div key={c.id} onClick={() => setForm({ ...form, courier: c.name, courierCost: c.cost })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${isSelected ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-xs text-slate-900">{c.name}</span>
                      <span className="font-black text-xs text-blue-600">{subtotal > 200000 ? 'GRATIS' : formatRupiah(c.cost)}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{c.service}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 4: Payment */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 font-extrabold text-slate-900 text-base pb-3 border-b border-slate-100">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span>4. Metode Pembayaran</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map(pm => {
                const isSelected = form.paymentMethod === pm.name;
                const IconComp = pm.icon;
                return (
                  <div key={pm.id} onClick={() => setForm({ ...form, paymentMethod: pm.name })}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${isSelected ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-600/20' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                    <div className={`w-9 h-9 rounded-xl ${pm.bg} flex items-center justify-center shrink-0`}>
                      <IconComp className={`w-4 h-4 ${pm.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-extrabold text-xs text-slate-900">{pm.label}</p>
                      {pm.id === 'bca' && <p className="text-[10px] text-slate-400">Transfer ke no. rek BCA</p>}
                      {pm.id === 'mandiri' && <p className="text-[10px] text-slate-400">Transfer ke no. rek Mandiri</p>}
                      {pm.id === 'qris' && <p className="text-[10px] text-slate-400">Scan QR dari semua e-wallet</p>}
                      {pm.id === 'gopay' && <p className="text-[10px] text-slate-400">Transfer GoPay / OVO</p>}
                      {pm.id === 'cod' && <p className="text-[10px] text-slate-400">Bayar saat paket tiba</p>}
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Notes */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs">
            <label className="block text-xs font-bold text-slate-700 mb-2">Catatan Pesanan (Opsional)</label>
            <textarea rows={2} placeholder="Contoh: Tolong pack dengan extra bubble wrap..."
              value={form.orderNotes} onChange={(e) => setForm({ ...form, orderNotes: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>
        </div>

        {/* RIGHT COLUMN — Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xl sticky top-24 space-y-5">
            <h3 className="font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <span>Ringkasan Pesanan</span>
            </h3>

            <div className="max-h-52 overflow-y-auto space-y-3 pr-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs text-slate-900 truncate">{item.product.name}</p>
                    <p className="text-[11px] text-slate-500">{item.selectedSize} | {item.selectedColor} × {item.quantity}</p>
                  </div>
                  <span className="font-bold text-xs text-slate-900 shrink-0">{formatRupiah(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <div className="flex justify-between text-slate-600"><span>Subtotal</span><span className="font-bold text-slate-900">{formatRupiah(subtotal)}</span></div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Diskon ({appliedVoucher?.code})</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Ongkir ({form.courier})</span>
                <span>{courierCost === 0 ? <strong className="text-emerald-600">GRATIS</strong> : formatRupiah(courierCost)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 border-t border-slate-200 pt-3">
                <span>Total Bayar</span>
                <span className="text-blue-600 text-lg">{formatRupiah(grandTotal)}</span>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-extrabold text-base rounded-2xl shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Buat Pesanan Sekarang</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-slate-400 text-center">
              🔒 Transaksi aman & terenkripsi. Garansi uang kembali jika produk tidak sesuai.
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};
