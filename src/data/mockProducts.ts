import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- KATALOG KHUSUS KAOS ---
  {
    id: 'prod-hd-1',
    name: 'Kaos Polos Bodysize PREMIUM Tangan Pendek Hitam sz XL XXL',
    category: 'Kaos',
    price: 66000,
    originalPrice: 99000,
    rating: 4.9,
    reviewCount: 210,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    discountPercent: 23,
    description: `T-shirt Premium 24s

Bodysize/built up (tanpa jaitan pinggir)

Easy Tear Label

Size USA

Warna Hitam
Size XL XXL

SIZE\tPANJANG\tLEBAR
XL\t78-80\t61
XXL\t81-83\t64

Toleransi pjg +- 1cm
Toleransi lebar +- 1inch
PRESHRUNK`,
    fabricDetails: '100% Premium Cotton Fleece 330 GSM. Bagian dalam sangat lembut, hangat, dan serat tidak rontok saat dicuci.',
    fabricType: 'Cotton Fleece 330 GSM',
    sleeveLength: 'Lengan Pendek',
    images: [
      'https://down-id.img.susercontent.com/file/ae36b30b67081a3b348d071a0309cbe4@resize_w900_nl.webp',
      '/blue_tshirt.png',
      '/red_tshirt.png'
    ],
    colors: [
      { name: 'Hitam', hex: '#0A0A0A' },
      { name: 'Biru', hex: '#2563EB' },
      { name: 'Merah', hex: '#EF4444' },
      { name: 'Oatmeal Heather', hex: '#E2DCD5' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 45,
    reviews: [
      {
        id: 'rev-hd-1',
        userName: 'Satria Perkasa',
        rating: 5,
        date: '25 Jul 2026',
        comment: 'Kaos 330 GSM paling mantap! Worth it parah!'
      },
      {
        id: 'rev-hd-2',
        userName: 'Dimas Anggara',
        rating: 5,
        date: '20 Jul 2026',
        comment: 'Potongan boxy fit nya sangat pas, bahannya tebal lembut ngga bikin gatal.'
      }
    ]
  },
  {
    id: 'prod-hd-2',
    name: 'Stitch Vintage Acid Wash Zip Hoodie 380 GSM',
    category: 'Hoodie',
    price: 247000,
    originalPrice: 349000,
    rating: 4.8,
    reviewCount: 165,
    isFeatured: true,
    isBestseller: true,
    discountPercent: 25,
    description: `hoodie zipper hitam

full katun 100%

gramasi 330gram



size   panjang x lebar

s   69x52

m 72x55

l    75x57

xl   77x59

xxl  81x61`,
    fabricDetails: '100% Heavy Cotton Fleece 380 GSM dengan proses Washed Finish unik di setiap helai.',
    fabricType: 'Cotton Fleece 330 GSM',
    sleeveLength: 'Lengan Panjang',
    images: [
      'https://down-id.img.susercontent.com/file/c1461b6bad15bf41d09b7ba19da48443@resize_w900_nl.webp',
      '/blue_hoodie.png'
    ],
    colors: [
      { name: 'Washed Charcoal', hex: '#334155' },
      { name: 'Vintage Olive', hex: '#4A5568' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 28,
    reviews: [
      {
        id: 'rev-hd-3',
        userName: 'Rendy Kuncoro',
        rating: 5,
        date: '22 Jul 2026',
        comment: 'Warna washed charcoal nya vintage banget seperti brand luar jutaan. Zipper YKK nya halus.'
      }
    ]
  },

  // --- KATALOG JENIS KAOS: HEAVY 16'S ---
  {
    id: 'prod-ks-16-1',
    name: 'Stitch Heavy 16\'s Boxy Fit Tee (Lengan Pendek)',
    category: 'Heavy 16\'s',
    price: 68000,
    originalPrice: 99000,
    rating: 4.9,
    reviewCount: 320,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    discountPercent: 22,
    description: `T shirt heavy cotton

bodyszie tanpa jaitan pinggir

easy tear label

sz usa

spek: tebal, kering dan sedikit kasar



wrn biru

sz L



size pjg        lebar

L   74-76      52-54`,
    fabricDetails: '100% Heavy Cotton 16\'s (230 GSM). Preshrunk fabric, tidak menyusut pasca pencucian.',
    fabricType: 'Heavy 16\'s',
    sleeveLength: 'Lengan Pendek',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
      '/blue_tshirt.png',
      '/red_tshirt.png'
    ],
    colors: [
      { name: 'Onyx Black Heavy', hex: '#000000' },
      { name: 'Optical White', hex: '#FFFFFF' },
      { name: 'Washed Grey', hex: '#4B5563' },
      { name: 'Military Olive', hex: '#3F4E4F' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 80,
    reviews: [
      {
        id: 'rev-ks-1',
        userName: 'Ahmad Faisal',
        rating: 5,
        date: '24 Jul 2026',
        comment: 'Kaos 16s ini gokil tebalnya! Jatuhnya pas di bahu, krah leher tebal tegap ngga bakal kelemer.'
      }
    ]
  },
  {
    id: 'prod-ks-16-2',
    name: 'Stitch Heavy 16\'s Longsleeve Streetwear (Lengan Panjang)',
    category: 'Heavy 16\'s',
    price: 96000,
    originalPrice: 100000,
    rating: 4.8,
    reviewCount: 188,
    isBestseller: true,
    discountPercent: 22,
    description: `T shirt heavy cotton

bodyszie tanpa jaitan pinggir

easy tear label

sz usa

spek: tebal, kering dan sedikit kasar



wrn hitam

sz xl xxl



size pjg        lebar

 xl  78-80      57-59

xxl 81-83      61-63`,
    fabricDetails: '100% Cotton 16\'s Heavyweight. Rib gelang tangan kencang presisi.',
    fabricType: 'Heavy 16\'s',
    sleeveLength: 'Lengan Panjang',
    images: [
      'https://down-id.img.susercontent.com/file/id-11134207-7r992-lngtsu6dv1tt02@resize_w900_nl.webp',
      'https://down-id.img.susercontent.com/file/d97f5ad954b916e8aeb86f27742b6ba6@resize_w900_nl.webp'
    ],
    colors: [
      { name: 'Jet Black Heavy', hex: '#0F0F0F' },
      { name: 'Pure White', hex: '#FFFFFF' },
      { name: 'Navy Blue Heavy', hex: '#1E3A8A' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 55,
    reviews: [
      {
        id: 'rev-ks-2',
        userName: 'Rizky Novian',
        rating: 5,
        date: '21 Jul 2026',
        comment: 'Lengan panjang 16s nya tebal mantap! Karet lengan nya rapat dan nggak kendor.'
      }
    ]
  },

  // --- KATALOG JENIS KAOS: ULTRA 20'S ---
  {
    id: 'prod-ks-20-1',
    name: 'Stitch Ultra 20\'s Classic Regular Tee (Lengan Pendek)',
    category: 'Ultra 20\'s',
    price: 68000,
    originalPrice: 99000,
    rating: 4.9,
    reviewCount: 290,
    isBestseller: true,
    discountPercent: 25,
    description: 'Kaos favorit Stitch Supply berbahan Ultra Cotton 20s (190-200 GSM). Keseimbangan sempurna antara struktur kain yang cukup tebal namun tetap lembut halus di kulit.',
    fabricDetails: '100% Ring Spun Cotton 20\'s Ultra Soft. Jahitan rantai ganda di pundak.',
    fabricType: 'Ultra 20\'s',
    sleeveLength: 'Lengan Pendek',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Solid Black', hex: '#111827' },
      { name: 'Chalk White', hex: '#FAFAFA' },
      { name: 'Royal Navy', hex: '#1D4ED8' },
      { name: 'Terracotta Red', hex: '#9A3412' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 90,
    reviews: [
      {
        id: 'rev-ks-3',
        userName: 'Danang Tri',
        rating: 5,
        date: '23 Jul 2026',
        comment: 'Bahan 20s ini paling pas buat harian. Ngga ketebalan ngga ketipisan, adem banget!'
      }
    ]
  },
  {
    id: 'prod-ks-20-2',
    name: 'Kaos Polos Bodysz PREMIUM Tangan Panjang Hitam S M',
    category: 'Ultra 20\'s',
    price: 78000,
    originalPrice: 189000,
    rating: 4.8,
    reviewCount: 135,
    discountPercent: 21,
    description: 'Kaos lengan panjang Ultra Cotton 20s berpotongan standar serbaguna. Menyerap keringat dengan efisien, sangat cocok untuk gaya kasual kerja maupun hangout.',
    fabricDetails: '100% Cotton Combed 20\'s Ultra. Bahan halus anti-panas.',
    fabricType: 'Ultra 20\'s',
    sleeveLength: 'Lengan Panjang',
    images: [
      'https://down-id.img.susercontent.com/file/d92b354c79aaf3621add222f0e50cdf6@resize_w900_nl.webp'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#1F2937' },
      { name: 'Ivory White', hex: '#F8FAFC' },
      { name: 'Dark Maroon', hex: '#800020' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    reviews: [
      {
        id: 'rev-ks-4',
        userName: 'Bagus Setyo',
        rating: 5,
        date: '17 Jul 2026',
        comment: 'Lengan panjangnya pas di tangan, bahan 20s nya sangat halus.'
      }
    ]
  },

  // --- KATALOG JENIS KAOS: ECO 24'S ---
  {
    id: 'prod-ks-24-1',
    name: 'Kaos polos bodysize ECO tangan pendek Hitam sz S M L',
    category: 'Eco 24\'s',
    price: 99000,
    originalPrice: 139000,
    rating: 4.9,
    reviewCount: 410,
    isBestseller: true,
    discountPercent: 28,
    description: 'Kaos esensial harian dari serat Organic Cotton 24s (170-180 GSM) yang sangat adem, ringan, dan breathable. Cocok untuk daerah panas maupun kegiatan indoor/outdoor aktif.',
    fabricDetails: '100% Certified Organic Cotton 24\'s. Super Soft Finish, ramah lingkungan dan hypoallergenic.',
    fabricType: 'Eco 24\'s',
    sleeveLength: 'Lengan Pendek',
    images: [
      'https://down-id.img.susercontent.com/file/846c3d749b02d748be77f7dbb2a91db5@resize_w900_nl.webp'],
    colors: [
      { name: 'Core Black', hex: '#000000' },
      { name: 'Eco Snow White', hex: '#FFFFFF' },
      { name: 'Earthy Sage', hex: '#94A3B8' },
      { name: 'Dusty Rose', hex: '#E2E8F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stock: 120,
    reviews: [
      {
        id: 'rev-ks-5',
        userName: 'Dewi Lestari',
        rating: 5,
        date: '26 Jul 2026',
        comment: 'Kaos 24s ter-adem! Nggak bikin gerah sama sekali di Jakarta panas.'
      }
    ]
  },
  {
    id: 'prod-ks-24-2',
    name: 'Kaos Polos Bodysize PREMIUM Tangan Panjang Hitam sz XL XXL',
    category: 'Eco 24\'s',
    price: 86000,
    originalPrice: 169000,
    rating: 4.8,
    reviewCount: 175,
    discountPercent: 23,
    description: 'Atasan kaos lengan panjang berbahan katun organik 24s yang halus di kulit. Potongan santai dengan bahan jatuh yang adem digunakan seharian.',
    fabricDetails: '100% Organic Combed Cotton 24\'s (175 GSM).',
    fabricType: 'Eco 24\'s',
    sleeveLength: 'Lengan Panjang',
    images: [
      'https://down-id.img.susercontent.com/file/d55a4206eabcaf76918baf12bcf0c34d@resize_w900_nl.webp'
    ],
    colors: [
      { name: 'Black Eco', hex: '#111827' },
      { name: 'Off White Eco', hex: '#F8FAFC' },
      { name: 'Soft Olive', hex: '#556B2F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 50,
    reviews: [
      {
        id: 'rev-ks-6',
        userName: 'Ayu Kartika',
        rating: 5,
        date: '18 Jul 2026',
        comment: 'Bahan halus dan enteng tapi ngga menerawang. Recomended banget!'
      }
    ]
  }
];
