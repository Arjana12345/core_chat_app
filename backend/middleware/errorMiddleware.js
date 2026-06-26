const errorMiddleware = (error, req, res, next) => {
  console.log("ERROR:", error);

  res.status(error.statusCode || 500).json({
    success: false,

    message: error.message || "Server Error",
  });
};

module.exports = errorMiddleware;
