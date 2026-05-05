'use strict';
require('dotenv').config();

const express    = require('express');
const path       = require('path');
const Database   = require('better-sqlite3');
const nodemailer = require('nodemailer');
const rateLimit  = require('express-rate-limit');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────────────────────────
// DATABASE — SQLite (file-based, no separate server needed)
// ─────────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'orders.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    order_number TEXT    UNIQUE NOT NULL,
    created_at   TEXT    DEFAULT (datetime('now')),
    status       TEXT    NOT NULL DEFAULT 'pending',
    first_name   TEXT    NOT NULL,
    last_name    TEXT    NOT NULL,
    email        TEXT    NOT NULL,
    phone        TEXT,
    address      TEXT    NOT NULL,
    city         TEXT    NOT NULL,
    postcode     TEXT    NOT NULL,
    notes        TEXT,
    items        TEXT    NOT NULL,
    subtotal     REAL    NOT NULL,
    total        REAL    NOT NULL
  )
`);

// ─────────────────────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.static(__dirname));   // serves index.html, shop.html, css/, js/, images/

// Rate-limit the order endpoint — max 10 orders per 15 min per IP
const orderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// Rate-limit the admin API — max 60 requests per minute per IP
const adminLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests.' },
});

// ─────────────────────────────────────────────────────────────
// EMAIL (Nodemailer)
// ─────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

function buildItemsTable(items) {
  const rows = items.map(i => {
    const lineTotal = i.price ? `$${(i.price * i.qty).toFixed(2)}` : 'POA';
    return `<tr>
      <td style="padding:6px 12px;border:1px solid #ddd">${i.name}</td>
      <td style="padding:6px 12px;border:1px solid #ddd;text-align:center">${i.qty}</td>
      <td style="padding:6px 12px;border:1px solid #ddd;text-align:right">${lineTotal}</td>
    </tr>`;
  }).join('');

  return `
    <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
      <thead style="background:#f5f0eb">
        <tr>
          <th style="padding:8px 12px;border:1px solid #ddd;text-align:left">Product</th>
          <th style="padding:8px 12px;border:1px solid #ddd;text-align:center">Qty</th>
          <th style="padding:8px 12px;border:1px solid #ddd;text-align:right">Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

async function sendOrderEmails(order) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('⚠  Email credentials not configured — skipping email send.');
    return;
  }

  const items = JSON.parse(order.items);
  const table = buildItemsTable(items);
  const salonTo = process.env.SALON_EMAIL || process.env.EMAIL_USER;

  // 1) Notification to the salon
  await transporter.sendMail({
    from:    `"Brow Beauty Hub" <${process.env.EMAIL_USER}>`,
    to:      salonTo,
    subject: `New Order ${order.order_number} — ${order.first_name} ${order.last_name}`,
    html: `
      <div style="font-family:sans-serif;color:#333;max-width:600px">
        <h2 style="color:#8b6f5e">New Order — ${order.order_number}</h2>
        <p><strong>Customer:</strong> ${order.first_name} ${order.last_name}</p>
        <p><strong>Email:</strong> <a href="mailto:${order.email}">${order.email}</a></p>
        <p><strong>Phone:</strong> ${order.phone || 'Not provided'}</p>
        <p><strong>Address:</strong> ${order.address}, ${order.city} ${order.postcode}</p>
        ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
        <br>${table}
        <p style="margin-top:12px;font-size:16px"><strong>Total: $${order.total.toFixed(2)}</strong></p>
        <p style="color:#888;font-size:12px">Manage orders at <a href="http://localhost:${PORT}/admin.html">Admin Dashboard</a></p>
      </div>`,
  });

  // 2) Confirmation email to the customer
  await transporter.sendMail({
    from:    `"Brow Beauty Hub" <${process.env.EMAIL_USER}>`,
    to:      order.email,
    subject: `Order ${order.order_number} confirmed — Brow Beauty Hub`,
    html: `
      <div style="font-family:sans-serif;color:#333;max-width:600px">
        <h2 style="color:#8b6f5e">Thank you, ${order.first_name}!</h2>
        <p>We've received your order <strong>${order.order_number}</strong> and will be in touch shortly to confirm dispatch.</p>
        <br>${table}
        <p style="margin-top:12px;font-size:16px"><strong>Total: $${order.total.toFixed(2)}</strong></p>
        <br>
        <p>Questions? Reply to this email or visit our <a href="https://www.instagram.com/eyebrowbeautyhub/">Instagram</a>.</p>
        <p style="color:#8b6f5e;font-weight:bold">— Brow Beauty Hub Team</p>
      </div>`,
  });
}

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().slice(0, 500);
}

