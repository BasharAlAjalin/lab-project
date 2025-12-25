const { randomUUID } = require("crypto");

const products = [];

function findAll() {
  return products;
}

function findById(id) {
  return products.find((p) => p.id === id) || null;
}

function create({
  categoryId,
  name,
  description = "",
  price,
  stockQuantity = 0,
  imageUrl = "",
  isActive = true,
}) {
  const now = new Date().toISOString();
  const product = {
    id: randomUUID(),
    categoryId,
    name,
    description,
    price,
    stockQuantity,
    imageUrl,
    isActive,
    createdAt: now,
    updatedAt: now,
  };
  products.push(product);
  return product;
}

function update(id, patch) {
  const p = findById(id);
  if (!p) return null;

  if (patch.categoryId !== undefined) p.categoryId = patch.categoryId;
  if (patch.name !== undefined) p.name = patch.name;
  if (patch.description !== undefined) p.description = patch.description;
  if (patch.price !== undefined) p.price = patch.price;
  if (patch.stockQuantity !== undefined) p.stockQuantity = patch.stockQuantity;
  if (patch.imageUrl !== undefined) p.imageUrl = patch.imageUrl;
  if (patch.isActive !== undefined) p.isActive = patch.isActive;

  p.updatedAt = new Date().toISOString();
  return p;
}

function remove(id) {
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  products.splice(idx, 1);
  return true;
}

function _resetForTests() {
  products.length = 0;
}

module.exports = { findAll, findById, create, update, remove, _resetForTests };
