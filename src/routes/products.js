// ============================================================
// routes/products.js  —  Semua route /api/products
// ============================================================

const express  = require('express');
const router   = express.Router();
const db       = require('../database');
const { success, error } = require('../utils/response');
const {
  validateCreate,
  validateUpdate,
  validateId,
  VALID_CATEGORIES,
} = require('../middleware/validate');

// ─────────────────────────────────────────
// GET /api/products
// Tampilkan semua produk.
// Query opsional: ?category=Makanan
// ─────────────────────────────────────────
router.get('/', (req, res) => {
  const { category } = req.query;

  if (category && !VALID_CATEGORIES.includes(category)) {
    return error(
      res, 400,
      `Category tidak valid. Pilihan: ${VALID_CATEGORIES.join(', ')}`
    );
  }

  const data = db.getAll(category || null);

  const message = category
    ? `Berhasil mengambil produk kategori "${category}"`
    : 'Berhasil mengambil semua produk';

  return success(res, 200, message, data, {
    total: data.length,
    ...(category && { filter: { category } }),
  });
});

// ─────────────────────────────────────────
// POST /api/products
// Tambah produk baru.
// Body: { name, price, stock, category }
// ─────────────────────────────────────────
router.post('/', validateCreate, (req, res) => {
  const { name, price, stock, category } = req.body;

  if (db.nameExists(name)) {
    return error(res, 409, `Produk dengan nama "${name}" sudah ada`);
  }

  const product = db.create({ name, price, stock, category });

  return success(res, 201, 'Produk berhasil ditambahkan', product);
});

router.put('/:id', validateId, validateUpdate, (req, res) => {
  const { price, stock } = req.body;

  const updated = db.update(req.productId, { price, stock });

  if (!updated) {
    return error(res, 404, `Produk dengan ID ${req.productId} tidak ditemukan`);
  }

  const changed = [];
  if (price !== undefined) changed.push(`price -> Rp${price.toLocaleString('id-ID')}`);
  if (stock !== undefined) changed.push(`stock -> ${stock}`);

  return success(
    res, 200,
    `Produk ID ${req.productId} berhasil diupdate (${changed.join(', ')})`,
    updated
  );
});

router.delete('/:id', validateId, (req, res) => {
  const deleted = db.remove(req.productId);

  if (!deleted) {
    return error(res, 404, `Produk dengan ID ${req.productId} tidak ditemukan`);
  }

  return success(
    res, 200,
    `Produk "${deleted.name}" (ID ${req.productId}) berhasil dihapus`,
    deleted
  );
});

module.exports = router;
