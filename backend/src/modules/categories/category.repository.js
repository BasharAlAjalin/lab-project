const { randomUUID } = require("crypto");

const categories = [];

function findAll() {
  return categories;
}

function findById(id) {
  return categories.find((c) => c.id === id) || null;
}

function findByName(name) {
  return (
    categories.find((c) => c.name.toLowerCase() === name.toLowerCase()) || null
  );
}

function create({ name, description = "", imageUrl = "", isActive = true }) {
  const now = new Date().toISOString();
  const category = {
    id: randomUUID(),
    name,
    description,
    imageUrl,
    isActive,
    createdAt: now,
    updatedAt: now,
  };
  categories.push(category);
  return category;
}

function update(id, patch) {
  const category = findById(id);
  if (!category) return null;

  if (patch.name !== undefined) category.name = patch.name;
  if (patch.description !== undefined) category.description = patch.description;
  if (patch.imageUrl !== undefined) category.imageUrl = patch.imageUrl;
  if (patch.isActive !== undefined) category.isActive = patch.isActive;

  category.updatedAt = new Date().toISOString();
  return category;
}

function remove(id) {
  const idx = categories.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  categories.splice(idx, 1);
  return true;
}

function _resetForTests() {
  categories.length = 0;
}

module.exports = {
  findAll,
  findById,
  findByName,
  create,
  update,
  remove,
  _resetForTests,
};
