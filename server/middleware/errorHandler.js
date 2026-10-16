exports.notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

exports.errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: errors.join(", "), errors });
  }
  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "This email is already registered" });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Server error" });
};
