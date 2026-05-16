const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    console.log("role: user");
    return res.status(403).json({
      message: "Admin Access Only",
    });
  }
  console.log("role: Admin");
  next();
};

module.exports = adminOnly;