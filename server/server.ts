import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { INITIAL_PRODUCTS } from '../src/data/mockProducts.js';
import { INITIAL_ORDERS } from '../src/data/mockData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// IN-MEMORY DATABASE (TODO: Replace with actual DB connection like Postgres/MySQL/MongoDB)
let products = [...INITIAL_PRODUCTS];
let orders = [...INITIAL_ORDERS];

// ==============================
// PRODUCTS API
// ==============================

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  // TODO: Add to actual database
  products = [newProduct, ...products];
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;
  // TODO: Update in actual database
  products = products.map((p) => (p.id === id ? updatedProduct : p));
  res.json(updatedProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  // TODO: Delete from actual database
  products = products.filter((p) => p.id !== id);
  res.status(204).send();
});

// ==============================
// ORDERS API
// ==============================

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const newOrder = req.body;
  // TODO: Add to actual database
  orders = [newOrder, ...orders];
  res.status(201).json(newOrder);
});

app.patch('/api/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  // TODO: Update in actual database
  const order = orders.find((o) => o.id === id);
  if (order) {
    order.status = status;
    res.json(order);
  } else {
    res.status(404).json({ error: 'Order not found' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 API Server is running on http://localhost:${PORT}`);
  console.log('💡 Note: This is an in-memory server ready to be connected to a Database.');
});
