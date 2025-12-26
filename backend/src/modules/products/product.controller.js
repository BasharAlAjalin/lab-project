const service = require("./product.service");

async function list(req, res, next) {
  try {
    const { search, categoryId } = req.query;
    res.json(await service.listProducts({ search, categoryId }));
  } catch (e) {
    next(e);
  }
}

async function getOne(req, res, next) {
  try {
    res.json(await service.getProductById(req.params.id));
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const created = await service.createProduct(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    res.json(await service.updateProduct(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await service.deleteProduct(req.params.id));
  } catch (e) {
    next(e);
  }
}

module.exports = { list, getOne, create, update, remove };
