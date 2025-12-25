const productRepo = require("./product.repository");
const categoryRepo = require("../categories/category.repository");

function _ensureCategoryExists(categoryId) {
  if (!categoryId) {
    const err = new Error("categoryId is required");
    err.status = 400;
    throw err;
  }
  const cat = categoryRepo.findById(categoryId);
  if (!cat) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  return cat;
}

function listProducts({ search, categoryId }) {
  let items = productRepo.findAll();

  if (categoryId) {
    items = items.filter((p) => p.categoryId === categoryId);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    items = items.filter(
      (p) =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.description || "").toLowerCase().includes(q)
    );
  }

  return items;
}

function getProductById(id) {
  const p = productRepo.findById(id);
  if (!p) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return p;
}

function createProduct(payload) {
  const {
    categoryId,
    name,
    description,
    price,
    stockQuantity,
    imageUrl,
    isActive,
  } = payload;

  _ensureCategoryExists(categoryId);

  if (!name || !name.trim()) {
    const err = new Error("name is required");
    err.status = 400;
    throw err;
  }

  const numPrice = Number(price);
  if (Number.isNaN(numPrice) || numPrice < 0) {
    const err = new Error("price must be a valid non-negative number");
    err.status = 400;
    throw err;
  }

  const stock = stockQuantity === undefined ? 0 : Number(stockQuantity);
  if (Number.isNaN(stock) || stock < 0) {
    const err = new Error("stockQuantity must be a valid non-negative number");
    err.status = 400;
    throw err;
  }

  return productRepo.create({
    categoryId,
    name: name.trim(),
    description: description || "",
    price: numPrice,
    stockQuantity: stock,
    imageUrl: imageUrl || "",
    isActive: isActive ?? true,
  });
}

function updateProduct(id, patch) {
  if (patch.categoryId !== undefined) {
    _ensureCategoryExists(patch.categoryId);
  }

  if (patch.name !== undefined && !String(patch.name).trim()) {
    const err = new Error("name cannot be empty");
    err.status = 400;
    throw err;
  }

  if (patch.price !== undefined) {
    const numPrice = Number(patch.price);
    if (Number.isNaN(numPrice) || numPrice < 0) {
      const err = new Error("price must be a valid non-negative number");
      err.status = 400;
      throw err;
    }
    patch.price = numPrice;
  }

  if (patch.stockQuantity !== undefined) {
    const stock = Number(patch.stockQuantity);
    if (Number.isNaN(stock) || stock < 0) {
      const err = new Error(
        "stockQuantity must be a valid non-negative number"
      );
      err.status = 400;
      throw err;
    }
    patch.stockQuantity = stock;
  }

  const updated = productRepo.update(id, patch);
  if (!updated) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return updated;
}

function deleteProduct(id) {
  const ok = productRepo.remove(id);
  if (!ok) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return { message: "Product deleted successfully" };
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
