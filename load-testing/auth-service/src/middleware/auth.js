const jwt = require("jsonwebtoken");
const config = require("../../config")

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403)
      .json({
        message: "A token is required for authentication",
        status: "fail"
      });
  }
  try {
    const decoded = jwt.verify(token, config.JWT_TOKEN_KEY);

    req.user = decoded;
  } catch (err) {
    console.log(err)
    return res.status(401)
      .json({
        message: "Invalid Token",
        status: "fail"
      });
  }

  return next();
};

module.exports = verifyToken;