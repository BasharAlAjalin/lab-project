const repo = require("./users.repository");

function toSafeUser(u) {
  if (!u) return null;

  return {
    id: u.id ?? u.userId ?? u.user_id ?? null,
    email: u.email ?? null,

    firstName: u.firstName ?? u.first_name ?? null,
    lastName: u.lastName ?? u.last_name ?? null,
    phone: u.phone ?? null,

    role: u.role ?? u.user_role ?? null,

    isVerified: u.isVerified ?? u.is_verified ?? u.verified ?? 0,

    createdAt: u.createdAt ?? u.created_at ?? null,
    updatedAt: u.updatedAt ?? u.updated_at ?? null,
  };
}

function badRequest(msg) {
  const e = new Error(msg);
  e.status = 400;
  return e;
}

function notFound(msg) {
  const e = new Error(msg);
  e.status = 404;
  return e;
}

async function getMe(userId) {
  const u = await repo.findById(userId);
  if (!u) throw notFound("User not found");
  return { user: toSafeUser(u) };
}

async function updateMe(userId, patch) {
  const allowed = {
    firstName: patch?.firstName,
    lastName: patch?.lastName,
    phone: patch?.phone,
  };

  if (allowed.firstName !== undefined && String(allowed.firstName).length > 40)
    throw badRequest("firstName too long");
  if (allowed.lastName !== undefined && String(allowed.lastName).length > 40)
    throw badRequest("lastName too long");
  if (allowed.phone !== undefined && String(allowed.phone).length > 25)
    throw badRequest("phone too long");

  const updated = await repo.updateUser(userId, allowed);
  if (!updated) throw notFound("User not found");

  return { user: toSafeUser(updated) };
}

async function adminListUsers({ search, role, verified } = {}) {
  const rows = await repo.findAll({ search, role, verified });

  const list = Array.isArray(rows) ? rows : [];

  return list.map(toSafeUser);
}

async function adminUpdateUser(id, patch) {
  const allowed = {
    firstName: patch?.firstName,
    lastName: patch?.lastName,
    phone: patch?.phone,
    role: patch?.role,
    isVerified: patch?.isVerified,
  };

  if (
    allowed.role !== undefined &&
    !["ADMIN", "CUSTOMER"].includes(String(allowed.role).toUpperCase())
  ) {
    throw badRequest("Invalid role");
  }

  if (allowed.role !== undefined) {
    allowed.role = String(allowed.role).toUpperCase();
  }

  const updated = await repo.updateUserAdmin(id, allowed);
  if (!updated) throw notFound("User not found");

  return { user: toSafeUser(updated) };
}

async function adminDeleteUser(id) {
  const ok = await repo.remove(id);
  if (!ok) throw notFound("User not found");
  return { message: "User deleted successfully" };
}

module.exports = {
  getMe,
  updateMe,
  adminListUsers,
  adminUpdateUser,
  adminDeleteUser,
};