function requireAdminKey(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  next();
}

// ─────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────

// POST /api/order — submit a new order
app.post('/api/order', orderLimiter, (req, res) => {
  const { customer, items, subtotal, total } = req.body;

  // Basic structure validation
  if (!customer || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid order data.' });
  }

  const { firstName, lastName, email, phone, address, city, postcode, notes } = customer;

  if (!firstName || !lastName || !email || !address || !city || !postcode) {
    return res.status(400).json({ error: 'Missing required customer fields.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  // Validate each item has an integer id and qty >= 1
  for (const item of items) {
    if (!Number.isInteger(item.id) || !Number.isInteger(item.qty) || item.qty < 1 || item.qty > 99) {
      return res.status(400).json({ error: 'Invalid item data.' });
    }
  }

  const parsedSubtotal = parseFloat(subtotal);
  const parsedTotal    = parseFloat(total);
  if (isNaN(parsedSubtotal) || isNaN(parsedTotal) || parsedSubtotal < 0 || parsedTotal < 0) {
    return res.status(400).json({ error: 'Invalid order totals.' });
  }

  const orderNumber = 'BBH-' + Date.now().toString().slice(-8);

  const orderData = {
    order_number: orderNumber,
    first_name:   sanitize(firstName),
    last_name:    sanitize(lastName),
    email:        sanitize(email).toLowerCase(),
    phone:        sanitize(phone),
    address:      sanitize(address),
    city:         sanitize(city),
    postcode:     sanitize(postcode),
    notes:        sanitize(notes),
    items:        JSON.stringify(items),
    subtotal:     parsedSubtotal,
    total:        parsedTotal,
  };

  try {
    db.prepare(`
      INSERT INTO orders
        (order_number, first_name, last_name, email, phone, address, city, postcode, notes, items, subtotal, total)
      VALUES
        (@order_number, @first_name, @last_name, @email, @phone, @address, @city, @postcode, @notes, @items, @subtotal, @total)
    `).run(orderData);

    // Send emails fire-and-forget — order is already saved if email fails
    sendOrderEmails(orderData).catch(err => console.error('Email send error:', err));

    return res.status(201).json({ success: true, orderNumber });
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'Failed to save order. Please try again.' });
  }
});

// GET /api/orders — list all orders (admin only)
app.get('/api/orders', adminLimiter, requireAdminKey, (req, res) => {
  const page   = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit  = 20;
  const offset = (page - 1) * limit;
  const status = req.query.status;

  let query  = 'SELECT * FROM orders';
  let countQ = 'SELECT COUNT(*) as count FROM orders';
  const params = [];

  if (status) {
    query  += ' WHERE status = ?';
    countQ += ' WHERE status = ?';
    params.push(status);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

  const orders = db.prepare(query).all(...params, limit, offset);
  const total  = db.prepare(countQ).get(...params).count;

  orders.forEach(o => { o.items = JSON.parse(o.items); });

  return res.json({ orders, total, page, pages: Math.ceil(total / limit) });
});

// GET /api/orders/:id — single order (admin only)
app.get('/api/orders/:id', adminLimiter, requireAdminKey, (req, res) => {
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  order.items = JSON.parse(order.items);
  return res.json(order);
});

// PATCH /api/orders/:id/status — update status (admin only)
app.patch('/api/orders/:id/status', adminLimiter, requireAdminKey, (req, res) => {
  const allowed = ['pending', 'confirmed', 'shipped', 'completed', 'cancelled'];
  const { status } = req.body;

  if (!allowed.includes(status)) {
    return res.status(400).json({ error: `Status must be one of: ${allowed.join(', ')}.` });
  }

  const info = db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Order not found.' });

  return res.json({ success: true });
});

// DELETE /api/orders/:id — delete order (admin only)
app.delete('/api/orders/:id', adminLimiter, requireAdminKey, (req, res) => {
  const info = db.prepare('DELETE FROM orders WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Order not found.' });
  return res.json({ success: true });
});

// ─────────────────────────────────────────────────────────────
// GLOBAL ERROR HANDLER — always return JSON, never empty body
// ─────────────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({ error: err.message || 'Internal server error.' });
});

// Catch-all for unknown routes (returns JSON 404, not HTML)
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found.` });
});

// ─────────────────────────────────────────────────────────────
// START
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✓  Brow Beauty Hub running at http://localhost:${PORT}`);
  console.log(`✓  Admin dashboard at  http://localhost:${PORT}/admin.html`);
  console.log(`✓  Orders database:    ${path.join(__dirname, 'orders.db')}`);
});
