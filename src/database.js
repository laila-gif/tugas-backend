let products = [
  { id: 1, name: 'Nasi Goreng Spesial', price: 15000, stock: 50,  category: 'Makanan'    },
  { id: 2, name: 'Es Teh Manis',        price: 5000,  stock: 100, category: 'Minuman'    },
  { id: 3, name: 'Pensil 2B',           price: 3000,  stock: 200, category: 'Alat Tulis' },
  { id: 4, name: 'Mie Ayam Bakso',      price: 12000, stock: 40,  category: 'Makanan'    },
  { id: 5, name: 'Jus Jeruk Segar',     price: 8000,  stock: 60,  category: 'Minuman'    },
  { id: 6, name: 'Pulpen Pilot G2',     price: 7000,  stock: 150, category: 'Alat Tulis' },
  { id: 7, name: 'Soto Ayam',           price: 13000, stock: 35,  category: 'Makanan'    },
  { id: 8, name: 'Air Mineral 600ml',   price: 3500,  stock: 300, category: 'Minuman'    },
];

let nextId = 9;

const getAll = (category = null) => {
  if (category) {
    return products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }
  return [...products];
};

const getById = (id) => products.find((p) => p.id === id) || null;

const create = ({ name, price, stock, category }) => {
  const product = { id: nextId++, name, price, stock, category };
  products.push(product);
  return product;
};

const update = (id, updates) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  if (updates.price !== undefined) products[index].price = updates.price;
  if (updates.stock !== undefined) products[index].stock = updates.stock;

  return products[index];
};

const remove = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  return products.splice(index, 1)[0];
};

const nameExists = (name, excludeId = null) =>
  products.some(
    (p) =>
      p.name.toLowerCase() === name.toLowerCase() &&
      p.id !== excludeId
  );

module.exports = { getAll, getById, create, update, remove, nameExists };
