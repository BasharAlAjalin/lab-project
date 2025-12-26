const service = require("./users.service");

async function getMe(req, res, next) {
  try {
    res.json(await service.getMe(req.user.id));
  } catch (e) {
    next(e);
  }
}

async function updateMe(req, res, next) {
  try {
    res.json(await service.updateMe(req.user.id, req.body));
  } catch (e) {
    next(e);
  }
}

// ADMIN
async function adminListUsers(req, res, next) {
  try {
    res.json(await service.adminListUsers(req.query));
  } catch (e) {
    next(e);
  }
}

async function adminUpdateUser(req, res, next) {
  try {
    res.json(await service.adminUpdateUser(req.params.id, req.body));
  } catch (e) {
    next(e);
  }
}

async function adminDeleteUser(req, res, next) {
  try {
    res.json(await service.adminDeleteUser(req.params.id));
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getMe,
  updateMe,
  adminListUsers,
  adminUpdateUser,
  adminDeleteUser,
};
