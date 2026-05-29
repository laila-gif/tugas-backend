const { error } = require('../utils/response');

const VALID_CATEGORIES = ['Makanan', 'Minuman', 'Alat Tulis'];

const validateCreate = (req, res, next) => {
  const { name, price, stock, category } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('name wajib diisi dan harus berupa teks');
  } else if (name.trim().length < 2) {
    errors.push('name minimal 2 karakter');
  } else if (name.trim().length > 100) {
    errors.push('name maksimal 100 karakter');
  }

  if (price === undefined || price === null) {
    errors.push('price wajib diisi');
  } else if (typeof price !== 'number' || !Number.isInteger(price)) {
    errors.push('price harus berupa bilangan bulat (integer)');
  } else if (price < 0) {
    errors.push('price tidak boleh negatif');
  } else if (price > 100_000_000) {
    errors.push('price terlalu besar (maks 100.000.000)');
  }

  if (stock === undefined || stock === null) {
    errors.push('stock wajib diisi');
  } else if (typeof stock !== 'number' || !Number.isInteger(stock)) {
    errors.push('stock harus berupa bilangan bulat (integer)');
  } else if (stock < 0) {
    errors.push('stock tidak boleh negatif');
  } else if (stock > 1_000_000) {
    errors.push('stock terlalu besar (maks 1.000.000)');
  }

  if (!category || typeof category !== 'string' || category.trim() === '') {
    errors.push(`category wajib diisi. Pilihan: ${VALID_CATEGORIES.join(', ')}`);
  } else if (!VALID_CATEGORIES.includes(category.trim())) {
    errors.push(`category tidak valid. Pilihan: ${VALID_CATEGORIES.join(', ')}`);
  }

  if (errors.length > 0) {
    return error(res, 400, 'Validasi gagal. Periksa kembali data yang dikirim.', errors);
  }

  req.body.name     = name.trim();
  req.body.category = category.trim();
  next();
};

const validateUpdate = (req, res, next) => {
  const { price, stock } = req.body;
  const errors = [];

  if (price === undefined && stock === undefined) {
    return error(res, 400, 'Minimal satu field harus diisi: price atau stock');
  }

  if (price !== undefined) {
    if (typeof price !== 'number' || !Number.isInteger(price)) {
      errors.push('price harus berupa bilangan bulat (integer)');
    } else if (price < 0) {
      errors.push('price tidak boleh negatif');
    } else if (price > 100_000_000) {
      errors.push('price terlalu besar (maks 100.000.000)');
    }
  }

  if (stock !== undefined) {
    if (typeof stock !== 'number' || !Number.isInteger(stock)) {
      errors.push('stock harus berupa bilangan bulat (integer)');
    } else if (stock < 0) {
      errors.push('stock tidak boleh negatif');
    } else if (stock > 1_000_000) {
      errors.push('stock terlalu besar (maks 1.000.000)');
    }
  }

  if (errors.length > 0) {
    return error(res, 400, 'Validasi gagal. Periksa kembali data yang dikirim.', errors);
  }

  next();
};

const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return error(res, 400, 'ID tidak valid. ID harus berupa angka bulat positif.');
  }

  req.productId = id;
  next();
};

module.exports = { validateCreate, validateUpdate, validateId, VALID_CATEGORIES };
