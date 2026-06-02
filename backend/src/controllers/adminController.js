const jwt = require("jsonwebtoken");

function loginAdmin(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  const validUsername = username === process.env.ADMIN_USERNAME;
  const validPassword = password === process.env.ADMIN_PASSWORD;

  if (!validUsername || !validPassword) {
    return res.status(401).json({
      error: "Invalid admin credentials",
    });
  }

  const token = jwt.sign(
    {
      role: "admin",
      username,
    },
    process.env.ADMIN_JWT_SECRET,
    {
      expiresIn: process.env.ADMIN_TOKEN_EXPIRES_IN || "1d",
    }
  );

  res.json({
    message: "Login successful",
    token,
    admin: {
      username,
      role: "admin",
    },
  });
}

function getAdminProfile(req, res) {
  res.json({
    admin: req.admin,
  });
}

module.exports = {
  loginAdmin,
  getAdminProfile,
};