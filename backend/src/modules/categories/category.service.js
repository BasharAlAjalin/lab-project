const repo = require("./category.repository");

async function listCategories() {
  return repo.findAll();
}

async function getCategoryById(id) {
  const cat = await repo.findById(id);
  if (!cat) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  return cat;
}

async function createCategory({ name }) {
  if (!name || !String(name).trim()) {
    const err = new Error("name is required");
    err.status = 400;
    throw err;
  }

  const existing = await repo.findByName(name.trim());
  if (existing) {
    const err = new Error("Category name already exists");
    err.status = 409;
    throw err;
  }

  return repo.create({ name: name.trim() });
}

async function updateCategory(id, patch) {
  if (patch.name !== undefined && !String(patch.name).trim()) {
    const err = new Error("name cannot be empty");
    err.status = 400;
    throw err;
  }

  const updated = await repo.update(id, { name: patch.name?.trim() });
  if (!updated) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  return updated;
}

async function deleteCategory(id) {
  const ok = await repo.remove(id);
  if (!ok) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  return { message: "Category deleted successfully" };
}

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
