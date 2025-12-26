const express = require("express");
const cors = require("cors");

const env = require("./config/env");
const { notFound, errorHandler } = require("./middleware/error.middleware");

const authRoutes = require("./modules/auth/auth.routes");
const categoryRoutes = require("./modules/categories/category.routes");
const productRoutes = require("./modules/products/product.routes");
const usersRoutes = require("./modules/users/users.routes");

const app = express();

app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", usersRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
