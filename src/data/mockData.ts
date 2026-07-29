import { Order } from '../types';

export interface Voucher {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 10 = 10% or 50000 = Rp 50.000
  minPurchase: number;
  description: string;
}

export const PROMO_VOUCHERS: Voucher[] = [
  {
    code: 'VOGUE10',
    discountType: 'percentage',
    discountValue: 10,
    minPurchase: 150000,
    description: 'Diskon 10% minimal belanja Rp 150.000'
  },
  {
    code: 'FASHION20',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 300000,
    description: 'Diskon 20% minimal belanja Rp 300.000'
  },
  {
    code: 'HEMAT50K',
    discountType: 'fixed',
    discountValue: 50000,
    minPurchase: 250000,
    description: 'Potongan Rp 50.000 minimal belanja Rp 250.000'
  }
];

export interface CourierOption {
  id: string;
  name: string;
  service: string;
  estimatedDays: string;
  cost: number;
}

export const COURIER_OPTIONS: CourierOption[] = [
  {
    id: 'jne-reg',
    name: 'JNE',
    service: 'Reguler (2-3 Hari)',
    estimatedDays: '2-3 Hari',
    cost: 18000
  },
  {
    id: 'sicepat-best',
    name: 'Sicepat',
    service: 'BEST Besok Sampai',
    estimatedDays: '1 Hari',
    cost: 25000
  },
  {
    id: 'jnt-express',
    name: 'J&T',
    service: 'Express Standard',
    estimatedDays: '2-3 Hari',
    cost: 16000
  },
  {
    id: 'gosend-instant',
    name: 'GoSend / GrabExpress',
    service: 'Instant Sameday',
    estimatedDays: 'Hitungan Jam',
    cost: 35000
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Anisa Rahmawati',
    role: 'Fashion Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    comment: 'Pengiriman sangat cepat, dikemas rapi dengan kotak eksklusif. Kemeja linen yang saya pesan sangat adem dan potongannya berkelas!',
    rating: 5,
    city: 'Jakarta Selatan'
  },
  {
    id: 'test-2',
    name: 'Rian Dimas',
    role: 'Content Creator',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    comment: 'VogueStore jadi langganan utama saya buat stok outfit shooting. Pilihan warnanya estetik dan sesuai dengan tren terkini.',
    rating: 5,
    city: 'Bandung'
  },
  {
    id: 'test-3',
    name: 'Chintya Dewi',
    role: 'Model & Entrepreneur',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    comment: 'Bahan-bahan pakaian di sini beneran premium, jahitan tidak ada yang lepas. Pelayanan CS juga ramah banget membantu tukar size.',
    rating: 5,
    city: 'Surabaya'
  }
];

export const MOCK_FAQS = [
  {
    q: 'Berapa lama proses pengiriman pesanan saya?',
    a: 'Pesanan yang masuk sebelum pukul 15.00 WIB akan dikirim pada hari yang sama. Estimasi waktu pengiriman berkisar 1-3 hari kerja tergantung pilihan ekspedisi.'
  },
  {
    q: 'Apakah bisa melakukan penukaran ukuran (size exchange)?',
    a: 'Ya, tentu! Kami menyediakan garansi tukar size dalam waktu 7 hari sejak barang diterima. Kondisi produk harus baru, tag label terpasang, dan belum dicuci.'
  },
  {
    q: 'Metode pembayaran apa saja yang didukung?',
    a: 'Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BRI, BNI), E-Wallet (GoPay, OVO, ShopeePay, Dana), QRIS, Kartu Kredit, dan COD (Bayar di Tempat).'
  },
  {
    q: 'Bagaimana cara melacak pesanan saya?',
    a: 'Setelah pesanan dikirim, Anda dapat melihat nomor resi pengiriman melalui halaman Akun / Pesanan Saya atau melalui email konfirmasi pesanan.'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-2026-8812',
    date: '26 Jul 2026, 14:20',
    items: [
      {
        id: 'cart-item-1',
        product: {
          id: 'prod-1',
          name: 'Kemeja Linen Oversized Minimalis',
          category: 'Kemeja',
          price: 249000,
          originalPrice: 329000,
          rating: 4.9,
          reviewCount: 128,
          description: 'Kemeja linen berbahan breathable',
          images: ['https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1000&auto=format&fit=crop'],
          colors: [{ name: 'Putih Clean', hex: '#FFFFFF' }],
          sizes: ['L'],
          stock: 24,
          reviews: []
        },
        selectedColor: 'Putih Clean',
        selectedSize: 'L',
        quantity: 1
      }
    ],
    subtotal: 249000,
    discountAmount: 24900,
    shippingCost: 18000,
    totalAmount: 242100,
    status: 'Diproses',
    customerInfo: {
      fullName: 'Setya Pratama',
      email: 'setya.pratama@gmail.com',
      phone: '081234567890',
      province: 'DKI Jakarta',
      city: 'Jakarta Selatan',
      district: 'Kebayoran Baru',
      postalCode: '12110',
      addressDetail: 'Jl. Senopati No. 42, RT 02/RW 03',
      courier: 'JNE Reguler',
      courierCost: 18000,
      paymentMethod: 'BCA Virtual Account'
    },
    voucherCode: 'VOGUE10'
  },
  {
    id: 'ORD-2026-8811',
    date: '25 Jul 2026, 10:15',
    items: [
      {
        id: 'cart-item-2',
        product: {
          id: 'prod-2',
          name: 'Jaket Denim Trucker Classic Vintage',
          category: 'Outerwear',
          price: 389000,
          rating: 4.8,
          reviewCount: 94,
          description: 'Jaket denim bergaya klasik',
          images: ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop'],
          colors: [{ name: 'Vintage Blue', hex: '#3B82F6' }],
          sizes: ['XL'],
          stock: 15,
          reviews: []
        },
        selectedColor: 'Vintage Blue',
        selectedSize: 'XL',
        quantity: 1
      }
    ],
    subtotal: 389000,
    discountAmount: 50000,
    shippingCost: 25000,
    totalAmount: 364000,
    status: 'Dikirim',
    customerInfo: {
      fullName: 'Dewi Lestari',
      email: 'dewi.lestari@yahoo.com',
      phone: '085711223344',
      province: 'Jawa Barat',
      city: 'Bandung',
      district: 'Coblong',
      postalCode: '40132',
      addressDetail: 'Jl. Dago Asri No. 15',
      courier: 'Sicepat BEST',
      courierCost: 25000,
      paymentMethod: 'GoPay'
    },
    voucherCode: 'HEMAT50K'
  }
];
