// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// =====================
// Middleware
// =====================

// Logger middleware
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});

// JSON parser
app.use(express.json());

// API key authentication
const API_KEY = 'my-secret-key';
function authenticate(req, res, next) {
  const key = req.header('x-api-key');
  if (key && key === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }
}

// Validation middleware
function validateProduct(req, res, next) {
  const { name, price, category } = req.body;
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Missing required fields: name, price, or category' });
  }
  next();
}

// =====================
// Sample Data
// =====================
let products = [
  { id: 1, name: 'Chicken Feed', price: 500, category: 'Feed' },
  { id: 2, name: 'Sasso Chicks', price: 250, category: 'Poultry' },
  { id: 3, name: 'Water Feeder', price: 300, category: 'Equipment' },
  { id: 4, name: 'Egg Tray', price: 150, category: 'Equipment' },
  { id: 5, name: 'Brooder Lamp', price: 600, category: 'Equipment' },
];

// =====================
// Routes
// =====================

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// -------------------------
// 1️⃣ Get products with filtering + pagination
// -------------------------
app.get('/api/products', authenticate, (req, res) => {
  let { category, page, limit } = req.query;
  let results = products;

  // Filter by category if provided
  if (category) {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Pagination (default: page=1, limit=2)
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 2;
  const start = (page - 1) * limit;
  const end = page * limit;

  const paginatedResults = results.slice(start, end);

  res.json({
    total: results.length,
    page,
    limit,
    data: paginatedResults
  });
});

// -------------------------
// 2️⃣ Search products by name
// -------------------------
app.get('/api/products/search', authenticate, (req, res) => {
  const { name } = req.query;
  if (!name) {
    return res.status(400).json({ error: 'Missing search parameter: name' });
  }

  const results = products.filter(p =>
    p.name.toLowerCase().includes(name.toLowerCase())
  );

  res.json({ total: results.length, data: results });
});

// -------------------------
// 3️⃣ Product statistics by category
// -------------------------
app.get('/api/products/stats', authenticate, (req, res) => {
  const stats = {};

  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json(stats);
});

// -------------------------
// 4️⃣ Add & Update products (with validation)
// -------------------------
app.post('/api/products', authenticate, validateProduct, (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', authenticate, validateProduct, (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  product.name = req.body.name;
  product.price = req.body.price;
  product.category = req.body.category;
  res.json(product);
});

// =====================
// Start Server
// =====================
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
app.get('/api/products/:id', authenticate, (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});
