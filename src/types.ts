export type CategoryType = 
  | 'Semua' 
  | 'Hoodie' 
  | 'Heavy 16\'s' 
  | 'Ultra 20\'s' 
  | 'Eco 24\'s' 
  | 'Lengan Pendek' 
  | 'Lengan Panjang' 
  | 'Kaos' 
  | 'Outerwear' 
  | 'Kemeja' 
  | 'Celana' 
  | 'Pria' 
  | 'Wanita';

export type SizeType = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type SleeveType = 'Lengan Pendek' | 'Lengan Panjang';

export type FabricType = 'Heavy 16\'s' | 'Ultra 20\'s' | 'Eco 24\'s' | 'Cotton Fleece 330 GSM' | 'French Terry 350 GSM' | 'Linen Premium' | 'Denim 13.5 oz';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  discountPercent?: number;
  description: string;
  fabricDetails?: string;
  fabricType?: FabricType;
  sleeveLength?: SleeveType;
  images: string[];
  colors: ProductColor[];
  sizes: SizeType[];
  stock: number;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique cart item id
  product: Product;
  selectedColor: string;
  selectedSize: SizeType;
  quantity: number;
}

export interface FilterState {
  category: CategoryType;
  sleeveLength: 'Semua' | SleeveType;
  fabricType: 'Semua' | FabricType;
  sizes: SizeType[];
  colors: string[];
  priceRange: [number, number];
  sortBy: 'terpopuler' | 'harga-rendah' | 'harga-tinggi' | 'terbaru' | 'rating';
  searchQuery: string;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  postalCode: string;
  addressDetail: string;
  courier: string; // e.g. 'JNE Reguler', 'Sicepat BEST', 'J&T Express'
  courierCost: number;
  paymentMethod: string; // e.g. 'BCA Transfer', 'GoPay', 'Mandiri Virtual Account', 'COD'
  orderNotes?: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalAmount: number;
  status: 'Pending' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';
  customerInfo: CheckoutForm;
  voucherCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'customer';
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}
