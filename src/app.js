const express        = require('express');
const productsRouter = require('./routes/products');
const logger         = require('./middleware/logger');
const { error }      = require('./utils/response');

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({
    success  : true,
    message  : 'Products REST API - Aktif',
    version  : '1.0.0',
    endpoints: {
      'GET    /api/products'      : 'Tampilkan semua produk (opsional: ?category=)',
      'POST   /api/products'      : 'Tambah produk baru',
      'PUT    /api/products/:id'  : 'Update harga / stok produk',
      'DELETE /api/products/:id'  : 'Hapus produk berdasarkan ID',
    },
    categories: ['Makanan', 'Minuman', 'Alat Tulis'],
  });
});

app.use('/api/products', productsRouter);

app.use((req, res) => {
  error(res, 404, `Route ${req.method} ${req.originalUrl} tidak ditemukan`);
});

app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  if (err.type === 'entity.parse.failed') {
    return error(res, 400, 'Request body bukan JSON yang valid');
  }
  error(res, 500, 'Terjadi kesalahan pada server');
});

app.listen(PORT, () => {
  const line = '='.repeat(52);
  console.log(`\n${line}`);
  console.log(`  Server berjalan di  ->  http://localhost:${PORT}`);
  console.log(`  API Produk          ->  http://localhost:${PORT}/api/products`);
  console.log(line);
  console.log('  GET    /api/products          -> Semua produk');
  console.log('  POST   /api/products          -> Tambah produk');
  console.log('  PUT    /api/products/:id      -> Update harga/stok');
  console.log('  DELETE /api/products/:id      -> Hapus produk');
  console.log(`${line}\n`);
});

module.exports = app;
