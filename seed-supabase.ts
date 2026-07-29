import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { INITIAL_PRODUCTS } from './src/data/mockProducts.js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseAnonKey === 'YOUR_SUPABASE_ANON_KEY_HERE') {
  console.error("❌ Mohon isi VITE_SUPABASE_ANON_KEY di file .env terlebih dahulu!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  console.log("Menyalin data awal ke Supabase...");
  
  const { data, error } = await supabase.from('products').insert(INITIAL_PRODUCTS);
  
  if (error) {
    console.error("❌ Gagal menyalin data:", error.message);
  } else {
    console.log("✅ Berhasil menyalin data produk ke Supabase!");
  }
}

seedDatabase();
