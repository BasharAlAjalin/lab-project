const service = require("./category.service");

async function list(req, res, next) {
  try {
    res.json(await service.listCategories());
  } catch (e) {
    next(e);
  }
}

async function getOne(req, res, next) {
  try {
    res.json(await service.getCategoryById(req.params.id));
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const created = await service.createCategory(req.body);
    res.status(201).json(created);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    res.json(await service.updateCategory(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await service.deleteCategory(req.params.id));
  } catch (e) {
    next(e);
  }
}

module.exports = { list, getOne, create, update, remove };
