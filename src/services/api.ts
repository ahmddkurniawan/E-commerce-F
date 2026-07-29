import { Product, Order } from '../types';
import { supabase } from './supabase';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

// We keep a small fallback list just in case Supabase is completely empty
// so the UI doesn't look broken while you are setting up the database.
const fallbackProducts = [...INITIAL_PRODUCTS];

export const api = {
  getProducts: async (): Promise<Product[]> => {
    try {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      if (!data || data.length === 0) return fallbackProducts;
      return data;
    } catch (error) {
      console.error('Error fetching products from Supabase:', error);
      return fallbackProducts;
    }
  },

  addProduct: async (product: Product): Promise<Product> => {
    try {
      const { data, error } = await supabase.from('products').insert([product]).select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  updateProduct: async (product: Product): Promise<Product> => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(product)
        .eq('id', product.id)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  deleteProduct: async (id: string): Promise<void> => {
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },

  getOrders: async (): Promise<Order[]> => {
    try {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching orders from Supabase:', error);
      return [];
    }
  },

  addOrder: async (order: Order): Promise<Order> => {
    try {
      const { data, error } = await supabase.from('orders').insert([order]).select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error adding order:', error);
      throw error;
    }
  },
  
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order> => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select();
      if (error) throw error;
      return data[0];
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  },

  getCustomers: async (): Promise<CustomerProfile[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching customers:', error);
      return [];
    }
  }
};

export interface CustomerProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  provider: string | null;
  created_at: string;
}

