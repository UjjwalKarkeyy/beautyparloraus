const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const legacyAdminKey = req.headers["x-admin-key"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    try {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

      req.admin = decoded;

      return next();
    } catch (error) {
      return res.status(401).json({
        error: "Invalid or expired admin token",
      });
    }
  }

  if (legacyAdminKey && legacyAdminKey === process.env.ADMIN_KEY) {
    req.admin = {
      role: "admin",
      authType: "legacy-key",
    };

    return next();
  }

  return res.status(401).json({
    error: "Unauthorized admin request",
  });
}

module.exports = adminAuth;