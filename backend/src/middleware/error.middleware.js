// backend/middleware/errorMiddleware.js
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  const statusCode = err.statusCode || err.status || 500;

  // MySQL common errors → nicer messages
  // ER_DUP_ENTRY (duplicate unique)
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      success: false,
      message: "Duplicate value (already exists).",
      detail: err.sqlMessage,
    });
  }

  // ER_NO_REFERENCED_ROW_2 (foreign key fail)
  if (err.code === "ER_NO_REFERENCED_ROW_2") {
    return res.status(400).json({
      success: false,
      message: "Invalid reference (foreign key constraint).",
      detail: err.sqlMessage,
    });
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Server error",
    ...(process.env.NODE_ENV !== "production"
      ? { stack: err.stack, code: err.code }
      : {}),
  });
}

module.exports = { notFound, errorHandler };
