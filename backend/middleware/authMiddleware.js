const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).send({ error: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // Store user data in request
    next();
  } catch (err) {
    return res.status(401).send({ error: "Invalid token" });
  }
};

module.exports = authenticate;
