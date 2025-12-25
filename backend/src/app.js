const express = require("express");
const cors = require("cors");

const { errorMiddleware } = require("./middleware/error.middleware");
const authRoutes = require("./modules/auth/auth.routes");
const categoryRoutes = require("./modules/categories/category.routes");
const productRoutes = require("./modules/products/product.routes");
const productRoutes = require("./modules/products/product.routes");
app.use("/api/products", productRoutes);

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use(errorMiddleware);

module.exports = app;
