const productRepo = require("./product.repository");
const categoryRepo = require("../categories/category.repository");

async function _ensureCategoryExists(categoryId) {
  if (!categoryId) {
    const err = new Error("categoryId is required");
    err.status = 400;
    throw err;
  }
  const cat = await categoryRepo.findById(categoryId);
  if (!cat) {
    const err = new Error("Category not found");
    err.status = 404;
    throw err;
  }
  return cat;
}

async function listProducts({ search, categoryId }) {
  return productRepo.findAll({ search, categoryId });
}

async function getProductById(id) {
  const p = await productRepo.findById(id);
  if (!p) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return p;
}

function normalizeProductPayload(payload = {}) {
  return {
    categoryId: payload.categoryId ?? payload.category_id,
    name: payload.name,
    description: payload.description,
    price: payload.price,
    stockQuantity: payload.stockQuantity ?? payload.stock_quantity,
    imageUrl: payload.imageUrl ?? payload.image_url,
  };
}

async function createProduct(payload) {
  const p = normalizeProductPayload(payload);

  await _ensureCategoryExists(p.categoryId);

  if (!p.name || !String(p.name).trim()) {
    const err = new Error("name is required");
    err.status = 400;
    throw err;
  }

  const numPrice = Number(p.price);
  if (Number.isNaN(numPrice) || numPrice < 0) {
    const err = new Error("price must be a valid non-negative number");
    err.status = 400;
    throw err;
  }

  const stock = p.stockQuantity === undefined ? 0 : Number(p.stockQuantity);
  if (Number.isNaN(stock) || stock < 0) {
    const err = new Error("stockQuantity must be a valid non-negative number");
    err.status = 400;
    throw err;
  }

  return productRepo.create({
    categoryId: p.categoryId,
    name: String(p.name).trim(),
    description: p.description || "",
    price: numPrice,
    stockQuantity: stock,
    imageUrl: p.imageUrl || "",
  });
}

async function updateProduct(id, patch) {
  const p = normalizeProductPayload(patch);

  if (p.categoryId !== undefined) await _ensureCategoryExists(p.categoryId);

  if (p.name !== undefined && !String(p.name).trim()) {
    const err = new Error("name cannot be empty");
    err.status = 400;
    throw err;
  }

  if (p.price !== undefined) {
    const numPrice = Number(p.price);
    if (Number.isNaN(numPrice) || numPrice < 0) {
      const err = new Error("price must be a valid non-negative number");
      err.status = 400;
      throw err;
    }
    p.price = numPrice;
  }

  if (p.stockQuantity !== undefined) {
    const stock = Number(p.stockQuantity);
    if (Number.isNaN(stock) || stock < 0) {
      const err = new Error(
        "stockQuantity must be a valid non-negative number"
      );
      err.status = 400;
      throw err;
    }
    p.stockQuantity = stock;
  }

  const updated = await productRepo.update(id, p);
  if (!updated) {
    const err = new Error("Product not found");
    err.status = 404;
    throw err;
  }
  return updated;
}

async function deleteProduct(id) {
  const ok = await productRepo.remove(id);
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
