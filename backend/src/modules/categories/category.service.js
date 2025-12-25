const repo = require("./category.repository");

function listCategories() {
  return repo.findAll();
}

function getCategoryById(id) {
  const category = repo.findById(id);
  if (!category) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  return category;
}

function createCategory({ name, description, imageUrl, isActive }) {
  if (!name || !name.trim()) {
    const err = new Error("name is required");
    err.status = 400;
    throw err;
  }

  const exists = repo.findByName(name.trim());
  if (exists) {
    const err = new Error("Category name already exists");
    err.status = 409;
    throw err;
  }

  return repo.create({
    name: name.trim(),
    description: description || "",
    imageUrl: imageUrl || "",
    isActive: isActive ?? true,
  });
}

function updateCategory(id, patch) {
  const updated = repo.update(id, patch);
  if (!updated) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  return updated;
}

function deleteCategory(id) {
  const ok = repo.remove(id);
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
