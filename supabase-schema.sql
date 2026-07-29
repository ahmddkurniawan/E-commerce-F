-- Buat tabel products
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  "originalPrice" NUMERIC,
  rating NUMERIC NOT NULL DEFAULT 0,
  "reviewCount" INTEGER NOT NULL DEFAULT 0,
  "isNew" BOOLEAN DEFAULT FALSE,
  "isFeatured" BOOLEAN DEFAULT FALSE,
  "isBestseller" BOOLEAN DEFAULT FALSE,
  "discountPercent" INTEGER,
  description TEXT NOT NULL,
  "fabricDetails" TEXT,
  "fabricType" TEXT,
  "sleeveLength" TEXT,
  images JSONB NOT NULL DEFAULT '[]',
  colors JSONB NOT NULL DEFAULT '[]',
  sizes JSONB NOT NULL DEFAULT '[]',
  stock INTEGER NOT NULL DEFAULT 0,
  reviews JSONB NOT NULL DEFAULT '[]'
);

-- Buat tabel orders
CREATE TABLE orders (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal NUMERIC NOT NULL,
  "discountAmount" NUMERIC NOT NULL DEFAULT 0,
  "shippingCost" NUMERIC NOT NULL DEFAULT 0,
  "totalAmount" NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  "customerInfo" JSONB NOT NULL,
  "voucherCode" TEXT
);

-- Izinkan akses publik (Anon) untuk membaca dan menulis data (Demi kemudahan tahap development)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on products" ON products FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access on products" ON products FOR DELETE USING (true);

CREATE POLICY "Allow public read access on orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public insert access on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access on orders" ON orders FOR UPDATE USING (true);

-- =====================================================
-- Tabel Profil Pelanggan (Otomatis terisi saat user daftar)
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  provider TEXT,        -- 'google', 'email', dll
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Aktifkan Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Izinkan siapa saja untuk membaca (admin bisa lihat semua pelanggan)
CREATE POLICY "Allow public read on profiles" ON profiles FOR SELECT USING (true);

-- Izinkan user untuk memasukkan/mengupdate data profil miliknya sendiri
CREATE POLICY "Allow user to insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow user to update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- =====================================================
-- Fungsi & Trigger: Otomatis buat profil saat user baru daftar
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url, provider)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_app_meta_data->>'provider'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Pasang trigger ke event INSERT pada tabel auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
