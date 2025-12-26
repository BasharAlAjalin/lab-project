function errorMiddleware(err, req, res, next) {
  const status = err?.status || 500;
  const message = err?.message || "Internal Server Error";

  // Helpful in development:
  if (process.env.NODE_ENV !== "test") {
    console.error(err);
  }

  return res.status(status).json({
    message,
  });
}

module.exports = { errorMiddleware };
