const jwt = require("jsonwebtoken");

const JWT_SECREAT="dilipgour";

const fetchuser = (req, res, next) => {
  const token=req.headers["auth-token"]

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECREAT);
    req.user = decoded.user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = fetchuser